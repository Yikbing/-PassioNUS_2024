const router = require("express").Router();
const express = require('express');
const collection = require("../models/config"); 

router.post('/create_profile', async (req, res) => {
    try {
        //const user_id = req.session.user_id; // Retrieve user_id from session or wherever it's stored
        const { name, faculty, year, gender } = req.body;

        // Create and save the profile with the retrieved user_id
        const profile = new Profile({
            //user_id,
            name,
            faculty,
            year,
            gender
        });
        await profile.save();

        res.status(201).send(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating profile: ' + error.message);
    }
});

module.exports = router;
