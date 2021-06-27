import { IMessage } from "../interfaces/IMessage";
import { BrokerKeys, CacheKeys } from "../Keys";

const addMessage = (cache:any, data:string) => {

    cache.lpush(CacheKeys.feed, data, () => {
        cache.ltrim(CacheKeys.feed, 0, 9);
    });

    const message:IMessage = JSON.parse(data);
    cache.hincrby(CacheKeys.user_info + message.userid, 'messageCount', 1);
    cache.incr(CacheKeys.message_count);

    cache.publish(BrokerKeys.emit_message, data);
    
}

export default addMessage;