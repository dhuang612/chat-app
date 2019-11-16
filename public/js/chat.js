const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

// socket.on('countUpdated', (count) => {
//     console.log('the count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked')
//     socket.emit('increment')
// })

// socket.on('message', (sendMessage) => {
//     console.log(sendMessage)
//     socket.emit('message', sendMessage)
// })


document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
   socket.emit('sendMessage', message)
})




