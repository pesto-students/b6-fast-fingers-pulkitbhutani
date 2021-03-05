import easyData from '../data/easy.json'
import mediumData from '../data/medium.json'
import hardData from '../data/hard.json'
import {DIFFICULTY_LEVELS} from '../utility/Constants';

//const CorsURL = 'https://cors-anywhere.herokuapp.com/';


 /* export const loadNewWord = (difficultyLevel) => {
    switch (difficultyLevel) {
        case DIFFICULTY_LEVELS.EASY :
            return easyData[Math.floor(Math.random() * easyData.length)].toUpperCase();
        case DIFFICULTY_LEVELS.MEDIUM :
            return mediumData[Math.floor(Math.random() * mediumData.length)].toUpperCase();
        case DIFFICULTY_LEVELS.HARD :
            return hardData[Math.floor(Math.random() * hardData.length)].toUpperCase();
        default :
            return easyData[Math.floor(Math.random() * easyData.length)].toUpperCase();
    }
    } */

    export const loadNewWord = (difficultyLevel) =>{
      const getWordUrl = `http://localhost:3000/words/${difficultyLevel}`;
      return fetch(getWordUrl).then(response => response.json())
      .then(data =>{return data[0].words;});
    }

export const getDifficulty = (difficultyFactor)=>{
  if(difficultyFactor >=2 ){
      return DIFFICULTY_LEVELS.HARD;
  }
  else if(difficultyFactor >=1.5){
      return DIFFICULTY_LEVELS.MEDIUM;
  }
  else return DIFFICULTY_LEVELS.EASY
}

export const addZeroForSingleDigit = (num) => {
  return num < 10 ? "0" + num : num;
};


export const getTimerValue = (difficultyLevel, currentWord) => {
  
  let seconds = currentWord.length / difficultyLevel;

  if (seconds < 2) {
    seconds = 2;
  } else {
    seconds = Math.round(seconds);
  }
  return seconds;
}


export const checkIfHighestScore = (score, scoreList) => {
  const maxScore = Math.max.apply(Math, scoreList.map(function(o) { return o.score; }))
  if (maxScore === score) {
    console.log('max score ' +maxScore);
    return true;
  } else return false;
}


  
  