import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import OrderCancellation from './OrderCancellation';

const MyOrders = () => {
    const [cancelOrder, setCancelOrder] = useState(null);
    const { data: userOrders, refetch } = useQuery("userOrders", () => fetch("http://localhost:5000/userOrders").then(res => res.json()));
    const navigate = useNavigate();

    return (
        <div>
            <div className="overflow-x-auto">
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
                                    <label htmlFor="order-cancellation" className='btn btn-sm btn-outline btn-error mr-1' onClick={() => setCancelOrder(userOrder)}>Cancel</label>
                                    <button className='btn btn-sm btn-outline btn-success ml-1'
                                        onClick={()=> navigate(`/payment/${userOrder?._id}`)}
                                    >Payment</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
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