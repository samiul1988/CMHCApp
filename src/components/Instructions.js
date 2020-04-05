import React from 'react';

const Instructions = () => {
    return (
        <div className="py-3">
        <section className="instruction-section">
        <div className="container">
        <div className="row"> 
            <div className="col">
                <h3>INSTRUCTIONS</h3>
                <ul>
                    <li>This graphical tool allows you to change a number of 
                    geometric parameters to match a project scenrio as closely as possible</li>
                    <li>There are several draggable elements in the graph that you can
                    vary to change the relative geometry between the source (road) and 
                    the receiver. </li>
                    <li>Hover over different geometry and input items to see specific 
                    instructions or help text</li>
                    <li>If you are not sure about what value to use for an input field, you
                    can use the default value, which should give a reasonable 
                    approximation.</li>
                    <li>You can toggle the visibility of help texts using 'Show/Hide 
                    Help Tooltips' button</li>
                </ul>
            </div>
            </div>
        </div>
        </section>
        
        <section className="instruction-section">
        <div className="container">
        <div className="row"> 
            <div className="col">
                <h3>WHAT IS A TRAFFIC NOISE BARRIER ESTIMATION TOOL?</h3>
                <p>Designed to be used prior to starting a Noise Impact Assessment (NIA),
                 this tool enables city planners and developers to quickly determine 
                 potential placement location and corresponding impacts of a noise 
                 barrier for each project. The Traffic Noise Barrier Estimation Tool 
                 is developed based on calculation methods obtained from the <span><a href="http://publications.gc.ca/collections/collection_2017/schl-cmhc/NH15-27-1981-eng.pdf" target="_blank">CMHC Road and Rail Noise Assessment</a> </span>document.</p>
                
                <p>After using this tool, it may be determined that a  noise barrier be considered
                 to align with project goals. A more detailed assessment may be required that could
                  include onsite measurements and modelling. However, noise barrier requirements may
                   still meet less stringent standards, if regulations differ from those used within
                    this tool. Patching Associates can help you navigate through all these options.</p>
            </div>
            </div>
        </div>
        </section>
        
        <section className="instruction-section">
        <div className="container">
        <div className="row"> 
            <div className="col">
                <h3>WHY USE PATCHING ASSOCIATES' TRAFFIC NOISE BARRIER ESTIMATION TOOL?</h3>
                <ul>
                    <li>It’s completely free! (no obligation to purchase any report)</li>
                    <li>The tool is self intuitive and easy to use</li>
                    <li>It gives you a quick picture of noise barrier impacts</li>
                    <li>It gives you a starting point to choose for your noise assessment</li>
                </ul>       
            </div>
            </div>
        </div>
        </section>

        </div>
    )
}
export default Instructions

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