const redis = require("redis");
const express = require("express");
const client = redis.createClient();

const app = express();
const server = require('http').createServer(app);

import { handleConnection } from './socket';

const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

app.set('trust proxy', 1);
io.on('connection', handleConnection);

app.get('/api/getTick', (req, res) => {
});

server.listen(3002, () => {
    console.log("Listening at port 3002...");
});

