import React from 'react';

const Contact =(props)=>{
    setTimeout(()=>{
        props.history.push('/about')
    },2000);
    return(
        <div className="container">
            <h4 className="center">Contact</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, maiores corrupti blanditiis deserunt reiciendis eligendi nemo sint, architecto nostrum distinctio at. Beatae culpa quae fugit deleniti, doloribus reiciendis minima neque?`</p>
        </div>
    )
}
export default Contact