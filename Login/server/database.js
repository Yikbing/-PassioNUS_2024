const mongoose = require("mongoose");
require('dotenv').config(); // Ensure you have your MongoDB URI in .env

module.exports = {
    mongoose,
    connection: () => {
        try {
            mongoose.connect(process.env.DB);
            console.log("Connected to database successfully");
        } catch (error) {
            console.log(error);
            console.log("Could not connect database!");
        }
    }
};
