// This is the main file that the server will run from.
// SHOULD THIS FILE BE SAVED UNDER THE ROOT DIRECTORY?


// Set-up the server to listen for requests: From the Command-line:
// npm init -y
// npm i express


// "Require" Express.js and "Instantiate" server
const express = require('express');

const app = express();


// Make server "listen" - IS THIS "DB" THE RIGHT ROUTE?
app.get('/api/db', (req, res) => {
    res.send('Hello!');
});

app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});


// CREATE A ROUTE THAT THE WEBPAGE CAN REQUEST DATA FROM
const { db } = require();
