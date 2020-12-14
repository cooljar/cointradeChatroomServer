var app = require('express')();
var http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

const io = require("socket.io")(http, {
    cors: {
        origin: '*',
        //origin: "http://localhost",
        //methods: ["GET", "POST"],
        credentials: true
    }
  });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat_message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat_message', msg);
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});