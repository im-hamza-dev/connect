const { createClient } = require("redis");
const redisClient = new createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    }
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', (res) => console.log('Redis Client Connected', res));


module.exports = { redisClient };
