import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PurchaseCard from '../../../components/PurchaseCard';
import Spinner from '../../../shared/Spinner';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const url = `https://manufacturer-website-mw-server.onrender.com/allproducts`;
            const { data } = await axios.get(url);
            setProducts(data);
            console.log(data);
            setSpinner(false);
        };
        getProducts();
    }, []);
    return (
        <div className='container mx-auto'>
            <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Product tools</span></h1>
            {
                spinner && <Spinner />
            }
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {
                    products?.map(product => <PurchaseCard
                        key={product?._id}
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default AllProducts;