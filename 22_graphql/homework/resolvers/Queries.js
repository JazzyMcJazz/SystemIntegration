import { blogs } from '../data.js';

export const getBlogs = () => ({ errors: [], blogs: blogs });

export const getBlog = (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId);
    if (!blog) {
        return {
            errors: ['Blog not found'],
            blog: null,
        }
    }
    return {
        errors: [],
        blog: blog,
    }
}