import React from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseCard = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div
            className="card card-side bg-base-100 shadow-xl"
        >
            <figure className=''><img src={product?.toolImage} alt="Hammer" className='w-40 max-w-full object-cover h-40 object-left-top' /></figure>
            <div className="card-body">
                <h2 className="card-title">{product?.toolName}</h2>
                <p className='text-gray-400'>{product?.toolDescription}</p>
                <p><i className="fa fa-cart-plus mr-1" aria-hidden="true"></i><span className='text-secondary text-2xl'>{product?.toolOrderQuantity}</span> (amount can be ordered at least)</p>
                <p><i className="fa fa-cart-arrow-down mr-1" aria-hidden="true"></i><span className='text-2xl text-secondary'>{product?.toolAvailableQuantity}</span> <span className='text-green-600'>(Available)</span></p>
                <p className='flex flex-row items-baseline'><i className="fa fa-usd mr-1" aria-hidden="true"></i><span className='text-2xl text-primary'>{product?.toolPrice}</span></p>
                <div className="card-actions justify-start">
                    <button className="btn hover:btn-primary" disabled={!(product?.toolOrderQuantity <= product?.toolAvailableQuantity)} onClick={() => navigate(`/purchase/${product?._id}`)}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseCard;