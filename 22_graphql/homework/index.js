import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from '@apollo/server';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import express from 'express';

const app = express();
const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

import { schema } from './resolvers/resolvers.js';
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
    ],
});


await server.start();

app.use('/graphql', express.json(), expressMiddleware(server));

httpServer.listen(3000, () => console.log('Server started on port 3000'));