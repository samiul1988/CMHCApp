import React, { Component } from 'react';

class InputFormComponent extends React.Component{
    render(){
        return(
            <div className="d-sm-flex flex-row justify-content-between mb-1  px-2">
                <label htmlFor={this.props.componentId} className="col-form-label inputBoxLabel">
                    {this.props.labelTitle}
                </label>

                <div className="inputBoxControl">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder={this.props.componentPlaceholder}
                        id={this.props.componentId} 
                        name={this.props.componentId} 
                        value={this.props.componentValue} 
                        onChange={this.props.componentFunc} 
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title={this.props.toolTipText}/>
                </div>
            </div>
        )
    }
}

export default InputFormComponent



// <div className = "form-inline">
//                 <div className="inputBoxLabel">
//                     <h6 >{this.props.labelTitle}</h6>
//                 </div>
//                 <div className="form-group inputBox">
//                     <input type="text" className="form-control inputBox" placeholder={this.props.componentPlaceholder}
//                     id={this.props.componentId} name={this.props.componentId} 
//                     value={this.props.componentValue} onChange={this.props.componentFunc} />
//                 </div>
//             </div>