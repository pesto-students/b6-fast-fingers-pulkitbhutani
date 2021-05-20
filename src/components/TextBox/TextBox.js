import React from "react";
import "./TextBox.css";

const TextBox = ({ text,setText, placeHolder }) => {


  return (
    <input
            className="input-word"
            type="text"
            value={text} 
            placeholder = {placeHolder}
            onChange={({target:{value}})=>setText(value.toUpperCase())} 
          />
  );
};

export default TextBox;
