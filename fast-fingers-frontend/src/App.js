import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Game from "./components/Game/Game";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UserHomePage from "./components/UserHomePgae/UserHomePage";

export default function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/user">
            <UserHomePage />
          </Route>
          <Route path="/game/:playerName/:difficultyLevel">
            <Game/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
