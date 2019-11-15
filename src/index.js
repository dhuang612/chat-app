const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
//pass the server to web socket
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname , '../public/');

app.use(express.static(publicDirectoryPath));

// server (emit) => client (receive) - countUpdated
// client (emit) => server (receive) - increment
 
let message = "Welcome!";

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    socket.emit('welcome', message)
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++
    //     io.emit('countUpdated', count)
    // })

    socket.on('sendMessage', (message) => {
        console.log(message)
        io.emit('sendMessage', message);
    })
})




server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
