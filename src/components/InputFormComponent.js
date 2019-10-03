import React, { Component } from 'react';

class InputFormComponent extends React.Component{
    render(){
        return(
            <div className = "form-inline">
                <div className="inputBoxLabel">
                    <h6 >{this.props.labelTitle}</h6>
                </div>
                <div className="form-group inputBox">
                    <input type="text" className="form-control inputBox" placeholder={this.props.componentPlaceholder}
                    id={this.props.componentId} name={this.props.componentId} 
                    value={this.props.componentValue} onChange={this.props.componentFunc} />
                </div>
            </div>
        )
    }
}

export default InputFormComponent