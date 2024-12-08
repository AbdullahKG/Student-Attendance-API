const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Device connected: ${socket.id}`);

    // Handle device disconnection
    socket.on('disconnect', () => {
      console.log(`Device disconnected: ${socket.id}`);
    });
  });
};

// Function to send Card ID to a specific device
const sendCardIDToDevice = (cardID) => {
  if (cardID === 'Place your card...') {
    return;
  } else if (cardID) {
    io.emit('cardID', cardID);
    console.log(`Card ID : ${cardID} sent successfuly`);
  } else {
    console.error(`error while sending`);
  }
};

module.exports = {
  initializeSocket,
  sendCardIDToDevice,
};
