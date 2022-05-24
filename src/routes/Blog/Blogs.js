import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Footer from '../../shared/Footer';
import Blog from './Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get('blogs.json')
            .then(res => setBlogs(res?.data))
    }, []);
    return (
        <div className='mt-20 lg:mb-0 mb-20'>
            <h1 className='text-center text-3xl'>Welcome to my
                <span className='ml-1 text-green-600'>
                    <Typewriter
                        words={['blog']}
                        loop={0}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h1>
            <p className='text-center'>Explore the world in a convenient way</p>
            <div className='container mx-auto grid lg:grid-cols-2 grid-cols-1 lg:px-0 px-4 gap-4 mt-10'>
                {
                    blogs.map((blog, index) => <Blog
                        key={blog?._id}
                        index={index}
                        blog={blog}
                    />)
                }
            </div>

            <div className='mt-8'>
                <Footer />
            </div>
        </div>
    );
};

export default Blogs;