import redis from 'redis';

const client = redis.createClient();

client.on('error', (error) => {
    console.error(error);
});

client.on('connect', () => {
    console.log('Connected to Redis');
})

await client.connect();

console.log(await client.set("key", "value", redis.print))
await client.get("key", redis.print);