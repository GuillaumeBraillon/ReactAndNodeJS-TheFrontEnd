import React from "react";

const Input = props => {
  //console.log(props.value);
  return (
    <input
      className="form-control mb-2 mr-sm-2"
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    />  
)
}
export default Input;