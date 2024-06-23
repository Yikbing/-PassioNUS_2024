const router = require("express").Router();
const { studentModel } = require("../models/Student"); // DO NOT TOUCH THE CURLY BRACKETS
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		console.log("Request received:", req.body); // Log request body

		const { error } = validate(req.body);
		if (error) {
			console.log("Validation error:", error.details[0].message);
			return res.status(400).send({ message: error.details[0].message });
		}

		const user = await studentModel.findOne({ email: req.body.email });
		if (!user) {
			console.log("User not found for email:", req.body.email);
			return res.status(401).send({ message: "Invalid Email or Password" });
		}

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			console.log("Invalid password for user:", user.email);
			return res.status(401).send({ message: "Invalid Email or Password" });
		}

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}students/${user.id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			console.log("User not verified:", user.email);
			return res.status(400).send({ message: "An email was sent to your account please verify" });
		}

		const token = user.generateAuthToken();
		console.log("User logged in successfully:", user.email);
		res.status(200).send({
			data: {
				token,
				userId: user._id,  // Include userId in the response
				setup_profile: user.setup_profile,
				setup_interests: user.setup_interests,
			},
			message: "Logged in successfully"
		});
	} catch (error) {
		console.error("Internal Server Error:", error); // Log the full error
		res.status(500).send({ message: "Internal Server Error" });
	}
});


const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
