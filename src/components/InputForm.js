import React, { Component } from 'react';
import InputFormComponent from './InputFormComponent';


class InputForm extends Component {
    state = {
        helpButtonText: "Hide Help Tooltips"
    }
    onHelpButtonClick = (e) =>{
        e.preventDefault();
        // console.log("Data Toggle", this.state.dataToggleType)
        this.setState({
            helpButtonText: this.state.helpButtonText == "Show Help Tooltips" ? "Hide Help Tooltips" : "Show Help Tooltips"
        })
        if (this.state.helpButtonText == "Hide Help Tooltips"){
            $('[title]').each(function(i,element) {
                $(this).data('title', $(this).attr('data-original-title'));
                $(this).removeAttr('data-original-title');
            })
        } else {
            $('[title]').each(function(i,element) {
                $(this).attr('data-original-title', $(this).data('title'));
            })
        }
    }
    handleChange = (e) => {
        // console.log("Before Change: ", this.props.stateInputs);
        if (e.target.id == "trafficVolume") {
            if (e.target.value == "" || !e.target.value.match(/^\d+$/)) {
                return
            }
        }

        if (e.target.id == "percentageOfHeavyTruck" || e.target.id == "roadGradient"
            || e.target.id == "distanceFromReceiverToIntersection" || e.target.id == "horizontalDistanceFromSourceToReceiver"
            || e.target.id == "targetSPL" || e.target.id == "barrierHeight") {
            if (e.target.value == "" || !e.target.value.match(/^\d*(\.\d*)?$/)) {
                return
            }
        }

        const tempState = {
            ...this.props.stateInputs,
            [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        };

        this.props.setStateInputsFromInputForm(tempState, e.target.id);

        // console.log("After Change inside InputForm: ", tempState);
    }

    render() {
        const roadSpeedArray = [40, 50, 60, 70, 80, 90, 100, 110];

        const roadSpeedOptionJSX = (arr) => {
            return arr.map((element) => <option key={element}>{element}</option>);
        }

        return (
            <div>
                <div className="card bg-primary card-form" id="input-form">
                    <div className="card-body ">
                        <form>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <div className="d-sm-flex flex-row justify-content-between mb-1 px-2">
                                        <label htmlFor="roadSpeed" className="col-form-label inputBoxLabel">Posted Speed Limit (km/h)</label>
                                        <div className="inputBoxControl">
                                            <select 
                                                className="form-control custom-select"
                                                id="roadSpeed" 
                                                name="roadSpeed" 
                                                value={this.props.stateInputs.roadSpeed} 
                                                onChange={this.handleChange} 
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Posted Speed Limit of the Road in km/hr. Road noise level increases with traffic speed">
                                                {roadSpeedOptionJSX(roadSpeedArray)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="d-sm-flex flex-row justify-content-between mb-1  px-2">
                                        <label htmlFor="groundSurface" className="col-form-label inputBoxLabel">Ground Surface (Soft / Hard)</label>
                                        <div className="inputBoxControl">
                                            <select 
                                                className="form-control custom-select" 
                                                id="groundSurface" 
                                                name="groundSurface" 
                                                value={this.props.stateInputs.groundSurface} 
                                                onChange={this.handleChange}
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Nature of ground surface over which the sound waves pass">
                                                <option>Soft</option>
                                                <option>Hard</option>
                                            </select>
                                        </div>
                                    </div>

                                    <InputFormComponent
                                        labelTitle="Traffic Volume (AADT, two-way combined)"
                                        componentPlaceholder="1000"
                                        componentId="trafficVolume"
                                        componentValue={this.props.stateInputs.trafficVolume}
                                        componentFunc={this.handleChange}
                                        toolTipText="Average daily traffic volume (vehicles per 24-hour day.
                                            If traffic statistics are available, the average daily traffic 
                                            volume shall be taken to be the Annual Average Daily Traffic (AADT)."
                                    />

                                    <InputFormComponent
                                        labelTitle="Percentage (%) of Heavy Truck"
                                        componentPlaceholder="2.5"
                                        componentId="percentageOfHeavyTruck"
                                        componentValue={this.props.stateInputs.percentageOfHeavyTruck}
                                        componentFunc={this.handleChange}
                                        toolTipText="Percentage of heavy vehicles (all
                                            vehicles with more than four wheels
                                            or a gross vehicle weight greater
                                            than 5000 kg)"
                                    />
                                    
                                </div>
                                <div className="col-md-6">
                                    <InputFormComponent
                                        labelTitle="Road Gradient (%)"
                                        componentPlaceholder="0.0"
                                        componentId="roadGradient"
                                        componentValue={this.props.stateInputs.roadGradient}
                                        componentFunc={this.handleChange}
                                        toolTipText="The noise from
                                        vehicles, particularly the heavier ones,
                                        increases with the gradient"
                                    />

                                    <InputFormComponent
                                        labelTitle="Distance of Receiver from Intersection (m)"
                                        componentPlaceholder="151"
                                        componentId="distanceFromReceiverToIntersection"
                                        componentValue={this.props.stateInputs.distanceFromReceiverToIntersection}
                                        componentFunc={this.handleChange}
                                        toolTipText="When the free flow of traffic is interrupted by 
                                        traffic lights, stop signs or corners, necessitating a halt 
                                        or substantial change in speed, the noise levels increase. However,
                                        For locations beyond 150 m of a traffic light or other interruptions
                                         in traffic flow, this effect is negligible"
                                    />

                                    <InputFormComponent
                                        labelTitle="Source to Receiver Distance (m)"
                                        componentPlaceholder="50"
                                        componentId="horizontalDistanceFromSourceToReceiver"
                                        componentValue={this.props.stateInputs.horizontalDistanceFromSourceToReceiver}
                                        componentFunc={this.handleChange}
                                        toolTipText="Horizontal distance between source and receiver"
                                    />
                                    <div className="d-flex mt-2 justify-content-center">
                                        <button 
                                            className="btn btn-sm btn-secondary align-self-center"
                                            onClick={this.onHelpButtonClick}>{this.state.helpButtonText}</button>
                                    </div>
                                </div>
                            </div>


                            {/*<InputFormComponent labelTitle="Road Width (m)" componentPlaceholder="3.7" 
                            componentId="roadWidth" componentValue={this.state.roadWidth} 
                            componentFunc={this.handleChange} />*/}


                        </form>


                    </div>
                </div>
                <div className="card bg-primary card-form" id="input-form-result">
                    <div className="card-body ">
                        <form>
                            <div className="form-row">
                                <div className="col-md-4">
                                
                                    <div className="d-sm-flex flex-row justify-content-start mb-1 px-2">
                                        <label htmlFor="isBarrierChecked" className="col-form-label ">Vary Barrier Height</label>
                                        <div className="align-self-center px-3" >
                                            <input 
                                                type="checkbox" 
                                                id="isBarrierChecked" 
                                                onChange={this.handleChange}
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="By default, this tool estimates barrier height
                                                for a particular target Sound Pressure Level (SPL in dBA). Check this
                                                box if you want to vary barrier height. In this case, the tool
                                                will estimate noise level at the receiver (in dBA)"/>
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-sm-flex flex-row justify-content-start mb-1 px-2">
                                        <label htmlFor="targetSPL" className="col-form-label">Target SPL (dBA)</label>
                                        <div className="inputBoxControl align-self-center px-3">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                placeholder={this.props.stateInputs.targetSPL}
                                                readOnly={this.props.stateInputs.isBarrierChecked}
                                                id="targetSPL" 
                                                name="targetSPL"
                                                value={this.props.stateInputs.targetSPL} 
                                                onChange={this.handleChange}
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="If 'Vary Barrier Height' option is checked,
                                                then this field shows the estimated noise level (in dBA) at 
                                                the receiver. Otherwise this field acts as an input field
                                                where you can specify a desired (target) SPL at the receiver." />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-sm-flex flex-row justify-content-start mb-1 px-2">
                                        <label htmlFor="barrierHeight" className="col-form-label">Barrier Height (m)</label>
                                        <div className="inputBoxControl align-self-center px-3">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                placeholder={this.props.stateInputs.barrierHeight}
                                                readOnly={!this.props.stateInputs.isBarrierChecked}
                                                id="barrierHeight" 
                                                name="barrierHeight"
                                                value={this.props.stateInputs.barrierHeight} 
                                                onChange={this.handleChange} 
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="If 'Vary Barrier Height' option is checked,
                                                then this field acts as an input where you can specify a barrier 
                                                height (in m). Otherwise, it shows the estimated barrier height for 
                                                a particular target SPL." />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default InputForm


// <div className = "form-inline">
//                             <div className="inputBoxLabel">
//                                 <h6 >Target SPL (dBA)</h6>
//                             </div>
//                             <div className="form-group inputBox">
//                                 <input type="text" className="form-control inputBox" placeholder="0" readOnly={this.props.stateInputs.isBarrierChecked}
//                                 id="targetSPL" name="targetSPL"
//                                 value={this.props.stateInputs.targetSPL} onChange={this.handleChange} />
//                             </div>
//                         </div>


// <div className="form-inline ">
//                     <div className="inputFieldBorder" >
//                         <div className="form-group ">
//                             <div className="inputBoxLabel"><h6>Posted Speed Limit (km/h)</h6></div>
//                             <div className="">
//                             <select className="form-control inputBoxLabel " id="roadSpeed" name="roadSpeed" value={this.props.stateInputs.roadSpeed} onChange={this.handleChange} >
//                                 {roadSpeedOptionJSX(roadSpeedArray)}
//                             </select>
//                             </div>
//                         </div>



//                         <div className="form-group">

//                             <div className="inputBoxLabel"><h6>Ground Surface (Soft / Hard)</h6></div>
//                             <div className="">
//                             <select className="form-control inputBoxSelect" id="groundSurface" name="groundSurface" value={this.props.stateInputs.groundSurface} onChange={this.handleChange} >
//                                 <option>Select one</option>
//                                 <option>Soft</option>
//                                 <option>Hard</option>
//                             </select>
//                             </div>
//                         </div>
//                         <InputFormComponent labelTitle="Traffic Volume (AADT, two-way combined)" componentPlaceholder="1000" 
//                         componentId="trafficVolume" componentValue={this.props.stateInputs.trafficVolume} 
//                         componentFunc={this.handleChange} />

//                         <InputFormComponent labelTitle="Percentage (%) of Heavy Truck" componentPlaceholder="2.5" 
//                         componentId="percentageOfHeavyTruck" componentValue={this.props.stateInputs.percentageOfHeavyTruck} 
//                         componentFunc={this.handleChange} />

//                         {/*<InputFormComponent labelTitle="Road Width (m)" componentPlaceholder="3.7" 
//                         componentId="roadWidth" componentValue={this.state.roadWidth} 
//                         componentFunc={this.handleChange} />*/}

//                         <InputFormComponent labelTitle="Road Gradient (%)" componentPlaceholder="0.0" 
//                         componentId="roadGradient" componentValue={this.props.stateInputs.roadGradient} 
//                         componentFunc={this.handleChange} />

//                         <InputFormComponent labelTitle="Distance of Receiver from Intersection (m)" 
//                         componentPlaceholder="151" 
//                         componentId="distanceFromReceiverToIntersection" componentValue={this.props.stateInputs.distanceFromReceiverToIntersection} 
//                         componentFunc={this.handleChange} />

//                         <InputFormComponent labelTitle="Horizontal Distance Between Source and Receiver (m)" 
//                         componentPlaceholder="50" 
//                         componentId="horizontalDistanceFromSourceToReceiver" 
//                         componentValue={this.props.stateInputs.horizontalDistanceFromSourceToReceiver} 
//                         componentFunc={this.handleChange} />

//                     </div>
//                     <div className="outputFieldBorder" >
// <br></br>
// <br></br>
//                         {/* <div>
//                             <label className="switch">
//                                 <input type="checkbox" id="isBarrierChecked" onChange={this.handleChange} />
//                                 <span className="">Vary barrier height</span>
//                             </label>
//                         </div> */}


//                         <div className="form-inline">
//                             <div className="inputBoxLabel"><h6 >Vary barrier height</h6></div>
//                             <div className="form-group">
//                                 <label className="switch">
//                                     <input type="checkbox" id="isBarrierChecked" onChange={this.handleChange} />
//                                     <span className="slider"></span>
//                                 </label>
//                             </div>
//                         </div>

//                         {/*<InputFormComponent labelTitle="Target SPL (dBA)" readOnlyProp={this.props.stateInputs.isBarrierChecked}  
//                         componentPlaceholder="0" 
//                         componentId="targetSPL" 
//                         componentValue={this.props.stateInputs.targetSPL} // {this.state.targetSPL} 
//                     componentFunc={this.handleChange} />*/}
// {/* 
//                         <div>
//                             <label><h6>Target SPL (dBA)</h6></label>
//                             <input type="text" readOnly={this.state.isBarrierChecked} className="inputBox"
//                              placeholder="0" id="targetSPL" name="targetSPL" value={this.props.stateInputs.targetSPL} 
//                              onChange={this.handleChange} />
//                         </div> */}




//                         <div className = "form-inline">
//                             <div className="inputBoxLabel">
//                                 <h6 >Target SPL (dBA)</h6>
//                             </div>
//                             <div className="form-group inputBox">
//                                 <input type="text" className="form-control inputBox" placeholder="0" readOnly={this.props.stateInputs.isBarrierChecked}
//                                 id="targetSPL" name="targetSPL"
//                                 value={this.props.stateInputs.targetSPL} onChange={this.handleChange} />
//                             </div>
//                         </div>



//                         <div className = "form-inline">
//                         <div className="inputBoxLabel">
//                             <h6 >Barrier Height (m)</h6>
//                         </div>
//                         <div className="form-group inputBox">
//                             <input type="text" className="form-control inputBox" placeholder="1.8" readOnly={!this.props.stateInputs.isBarrierChecked}
//                             id="barrierHeight" name="barrierHeight"
//                             value={this.props.stateInputs.barrierHeight} onChange={this.handleChange} />
//                         </div>
//                     </div>


//                         {/*<InputFormComponent labelTitle="Barrier Height (m)" readOnlyProp={!this.props.stateInputs.isBarrierChecked} 
//                         componentPlaceholder="0" 
//                         componentId="barrierHeight" 
//                         componentValue={this.props.stateInputs.barrierHeight} 
//                     componentFunc={this.handleChange} />*/}

//                         {/*<div>
//                             <label><h6>Barrier Height (m)</h6></label>
//                             <input type="text" readOnly={!this.props.stateInputs.isBarrierChecked} 
//                             className="inputBox" placeholder="0" id="barrierHeight" 
//                             name="barrierHeight" value={this.props.stateInputs.barrierHeight} 
//                             onChange={this.handleChange} />
//                         </div>*/}





//                     </div>

//                 </div>
//             </div>
//         </div>