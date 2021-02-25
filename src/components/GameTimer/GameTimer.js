import React from "react";
import {addZeroForSingleDigit} from "../../utility/UtilityFunctions";
import "./GameTimer.css";

const GameTimer = ({ seconds,miliseconds }) => {


  return (
    <div>
      <h1 className="countdown-timer">
        {addZeroForSingleDigit(seconds)}:{addZeroForSingleDigit(miliseconds)}
      </h1>
    </div>
  );
};

export default GameTimer;
