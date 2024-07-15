// server/socket.js

const socketIO = require('socket.io');

const setupSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('setup', (userData) => {
      socket.join(userData.id);
      socket.emit('connected');
    });

    socket.on('join room', (room) => {
      socket.join(room);
    });

    socket.on('typing', (room) => {
      socket.in(room).emit('typing');
    });

    socket.on('stop typing', (room) => {
      socket.in(room).emit('stop typing');
    });

    socket.on('new message', (newMessageRecieve) => {
      const chat = newMessageRecieve.chatId;
      if (!chat.users) {
        console.log('chats.users is not defined');
        return;
      }
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieve.sender._id) return;
        io.to(user._id).emit('message received', newMessageRecieve);
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = setupSocket;
