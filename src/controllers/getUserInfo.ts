import { CacheKeys } from "../Keys"

const getUserInfo = (cache:any, req:any, res:any) => {

    cache.smembers(CacheKeys.users, (err:any, ids:Array<string>) => {
        let userData:any = [];
        for(let i = 0; i < ids.length; i++) {
            userData.push(new Promise((resolve:any, reject:any) => {
                cache.hgetall(CacheKeys.user_info + ids[i], 
                    (errUser:any, fields:any) => {
                        fields.messageCount = parseInt(fields.messageCount);
                        resolve(fields);
                })
            }))
        }
        Promise.all(userData)
        .then(dataItems => {
            res.send({
                users:dataItems
            })
        })
    })
}

export default getUserInfo;