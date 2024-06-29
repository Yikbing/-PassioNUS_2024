const express = require('express');
const router = express.Router();
const collection = require('../models/config'); // Ensure this path is correct

// Endpoint to fetch user profile
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('Received userId:', userId); // Debugging line
        const userProfile = await collection.findOne({ userId: userId }); // Find by userId
        if (!userProfile) {
            return res.status(404).send({ message: 'Profile not found' });
        }
        res.send(userProfile);
    } catch (error) {
        console.error('Error fetching profile:', error); // Logging error
        res.status(500).send({ message: 'Server error' });
    }
});

// Endpoint to update user profile
router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, faculty, year, gender } = req.body;

        const updatedProfile = await collection.findOneAndUpdate(
            { userId: userId },
            { name, faculty, year, gender },
            { new: true, useFindAndModify: false }
        );

        if (!updatedProfile) {
            return res.status(404).send({ message: 'Profile not found' });
        }

        res.send(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error); // Logging error
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
