const router = require("express").Router();
const { studentModel } = require("../models/Student");
const Interest = require("../models/interests");

router.use((req, res, next) => {
    req.app.set("view engine", "ejs");
    next();
});

// Endpoint to save user interests
router.post("/", async (req, res) => {
    try {
        const { userId, Sports, Music, Art, Cooking, Volunteering, Video_Games, Dance } = req.body;
        const data = {
            userId, // Include the userId in the interest object
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

// Endpoint to fetch user interests
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userInterests = await Interest.findOne({ userId: userId }); // Find by userId
        if (!userInterests) {
            return res.status(404).send({ message: 'Interests not found' });
        }
        res.send(userInterests);
    } catch (error) {
        console.error('Error fetching interests:', error); // Logging error
        res.status(500).send({ message: 'Server error' });
    }
});

// Endpoint to update user interests
router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { Sports, Music, Art, Cooking, Volunteering, Video_Games, Dance } = req.body;

        const updatedInterests = await Interest.findOneAndUpdate(
            { userId: userId },
            { Sports, Music, Art, Cooking, Volunteering, Video_Games, Dance },
            { new: true, useFindAndModify: false }
        );

        if (!updatedInterests) {
            return res.status(404).send({ message: 'Interests not found' });
        }

        res.send(updatedInterests);
    } catch (error) {
        console.error('Error updating interests:', error); // Logging error
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
