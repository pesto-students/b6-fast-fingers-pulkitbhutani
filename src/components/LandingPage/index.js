import React from "react";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      difficultyLevel: "easy",
    };
  }

  onPlayerNameChange = (event) => {
    const value = event.target.value;
    this.setState({
      playerName: value
    });
  };

  setLevel = (event) => {
    const value = event.target.value;
    this.setState({
      difficultyLevel: value
    });
  };

  onTrigger = (event) => {
    this.props.parentCallBack(this.state);
    event.preventDefault();
  };

  

  render() {
    return (
      <div>
        <h1>Fast Fingers </h1>
        <form onSubmit={this.onTrigger}>
          <input
            placeholder="TYPE YOUR NAME"
            type="text"
            onChange={this.onPlayerNameChange}
          />
          <select
            placeholder="DIFFICULTY LEVEL"
            name="difficulty-level"
            value={this.state.difficultyLevel}
            onChange={this.setLevel}
          >
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
          </select>
          <div>
            <button type="submit">START GAME</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LandingPage;
