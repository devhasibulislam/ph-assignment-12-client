import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import CustomLink from '../../components/CustomLink';
import auth from '../../firebase.init';
import Loading from '../../shared/Loading';
import Title from '../../shared/Title';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);

    const url = `https://manufacturer-website-mw-server.onrender.com/user/${user?.email}`
    const { data: findAdmin, isLoading } = useQuery('findAdmin', () => fetch(url).then(res => res.json()));

    if (loading || isLoading) {
        return <Loading />
    }

    return (
        <div className="drawer drawer-mobile">
            <Title title={'Dashboard'} />
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
                    {
                        findAdmin?.role !== "admin"
                        &&
                        <>
                            <li><CustomLink to="/dashboard/myOrder">My Orders</CustomLink></li>
                            <li><CustomLink to="/dashboard/addingReview">Adding Review</CustomLink></li>
                        </>
                    }
                    {
                        findAdmin?.role === "admin"
                        &&
                        <>
                            <li><CustomLink to="/dashboard/addProduct">Adding Product</CustomLink></li>
                            <li><CustomLink to="/dashboard/makeAdmin">Make Admin</CustomLink></li>
                            <li><CustomLink to="/dashboard/manageOrders">Manage Orders</CustomLink></li>
                            <li><CustomLink to="/dashboard/manageProducts">Manage Products</CustomLink></li>
                        </>
                    }
                    <li><CustomLink to="/dashboard/myProfile">My Profile</CustomLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
