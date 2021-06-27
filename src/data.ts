const redis = require("redis");
const client = redis.createClient();
const broker = redis.createClient();

import { BrokerKeys } from './Keys';
import addMessage from './cacheActions/addMessage';

broker.subscribe(BrokerKeys.add_message)

broker.on("message", (channel:string, message:string) => {
    switch(channel) {
        case BrokerKeys.add_message:
            addMessage(client, message);
            break;
        default:
            break;
    }
});