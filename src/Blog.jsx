import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('postgres://u4eksis8dnhmm3:pf3f0c104763c37ac94c02ddbdbed871e9e490199d63681bed928377611aeee74@cdeuajkr4sf66s.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/demlgl5n9857mp');
                setPosts(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>{post.banner}</p>
                    <p>{post.locationu}</p>
                    <p>{post.post_date}</p>
                </div>
            ))}
        </div>
    );
};

export default Blog;
