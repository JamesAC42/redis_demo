import { CacheKeys } from "./Keys";
import { IUser } from './interfaces/IUser';

const initCache = (cache:any) => {

    cache.get(CacheKeys.message_count, (err:any, result:any) => {
        if(result === null) {
            cache.set(CacheKeys.message_count, "0");
        }
    });

    cache.smembers(CacheKeys.users, (err:any, result:any) => {
        if(result.length === 0) {
            const users = [1,2,3];
            cache.sadd(CacheKeys.users, ...users);
            users.forEach(user => {
                let newUser:IUser = {
                    id:user,
                    name: 'User ' + user,
                    messageCount: 0
                };
                let fields = [];
                Object.keys(newUser).forEach(f => {
                    fields = fields.concat([f, newUser[f]]);
                });
                cache.hmset(CacheKeys.user_info + user, fields);
            });
        }
    })

}

export default initCache;