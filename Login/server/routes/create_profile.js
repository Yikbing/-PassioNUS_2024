// profileRoutes.js
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

        const userdata = await collection.insertMany(data);
        console.log(userdata);

        res.redirect("/");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
