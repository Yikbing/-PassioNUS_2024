const router = require("express").Router();
const { studentModel } = require("../models/Student");
const collection = require("../models/config");

router.use((req, res, next) => {
    req.app.set("view engine", "ejs");
    next();
});

router.post("/", async (req, res) => {
    try {
        const { userId, username, faculty, year, gender } = req.body;
        const data = {
            name: username,
            faculty: faculty,
            year: year,
            gender: gender
        };

        const userdata = await collection.insertMany([data]); // Insert data into the collection
        console.log('User data inserted:', userdata);

        // Update the user's setup_profile boolean to true
        await studentModel.updateOne({ _id: userId }, { setup_profile: true });

        res.status(201).json({
            message: "Profile created successfully",
            data: userdata
        }); // Send a success response to the client
    } catch (error) {
        console.error('Error inserting user data:', error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;
