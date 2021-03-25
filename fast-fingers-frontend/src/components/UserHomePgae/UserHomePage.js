import React, { useState } from "react";
import { Link } from "react-router-dom";
import keyboardImg from "../../images/icons/keyboard.png";
import playImg from "../../images/icons/play.png";
import { difficulties } from "../../utility/Constants";
import Button from "../Button/Button";
import SelectBox from "../SelectBox/SelectBox";
import {getPlayerName} from "../../utility/UtilityFunctions";

const UserHomePage = () => {


    const [difficultyLevel, setDifficultyLevel] = useState(1);
    const userName = getPlayerName();
    console.log('user name' + userName);

    return (
      <div>
        <div className="title-div">
          <img
            src={keyboardImg}
            alt="Fast Fingers"
            className="img-keyboard"
          ></img>
          <h1 className="text">{userName} - SELECT LEVEL</h1>
        </div>
          <div>
            <div className="col align-self-center">
              <SelectBox
                options={difficulties}
                option={difficultyLevel}
                setOption={setDifficultyLevel}
              />
            </div>
          </div>
          <div> 
          <Link to={userName !== '' ? (`game/${userName}/${difficultyLevel}`) : '/' }>
              <Button
                icon={playImg}
                text={"START GAME"}
              />
            </Link> 
          </div>
      </div>
    );
  };
  
  export default UserHomePage;
  