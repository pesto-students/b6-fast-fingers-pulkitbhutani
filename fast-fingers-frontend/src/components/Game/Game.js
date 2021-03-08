import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {signOut} from "../../services/authService";
import Result from "../Result/Result";
import ScoreList from "../ScoreList/ScoreList";
import Header from "../Header/Header";
import WordDisplay from "../WordDisplay/WordDisplay";
import GameTimer from "../GameTimer/GameTimer";
import TextBox from "../TextBox/TextBox";
import Button from "../Button/Button";
import reloadImg from "../../images/icons/reload.png";
import useGame from "../../hooks/useGame";

import "./Game.css";

const Game = () => {
  const { playerName, difficultyLevel } = useParams();

  const {
    currentWord,
    seconds,
    miliseconds,
    userInput,
    setUserInput,
    resultMode,
    score,
    restartGame,
    scoreList,
  } = useGame(Number(difficultyLevel), playerName);

  return (
    <div className="game-container">
      <Header
        playerName={playerName}
        difficultyLevel={difficultyLevel}
        score={score}
      ></Header>
      <div className="row row-m-t-b">
        <div className="col-3">
          <ScoreList scoreListData={scoreList} key={scoreList.scoreId} />
        </div>
        <div className="col-6">
          {resultMode ? (
            <div>
              <Result currentScore={score} />
              <Button
                icon={reloadImg}
                text={"PLAY AGAIN"}
                onClick={() => restartGame()}
              />
              <Link to="/">
                <Button text={"QUIT"} onClick = {() => signOut()}/>
              </Link>
            </div>
          ) : (
            <div>
              <GameTimer seconds={seconds} miliseconds={miliseconds} />
              <WordDisplay currentWord={currentWord} />
              <TextBox text={userInput} setText={setUserInput} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
