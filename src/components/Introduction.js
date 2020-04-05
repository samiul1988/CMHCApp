import React from 'react';

const Introduction = () => {
    return (
        <div>
        <section className="instruction-section mb-0">
        <div className="container">
        <div className="row"> 
            <div className="col">
                <h3>GETTING STARTED</h3>
                <p>The Traffic Noise Barrier Estimation Tool is a free, easy-to-use online tool 
                that assesses noise barrier height and placement for transportation projects within
                 municipalities. The tool provides municipal planners and developers with valuable information
                  to inform project development. </p>
                <p>Here’s what you need to know in order to play with this tool: </p>
                <ul>
                    <li>Posted road speed limit (km/hr)</li>
                    <li>Receiver distance from the middle of the intersection (m)</li>
                    <li>Receiver elevation height from ground (m)</li>
                    <li>Traffic Volume (Average Annual Daily Traffic (AADT))</li>
                    <li>Heavy Truck Percentage</li>
                    <li>Road Gradient</li>
                </ul>
                <p>If you need a quick barrier height calculation, or need to meet a specific dB noise target, enter the information in the Target SPL and Barrier Height boxes in the input table.</p>	
            </div>
            </div>
        </div>
        </section>
        
        </div>
    )
}
export default Introduction

// <div className="d-flex flex-column m-2"> 
//             <div>
//                 <p>The Traffic Noise Barrier Assessment is a free, interactive online tool from Patching Associates
//                  Acoustical Engineering that quickly predicts the placement, height of a noise barrier, to meet 
//                  your noise target. Whether you’re in the planning stages of a transportation project, or in the 
//                  midst of construction, this tool can provide insights for your next steps.</p>
//                 <p>Instructions (coming soon...)</p>
//                 <p className="lead">This tool is developed based on the calculation method outlined in this document: <a href="http://publications.gc.ca/collections/collection_2017/schl-cmhc/NH15-27-1981-eng.pdf">CMHC Road and Rail Noise Assessment</a></p>
//             </div>
//         </div>