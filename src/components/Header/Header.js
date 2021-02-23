import React from "react";
import gamePadImg from "../../images/icons/gamepad.png";
import personImg from "../../images/icons/person.png";
import {getDifficulty} from "../../utility/UtilityFunctions";

export class Header extends React.Component {

  addZeroForSingleDigit(num) {
    return num < 10 ? "0" + num : num;
  }

  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col text-left">
            <h3 className="text">
              <img className="person-icon" src={personImg} alt=""></img>{" "}
              {this.props.playerName}
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
              {getDifficulty(this.props.difficultyLevel).toUpperCase()}
            </h3>
          </div>
          <div className="col text-right">
            <h3 className="text">
              <img className="gamepad-icon" src={gamePadImg} alt=""></img>
              SCORE: {Math.floor(this.props.score / 60)}:
              {this.addZeroForSingleDigit(this.props.score % 60)}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
