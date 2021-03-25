import { DIFFICULTY_LEVELS } from "../utility/Constants";

export const getDifficulty = (difficultyFactor) => {
  if (difficultyFactor >= 2) {
    return DIFFICULTY_LEVELS.HARD;
  } else if (difficultyFactor >= 1.5) {
    return DIFFICULTY_LEVELS.MEDIUM;
  } else return DIFFICULTY_LEVELS.EASY;
};

export const addZeroForSingleDigit = (num) => {
  return num < 10 ? "0" + num : num;
};

export const getTimerValue = (difficultyLevel, currentWord) => {
  console.log("current length" + currentWord.length);
  let seconds = currentWord.length / difficultyLevel;
  console.log("current length secs" + seconds);
  if (seconds < 2) {
    seconds = 2;
  } else {
    seconds = Math.round(seconds);
  }
  return seconds - 1;
};

export const checkIfHighestScore = (score, scoreList) => {
  const maxScore = Math.max.apply(
    Math,
    scoreList.map(function (o) {
      return o.score;
    })
  );
  if (maxScore === score) {
    console.log("max score " + maxScore);
    return true;
  } else return false;
};

//Local Storage -

export const savePlayerName = (playerName) =>
  window.localStorage.setItem("player", playerName);

export const getPlayerName = () =>
  window.localStorage.getItem("player");

export const setPlayerDifficultyLevel = (difficulty) =>
  window.localStorage.setItem("difficulty", difficulty);

export const getPlayerDifficultyLevel = (difficulty) =>
  window.localStorage.getItem("difficulty", difficulty);
