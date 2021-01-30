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
    };
  }

  handleCallback = (stateData) => {
    this.setState(stateData);
  };

  render() {
    if (this.state.playerName === "") {
      return (
        <div className="App">
          <LandingPage parentCallBack = {this.handleCallback}/>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Game stateData = {this.state}/>
        </div>
      );
    }
  }
}

export default App;
