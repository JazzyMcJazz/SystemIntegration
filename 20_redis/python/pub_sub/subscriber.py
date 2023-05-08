import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

pub_sub = redis_client.pubsub()
pub_sub.subscribe("my_channel")

for message in pub_sub.listen():
    print(message)

    if message['data'] == b'quit':
        break