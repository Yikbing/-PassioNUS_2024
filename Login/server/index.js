require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session
const { mongoose, connection } = require("./database");
const userRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const createProfileRoutes = require("./routes/create_profile");
const interestsRoutes = require("./routes/interests");
const ChatRoutes = require("./routes/chat_function");
const http = require("http");
const { Server } = require("socket.io");
//const setupSocket = require("./routes/chat_function"); // Import the chat function setup


const app = express();

const server = http.createServer(app); // Create HTTP server using Express app
	
/* //only need to use when theres errors 0.o
//debugging
console.log(userRoutes);
console.log(authRoutes);
console.log(createProfileRoutes);
console.log(interestsRoutes);
*/


// Database connection
connection();

// Middlewares
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Session middleware configuration
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use("/api/students", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/create_profile", createProfileRoutes);
app.use("/api/interests", interestsRoutes);
app.use("/api/chat", ChatRoutes);

// Create HTTP server and integrate Socket.IO
/*const server = http.createServer(app);
setupSocket(server); // Setup Socket.IO with the server

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
*/

ChatRoutes(server); // Pass the HTTP server instance to setupSocket function, used to be setupSocket(server) but theyre the same?? so i changed it to this

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

/*app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
});*///removed this part cause they cause some weird error where the port is being used simultaneously by 2 things(probably app and server) causing some trouble 