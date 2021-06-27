const express = require("express");
const bodyParser = require("body-parser");

const redis = require("redis");
const client = redis.createClient();
const broker = redis.createClient();

const app = express();
const server = require('http').createServer(app);

const _PORT = 3002;

import { handleConnection } from './socket';
import initCache from './initCache';

import { BrokerKeys } from './Keys';
import getUserInfo from './controllers/getUserInfo';
import getMessageCount from './controllers/getMessageCount';
import getFeed from './controllers/getFeed';

const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('trust proxy', 1);

io.on('connection', handleConnection);

app.all("/*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

app.get('/api/getFeed', (req, res) => {
    getFeed(client, req, res);
});

app.get('/api/getUsers', (req, res) => {
    getUserInfo(client, req, res);
});

app.get('/api/getMessageTotal', (req, res) => {
    getMessageCount(client, req, res);
});

app.post('/api/sendMessage', (req, res) => {
    let serializedMessage = JSON.stringify(req.body);
    client.publish(BrokerKeys.add_message, serializedMessage);
    res.end();
});

initCache(client);

server.listen(_PORT, () => {
    console.log(`Listening at port ${_PORT}...`);
});

broker.subscribe(BrokerKeys.emit_message)
broker.on("message", (channel:string, message:string) => {
    switch(channel) {
        case BrokerKeys.emit_message:
            io.emit('feedUpdate', JSON.parse(message));
            break;
        default: 
            break;
    }
});
