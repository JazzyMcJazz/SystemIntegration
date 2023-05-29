### Client Polling
Client intermiddently opens a new connection to the server, requesting to see the updated data, then closes the connection.

**Cons**:
- Causes unnecessary network traffic which can be expensive
- Responses can be empty because no updates are available - making the request redundant

### Long Polling
- Uses a `keep-alive` header
- Server doesn't close connection until a response has been sent.
- Server sends the response
- Client immediately sends a new request opening a new connection

**Pros**
- Requires no protocol

**Cons**
- Overhead on every new request
- Causes high network traffic when there are many messages (many TCP 3-way handshakes are necessary)