import React from "react";
import gamePadImg from "../../images/icons/gamepad.png";
import personImg from "../../images/icons/person.png";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col text-left">
            <h3 className="text">
              <img class="person-icon" src={personImg} alt=""></img>{" "}
              {this.props.headerData.playerName}
            </h3>
          </div>
          <div class="col offset-md-4 text-right">
            <h3 className="text">fast fingers</h3>
          </div>
        </div>
        <div class="row">
          <div class="col text-left">
            <h3 className="text">
              <img class="gamepad-icon" src={gamePadImg} alt=""></img> LEVEL :{" "}
              {this.props.headerData.difficulty}
            </h3>
          </div>
          <div class="col text-right">{this.props.headerData.score}</div>
        </div>
      </div>
    );
  }
}

export default Header;
