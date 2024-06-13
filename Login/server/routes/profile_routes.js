const express = require('express');
const router = express.Router();
const Profile = require('./models/profile'); // Adjust the path as necessary
const Student = require('../models/Student'); // Adjust the path as necessary

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user_id) {
        next();
    } else {
        res.status(401).send('User not authenticated');
    }
};

// Route to create profile
router.post('/createProfile', ensureAuthenticated, async (req, res) => {
    try {
        const user_id = req.session.user_id; // Retrieve user_id from session
        const { name, faculty, year, gender } = req.body;

        // Check if user exists
        const user = await Student.findById(user_id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create and save the profile
        const profile = new Profile({
            user_id,
            name,
            faculty,
            year,
            gender
        });
        await profile.save();

        res.status(201).send(profile);
    } catch (error) {
        res.status(500).send('Error creating profile: ' + error.message);
    }
});

module.exports = router;
