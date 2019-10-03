import React, { Component } from 'react';

const OutputForm = ({outputValue})=>{
console.log("Value",outputValue);
const todosList = outputValue.length ?( 
    outputValue.map((todo)=>{
        if(todo){
    return(
        <div className="">
           
        </div>)
        }
    })
): (
    <p className="center"> You have no todos left</p>
)
return(
    <div>
        {todosList}
    </div>
)
}
export default OutputForm