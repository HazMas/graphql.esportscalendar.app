const axios = require('axios')
const redis = require('redis')

const client = redis.createClient(
    process.env.REDIS_PORT || 10636,
    process.env.REDIS_HOST || 'redis-10636.c1.us-central1-2.gce.cloud.redislabs.com',
    {
        'auth_pass': process.env.REDIS_KEY || '0dBSgg77WRMpVUqmfYSMXq3Wtz9vfOVc',
        'return_buffers': true
    }
).on('error', (err) => console.error('ERR:REDIS:', err));

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

export const getList = async (game, competition, path, cacheTime = 600) => {
    let list = JSON.parse(await getAsync(`${game},${competition},${path}`))

    if (!list) {
        list = (await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/${path}`)).data
        client.setex(`${game},${competition},${path}`, cacheTime, JSON.stringify(list));
    }

    return list.map(item => {
        return {
            game,
            competition,
            ...item
        }
    })
}

export const getItem = async (game, competition, itemId, path, cacheTime = 600) => {
    let item = JSON.parse(await getAsync(`${game},${competition},${path},${itemId}`))

    if (!item) {
        item = (await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/${path}/${itemId}`)).data
        client.setex(`${game},${competition},${path},${itemId}`, cacheTime, JSON.stringify(item));
    }

    return {
        game,
        competition,
        ...item
    }
}