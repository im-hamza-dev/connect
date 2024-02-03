import redis from "redis";

let options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASSWORD,
};

let redisClient = redis.createClient(options);

redisClient.on("error", (error) => {
  console.log("Redis Client Error:", error);
});

export { redisClient };
