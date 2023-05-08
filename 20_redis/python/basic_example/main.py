import redis

client = redis.Redis(host='localhost', port=6379, db=0)

client.set("my_key", "my_value")

val = client.get("my_key")

client.setex("my_key", 2, "my_value")

val = client.get("my_key")

print(str(val, "utf-8"))