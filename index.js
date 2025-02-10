const http = require("http");
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    console.log('A new user connected');

    socket.on('New message', ({username, message}) => {
        io.emit('message', {username, message});
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })
});

app.use(express.static(path.join(__dirname,"/public")));

app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

