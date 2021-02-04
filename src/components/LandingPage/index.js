import React from "react";
import keyboardImg from "../../images/icons/keyboard.png";
import playImg from "../../images/icons/play.png";
import "./LandingPage.css";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      difficultyLevel: "",
    };
  }

  onPlayerNameChange = (event) => {
    const value = event.target.value;
    this.setState({
      playerName: value,
    });
  };

  setLevel = (event) => {
    const value = event.target.value;
    this.setState({
      difficultyLevel: value,
    });
  };

  onTrigger = (event) => {
    const gameModeStatus = true;

    this.props.parentCallBack(this.state, gameModeStatus);
    event.preventDefault();
  };

  render() {
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
        <form onSubmit={this.onTrigger}>
          <div>
            <div className="col align-self-center">
              <input
                size="lg"
                className="form-control input-name"
                placeholder="TYPE YOUR NAME"
                type="text"
                onChange={this.onPlayerNameChange}
              />
              <select
                className="select-level"
                placeholder="DIFFICULTY LEVEL"
                name="difficulty-level"
                value={this.state.difficultyLevel}
                onChange={this.setLevel}
              >
                <option value="" disabled>
                  DIFFICULTY LEVEL
                </option>
                <option value="easy">EASY</option>
                <option value="medium">MEDIUM</option>
                <option value="hard">HARD</option>
              </select>
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
