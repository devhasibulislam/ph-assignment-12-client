import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../../shared/Loading';
import Title from '../../../shared/Title';

const ManageProducts = () => {
    const url = `https://manufacturer-website-mw-server.onrender.com/allProducts`;
    const { data: products, isLoading, refetch } = useQuery('products', () => fetch(url).then(res => res.json()));

    const handleDeleteProduct = (id) => {
        const deleteProduct = async () => {
            const url = `https://manufacturer-website-mw-server.onrender.com/product/${id}`;
            const { data } = await axios.delete(url);
            toast.success('product deleted!');
            refetch();
            console.table(data);
        };
        deleteProduct();
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Title title={'Manage Products'} />
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Least QTY</th>
                        <th>Available QTY</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((product, index) => <tr
                            key={product?._id}
                            className="hover">
                            <th>{index + 1}</th>
                            <td>{product?.toolName}</td>
                            <td>{product?.toolOrderQuantity}</td>
                            <td> {product?.toolAvailableQuantity}</td>
                            <td>
                                <button
                                    className='btn btn-outline btn-sm btn-error'
                                    onClick={() => handleDeleteProduct(product._id)}
                                >Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;
