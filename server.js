const express = require('express');
const path = require('path');
const fs = require('fs')
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname + '/db/db.json', 'utf8', (error, data) => {
      if (error) {
        throw error;
      }
      res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    fs.readFile(__dirname + '/db/db.json', 'utf8', (error, note) => {
      if (error) {
        throw error;
      }

      note = JSON.parse(note);
      let incrementId = note[note.length - 1].id + 1;
      let addNotes = { title: req.body.title, text: req.body.text, id: incrementId };
      let currentNotes = note.concat(addNotes);
  
      fs.writeFile(__dirname + '/db/db.json', JSON.stringify(currentNotes), (error, data) => {
        if (error) {
          throw error;
        }
        res.json(currentNotes);
        console.log(data);
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}!`);
});