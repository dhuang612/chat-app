const users = []
const chatroomUsers = []

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
    users.push(user)
    return {user}
}

const getUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1){
        return users[index]
    }
}

const getUsersInRoom = (room) => {
    let i = 0
    room = room.trim().toLowerCase()
    const usersInRoom = users.filter((user) => user.room === room)
    let totalUsers = usersInRoom.length
    while(i < totalUsers){
        chatroomUsers.push(usersInRoom[i].username)
        i++
    }
    return chatroomUsers
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
    id: 34,
    username: 'bowlofrice',
    room: 'NYC'
})

addUser({
    id: 31,
    username: 'Nick',
    room: 'NYC'
})

addUser({
    id: 25,
    username: 'Test user',
    room: 'Cali'
})

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}