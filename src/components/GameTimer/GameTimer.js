import React from "react";
import "./GameTimer.css";


const GameTimer = ({timerSeconds, timerMiliseconds})=> {

const addZeroForSingleDigit = (num) => {
  return num < 10 ? "0" + num : num;
}

  return (<div>
    <h1 className="countdown-timer">
      {addZeroForSingleDigit(timerSeconds)}:
      {addZeroForSingleDigit(timerMiliseconds)}
    </h1>
    </div>)
}

export default GameTimer;