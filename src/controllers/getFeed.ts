import { CacheKeys } from "../Keys"

const getFeed = (cache:any, req:any, res:any) => {
    cache.lrange(CacheKeys.feed, 0, -1, (err:any, feed:any) => {
        let parsed = [];
        feed.forEach((i) => {
            parsed.push(JSON.parse(i));
        });
        res.send({feed:parsed})
    });
}

export default getFeed;