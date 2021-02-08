import React from "react";
import keyboardImg from "../../images/icons/keyboard.png";
import playImg from "../../images/icons/play.png";
import {difficulties }from "../../utility/constants";

import "./LandingPage.css";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      difficultyLevel: "easy",
      playerNameError: ""
    };
  }

  onPlayerNameChange = (event) => {
    const value = event.target.value;
    this.setState({
      playerName: value,
    });
  };

  validateInput = () => {
    let playerNameError = "";
    if (this.state.playerName.length === 0) {
      playerNameError = "PLEASE ENTER YOUR NAME.";
      this.setState({ playerNameError });
      return false;
    }
    return true;
  };

  setLevel = (event) => {
    const value = event.target.value;
    this.setState({
      difficultyLevel: value,
    });
  };

  startGame = (event) => {
    const isValid = this.validateInput();
    const gameModeStatus = true;

    if (isValid) {
      this.props.parentCallBack(this.state, gameModeStatus);
    }

    event.preventDefault();
  };

  render() {

    const playerNameError = this.state.playerNameError;
    const difficultyLevelError = this.state.difficultyLevelError;

    return (
      <div>
        <div className="title-div">
          <img
            src={keyboardImg}
            alt="Fast Fingers"
            className="img-keyboard"
          ></img>
          <h1 className="text">Fast Fingers</h1>
        </div>
        <form onSubmit={this.startGame}>
          <div>
            <div className="col align-self-center">
              <input
                size="lg"
                className="form-control input-name"
                placeholder="TYPE YOUR NAME"
                type="text"
                onChange={this.onPlayerNameChange}
              />
              <div className="input-error">{playerNameError}</div>
              <select
                className="select-level"
                placeholder="DIFFICULTY LEVEL"
                name="difficulty-level"
                value={this.state.difficultyLevel}
                onChange={this.setLevel}
              >
                {difficulties.map(({label,value}) => <option value={value}>{label}</option>)}
              </select>
              <div className="input-error">{difficultyLevelError}</div>
            </div>
          </div>
          <div>
            <button type="submit" className="btn-start-game">
              <img className="icon-play" src={playImg} alt="" />
              START GAME
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LandingPage;
