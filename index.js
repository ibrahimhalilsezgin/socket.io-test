import express from 'express';
import { createServer } from "node:http";
import {Server} from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(import.meta.dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('messageCreate', (message) => {
        console.log({...message})
        socket.broadcast.emit('messageHandle', {...message});
    });
    console.log(socket.id + ' Connected');
});

server.listen(3000);