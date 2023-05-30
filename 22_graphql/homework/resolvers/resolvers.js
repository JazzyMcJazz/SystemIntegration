import fs from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getBlogs, getBlog } from './Queries.js'
import { createUser, createBlog, createToken } from './Mutations.js'
import { reviewBlog } from './Subscriptions.js';

const typeDefs = fs.readFileSync('./schema.graphql').toString('utf-8')

const resolvers = {
    Query: {
        blogs: () => getBlogs(),
        blog: (_, { blogId }) => getBlog(blogId),
    },
    Mutation: {
        createBlog: (_, { title, description }) => createBlog(title, description),
        createUser: (_, { email, password }) => createUser(email, password),
        createToken: (_, { email, password }) => createToken(email, password),
    },
    Subscription: {
        reviewBlog: {
            subscribe: (_, { token }) => reviewBlog(token),
        },
    },    
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })