import React from 'react';
import ReviewCard from '../../components/ReviewCard';
import useReviews from '../../hooks/useReviews';
import Footer from '../../shared/Footer';

const AllReview = () => {
    const [reviews] = useReviews();
    return (
        <div>
            {/* review cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 container mx-auto gap-4 my-12'>
                {
                    reviews?.map(review => <ReviewCard
                        key={review?._id}
                        review={review}
                    />)
                }
            </div>
            <Footer />
        </div>
    );
};

export default AllReview;