import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useReviews from '../../hooks/useReviews';

const Reviews = () => {
    const [user] = useAuthState(auth);
    const [reviews] = useReviews();
    return (
        <div className='text-center lg:py-20 py-10 bg-base-200'>
            <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Reviews of products</span></h1>
            <div class="stats shadow">

                <div class="stat">
                    <div class="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div class="stat-title">Total Likes</div>
                    <div class="stat-value text-primary">25.6K</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div class="stat-title">Page Views</div>
                    <div class="stat-value text-secondary">2.6M</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <div class="avatar online">
                            <div class="w-16 rounded-full">
                                <img src={user?.photoURL} alt='user-avatar' />
                            </div>
                        </div>
                    </div>
                    <div class="stat-value">86%</div>
                    <div class="stat-title">Tasks done</div>
                    <div class="stat-desc text-secondary">31 tasks remaining</div>
                    <div class="stat-desc text-primary">Nice job <span className='font-bold'>{user?.displayName}</span></div>
                </div>
            </div>
            {/* review cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 container mx-auto gap-4 mt-12'>
                {
                    reviews.map(review => <div
                        key={review._id}
                        class="card bg-base-100 shadow-xl"
                    >
                        <figure class="px-10 pt-10">
                            <img src={review?.reviewerAvatar} alt="reviewer" class="rounded-xl h-[426px] object-cover object-top" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">{review?.reviewerName}</h2>
                            <p>{review?.reviewerSpeech}</p>
                            <div class="rating">
                                <input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
                                <input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
                                <input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
                                <input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
                                <input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Reviews;