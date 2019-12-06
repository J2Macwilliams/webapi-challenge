const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

// endpoints---------------------------------------------------
server.get('/', (req, res) => {
    res.send(`<h2>Don't Worry! Create an API! </h2>`);
});

module.exports = server;