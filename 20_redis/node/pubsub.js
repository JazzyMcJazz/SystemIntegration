import redis from 'redis';
import 'dotenv/config'

const publisher = redis.createClient({
    url: process.env.REDIS_URL
});

// Duplicate the client to use for subscribing
const subscriber = publisher.duplicate();
subscriber.on('error', (error) => {
    console.error(error);
});

// Connect the clients
console.log('Connecting...');
await publisher.connect();
await subscriber.connect();
console.log('Connected to Redis');

// Listen for messages on the channel
const listener = (message, channel) => console.log(`${channel}:`, message);
subscriber.subscribe('myChannel', listener);
subscriber.subscribe('yourChannel', listener);

let i = 1;
let timer = setInterval(async () => {
    // Disconnect after 5 messages
    if (i > 5) {
        console.log('Disconnecting...');
        await subscriber.quit();
        await publisher.quit();
        console.log('Disconnected from Redis');
        clearInterval(timer);
        return;
    }

    // Publish a message to the channel
    publisher.publish('myChannel', '  Hello  ' + i);
    publisher.publish('yourChannel', 'world! ' + i);

    i++;
}, 1000);