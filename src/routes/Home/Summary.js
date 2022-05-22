import React from 'react';
import useHammerPhotos from '../../hooks/useHammerPhotos';

const Summary = () => {
    const [hammerPhotos] = useHammerPhotos();

    return (
        <div className='lg:py-20 py-10 bg-black'>
            <h1 className='flex items-baseline justify-center my-5 text-white'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Business Summary</span></h1>
            <div className="mockup-window border bg-base-300 container mx-auto">
                <div className="flex lg:flex-row flex-col justify-center items-center lg:p-16 p-8 bg-base-200">
                    <article className=' bg-black text-white p-4 mr-4 rounded-lg text-justify lg:w-1/2 w-full lg:ml-0 ml-auto'>
                        Hammer is creating space for consumer audio products and fitness bands that are not only technologically advanced but also fashion forward. This brand Hammer founded by the <span className='font-bold'>Hasibul Islam</span> , January 2019. Hammer manufactures consumer audio products and fitness bands that are not only technologically advanced but also known for its Athleisurelook. Hammer believes in style and makes sure to deliver the best in quality and technologically advanced products for the Indian audience. Hammer products are stylish as well as high in performance, comfortable and durable, to suit the preference of all. Hammer’s product portfolio is a mix of audio accessories and wearables accessories. With truly wireless earphones (TWS) our main product category. Products have been designed to fulfil athleisure tastes which appeal to both fitness and fashion-conscious youth. This complete summary of the ideas from Michael Hammer's book "The Agenda" shows that consumers are now in the driving seat of the economy, and every successful business will assimilate this fact and act accordingly. In his book, the author explores nine critical items that should be on every manager’s agenda: they cover specific actions companies should do to differentiate themselves, effective organisation techniques, the best ways to relate to customers and how to use the internet as a successful harnessing tool. This summary is a must-read for every manager who wants to ensure their company has the most effective and profitable relationship with consumers.
                    </article>
                    <div className='lg:w-1/4 w-full'>
                        <div className="h-96 carousel carousel-vertical rounded-box">
                            {
                                hammerPhotos.map(hammerPhoto => <div
                                    key={hammerPhoto._id}
                                    className="carousel-item h-full my-2"
                                >
                                    <img src={hammerPhoto?.toolImage} alt='business-summary' className='object-cover object-left-top' />
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
