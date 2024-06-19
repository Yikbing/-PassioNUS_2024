require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const userRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const create_profileRoutes = require("./routes/create_profile");
const interestsRoutes = require("./routes/interests");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// routes
app.use("/api/students", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/create_profile", create_profileRoutes);
app.use("/api/interests", interestsRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));