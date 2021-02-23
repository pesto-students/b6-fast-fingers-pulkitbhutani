import React, { useState, useEffect, useRef } from "react";
import {addZeroForSingleDigit} from "../../utility/UtilityFunctions";
import "./GameTimer.css";

const GameTimer = ({ seconds }) => {


  return (
    <div>
      <h1 className="countdown-timer">
        {seconds}
      </h1>
    </div>
  );
};

export default GameTimer;
