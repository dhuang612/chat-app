const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')


const app = express()
const server = http.createServer(app)
//pass the server to web socket
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname , '../public/');

app.use(express.static(publicDirectoryPath));


io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    
    socket.on('join', ({username, room}, callback)=> {
    // addUser Function returns an error or a user
        const {error, user} = addUser({id: socket.id, username, room })

        if(error){
           return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage( 'Admin',`${user.username} has joined!`))
        // Confirming that the function ran successfully
        callback()
    })

    //receiving message from client to send out to all users
    socket.on('sendMessage', (message , callback) => {
        const user = getUser(socket.id)
        //checks if there is profanity if there is dont send to everyone
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
       
        console.log(user)
        io.to(user.room).emit('message', generateMessage(user.username,message));
        callback()
    })

    socket.on("sendLocation", (coords, callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit("locationMessage", generateLocationMessage( user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left!`))
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
