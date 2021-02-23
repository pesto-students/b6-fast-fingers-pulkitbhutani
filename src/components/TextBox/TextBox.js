import React from "react";
import "./TextBox.css";

const TextBox = ({ text,setText }) => {


  return (
    <input
            className="input-word"
            type="text"
            value={text} 
            onChange={({target:{value}})=>setText(value.toUpperCase())} 
          />
  );
};

export default TextBox;
