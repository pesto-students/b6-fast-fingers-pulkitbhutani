import easyData from '../data/easy.json'
import mediumData from '../data/medium.json'
import hardData from '../data/hard.json'


 export const loadNewWord = (difficultyLevel) => {
    switch (difficultyLevel) {
        case 'easy' :
            return easyData[Math.floor(Math.random() * easyData.length)].toUpperCase();
        case 'medium' :
            return mediumData[Math.floor(Math.random() * mediumData.length)].toUpperCase();
        case 'hard' :
            return hardData[Math.floor(Math.random() * hardData.length)].toUpperCase();
        default :
            return easyData[Math.floor(Math.random() * easyData.length)].toUpperCase();
    }
    }

export const getDifficulty = (difficultyFactor)=>{
  if(difficultyFactor >=2 ){
      return "hard";
  }
  else if(difficultyFactor >=1.5){
      return "medium";
  }
  else return "easy"
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



  
  