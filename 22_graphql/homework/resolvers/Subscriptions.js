import pubsub from './Pubsub.js';
import { tokens } from '../data.js';

export const reviewBlog = (token) => {
    // if (!token || !tokens.find(t => t === token)) {
    //     return pubsub.asyncIterator([]);
    // }

    return pubsub.asyncIterator(['REVIEW_BLOG']);
}