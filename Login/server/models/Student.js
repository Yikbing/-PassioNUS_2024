const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const studentsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean, default: false},
    setup_profile: {type: Boolean, default: false},
    setup_interests: {type: Boolean, default: false}
})

studentsSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	})
	return token;
}

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

const studentModel = mongoose.model("students", studentsSchema)
module.exports = {studentModel, validate}