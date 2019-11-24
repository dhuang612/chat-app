const socket = io()

// Elements

    const $messageForm = document.querySelector('#form')
    const $messageFormInput = $messageForm.querySelector('input')
    const $messageFormButton = $messageForm.querySelector('button')
    const $geolocationButton = document.querySelector('#send-location')
    const $messages = document.querySelector('#messages')
   

    // Templates
    const messageTemplate = document.querySelector('#message-template').innerHTML
    const locationURL = document.querySelector('#location-template').innerHTML

// Handles the welcome message
socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format("hh:m:ss a")
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (url) => {
    console.log(url)
    const html = Mustache.render(locationURL, {
        url,
        createdAt: moment(message.createdAt).format("hh:m:ss a")
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

// Setup the form and setup socket to send the message 
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // disable 
    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    //added in a callback
   socket.emit('sendMessage', message, (error) => {
       // enable
       $messageFormButton.removeAttribute('disabled')
       $messageFormInput.value = ''
       $messageForm.focus()
       if(error){
        return console.log(error)
       }
       console.log('message delivered!')
   })
})

$geolocationButton.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    //confirm no error
    $geolocationButton.setAttribute('disabled', 'disabled')
    // geolocation api call
   navigator.geolocation.getCurrentPosition(({coords})=> {
        const userLocation = {latitude:coords.latitude, longitude: coords.longitude }
        socket.emit("sendLocation", userLocation, () =>{
            $geolocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
   })
})
