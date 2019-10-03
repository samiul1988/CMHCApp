import React, { Component } from 'react';
import InputFormComponent from './InputFormComponent';


class InputForm extends Component {
    // state = this.props.stateInputs;

    handleChange = (e) => {
        console.log("Before Change: ", this.props.stateInputs);
        const tempState = {
            ...this.props.stateInputs,
            [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        };
        // this.setState(tempState);
        this.props.setStateInputsFromInputForm(tempState,e.target.id);

        console.log("After Change inside InputForm: ", tempState);
    }
    // handleChangeForSPLField(){

    // }
     
  
    render() {
        const roadSpeedArray = [40, 50, 60, 70, 80, 90, 100, 110];

        const roadSpeedOptionJSX = (arr) => {
            return arr.map((element) => <option key={element}>{element}</option>);
        }

        return (
            <div>
                    <div className="divInput panel-body ">
                        <div className="form-inline ">
                            <div className="inputFieldBorder" >
                                <div className="form-group ">
                                    <div className="inputBoxLabel"><h6>Posted Speed Limit (km/h)</h6></div>
                                    <div className="">
                                    <select className="form-control inputBoxLabel " id="roadSpeed" name="roadSpeed" value={this.props.stateInputs.roadSpeed} onChange={this.handleChange} >
                                        {roadSpeedOptionJSX(roadSpeedArray)}
                                    </select>
                                    </div>
                                </div>

                        

                                <div className="form-group">

                                    <div className="inputBoxLabel"><h6>Ground Surface (Soft / Hard)</h6></div>
                                    <div className="">
                                    <select className="form-control inputBoxSelect" id="groundSurface" name="groundSurface" value={this.props.stateInputs.groundSurface} onChange={this.handleChange} >
                                        <option>Select one</option>
                                        <option>Soft</option>
                                        <option>Hard</option>
                                    </select>
                                    </div>
                                </div>
                                <InputFormComponent labelTitle="Traffic Volume (AADT, two-way combined)" componentPlaceholder="1000" 
                                componentId="trafficVolume" componentValue={this.props.stateInputs.trafficVolume} 
                                componentFunc={this.handleChange} />

                                <InputFormComponent labelTitle="Percentage (%) of Heavy Truck" componentPlaceholder="2.5" 
                                componentId="percentageOfHeavyTruck" componentValue={this.props.stateInputs.percentageOfHeavyTruck} 
                                componentFunc={this.handleChange} />
                                
                                {/*<InputFormComponent labelTitle="Road Width (m)" componentPlaceholder="3.7" 
                                componentId="roadWidth" componentValue={this.state.roadWidth} 
                                componentFunc={this.handleChange} />*/}

                                <InputFormComponent labelTitle="Road Gradient (%)" componentPlaceholder="0.0" 
                                componentId="roadGradient" componentValue={this.props.stateInputs.roadGradient} 
                                componentFunc={this.handleChange} />
   
                                <InputFormComponent labelTitle="Distance of Receiver from Intersection (m)" 
                                componentPlaceholder="151" 
                                componentId="distanceFromReceiverToIntersection" componentValue={this.props.stateInputs.distanceFromReceiverToIntersection} 
                                componentFunc={this.handleChange} />

                                <InputFormComponent labelTitle="Horizontal Distance Between Source and Receiver (m)" 
                                componentPlaceholder="50" 
                                componentId="horizontalDistanceFromSourceToReceiver" 
                                componentValue={this.props.stateInputs.horizontalDistanceFromSourceToReceiver} 
                                componentFunc={this.handleChange} />

                            </div>
                            <div className="outputFieldBorder" >
<br></br>
<br></br>
                                {/* <div>
                                    <label className="switch">
                                        <input type="checkbox" id="isBarrierChecked" onChange={this.handleChange} />
                                        <span className="">Vary barrier height</span>
                                    </label>
                                </div> */}

                                
                                <div className="form-inline">
                                    <div className="inputBoxLabel"><h6 >Vary barrier height</h6></div>
                                    <div className="form-group">
                                        <label className="switch">
                                            <input type="checkbox" id="isBarrierChecked" onChange={this.handleChange} />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>

                                {/*<InputFormComponent labelTitle="Target SPL (dBA)" readOnlyProp={this.props.stateInputs.isBarrierChecked}  
                                componentPlaceholder="0" 
                                componentId="targetSPL" 
                                componentValue={this.props.stateInputs.targetSPL} // {this.state.targetSPL} 
                            componentFunc={this.handleChange} />*/}
{/* 
                                <div>
                                    <label><h6>Target SPL (dBA)</h6></label>
                                    <input type="text" readOnly={this.state.isBarrierChecked} className="inputBox"
                                     placeholder="0" id="targetSPL" name="targetSPL" value={this.props.stateInputs.targetSPL} 
                                     onChange={this.handleChange} />
                                </div> */}




                                <div className = "form-inline">
                                    <div className="inputBoxLabel">
                                        <h6 >Target SPL (dBA)</h6>
                                    </div>
                                    <div className="form-group inputBox">
                                        <input type="text" className="form-control inputBox" placeholder="0" readOnly={this.props.stateInputs.isBarrierChecked}
                                        id="targetSPL" name="targetSPL"
                                        value={this.props.stateInputs.targetSPL} onChange={this.handleChange} />
                                    </div>
                                </div>

                                

                                <div className = "form-inline">
                                <div className="inputBoxLabel">
                                    <h6 >Barrier Height (m)</h6>
                                </div>
                                <div className="form-group inputBox">
                                    <input type="text" className="form-control inputBox" placeholder="1.8" readOnly={!this.props.stateInputs.isBarrierChecked}
                                    id="barrierHeight" name="barrierHeight"
                                    value={this.props.stateInputs.barrierHeight} onChange={this.handleChange} />
                                </div>
                            </div>


                                {/*<InputFormComponent labelTitle="Barrier Height (m)" readOnlyProp={!this.props.stateInputs.isBarrierChecked} 
                                componentPlaceholder="0" 
                                componentId="barrierHeight" 
                                componentValue={this.props.stateInputs.barrierHeight} 
                            componentFunc={this.handleChange} />*/}

                                {/*<div>
                                    <label><h6>Barrier Height (m)</h6></label>
                                    <input type="text" readOnly={!this.props.stateInputs.isBarrierChecked} 
                                    className="inputBox" placeholder="0" id="barrierHeight" 
                                    name="barrierHeight" value={this.props.stateInputs.barrierHeight} 
                                    onChange={this.handleChange} />
                                </div>*/}

                                



                            </div>

                        </div>
                    </div>
                </div>
             
        )
    }
}
export default InputForm