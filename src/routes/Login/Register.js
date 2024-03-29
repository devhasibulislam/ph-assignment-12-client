import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../../shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import useToken from '../../hooks/useToken';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [
        signInWithGoogle,
        userG,
        loadingG,
        errorG
    ] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        userEP,
        loadingEP,
        errorEP,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [
        updateProfile,
        updating,
        errorUP
    ] = useUpdateProfile(auth);

    const [token] = useToken(userG);

    const navigate = useNavigate();

    if (loadingEP || updating || loadingG) {
        return <Loading />
    }

    if (userEP || userG) {
        console.log(userEP || userG);
        navigate('/home');
    }

    const imageStorageKey = '104449008997c085d936fea4a24f3297';

    const onSubmit = async (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        // stroe in imgbb db
        const urlImg = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        const postAvatar = async () => {
            const request = await fetch(urlImg, {
                method: "POST",
                body: formData
            });
            const response = await request.json();
            if (response?.success) {
                const name = data?.name;
                const email = data?.email;
                const password = data?.password;
                const avatar = response?.data?.url;

                const currentUser = {
                    name: name,
                    email: email,
                    avatar: avatar
                };

                // store in our db
                const urlUsr = `https://manufacturer-website-mw-server.onrender.com/userAdd/${email}`;
                const postUser = async () => {
                    const request = await fetch(urlUsr, {
                        method: "PUT",
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(currentUser)
                    });
                    const response = await request.json();
                    // console.log(response);
                    if (response?.result?.acknowledged) {
                        // sign in with email and password
                        await createUserWithEmailAndPassword(email, password);
                        await updateProfile({ displayName: name, photoURL: avatar });
                        const accessToken = response?.token;
                        localStorage.setItem('accessToken', accessToken);
                        toast.success(`register for ${name} done!`);
                    }
                }; postUser();
            }
        }; postAvatar();
    };

    // sign in with google
    const handleSignInWithGoogle = async () => {
        await signInWithGoogle();
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-1/2 w-full">
            <h1 className='text-3xl text-center text-green-600'>Registration</h1>
            {(errorEP || errorUP || errorG) && <>
                <div className="alert alert-error shadow-lg my-4 w-1/2 mx-auto">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{errorEP?.message || errorUP?.message || errorG?.message}</span>
                    </div>
                </div>
            </>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    {/* segment for name */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is Required'
                                },
                                pattern: {
                                    value: /^[a-z ,.'-]+$/i,
                                    message: 'Provide a valid Name'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            {errors.name?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>

                    {/* segment for email */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    {/* segment for password */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>

                    {/* segment for avatar */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Avatar</span>
                        </label>
                        <input
                            type="file"
                            className="w-full max-w-xs border-r border rounded py-2 px-3"
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Image is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                        </label>
                    </div>

                    <div className='mb-4'>
                        <Link className='text-green-600 hover:underline' to={'/login'}>Already have an account?</Link>
                    </div>

                    <input className='btn w-full max-w-xs text-white hover:bg-white hover:text-black' type="submit" value="Register" />
                </div>
            </form>
            <div className="divider w-1/2 mx-auto">OR</div>
            <button
                className="
                    btn 
                    btn-block 
                    bg-white
                    text-black
                    hover:text-white
                    border
                    border-neutral
                    hover:border-neutral
                    hover:bg-neutral
                    lg:w-1/4
                    w-fll 
                    mx-auto 
                    rounded-lg
                    flex
                "
                type="submit"
                onClick={handleSignInWithGoogle}
            >
                <i className="fa fa-google mr-2" aria-hidden="true"></i>
            </button>
        </div>
    );
};

export default Register;
