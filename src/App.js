import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Game from "./components/Game/Game";
import LandingPage from "./components/LandingPage/LandingPage";

export default function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/game/:playerName/:difficultyLevel">
            <Game/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
