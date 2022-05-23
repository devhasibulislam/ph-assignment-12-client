import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <div
            className="card bg-base-100 shadow-xl"
        >
            <figure className="px-10 pt-10">
                <img src={review?.reviewerAvatar} alt="reviewer" className="rounded-xl h-[426px] object-cover object-top" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{review?.reviewerName}</h2>
                <p>{review?.reviewerSpeech}</p>
                <div className="rating">
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;