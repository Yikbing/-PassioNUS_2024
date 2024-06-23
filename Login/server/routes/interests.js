const router = require("express").Router();
const { studentModel } = require("../models/Student");
const Interest = require("../models/interests");

router.use((req, res, next) => {
    req.app.set("view engine", "ejs");
    next();
});

router.post("/", async (req, res) => {
    try {
        const { userId, Sports, Music, Art, Cooking, Volunteering, Video_Games, Dance } = req.body;
        const data = {
            user_id: userId, // Include the userId in the interest object
            Sports,
            Music,
            Art,
            Cooking,
            Volunteering,
            Video_Games,
            Dance
        };

        const interestData = await Interest.insertMany([data]); // Insert data into the collection
        console.log('Interest data inserted:', interestData);

        // Update the user's setup_interests boolean to true
        await studentModel.updateOne({ _id: userId }, { setup_interests: true });

        res.status(201).json({
            message: "Interests saved successfully",
            data: interestData
        }); // Send a success response to the client
    } catch (error) {
        console.error('Error saving interests:', error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;
