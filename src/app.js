const express = require('express');
const {Server} = require('socket.io')

const app = express();
const PORT = process.env.PORT||8080;

let log = [];

const server = app.listen(PORT, () => console.log((`Listening on PORT ${PORT}`)));
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.broadcast.emit('newUser');
    socket.on('message', (data) => {
        log.push(data);
        io.emit('log',log);
    })
    socket.on('registered', (data) =>{
        socket.emit('log',log);
        console.log(data.user);
    })
})

