// This is the main file that the server will run from.


// "Require" Express.js
const express = require("express");

// Filename paths
const path = require("path");

// fs is to read and write to files
const fs = require("fs");

// "Instantiate" server
const app = express();

// Define port:
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



// index route that returns 'index.html'
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// notes route that returns "notes.html"
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Make server "listen"
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// Worked with remote TA on the following:

// "Writes" and saves the notes
app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data);
        const newDB = [];

        db.push(req.body);

        for (let i = 0; i < db.length; i++)
        {
            const newNote = {
                title: db[i].title,
                text: db[i].text,
                id: i
            };

            newDB.push(newNote);
        }

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newDB, null, 2), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
});

// Deletes note
app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data);
        const newDB = [];

        for(let i = 0; i < db.length; i++)
        {
            if (i !== id)
            {
                const newNote = {
                    title: db[i].title,

                    text: db[i].text,
                    id: newDB.length
                };

                newDB.push(newNote);
            }
        }

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newDB, null, 2), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
});


app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});

