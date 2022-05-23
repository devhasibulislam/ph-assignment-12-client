import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router-dom';
import CustomLink from '../../components/CustomLink';
import auth from '../../firebase.init';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mt-4 pl-4">
                {/* <!-- Page content here --> */}
                <h1 className='text-4xl mb-4'>Welcome, <span className='text-secondary'>{user?.displayName}</span> to dashboard.</h1>
                <Outlet />
            </div>
            <div className="drawer-side shadow-xl">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><CustomLink to="/dashboard">My Orders</CustomLink></li>
                    <li><CustomLink to="/dashboard/addingReview">Adding Review</CustomLink></li>
                    <li><CustomLink to="/dashboard/addProduct">Adding Product</CustomLink></li>
                    <li><CustomLink to="/dashboard/makeAdmin">Make Admin</CustomLink></li>
                    <li><CustomLink to="/dashboard/manageOrders">Manage Orders</CustomLink></li>
                    <li><CustomLink to="/dashboard/manageProducts">Manage Products</CustomLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
