# High Traffic Url-Shortener Site

## Functional requirements
- Map short URLs to original URLs. The service should redirect to the original URL. 
- Keep the short URL as short as possible. 
- Users should be able to customize the - URL but with a limit of 14 chars.
- URL lasts a lifetime. They can never be deleted upon creation.

## Non-functional requirements:
- Service should never experience downtime. 
- Service should be able to handle peak traffic.

## Back of the envelope calculations:
### **Provided info**: 

Expectation of about 100 million new URLs to be shortened per month. 

<br>

### **Traffic**:

**Write operations**: 

100 million / 24 / 3600 = 1160 per second. 

**Read operations (Assuming a ratio of 10:1)**: 

1160 * 10 = 11.600 per second. 

**Storage (Over 10 years assuming the average URL length is 100)**: 

100 million * 365 * 10 = 36.5 TB. 

**Cache memory if any (Using the Pareto Principle - 80:20 rule)**: 

~13.000 requests * 86400 seconds in a day = ~1.200 million

To cache 20%: 0.2 * 1.200 million * 100 bytes = ~22,5 GB memory in a day

# The Solution
Since we have inherited the code the processes the URL shortening (assumed to be the backend) backend considerations are low priority for the moment. First priority is therefore the database solution.

For this solution I would suggest using two databases - a write/cache database and a read database. 

The URL shortening process is not time critical, so batch-processing can be performed.

Redirections between shortened URLs and the mapped URL is time critical and should be real-time.

### Read Database

The read database should be one optimised for read operations and should have ease of horizontal scaling so new nodes/clusters can be spun up on demand. The database should be configured to not allow UPDATE or DELETE queries since perpetual persistance is critical.

I will recommend Elastic Search or Redis for READ operations

### Write Database

Sharding is less important (but might be nice to have) since the shortening process is not time critical.

Apache Cassandra is easy to scale horizontally but also works fine in a single-node setup. 

## The Rest of the System

### Backend
The backend should consist of three microservices

- One that handles the URL-shorting process and loads them into our write database.
    - From our back of the envelope calculations we can keep a minumum number of nodes running at all times, but load balancing and automatic scaling might be worth considering.
- One that removes items from the Write database in fixed-size batches and saves them in the Read database. This happens on a schedule - every few seconds or minutes.
    - From our back of the envelope calculations we can keep a fixed number of nodes running at all times.
- One that handles requests made to shortened URLs and redirects to the real URL.
    - Needs automatic horizontal scaling behind a load balancer to handle peak traffic
    - A very performant backend language should be used. Recommendations are C, C++ and Rust.

### Frontend
The frontend consists of a single service where users can request URL shortening.

From our back of the envelope calculations we can estimate a fixed or minumum number of instances to be running behind a load balancer at all times.


