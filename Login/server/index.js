require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { mongoose, connection } = require("./database");
const userRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const createProfileRoutes = require("./routes/create_profile");
const interestsRoutes = require("./routes/interests");
const chatRoutes = require('./routes/chat.js');
const messageRoutes = require('./routes/message.js');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create HTTP server using Express app

// Database connection
connection();

// Middlewares
app.use(express.json());
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
app.use("/api/chat", chatRoutes);
app.use('/api/message', messageRoutes);
mongoose.set('strictQuery', false);

// Create Socket.IO instance
const io = new Server(server);

// Socket.IO events
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit('connected');
  });

  socket.on('join room', (room) => {
    socket.join(room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageReceive) => {
    const chat = newMessageReceive.chatId;
    if (!chat.users) console.log('chat.users is not defined');
    chat.users.forEach((user) => {
      if (user._id == newMessageReceive.sender._id) return;
      io.to(user._id).emit('message received', newMessageReceive);
    });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Start HTTP server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
