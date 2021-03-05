import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import keyboardImg from "../../images/icons/keyboard.png";
import person from "../../images/icons/person.png";
import { difficulties, PLAYER_NAME_ERROR } from "../../utility/Constants";
import Button from "../Button/Button";
import TextBox from "../TextBox/TextBox";
import PasswordInputBox from "../PasswordInputBox/PasswordInputBox";
import ErrorView from "../ErrorView/ErrorView";
import SuccessMessage from "../SucessMessage/SuccessMessage";
import useAuth from "../../hooks/useAuth";

const RegisterPage = () => {

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [sucessFlag, setSucessFlag] = useState(false);
  const [sucessMessage, setSucessMessage] = useState();


  const { onSubmit} = useAuth(username, password, setUsernameError ,setPasswordError,setSucessFlag, setSucessMessage, 'register');

  return (
    <div>
      <div className="title-div">
        <img
          src={keyboardImg}
          alt="Fast Fingers"
          className="img-keyboard"
        ></img>
        <h1 className="text">Fast Fingers Register User</h1>
      </div>
        <div>
          <div className="col align-self-center">
            <TextBox text={username} setText={setUsername} placeHolder="Enter Username" />
            <ErrorView errorText={usernameError} />
            <PasswordInputBox password={password} setPassword={setPassword} placeHolder="Enter Password" />
            <ErrorView errorText={passwordError} />
          </div>
        </div>
        <div>
            <Button
              icon={person}
              text={"REGISTER"}
              onClick ={()=>onSubmit() }
            />
            {sucessFlag ? (
             <Link to='/'>
            <Button
              icon={person}
              text={"Go To LOGIN"}
            /></Link>) :null}
            <SuccessMessage text ={sucessMessage}/>
        </div>
    </div>
  );
};

export default RegisterPage;
