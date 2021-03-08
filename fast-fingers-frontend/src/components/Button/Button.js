import React from "react";
import "./Button.css";

function Button({ icon, text, onClick }) {
  return (
    <button onClick={onClick} className="button-game" type="button">
      {icon ? <img className="button-icon" src={icon} alt="" /> : null}
      <span>{text}</span>
    </button>
  );
}
export default Button;
