const socket = io()

socket.emit('showroomslist', {});
    socket.on('rooms', (rooms) => {
       const template = document.getElementById('room-template').innerHTML
       const render = Mustache.render(template, {rooms});
        document.getElementById('left1').innerHTML = render;
    })

const emitFunction = () => {
    socket.emit('showroomslist', {})
    socket.on('rooms', (rooms) => {
        const template = document.getElementById('room-template').innerHTML   
        const render = Mustache.render(template, {rooms});
        document.getElementById('left1').innerHTML = render;
    })
}    