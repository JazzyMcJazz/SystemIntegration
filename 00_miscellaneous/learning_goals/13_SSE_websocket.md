| WebSockets                  | EventSource     |
|-----------------------------|-----------|
| Bi-directional              | One-directiona |
| Binary and UTF-8            | UTF-8  |
| Uses the WebSocket Protocol | Plain HTTP  |

<br> 

## Server Sent Events

**Pros**
- only transmits UTF-8
- Doesn't scale (limited number of connections)

**Cons**
- Uses HTTP (no special protocol)
- Low latency (compared to other HTTP-based streams)
- Doesn't cause unnecessary server load
- Built-in reconnect
- Creates unique event IDs
