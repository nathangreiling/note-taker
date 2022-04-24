const { notes } = require('./db/db')
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/db', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log(`Server now on ${PORT}!`);
});