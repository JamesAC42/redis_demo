import { CacheKeys } from "../Keys"

const getMessageCount = (cache:any, req:any, res:any) => {
    cache.get(CacheKeys.message_count, (err:any, result:string) => {
        res.send({messageCount: JSON.parse(result)});
    })
}

export default getMessageCount;