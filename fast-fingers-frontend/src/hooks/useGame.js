import { useEffect, useState } from "react";
import {
  getTimerValue,
  loadNewWord,
  getDifficulty,
} from "../utility/UtilityFunctions";
import { DIFFICULTY_FACTOR_INCREASE_RATE } from "../utility/Constants";
import useTimer from "./useTimer";
import useScoreTimer from "./useScoreTimer";
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
    setStartTimer(true);
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

  const getUserId = (playerName) => {
    const getUserIdUrl = `http://localhost:3000/userId/${playerName}`;
    return fetch(getUserIdUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("user id");
        console.log(data);
        return data[0].userId;
      });
  };

  const getScoreList = (userId) => {
    const getScoreListUrl = `http://localhost:3000/scoreList/${userId}`;
    return fetch(getScoreListUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("user id");
        console.log(data);
        return data;
      });
  };

  const saveScore = (score, userId) => {
    let data = { userId: userId, username: playerName, score: score };
    console.log(data);

    fetch("http://localhost:3000/saveScore", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
