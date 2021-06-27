export const CacheKeys = {

    users: 'redis_demo:users', // Unordered set of user id's
    user_info: 'redis_demo:user:', // Hashmap of user info keyed by id
    feed: 'redis_demo:feed', // Ordered list of messages
    message_count: 'redis_demo:msg_count', // Total number of messages sent

}

export const BrokerKeys = {

    add_message: 'redis_demo:add_message', // Add a message to the feed
    emit_message: 'redis_demo:emit_message', // Emit a message to the client

}