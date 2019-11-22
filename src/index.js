const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
//pass the server to web socket
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname , '../public/');

app.use(express.static(publicDirectoryPath));


io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'A new user has joined!')
   
    //receiving message from client to send out to all users
    socket.on('sendMessage', (message , callback) => {
        //checks if there is profanity if there is dont send to everyone
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
        io.emit('message', message);
        callback()
    })

    socket.on("sendLocation", (userLocation, callback)=>{
        io.emit("locationMessage", `https://google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
