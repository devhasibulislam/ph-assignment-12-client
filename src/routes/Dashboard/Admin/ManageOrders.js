import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../shared/Loading';

const ManageOrders = () => {
    const { data: manageOrders, isLoading, refetch } = useQuery('manageOrders', () => fetch("http://localhost:5000/userOrders").then(res => res.json()));

    const reduceAvailability = (totalQTY, availableQTY, id) => {
        // console.log(totalQTY, availableQTY);
        const url = `http://localhost:5000/userOrder/${id}`;
        // const toolAvailableQuantity = parseInt(availableQTY) - parseInt(totalQTY);
        const updateAvailability = async () => {
            const { data } = await axios.put(url, { toolAvailableQuantity: (parseInt(availableQTY) - parseInt(totalQTY)) });
            refetch();
            console.log(data);
        };
        updateAvailability();
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            {
                manageOrders?.length === 0
                    ?
                    <div className="alert alert-warning shadow-lg container mx-auto">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Sorry: No user added their item still now, so you are unable to see orders!</span>
                        </div>
                    </div>
                    :
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Email</th>
                                <th>Product Name</th>
                                <th>Total QTY</th>
                                <th>Total Prize</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                manageOrders?.map((userOrder, index) => <tr
                                    key={userOrder?._id}
                                    className="hover">
                                    <th>{index + 1}</th>
                                    <td>{userOrder?.userEmail}</td>
                                    <td>{userOrder?.toolName}</td>
                                    <td> {userOrder?.quantity}</td>
                                    <td><span className='mr-1'>$</span>{userOrder?.totalPrize}</td>
                                    <td>
                                        {/* {
                                    !userOrder?.paid
                                    &&
                                    <label htmlFor="order-cancellation" className='btn btn-sm btn-outline btn-error mr-1' onClick={() => setCancelOrder(userOrder)}>Cancel</label>
                                }
                                {
                                    (userOrder?.totalPrize && !userOrder?.paid)
                                        ?
                                        <button className='btn btn-sm btn-outline btn-success ml-1'
                                            onClick={() => navigate(`/dashboard/payment/${userOrder?._id}`)}
                                        >Payment</button>
                                        :
                                        <span className='text-success ml-4' title='wait for admins confirmation'>Paid</span>
                                } */}
                                        {
                                            userOrder?.paid
                                                ?
                                                userOrder?.approval
                                                    ?
                                                    <span className='text-success'>TYSM</span>
                                                    :
                                                    <button
                                                        className='btn btn-outline btn-success'
                                                        onClick={() => reduceAvailability(userOrder?.quantity, userOrder?.toolAvailableQuantity, userOrder?._id)}
                                                    >Make Done</button>
                                                :
                                                <span className='text-error font-bold'>Still not paying</span>
                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default ManageOrders;