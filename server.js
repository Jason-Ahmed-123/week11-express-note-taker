// This is the main file that the server will run from.
// SHOULD THIS FILE BE SAVED UNDER THE ROOT DIRECTORY?


// Set-up the server to listen for requests: From the Command-line:
// npm init -y
// npm i express


// "Require" Express.js
const express = require('express');

// Filename paths
const path = require("path");

// fs is to read and write to files
const fs = require("fs");

// "Instantiate" server
const app = express();

// CREATE A ROUTE THAT THE WEBPAGE CAN REQUEST DATA FROM
const { notes } = require('./notes'); // IS THIS WRONG?


// Make server "listen" - IS THIS "DB" THE RIGHT ROUTE?
app.get('/api/notes', (req, res) => {
    res.send('Hello');
    res.json(notes);
});


app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});
