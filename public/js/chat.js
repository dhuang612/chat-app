const socket = io()

// Handles the welcome message
socket.on('message', (message) => {
    console.log(message)
})

// Setup the form and setup socket to send the message 
document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
   socket.emit('sendMessage', message)
})

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    // geolocation api call
   navigator.geolocation.getCurrentPosition(({coords})=> {
        const userLocation = {latitude:coords.latitude, longitude: coords.longitude }
        socket.emit("sendLocation", userLocation)
   })
})



