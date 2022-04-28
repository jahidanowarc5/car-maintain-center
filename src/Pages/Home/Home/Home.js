

import React from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Banner from '../Banner/Banner';
import Exparts from '../Exparts/Exparts';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <PageTitle title='home'></PageTitle>
            <Banner></Banner>
            <Services></Services>
            <Exparts></Exparts>
        </div>
    );
};

export default Home;