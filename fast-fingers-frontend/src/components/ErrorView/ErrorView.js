import React from 'react';
import './ErrorView.css';


function ErrorView({ errorText }) {
    return (
        <div className="input-error">{errorText}</div>
    );
}
export default ErrorView;