import React from 'react';

const Footer = () => {
    return (
        <div>
            <section>
                <div id="footer-section" className="w-100 mb-0">
                    <div className="header-carousel-overlay d-flex">
                        <div className="container align-self-center">
                            <div className="d-flex align-items-center">
                                <div className="d-block m-2 align-self-center" id="header-text-container">
                                    <div style={{ textAlign: "center" }}><h2>DON'T JUST MANAGE NOISE CHALLENGES - AVOID THEM ALTOGETHER</h2></div>
                                    <div style={{ textAlign: "center" }}><p className="lead">We’re here to get you the answers you need</p></div>
                                    <div className="d-flex justify-content-center mt-5">
                                        <a 
                                            href="https://www.patchingassociates.com/contact-us/" 
                                            className="btn btn-primary btn-lg active" 
                                            role="button" 
                                            aria-pressed="true"
                                            target="_blank"
                                        >CONTACT US</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer-copyright" className=" d-flex align-items-center w-100 mb-0">
                    <div className="container">
                        <div className="d-flex justify-content-center">
                                Copyright &copy; <span id="currentYear"></span> &nbsp; Patching Associates Acoustical Engineering Ltd.
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Footer