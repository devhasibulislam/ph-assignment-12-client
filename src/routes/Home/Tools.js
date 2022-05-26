import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PurchaseCard from '../../components/PurchaseCard';
import Spinner from '../../shared/Spinner';

const Tools = () => {
    const [spinner, setSpinner] = useState(true);

    const [totalProductCount, setTotalProductCount] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://dashboard.heroku.com/apps/mighty-taiga-34747/products?pageNumber=${activePage}`)
            .then(res => {
                setProducts(res?.data);
                setSpinner(false);
            })
    }, [activePage]);

    useEffect(() => {
        axios.get('https://dashboard.heroku.com/apps/mighty-taiga-34747/productCount')
            .then(res => {
                const overallNumbers = res?.data?.count;
                const defaultCount = Math.ceil(overallNumbers / 3);
                setTotalProductCount(defaultCount);
            })
    }, []);

    return (
        <div className='lg:py-20 py-10 bg-base-200'>
            <div className='container mx-auto'>
                <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Product tools</span></h1>
                {
                    spinner && <Spinner />
                }
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                    {
                        products?.map(product => <PurchaseCard
                            key={product?._id}
                            product={product}
                        />)
                    }
                </div>

                <div className="py-2">
                    <nav className="block">
                        <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
                            {
                                [...Array(totalProductCount).keys()]
                                    .map(
                                        productsPageNumber => <li
                                            key={productsPageNumber}
                                        >
                                            <span className={
                                                productsPageNumber === activePage
                                                    ?
                                                    "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 text-white bg-pink-500 cursor-pointer"
                                                    :
                                                    "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500 cursor-pointer hover:scale-110 transition-all"
                                            }
                                                onClick={() => setActivePage(productsPageNumber)}
                                            >
                                                {productsPageNumber + 1}
                                            </span>
                                        </li>
                                    )
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Tools;