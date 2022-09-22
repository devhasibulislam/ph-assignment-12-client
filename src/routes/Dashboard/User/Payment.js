import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../../shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L1UJyGRKrLWu7ojISpbxVO8rKxWSJ44p1Yt61p6zV7PaM3G6WRLKhJSY47ZIDJhtZ0yiRSCZlqpf541x4JaYKQ700Iam3gy2f');

const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/userOrder/${id}`;
    const { data: userOrder, isLoading } = useQuery(['userOrder', id], () => fetch(url).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Pay for <span className='text-primary'>{userOrder?.toolName}</span></h2>
                    <p>You are ordering QTY: <span className='text-purple-500 text-xl'>{userOrder?.quantity}</span></p>
                    <p>Total price to pay is: $<span className='text-red-500 text-xl'>{userOrder?.totalPrize}</span></p>
                </div>
                <div className="card-body bg-base-200">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            userOrder={userOrder}
                        />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
