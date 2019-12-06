const express = require('express');
const cors = require('cors');
const actionRouter = require('../actions/actionsRouter');

const server = express();

server.use(express.json());
server.use(cors());

// endpoints---------------------------------------------------
server.get('/', (req, res) => {
    res.send(`<h2>Don't Worry! Create an API! </h2>`);
});

server.use('/api/actions' , actionRouter)



module.exports = server;