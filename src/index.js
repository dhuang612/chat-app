/*
    Goal: create an express web server

    1. initalize npm and install Express
    2. Setup a new Express server
        -Serve up the public directory
        -Listen on port 3000
    3. Create index.html and render Chat App to the screen    
    4. Test your work! start the server and view the page in the browser
*/
const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname , '../public/');

app.use(express.static(publicDirectoryPath));

app.get('/', function(req,res) {
    res.render('index', ({
        title: 'Chat app',
        name: 'Dan Huang'
    }))
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
