export  const saveScore = (score, userId) => {
    let data = { userId: userId, score: score };
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

  export const getUserId = (playerName) => {
    const getUserIdUrl = `http://localhost:3000/userId/${playerName}`;
    return fetch(getUserIdUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("user id");
        console.log(data);
        return data[0].userId;
      });
  };

  export const getScoreList = (userId) => {
    const getScoreListUrl = `http://localhost:3000/scoreList/${userId}`;
    return fetch(getScoreListUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("user id");
        console.log(data);
        return data;
      });
  };

  export const loadNewWord = (difficultyLevel) =>{
    const getWordUrl = `http://localhost:3000/words/${difficultyLevel}`;
    return fetch(getWordUrl).then(response => response.json())
    .then(data =>{return data[0].words;});
  }