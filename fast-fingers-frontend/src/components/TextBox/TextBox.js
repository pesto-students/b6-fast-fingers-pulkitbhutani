import React from "react";
import "./TextBox.css";

const TextBox = ({ text,setText, placeHolder }) => {


  return (
    <input
            className="input-word"
            type="text"
            value={text} 
            onChange={({target:{value}})=>setText(value.toUpperCase())} 
            placeholder = {placeHolder}
          />
  );
};

export default TextBox;
