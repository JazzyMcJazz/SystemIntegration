import { blogs, tokens, users } from '../data.js';
import pubsub from './Pubsub.js';

export const createBlog = (title, description) => {
    if (!title || !description) {
        return {
            errors: ['Title and description are required'],
            id: null,
        };
    }

    const blog = {
        id: Math.random() * 1000000 + '',
        title: title,
        description: description,
        completed: false,
        ownerId: "1",
    };
    blogs.push(blog);

    pubsub.publish('REVIEW_BLOG', { reviewBlog: blog });
    return {
        errors: [],
        id: blog.id,
    };
}

export const createUser = (email, password) => {
    if (!email || !password) {
        return {
            errors: ['Email and password are required'],
            id: null,
        };
    }

    const user = {
        id: Math.random() * 1000000 + '',
        email: email,
        password: password,
    };
    users.push(user);
    return {
        errors: [],
        id: user.id,
    };
}

export const createToken = (email, password) => {
    if (!email || !password) {
        return {
            errors: ['Email and password are required'],
            token: null,
        };
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return {
            errors: ['Invalid credentials'],
            token: null,
        };
    }

    const token = Math.random() * 1000000 + '';
    tokens.push(token);
    
    return {
        errors: [],
        token,
    };
}