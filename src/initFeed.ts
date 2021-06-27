const initFeed = (cache:any) => {

    cache.lrange("redis_demo:feed", "0", "-1", (err, result) => {
        console.log(result);
    })

}

export default initFeed;