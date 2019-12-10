const users = []
const rooms = []

const addUser = ({id, username, room}) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Confirm the data was provided
    if(!username || !room){
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    // Validate username
    if(existingUser){
        return {
            error: 'Username is in use!'
        }
    }

    // Store user if no errors
    const user = {id, username, room}
    const index1 = rooms.findIndex((room) => {
        return room.room === user.room
    })
    if(index1 == -1){
        r = {room:user.room , users: 0};
        rooms.push(r)
    }
    users.push(user)

    const index2 = rooms.findIndex((room)=> {
        return room.room === user.room;
    })
    if(index2 != -1){
        rooms[index2].users=rooms[index2].users+1;
    }
    return {user}
}

const getUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1){
        return users[index]
    }
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    const usersInRoom = users.filter((user) => user.room === room)
    return usersInRoom
}

const getRooms = () => {
    return rooms
}


const removeUser = (id) => {
    const index = users.findIndex((user) =>  user.id === id )
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

addUser({
    id: 22,
    username: 'Brian',
    room: 'NYC'
})

addUser({
    id: 31,
    username: 'Nick',
    room: 'NYC'
})


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getRooms
}