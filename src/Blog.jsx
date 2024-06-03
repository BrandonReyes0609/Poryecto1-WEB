import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('https://proyecto1-web.herokuapp.com/api/blog'); // Reemplaza con tu URL de Heroku
                setPosts(res.data);
            } catch (err) {
                console.error('There was an error fetching the blogs!', err);
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
