import React from "react";
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

const Game = ({ playerName, setGameMode, difficultyLevel }) => {

  const {
    currentWord,
    seconds,
    userInput,
    setUserInput,
    resultMode,
    score,
    restartGame,
    quitGame,
    scoreList
  } = useGame(Number(difficultyLevel, setGameMode));

  return (
    <div className="game-container">
      <Header
        playerName={playerName}
        difficultyLevel={difficultyLevel}
        score={score}
      ></Header>
      <div className="row row-m-t-b">
        <div className="col-3">
          <ScoreList scoreListData={scoreList} key={scoreList.id} />
        </div>
        <div className="col-6">
          {resultMode ? (
            <div>
              <Result currentScore={score} />
              <Button icon ={reloadImg} text={"PLAY AGAIN"} onClick = {() => restartGame()} />
              <Button text={"QUIT"} onClick = {() => setGameMode(false)} />
            </div>
          ) : (
            <div>
              <GameTimer seconds={seconds} />
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
