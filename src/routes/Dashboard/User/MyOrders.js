import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../../shared/Loading';
import Title from '../../../shared/Title';
import OrderCancellation from './OrderCancellation';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [cancelOrder, setCancelOrder] = useState(null);
    const { data: userOrders, isLoading, refetch } = useQuery("userOrders", () => fetch(`https://dashboard.heroku.com/apps/mighty-taiga-34747/userOrders?email=${user?.email}`).then(res => res.json()));
    const navigate = useNavigate();

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Title title={"My Order"} />
            <div className="overflow-x-auto">
                {
                    userOrders?.length === 0
                        ?
                        <div className="alert shadow-lg container mx-auto">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <div>
                                    <h3 className="font-bold">No order created by you!</h3>
                                    <div className="text-xs">Click on  button right to add order</div>
                                </div>
                            </div>
                            <div className="flex-none">
                                <button
                                    className="btn btn-sm"
                                    onClick={() => navigate('/allProducts')}
                                >Add</button>
                            </div>
                        </div>
                        :
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Email</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Total Prize</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userOrders?.map((userOrder, index) => <tr
                                        key={userOrder?._id}
                                        className="hover">
                                        <th>{index + 1}</th>
                                        <td>{userOrder?.userEmail}</td>
                                        <td>{userOrder?.toolName}</td>
                                        <td> {userOrder?.quantity}</td>
                                        <td><span className='mr-1'>$</span>{userOrder?.totalPrize}</td>
                                        <td>
                                            {
                                                !userOrder?.paid
                                                &&
                                                <label
                                                    htmlFor="order-cancellation"
                                                    className='btn btn-sm btn-outline btn-error mr-1'
                                                    onClick={() => setCancelOrder(userOrder)}
                                                >Cancel</label>
                                            }
                                            {
                                                (userOrder?.totalPrize && !userOrder?.paid)
                                                    ?
                                                    <button className='btn btn-sm btn-outline btn-success ml-1'
                                                        onClick={() => navigate(`/dashboard/payment/${userOrder?._id}`)}
                                                    >Payment</button>
                                                    :
                                                    <span className='text-success ml-4' title='wait for admins confirmation'>Paid</span>
                                            }
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                }
            </div>
            {
                cancelOrder && <OrderCancellation
                    key={cancelOrder?._id}
                    cancelOrder={cancelOrder}
                    setCancelOrder={setCancelOrder}
                    refetch={refetch}
                />
            }
        </div>
    );
};

export default MyOrders;