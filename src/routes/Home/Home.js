import React from 'react';
import Footer from '../../shared/Footer';
import Title from '../../shared/Title';
import Banner from './Banner';
import Reviews from './Reviews';
import Summary from './Summary';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <Title title={'Home'} />
            <Banner />
            <Tools />
            <Summary />
            <Reviews />
            <Footer />
        </div>
    );
};

export default Home;
