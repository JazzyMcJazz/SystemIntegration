import redis from 'redis';
import 'dotenv/config'

const client = redis.createClient({
    url: process.env.REDIS_URL
});



client.on('error', (error) => {
    console.error(error);
});

client.on('connect', () => {
    console.log('Connected to Redis');
})

await client.connect();

const setResult = await client.set("myKey", "myValue", redis.print);
const getResult = await client.get("myKey", redis.print);

console.log('SET result:', setResult);
console.log('GET result:', getResult);

await client.del("myKey");
await client.quit();