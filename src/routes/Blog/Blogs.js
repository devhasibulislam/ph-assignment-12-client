import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Blog from './Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get('blogs.json')
            .then(res => setBlogs(res?.data))
    }, []);
    return (
        <div className='container mx-auto grid grid-cols-2 gap-4'>
            {
                    blogs.map((blog, index) => <Blog 
                        key={blog?._id}
                        index={index}
                        blog={blog}
                    />)
                }
        </div>
    );
};

export default Blogs;