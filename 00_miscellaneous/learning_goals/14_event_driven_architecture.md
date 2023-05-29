# Event Driven Architecture

## Definition
A software design paradigm that enables communication between back-end systems

## Problems it can solve
- Scalability
- Flexibility (dynamic number of producers and subscribers)
- Asymmetric availability between service and consumers
- Fail-safe (Guaranteed delivery if non-real-time)

## Goals
- Horizontal scaling
- Loose coupling (producers and consumers are unaware of each other)
- Asynchronous events
- Real-time (if possible/necessary)
- Robust (no single point of failure)

## Synchronous communication
**Brokerless**
- Participants connect directly to producer

**Brokered**
- Participants connect to a central broker 

## Redis Pub/Sub
- Messages from producers are brokered over specific channels and sent to subscribers
- If there are no subscribers the message will be lost as no persistance layer is present

## RabbitMQ Message Brokering
- Messages are stored until a subscriber is ready to receive
- Can be setup for "at-least-once" and "exactly-once" delivery
- More reliable but also slower than Redis

## Apache Kafka
- Supports high throughput
- Supports "at-least-once" delivery
- Can achieve "exactly-once" delivery if producers are idempotent.