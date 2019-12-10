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
    const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

    // Options
   const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

   const autoscroll = () => {
        // New message element 
        const $newMessage = $messages.lastElementChild

        // Height of the new message + margin bottom
        const newMessageStyles = getComputedStyle($newMessage)
        const newMessageMargin = parseInt(newMessageStyles.marginBottom)
        const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

        // Visible height (viewport)
        const visibleHeight = $messages.offsetHeight

        // Total height of messages container
        const containerHeight = $messages.scrollHeight

        // How far have I scrolled?
        const scrollOffset = $messages.scrollTop + visibleHeight

        if(containerHeight - newMessageHeight <= scrollOffset){
            // Scroll to the bottom
            $messages.scrollTop = $messages.scrollHeight
        }
   }

// Handles the welcome message
socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format("hh:m:ss a")
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (message) => {
    console.log(message)
    const html = Mustache.render(locationURL, {
        //switched this from url to message.url
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format("hh:m:ss a")
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
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
   navigator.geolocation.getCurrentPosition((position)=> {
       socket.emit("sendLocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
        }, () => {
            $geolocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
      
   })
})

//When a user joins the client side emits a message.
socket.emit('join', {username, room}, (error)=> {
    
})
