import React from 'react';
import './SuccessMessage.css';


function SuccessMessage({ text }) {
    return (
        <div className="sucess-msg">{text}</div>
    );
}
export default SuccessMessage;