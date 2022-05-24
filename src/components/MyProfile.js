import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    // console.log(user);
    const navigate = useNavigate();
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-1/2 w-full bg-slate-300'>
            <div className="flex items-center justify-center">
                <div className="bg-white mt-10 rounded-t-lg lg:w-1/2 md:w-1/2 w-full">
                    <div className="flex items-center justify-center pt-10 flex-col">
                        {/* <img src={user?.photoURL} className="rounded-full w-32" alt='avatar' /> */}
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt='avatar' />
                            </div>
                        </div>
                        <h1 className="text-gray-800 font-semibold text-xl mt-5">{user?.displayName}</h1>
                        <h1 className="text-gray-500 text-sm">{user?.email}</h1>
                        <h1 className="text-gray-500 text-sm p-4 text-justify">
                            <span className='bg-black text-white px-1'>Last sign in:</span> {user?.metadata?.lastSignInTime}
                            <br />
                            <span className='bg-black text-white px-1'>Email verified:</span> {user?.emailVerified ? "Yes" : "No"}
                            <br />
                            <span className='bg-black text-white px-1'>User ID:</span> {user?.uid}
                        </h1>
                    </div>
                    <div className="flex justify-center p-4">
                        <div>
                            <button
                                className="text-xs text-green-600 border-2 py-1 px-2 border-green-500"
                                onClick={() => {
                                    navigate('/login');
                                    return signOut(auth)
                                }}
                            >Logout</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProfile;