import React from 'react';
import './Button.css';


function Button({ icon, text, onClick }) {
    return (
            <div className="button-game" onClick={onClick}>
                {icon ? <img className="icon-reload" src={icon} alt="icon" /> : null}
                <span>{text}</span>
            </div>
    );
}
export default Button;