import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link, NavLink, useRouteMatch, useParams } from "react-router-dom";
// import Home from './Home';
// import About from './About';
// import UserDashboard from './UserDashboard';
// import "../styles/Navbar.css"

// 0104996000517325

class Header extends React.Component {
    state = {
        ariaExpanded: false
    }
    navBarButtonClicked = () => {
        this.setState({
            ariaExpanded: !this.state.ariaExpanded
        })
    }
    render() {
        return (
            <header>
                <div className="top-header">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex justify-content-center justify-content-md-end align-middle">
                            <div className="right-header p-2">
                                <a href="https://www.patchingassociates.com" target="_blank">
                                    Canada &nbsp;
                                    <img
                                        src="https://www.patchingassociates.com/wp-content/uploads/2018/05/canada-flag-45x30.png"
                                        width="22" height="15" alt="Canadian" 
                                    />
                                </a>
                                &nbsp;&nbsp;|&nbsp;&nbsp; 
                                <a href="https://www.patchingassociates.com.au" target="_blank">
                                    Australia &nbsp;
                                    <img
                                        src="https://www.patchingassociates.com/wp-content/uploads/2018/05/aus-flag-45x30.png"
                                        width="17" height="12" alt="Australia" 
                                        />
                                </a>
                                <div className="social">
                                    <a className="p-1" href="https://twitter.com/paae_acoustics" target="_blank"><i className="fa fa-twitter"></i></a>
                                    <a className="p-1" href="https://www.linkedin.com/company/patching-associates-acoustical-engineering-ltd./" target="_blank"><i className="fa fa-linkedin"></i></a>
                                    <a className="p-1" href="https://www.instagram.com/paae_acoustics/" target="_blank"><i className="fa fa-instagram"></i></a>
                                </div>
                            </div>
                            </div> 
                        </div>
                        
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">

                            <div className="d-flex justify-content-center justify-content-md-between">

                                <div><a className="navbar-brand" href="#">
                                    <img src="../PAAE_logo.JPG" width="262" height="93" className="d-inline-block align-top" alt=""></img>
                                </a>
                                </div>
                                <div className="d-none d-md-block">
                                    <p className="small p-0 m-0 header-text"> <b>Understand and manage your noise impacts.</b></p>
                                    <p className="p-0 m-0 header-text" ><i>Contact Patching Associates to arrange a consultation.</i></p>
                                    <p className=" p-0 m-0 header-text"> <strong>1-866-865-5882</strong></p>
                                    <div className="p-0 m-0 header-text"><a href="mailto:info@patchingassociates.com">info@patchingassociates.com</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        );
    }
}
export default Header


// <div className="d-flex justify-content-center justify-content-sm-end">
//                                         <div className="m-1">
//                                             <a
//                                                 href="https://twitter.com/paae_acoustics"
//                                                 className="url-link item-content-box item-block"
//                                                 id="link-g02gm1p1k7c"
//                                                 data-at="image-link"
//                                                 data-link-g02gm1p1k7c
//                                                 target="_blank"

//                                             >
//                                                 <img
//                                                     className="item-content-box item-block "
//                                                     data-at="image"
//                                                     alt=""
//                                                     src="//v.fastcdn.co/t/74873de2/6e9bcd1c/1573574509-47306040-19x19-icons8-twitter-24.png"
//                                                 />
//                                             </a>
//                                         </div>
//                                         <div className="m-1">
//                                             <a
//                                                 href="https://www.linkedin.com/company/patching-associates-acoustical-engineering-ltd./"
//                                                 className="url-link item-content-box item-block"
//                                                 id="link-fh247dbdie8"
//                                                 data-at="image-link"
//                                                 data-link-fh247dbdie8
//                                                 target="_blank"

//                                             >
//                                                 <img
//                                                     className="item-content-box item-block "
//                                                     data-at="image"
//                                                     alt=""
//                                                     src="//v.fastcdn.co/t/74873de2/6e9bcd1c/1573574510-47306035-19x19-icons8-linkedin-24.png"
//                                                 />
//                                             </a>
//                                         </div>
//                                         <div className="m-1">
//                                             <a href="https://www.instagram.com/paae_acoustics/" className="url-link item-content-box item-block" id="link-xstfa83lar" data-at="image-link" target="_blank">
//                                                 <img
//                                                     className="item-content-box item-block "
//                                                     data-at="image"
//                                                     alt=""
//                                                     src="//v.fastcdn.co/t/74873de2/6e9bcd1c/1573574511-47306030-19x19-icons8-instagram-30.png"
//                                                 />
//                                             </a>
//                                         </div>

//                                     </div>





// <div id="main-header" className="container-fluid m-0 p-0">
//                 <div className="d-flex justify-content-center m-auto w-100 h-100">
//                     <div className="section-inner">
//                         <div className="d-flex justify-content-between">
//                             <div><a className="navbar-brand" href="#">
//                                 <img src="../PAAE_logo.JPG" width="262" height="93" className="d-inline-block align-top" alt=""></img>
//                             </a>
//                             </div>
//                             <div className="d-block">
//                                 <p className="small p-0 m-0" style={{ textAlign: "right" }}> <b>Understand and manage your noise impacts.</b></p>
//                                 <p className="p-0 m-0" style={{ textAlign: "right" }}><i>Contact Patching Associates to arrange a consultation.</i></p>
//                                 <p className=" p-0 m-0" style={{ textAlign: "right" }}> <strong>1-866-865-5882</strong></p>
//                                 <div className="p-0 m-0" style={{ textAlign: "right" }}><a href="mailto:info@patchingassociates.com">info@patchingassociates.com</a></div>
//                                 <div className="d-flex justify-content-end">
//                                     <div className="m-1">
//                                         <a
//                                             href="https://twitter.com/paae_acoustics"
//                                             className="url-link item-content-box item-block"
//                                             id="link-g02gm1p1k7c"
//                                             data-at="image-link"
//                                             data-link-g02gm1p1k7c
//                                             target="_blank"

//                                         >
//                                             <img
//                                                 className="item-content-box item-block "
//                                                 data-at="image"
//                                                 alt=""
//                                                 src="//v.fastcdn.co/t/74873de2/6e9bcd1c/1573574509-47306040-19x19-icons8-twitter-24.png"
//                                             />
//                                         </a>
//                                     </div>
//                                     <div className="m-1">
//                                         <a
//                                             href="https://www.linkedin.com/company/patching-associates-acoustical-engineering-ltd./"
//                                             className="url-link item-content-box item-block"
//                                             id="link-fh247dbdie8"
//                                             data-at="image-link"
//                                             data-link-fh247dbdie8
//                                             target="_blank"

//                                         >
//                                             <img
//                                                 className="item-content-box item-block "
//                                                 data-at="image"
//                                                 alt=""
//                                                 src="//v.fastcdn.co/t/74873de2/6e9bcd1c/1573574510-47306035-19x19-icons8-linkedin-24.png"
//                                             />
//                                         </a>
//                                     </div>
//                                     <div className="m-1">
//                                         <a href="https://www.instagram.com/paae_acoustics/" className="url-link item-content-box item-block" id="link-xstfa83lar" data-at="image-link" target="_blank">
//                                             <img
//                                                 className="item-content-box item-block "
//                                                 data-at="image"
//                                                 alt=""
//                                                 src="//v.fastcdn.co/t/74873de2/6e9bcd1c/1573574511-47306030-19x19-icons8-instagram-30.png"
//                                             />
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>






// <nav className="shadow navbar navbar-expand-lg nav-bar">
                            // <div className="d-flex align-items-center">
                            //     <a className="navbar-brand" href="#">
                            //         <img src="../PAAE_logo.JPG" width="262" height="93" className="d-inline-block align-top" alt=""></img>
                            //         {
                            //             // <div className="float-sm-right ml-sm-2 mt-sm-4">CMHC Barrier Estimation Tool</div>
                            //         }
                            //     </a>
//                                 <button className="navbar-toggler" type="button" data-toggle="collapse"
//                                     data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                                     aria-expanded={this.state.ariaExpanded} aria-label="Toggle navigation" onClick={this.navBarButtonClicked}>
//                                     <span className="navbar-toggler-icon"></span>
//                                 </button>

//                                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                                     <ul className="navbar-nav ml-auto mt-sm-2 ">
//                                         <li className="nav-item ">
//                                             <a className="nav-link" href="https://www.patchingassociates.com/">PAAE Home</a>
//                                         </li>
//                                         <li className="nav-item">
//                                             <a className="nav-link" href="https://www.patchingassociates.com/contact-us/">Contact</a>
//                                         </li>
//                                     </ul>
//                                 </div>


//                             </div>
//                         </nav>





