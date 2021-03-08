import { useEffect, useState } from "react";
import {
  getTimerValue,
  getDifficulty,
} from "../utility/UtilityFunctions";
import { DIFFICULTY_FACTOR_INCREASE_RATE } from "../utility/Constants";
import useTimer from "./useTimer";
import useScoreTimer from "./useScoreTimer";
import {saveScore, getUserId, getScoreList, loadNewWord} from "../services/gameService";
import { useHistory } from "react-router";

function useGame(initialDifficulty, playerName) {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [resultMode, setResultMode] = useState(false);
  const [scoreList, setScoreList] = useState([]);

  const { seconds, miliseconds, setStartTimer, setRestartTimer } = useTimer(
    getTimerValue(difficulty, currentWord)
  );

  const { score, setStartScoreTimer, setScore } = useScoreTimer(true);

  useEffect(() => {
    getUserId(playerName)
        .then((userId) => {
          getScoreList(userId).then((data) => setScoreList(data))
        })
  }, []);

  useEffect(() => {
    console.log(currentWord);
    
  }, [currentWord]);

  useEffect(() => {
    if (userInput === currentWord) {
      setStartTimer(false);
      setDifficulty(
        (d) =>
          +Number.parseFloat(d + DIFFICULTY_FACTOR_INCREASE_RATE).toFixed(2)
      );
      loadNewWord(getDifficulty(difficulty)).then((word) =>
        setCurrentWord(word.toUpperCase())
      ); 
      setStartTimer(true);
      setUserInput("");
      setRestartTimer(true);
      console.log(difficulty);
    }
  }, [userInput]);

  useEffect(() => {
    if (seconds === 0) {
      getUserId(playerName)
        .then((userId) => {
          saveScore(score, userId);
          return userId;
        })
        .then((userId) =>
          getScoreList(userId).then((data) => setScoreList(data))
        );
      console.log(scoreList);
      setResultMode(true);
      setStartScoreTimer(false);
    }
  }, [seconds]);

  

  

 

  const restartGame = () => {
    setScore(0);
    setUserInput("");
    setRestartTimer(true);
    setResultMode(false);
    setStartTimer(true);
    setStartScoreTimer(true);
    setDifficulty(initialDifficulty);
    loadNewWord(getDifficulty(difficulty)).then((word) =>
      setCurrentWord(word.toUpperCase())
    );
  };

  return {
    currentWord,
    seconds,
    miliseconds,
    userInput,
    setUserInput,
    resultMode,
    score,
    restartGame,
    scoreList,
  };
}

export default useGame;
