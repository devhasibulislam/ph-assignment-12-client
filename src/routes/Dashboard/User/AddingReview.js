import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../shared/Loading';

const AddingReview = () => {
    const { data: userOrders, isLoading } = useQuery("addingReview", () => fetch('http://localhost:5000/userOrders').then(res => res.json()));

    const [productName, setProductName] = useState('');

    const handleOrderedProduct = (event) => {
        event.preventDefault();

        console.log(productName);
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <form className="card w-96 bg-base-100 shadow-xl" onSubmit={handleOrderedProduct}>
                <div className="card-body">
                    <div className='mb-4'>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            onClick={event => setProductName(event.target.value)}
                        >
                            <option disabled selected>Choose ordered product</option>
                            {userOrders?.map(userOrder => <option
                                key={userOrder?._id}
                                value={`${userOrder?.toolName}`}
                            >{userOrder?.toolName}</option>)}
                        </select>
                    </div>
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-start">
                        <input type="submit" value="Add review" className='btn btn-primary' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddingReview;
