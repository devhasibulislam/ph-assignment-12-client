import React from 'react';
import useCarousels from '../../hooks/useCarousels';

const Banner = () => {
    const [carousels] = useCarousels();
    const prev = [4, 1, 2, 3];
    const next = [2, 3, 4, 1];

    return (
        <div className='bg-black py-8'>
            <h1 className='flex items-baseline justify-center my-5 text-white'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Product Intro</span></h1>
            <div className="carousel w-full container mx-auto rounded-xl">
                {
                    carousels?.map((carousel, index) => <div
                        key={carousel?._id}
                        id={`slide${index + 1}`}
                        className="carousel-item relative w-full"
                    >
                        <img src={carousel?.sliderImage} alt='slider-carousel' className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${prev[index]}`} className="btn btn-circle">❮</a>
                            <a href={`#slide${next[index]}`} className="btn btn-circle">❯</a>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Banner;
