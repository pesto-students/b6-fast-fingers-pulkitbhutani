import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import keyboardImg from "../../images/icons/keyboard.png";
import playImg from "../../images/icons/play.png";
import { difficulties, PLAYER_NAME_ERROR } from "../../utility/constants";
import Button from "../Button/Button";
import TextBox from "../TextBox/TextBox";
import ErrorView from "../ErrorView/ErrorView";
import SelectBox from "../SelectBox/SelectBox";

import "./LandingPage.css";

const LandingPage = () => {

  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState();
  const [difficultyLevel, setDifficultyLevel] = useState(1);

  const validateInput = () => {
    if (playerName.length === 0) {
      setError(PLAYER_NAME_ERROR);
      return false;
    }
    return true;
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
      <form>
        <div>
          <div className="col align-self-center">
            <TextBox text={playerName} setText={setPlayerName} placeHolder = {'Enter Your Name'}/>
            <ErrorView errorText={error} />
            <SelectBox
              options={difficulties}
              option={difficultyLevel}
              setOption={setDifficultyLevel}
            />
          </div>
        </div>
        <div>
          <Link to={playerName !== '' ? (`game/${playerName}/${difficultyLevel}`) : '#' }>
            <Button
              icon={playImg}
              text={"START GAME"}
              onClick={()=>validateInput() }
            />
          </Link> 
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
