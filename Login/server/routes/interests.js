const express = require("express");
const router = express.Router();
const Interest = require("../models/interests");

// Define routes for the interests page
router.get("/", (req, res) => {
    res.send("Interests Page");
});


// POST route to handle form submission
router.post("/", async (req, res) => {
    const { Sports, Music, Art, Cooking, Volunteering, Video_Games, Dance } = req.body;
    user_id = req.session.user_id;
    const interest = new Interest({
        user_id, // Include the userId in the interest object
        Sports,
        Music,
        Art,
        Cooking,
        Volunteering,
        Video_Games,
        Dance
    });

    try {
        await interest.save();
        res.status(201).send("Interests saved successfully");
    } catch (error) {
        res.status(500).send("Error saving interests: " + error.message);
    }
});

// Add more routes as needed

module.exports = router;