import React from 'react'
const Carousel = () => (
    <section>
        <div className="container-fluid m-0 p-0">
            <div id="header-carousel" className="w-100 mb-2">
                <div className="header-carousel-overlay d-flex">
                    <div className="container align-self-center">
                        <div className="section-inner d-flex justify-content-center align-items-center">
                            <div className="d-block m-2 align-self-center" id="header-text-container">
                                <div style={{ textAlign: "center" }}><h2>TRAFFIC NOISE BARRIER ESTIMATION TOOL</h2></div>
                                <div className="my-3" style={{ textAlign: "center" }}><p className="lead">Quickly Determines Noise Barrier Requirements</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-block d-md-none">
            <div className="alert alert-warning" role="alert">
                <span>This tool is optimized for web. Please open the tool on a web-browser for better user-experience </span>
            </div>
        </div>
    </section>
);

export default Carousel



// <section>
//         <div className="container-fluid m-0 p-0">
//             <div id="header-carousel" className="w-100 mb-2">
//                 <div className="header-carousel-overlay">
//                 <div className="d-flex align-self-center justify-content-center m-auto w-100 h-100">
//                     <div className="section-inner d-flex align-items-center">
//                         <div className="d-block m-2 align-self-center" id="header-text-container">
//                             <div style={{ textAlign: "center" }}><h2>BARRIER TOOL</h2></div>
//                             <div style={{ textAlign: "center" }}><p>This tool supports municipal planners and developers to quickly identify
//                 the height and placement of barriers, for proposed or expanding transportation projects</p></div>
//                         </div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     </section>




////// Moving carousel
// Carousel Code
// <div>
//         <div id="carouselControl" className="carousel slide" data-ride="carousel">
//             <div className="carousel-inner">
//                 <div className="carousel-item active">
//                     <img src="../CMHC_Header_Img.jpg" className="d-block w-100" alt="..." />
//                 </div>
//                 <div className="carousel-item">
//                     <img src="..." className="d-block w-100" alt="..." />
//                 </div>
//                 <div className="carousel-item">
//                     <img src="..." className="d-block w-100" alt="..." />
//                 </div>
//             </div>
//             <a className="carousel-control-prev" href="#carouselControl" role="button" data-slide="prev">
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="sr-only">Previous</span>
//             </a>
//             <a className="carousel-control-next" href="#carouselControl" role="button" data-slide="next">
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="sr-only">Next</span>
//             </a>
//         </div>
//     </div>