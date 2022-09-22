import axios from 'axios';
import React from 'react';

const OrderCancellation = ({ cancelOrder, setCancelOrder, refetch }) => {
    const handleOrderCancel = (id) => {
        const deleteUserOrder = async () => {
            const url = `http://localhost:5000/userOrder/${id}`;
            const { data } = await axios.delete(url);
            console.log(data);
            refetch();
            setCancelOrder(null);
        };
        deleteUserOrder();
    };
    return (
        <div>
            <input type="checkbox" id="order-cancellation" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Product <span className='text-primary'>{cancelOrder?.toolName}</span></h3>
                    <p className="py-4">Owner of this order: <span className='text-secondary'>{cancelOrder?.userEmail}</span></p>
                    <p className='text-secondary'>Are you sure want to cancel this order?</p>
                    <div className="modal-action">
                        <label htmlFor="order-cancellation" className="btn btn-sm btn-outline btn-success" onClick={() => handleOrderCancel(cancelOrder?._id)}>Okay</label>
                        <label htmlFor="order-cancellation" className="btn btn-sm btn-outline btn-error">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OrderCancellation;
