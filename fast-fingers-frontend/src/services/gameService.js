import {FASTFINGERS_API_URL} from '../utility/Constants';
import {savePlayerName} from '../utility/UtilityFunctions';

export const saveScore = (score, userId) => {
  let data = { userId: userId, score: score };
  console.log(data);

  fetch(FASTFINGERS_API_URL + "/saveScore", {
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

export const getUserId = (playerName) => {
  const getUserIdUrl = FASTFINGERS_API_URL +`/userId/${playerName}`;
  const res = fetch(getUserIdUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("user id");
      console.log(data);
      return data[0].userId;
    });

  return res;
};

export const getScoreList = (userId) => {
  const getScoreListUrl = FASTFINGERS_API_URL +`/scoreList/${userId}`;
  const res = fetch(getScoreListUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("user id");
      console.log(data);
      return data;
    });
  return res;
};

export const loadNewWord = (difficultyLevel) => {
  const getWordUrl = FASTFINGERS_API_URL + `/words/${difficultyLevel}`;
  const res = fetch(getWordUrl)
    .then((response) => response.json())
    .then((data) => {
      return data[0].words;
    });

  return res;
};
