import React from "react";
import "./WordDisplay.css"

const WordDisplay = ({currentWord})=> {
  
    return (
      <div>
         <h1 className="current-word">{currentWord}</h1>
      </div>
    );
  
  
  }
  
  export default WordDisplay;