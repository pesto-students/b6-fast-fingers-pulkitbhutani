import { useEffect, useState } from "react";
import {
  getTimerValue,
  loadNewWord,
  getDifficulty,
} from "../utility/UtilityFunctions";
import {
  DIFFICULTY_FACTOR_INCREASE_RATE,
} from "../utility/Constants";
import useTimer from "./useTimer";
import useScoreTimer from "./useScoreTimer";

function useGame(initialDifficulty) {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [resultMode, setResultMode] = useState(false);
  const [scoreList, setScoreList] = useState([]);

  const { seconds, setStartTimer, setRestartTimer } = useTimer(
    getTimerValue(difficulty, currentWord)
  );

  const { score, setStartScoreTimer, setScore } = useScoreTimer(true);

  useEffect(() => {
    console.log(currentWord);
    setStartTimer(true);
  }, [currentWord]);

  useEffect(() => {
    if (userInput === currentWord) {
      setStartTimer(false);
      setDifficulty((d) => +Number.parseFloat(d + DIFFICULTY_FACTOR_INCREASE_RATE).toFixed(2));
      setCurrentWord(loadNewWord(getDifficulty(difficulty)));
      setUserInput("");
      setRestartTimer(true);
      console.log(difficulty);
    }
  }, [userInput]);

  useEffect(() => {
    if (seconds === 0) {
      let scoreListItem;

      if (scoreList.length === 0) {
        scoreListItem = {
          id: 1,
          score: score,
        };
      } else {
        scoreListItem = {
          id: scoreList.length + 1,
          score: score,
        };
      }
      console.log(scoreList);
      setScoreList(oldArr => [...oldArr, scoreListItem]);
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
    setCurrentWord(loadNewWord(getDifficulty(difficulty)));
  };

  const quitGame = () => {
    setResultMode(false);
    setScore(0);
    setStartScoreTimer(false);
  }

  return {
    currentWord,
    seconds,
    userInput,
    setUserInput,
    resultMode,
    score,
    restartGame,
    quitGame,
    scoreList
  };
}

export default useGame;
