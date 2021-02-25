import React from "react";
import gamePadImg from "../../images/icons/gamepad.png";
import personImg from "../../images/icons/person.png";
import {
  getDifficulty,
  addZeroForSingleDigit,
} from "../../utility/UtilityFunctions";

const Header = ({ playerName, difficultyLevel, score }) => {
  return (
    <div>
      <div className="row">
        <div className="col text-left">
          <h3 className="text">
            <img className="person-icon" src={personImg} alt=""></img>{" "}
            {playerName}
          </h3>
        </div>
        <div className="col offset-md-4 text-right">
          <h3 className="text">fast fingers</h3>
        </div>
      </div>
      <div className="row">
        <div className="col text-left">
          <h3 className="text">
            <img className="gamepad-icon" src={gamePadImg} alt=""></img> LEVEL :{" "}
            {getDifficulty(difficultyLevel).toUpperCase()}
          </h3>
        </div>
        <div className="col text-right">
          <h3 className="text">
            <img className="gamepad-icon" src={gamePadImg} alt=""></img>
            SCORE: {Math.floor(score / 60)}:
            {addZeroForSingleDigit(score % 60)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
