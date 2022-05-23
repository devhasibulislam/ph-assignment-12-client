import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [validateQTY, setValidateQTY] = useState(0);
    const [visibleBtn, setVisibleBtn] = useState(true);

    const smallDevice = 'h-screen grid grid-cols-1 justify-center items-center';
    const largeDevice = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2'

    const { data: product } = useQuery('product', () => fetch(`http://localhost:5000/product/${id}`).then(res => res.json()))

    const checkValidQTY = (event) => {
        event.preventDefault();

        const qty = event.target.value;

        if (qty === '') {
            toast.warning('please enter a valid value');
        } else if (qty < product[0]?.toolOrderQuantity) {
            toast.error('won\'t allow less than given');
        } else if (qty > product[0].toolAvailableQuantity) {
            toast.error('exceed availability');
        } else {
            toast.success('thanks for entering the correct value');
            setValidateQTY(parseInt(qty));
            setVisibleBtn(false);
        }
    };

    const handlePurchaseOrder = ({ prod }, event) => {
        event.preventDefault();

        const { toolName, toolImage, toolDescription, toolOrderQuantity, toolAvailableQuantity, toolPrice } = prod;

        const totalPrize = toolPrice * validateQTY;
        const userProduct = {
            userName: user?.displayName,
            userEmail: user?.email,
            toolName,
            toolImage,
            toolDescription,
            toolOrderQuantity,
            toolAvailableQuantity,
            toolPrice,
            quantity: validateQTY,
            totalPrize
        };

        const postUserOrder = async () => {
            const url = `http://localhost:5000/userOrder`;
            const { data } = await axios.post(url, userProduct);
            if (data?.acknowledged) {
                toast.success('Purchase order done!');
            }
        };
        postUserOrder();

        // console.log(userProduct);
        event.target.reset();
    };

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 w-full bg-base-200 p-8 rounded-3xl lg:mt-0 md:mt-0 mt-16'>
            <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Product Description</span></h1>
            {
                product?.map(prod => <div
                    key={prod?._id}
                    className="card lg:card-side bg-base-100 shadow-xl"
                >
                    <figure><img src={prod?.toolImage} alt="product_image" className='w-40' /></figure>
                    <div className="card-body">
                        <span className='bg-secondary w-fit text-white px-4 rounded-xl'><i className="fa fa-lightbulb-o mr-2" aria-hidden="true"></i>{prod?._id}</span>
                        <h2 className="card-title">{prod?.toolName}</h2>
                        <p>{prod?.toolDescription}</p>
                        <div className='flex items-center'>
                            <div className='mr-4'>
                                <i className="fa fa-cart-plus mr-1" aria-hidden="true"></i>
                                <span className='text-secondary text-2xl'>{prod?.toolOrderQuantity}</span>
                            </div>
                        </div>
                        <p><i className="fa fa-cart-arrow-down mr-1" aria-hidden="true"></i><span className='text-2xl text-secondary'>{prod?.toolAvailableQuantity}</span></p>
                        <p className='flex flex-row items-baseline'><i className="fa fa-usd mr-1" aria-hidden="true"></i><span className='text-2xl text-primary'>{prod?.toolPrice}</span>(for each)</p>
                        <hr className='mb-2' />
                        <form onSubmit={(event) => handlePurchaseOrder({ prod }, event)}>
                            <div className="form-control">
                                <label className="input-group input-group-sm">
                                    <span>
                                        <i className="fa fa-cart-plus mr-1" aria-hidden="true"></i>
                                    </span>
                                    <input
                                        type="number"
                                        placeholder={`least order ${prod?.toolOrderQuantity}`}
                                        className="input input-bordered input-sm"
                                        onBlur={checkValidQTY}
                                    />
                                </label>
                            </div>
                            <input type="submit" value="Purchase Order" className="btn btn-primary btn-sm mt-4" disabled={visibleBtn} />
                        </form>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Purchase;
