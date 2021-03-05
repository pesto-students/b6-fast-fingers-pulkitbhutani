import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import keyboardImg from "../../images/icons/keyboard.png";
import playImg from "../../images/icons/play.png";
import { difficulties, PLAYER_NAME_ERROR } from "../../utility/Constants";
import Button from "../Button/Button";
import TextBox from "../TextBox/TextBox";
import PasswordInputBox from "../PasswordInputBox/PasswordInputBox";
import ErrorView from "../ErrorView/ErrorView";
import SelectBox from "../SelectBox/SelectBox";
import useAuth from "../../hooks/useAuth";

import "./LandingPage.css";


const LandingPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [usenameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [sucessFlag, setSucessFlag] = useState(false);
  const [sucessMessage, setSucessMessage] = useState();

  const { onSubmit} = useAuth(username, password, setUsernameError ,setPasswordError,setSucessFlag, setSucessMessage, 'login');

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
            <TextBox text={username} setText={setUsername} placeHolder = 'Enter UserName' />
            <ErrorView errorText={error} />
            <PasswordInputBox password={password} setPassword={setPassword} placeHolder = 'Enter password' />
            <ErrorView errorText={error} />
            <SelectBox
              options={difficulties}
              option={difficultyLevel}
              setOption={setDifficultyLevel}
            />
          </div>
        </div>
        <div> 
          <Link to={sucessFlag ? (`game/${username}/${difficultyLevel}`) : '#' }>
            <Button
              icon={playImg}
              text={"LOGIN AND START GAME"}
              onClick={()=>onSubmit()}
            />
          </Link> 
          <ErrorView errorText={usenameError} />
          <Link to='/register'>
            <Button
              icon={playImg}
              text={"REGISTER"}
            />
          </Link> 
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
