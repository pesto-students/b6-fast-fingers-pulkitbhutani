import React from "react";
import "./PasswordInputBox.css";

const PasswordInputBox = ({ password,setPassword, placeHolder }) => {


  return (
    <input
            className="input-word"
            type="password"
            value={password} 
            onChange={({target:{value}})=>setPassword(value)} 
            placeholder = {placeHolder}
          />
  );
};

export default PasswordInputBox;
