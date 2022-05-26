import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../../shared/Loading';
import Title from '../../../shared/Title';

const ManageOrders = () => {
    const { data: manageOrders, isLoading, refetch } = useQuery('manageOrders', () => fetch("https://mighty-taiga-34747.herokuapp.com/userOrders").then(res => res.json()));
    const [disable, setDisable] = useState(false);

    const reduceAvailability = (totalQTY, availableQTY, id) => {
        const qty = {
            toolAvailableQuantity: (parseInt(availableQTY) - parseInt(totalQTY))
        };
        const url = `https://mighty-taiga-34747.herokuapp.com/userOrder/${id}`;
        const updateAvailability = async () => {
            const { data } = await axios.put(url, qty);
            refetch();
            console.log(data);
        };
        updateAvailability();
    };

    const handleUpdateQTY = (availableQTY, id) => {
        const qty = {
            toolAvailableQuantity: availableQTY
        };
        const putUpdateQTY = async () => {
            const url = `https://mighty-taiga-34747.herokuapp.com/product/${id}`;
            const { data } = await axios.put(url, qty);
            toast.success('qty updated!');
            console.log(data);
            setDisable(true);
        };
        putUpdateQTY();
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Title title={'Manage Orders'} />
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
                                        {
                                            userOrder?.paid
                                                ?
                                                userOrder?.approval
                                                    ?
                                                    <button
                                                        className='text-success btn btn-success btn-outline'
                                                        onClick={() => handleUpdateQTY(userOrder?.toolAvailableQuantity, userOrder?.productId)}
                                                        disabled={disable}
                                                    >Click to confirm</button>
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