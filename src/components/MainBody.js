import React from 'react';
import Carousel from './Carousel';
import Introduction from './Introduction';
import Graphics from './Graphics';
import Instructions from './Instructions';
import Footer from './Footer';

const MainBody =()=>{
    return(

            <div className="d-flex flex-column">
                <Carousel />
                <Introduction />
                <Graphics />
                <Instructions />
                <Footer />

            </div>
    )
}
export default MainBody