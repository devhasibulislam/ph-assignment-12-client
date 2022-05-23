import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PurchaseCard from '../../components/PurchaseCard';
import Spinner from '../../shared/Spinner';

const Tools = () => {
    const [spinner, setSpinner] = useState(true);

    const { data: products } = useQuery('products', () => fetch('http://localhost:5000/products').then(res => {
        setSpinner(false);
        return res.json()
    }))

    return (
        <div className='lg:py-20 py-10 bg-base-200'>
            <div className='container mx-auto'>
                <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Product tools</span></h1>
                {
                    spinner && <Spinner />
                }
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                    {
                        products?.slice(0, 3).map(product => <PurchaseCard
                            key={product?._id}
                            product={product}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Tools;