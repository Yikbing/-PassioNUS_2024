const router = require("express").Router();
const collection = require("../models/config");

// Use EJS as the view engine
router.use((req, res, next) => {
    req.app.set("view engine", "ejs");
    next();
});

router.post("/", async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            faculty: req.body.faculty,
            year: req.body.year,
            gender: req.body.gender
        };

        const userdata = await collection.insertMany([data]); // Insert data into the collection
        console.log('User data inserted:', userdata);
        
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
