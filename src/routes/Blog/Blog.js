import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get('services')
            .then(res => console.log(res))
    }, []);
    return (
        <div>
            <h2>This is Blog route</h2>
        </div>
    );
};

export default Blog;