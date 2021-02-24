import React from "react";
import "./Button.css";

function Button({ icon, text, onClick }) {
  return (
    <button onClick={onClick} className="button-game">
      {icon ? <img className="button-icon" src={icon} alt="" /> : null}
      <span>{text}</span>
    </button>
    /* <div className="button-game" onClick={onClick}>
                {icon ? <img className="icon-reload" src={icon} alt="icon" /> : null}
                <span>{text}</span>
            </div> */
  );
}
export default Button;
