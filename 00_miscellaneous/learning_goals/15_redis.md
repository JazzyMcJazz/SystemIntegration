### Use cases for Redis
- Caching (using EXPIRE)
- Message Queues with Pub/Sub
- Session cache
- Rate limiting (using counters and EXPIRE)
- Task queues
- Full text search


```shell
# key/value pairs
SET name "bob"
GET name
DEL name

# TTL
EXPIRE name 10
TTL name

# Counters
INCR num #=> 1
DECR num #=> 0
INCRBY num 10 #=> 10
DECRBY num 3 #=> 3

# Lists
RPUSH friends "bob"
LPUSH friends "alice"
LPOP frinds
LLEN friends

```
