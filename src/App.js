import React from "react";
import "./App.css";
import Game from "./components/Game";
import LandingPage from "./components/LandingPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      difficultyLevel: "",
      currentScore: 0,
      scoreList: [],
      gameMode :false 
    };
  }

  handleCallback = (stateData, gameModeStatus) => {
    this.setState(stateData);
    this.setState({ gameMode: gameModeStatus });
  };

  render() {
    if (this.state.gameMode === false) {
      return (
        <div className="App">
          <LandingPage parentCallBack={this.handleCallback} />
        </div>
      );
    } else if (
      this.state.gameMode === true
    ) {
      return (
        <div className="App">
          <Game stateData={this.state} parentCallBack={this.handleCallback} />
        </div>
      );
    }
  }
}

export default App;
