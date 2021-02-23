import React from "react";
import { useState } from "react";
import keyboardImg from "../../images/icons/keyboard.png";
import playImg from "../../images/icons/play.png";
import {DIFFICULTY_LEVEL,difficulties, PLAYER_NAME_ERROR }from "../../utility/Constants";

import "./LandingPage.css";

const LandingPage = ({playerName, setPlayerName, gameMode, setGameMode, difficultyLevel, setDifficultyLevel})=> {

  const [playerNameError, setPlayerNameError] = useState();

  const validateInput = () => {
    if (playerName.length === 0) {
      setPlayerNameError(PLAYER_NAME_ERROR);
      return false;
    }
    return true;
  };

  const startGame = (event) => {
    event.preventDefault();
    const isValid = validateInput();
    const gameModeStatus = true;

    console.log(playerNameError);

    if (isValid) {
      setGameMode(gameModeStatus);
    }
  };


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
      <form onSubmit={startGame}>
        <div>
          <div className="col align-self-center">
            <input
              size="lg"
              className="form-control input-name"
              placeholder="TYPE YOUR NAME"
              type="text"
              onChange={({target : {value}}) => setPlayerName(value)}
            />
            <div className="input-error">{playerNameError}</div>
            <select
              className="select-level"
              placeholder="DIFFICULTY LEVEL"
              name="difficulty-level"
              value={difficultyLevel}
              onChange={({target : {value}}) => {setDifficultyLevel(value);}}
            >
              {difficulties.map(({label,value}) => <option value={value}>{label}</option>)}
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

export default LandingPage;
