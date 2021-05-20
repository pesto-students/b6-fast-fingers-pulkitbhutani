import React from "react";
import { addZeroForSingleDigit } from "../../utility/UtilityFunctions";
import "./Result.css";

const Result = ({ currentScore }) => {
  return (
    <p className="score-view">
      SCORE : {Math.floor(currentScore / 60)}:
      {addZeroForSingleDigit(currentScore % 60)}
    </p>
  );
};

export default Result;
