var app = require('express')();
var http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

const io = require("socket.io")(http, {
    cors: {
        origin: 'https://cointrade.id',
        //origins: [],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["cointrade-app-header"],
    }
});

/*const io = require("socket.io")(http, {
    origins: ["http://localhost", "http://meraihsukses.info", "https://cointrade.id"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "https://example.com",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "cointrade-app-header",
        "Access-Control-Allow-Credentials": true
      });
      res.end();
    }
});*/

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