const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("/"); // Render a success view
});

module.exports = router;