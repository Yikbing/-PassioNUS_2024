const router = require("express").Router();
const { studentModel } = require("../models/Student");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define password complexity requirements
const passwordOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

// Validation schema for password change
const validatePasswordChange = (data) => {
    const schema = Joi.object({
        currentPassword: Joi.string().required().label("Current Password"),
        newPassword: passwordComplexity(passwordOptions).required().label("New Password"),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().label("Confirm Password"),
        userId: Joi.string().required().label("User ID") // Allow userId in the schema
    });
    return schema.validate(data);
};

router.post("/", async (req, res) => {
    try {
        const { error } = validatePasswordChange(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        const userId = req.body.userId; // Assuming the user ID is provided in the request body
        if (!userId) {
            console.log("User ID not provided in request");
            return res.status(400).send({ message: "User ID not provided" });
        }

        const user = await studentModel.findById(userId);
        if (!user) {
            console.log("User not found with ID:", userId);
            return res.status(404).send({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!validPassword) {
            console.log("Invalid current password for user:", user.email);
            return res.status(400).send({ message: "Current password is invalid" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
