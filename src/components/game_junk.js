import React from "react";
import data from "../../data/dictionary.json";
import Result from "../Result/Result";
import ScoreList from "../ScoreList/ScoreList";
import Header from "../Header/Header";
import GameTimer from "../GameTimer/GameTimer";
import reloadImg from "../../images/icons/reload.png";
import { getDifficulty } from '../../utility/UtilityFunctions';


import {
  DIFFICULTY_LEVELS,
  DIFFICULTY_CONFIG,
  DIFFICULTY_FACTOR_INCREASE_RATE
} from "../../utility/Constants";
import "./Game.css";

const easyWords = [];
const mediumWords = [];
const hardWords = [];

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: this.props.playerName,
      difficultyLevel: this.props.difficultyLevel,
      currentWord: "",
      currentScore: 0,
      scoreList: [],
      timerSeconds: 0,
      timerMiliseconds: 0,
      resultMode: false,
    };
  }

  componentDidMount() {
    console.log(this.state);
    this.populateWordLists();
    //this.loadWord();
    let newWord = this.loadNewWord(getDifficulty(this.state.difficultyLevel));
    this.setState({ currentWord: newWord });
    //this.startTimer(newWord);
    this.startScoreTimer();
  }

  populateWordLists() {
    for (let word of data) {
      if (word.length <= 4) easyWords.push(word);
      else if (word.length >= 5 && word.length <= 8) mediumWords.push(word);
      else if (word.length > 8) hardWords.push(word);
    }
  }

  startTimer(newWord) {
    const difficultyFactor = this.state.difficultyFactor;
    const currentWord = newWord;

    this.setTimerValue(currentWord, difficultyFactor);

    console.log("set timer over");

    this.timerID = setInterval(() => {
      const seconds = this.state.timerSeconds;
      const miliseconds = this.state.timerMiliseconds;

      if (miliseconds > 0) {
        this.setState({
          timerMiliseconds: miliseconds - 1,
        });
      }
      if (miliseconds === 0) {
        if (seconds === 0) {
          clearInterval(this.timerID);
          clearInterval(this.scoreTimer);
          this.addToScoreBoard(this.state.currentScore);
          //console.log(this.state);
        } else {
          this.setState({
            timerSeconds: seconds - 1,
            timerMiliseconds: 59,
          });
        }
      }
    }, 16.6);
  }

  addToScoreBoard(currentScore) {
    console.log("push score");
    let scoreListItem;

    if (this.state.scoreList.length === 0) {
      scoreListItem = {
        id: 1,
        score: currentScore,
      };
    } else {
      scoreListItem = {
        id: this.state.scoreList.length + 1,
        score: currentScore,
      };
    }
    this.setState(
      { scoreList: [...this.state.scoreList, scoreListItem] },
      this.showResult()
    );
  }

  startScoreTimer() {
    this.setState({ currentScore: 0 }, this.startScoreTimeLog());
  }

  startScoreTimeLog() {
    this.scoreTimer = setInterval(() => {
      this.setState({
        currentScore: this.state.currentScore + 1,
      });
    }, 1000);
  }

  setTimerValue(currentWord, difficultyLevel) {
    console.log('current word' - currentWord)
    let seconds = currentWord.length / difficultyLevel;

    if (seconds < 2) {
      seconds = 2;
    } else {
      seconds = Math.round(seconds);
    }
    console.log('get func val ' + seconds);
    return seconds;
  }

  /* loadNewWord() {
    const difficultyLevel = this.state.difficultyLevel;
    if (difficultyLevel === DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.EASY].value) {
      return easyWords[
        Math.floor(Math.random() * easyWords.length)
      ].toUpperCase();
    } else if (
      difficultyLevel === DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.MEDIUM].value
    ) {
      return mediumWords[
        Math.floor(Math.random() * mediumWords.length)
      ].toUpperCase();
    } else {
      return hardWords[
        Math.floor(Math.random() * hardWords.length)
      ].toUpperCase();
    }
  } */

  loadNewWord(difficultyLevel){
    switch (difficultyLevel) {
        case 'easy' :
            return easyWords[Math.floor(Math.random() * easyWords.length)].toUpperCase();
        case 'medium' :
            return mediumWords[Math.floor(Math.random() * mediumWords.length)].toUpperCase();
        case 'hard' :
            return hardWords[Math.floor(Math.random() * hardWords.length)].toUpperCase();
        default :
            return easyWords[Math.floor(Math.random() * easyWords.length)].toUpperCase();
    }
    }

  onWordInput = (event) => {
    const value = event.target.value.toUpperCase();
    const currentWord = this.state.currentWord;
    //const currentDifficultyFactor = this.state.difficultyFactor;

    if (value === currentWord) {
      event.target.value = "";
      console.log("words matched");
      this.increaseDifficultyFactor();
      let newWord = this.loadNewWord(getDifficulty(this.state.difficultyLevel));
      clearInterval(this.timerID);
      //this.startTimer(newWord);
    }

    event.preventDefault();
  };

  /* updateDifficultyLevel() {
    const currentDifficultyFactor = this.state.difficultyFactor;
    console.log(currentDifficultyFactor);
    if (
      currentDifficultyFactor <
      DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.MEDIUM].factor
    ) {
      this.setState({
        difficultyLevel: DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.EASY].value,
      });
    } else if (
      currentDifficultyFactor >=
        DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.MEDIUM].factor &&
      currentDifficultyFactor < DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.HARD].factor
    ) {
      this.setState({
        difficultyLevel: DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.MEDIUM].value,
      });
    } else if (
      currentDifficultyFactor >=
      DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.HARD].factor
    ) {
      this.setState({
        difficultyLevel: DIFFICULTY_CONFIG[DIFFICULTY_LEVELS.HARD].value,
      });
    }
  } */

  increaseDifficultyFactor() {
    this.setState(
      {
        difficultyLevel: +Number.parseFloat(
          this.state.difficultyLevel + DIFFICULTY_FACTOR_INCREASE_RATE
        ).toFixed(2),
      }
    );
  }

  showResult = () => {
    console.log("push score" + this.state.scoreList);
    this.setState({ resultMode: true });
  };

  onPlayAgain = () => {
    this.setState({ resultMode: false }, this.componentDidMount);
  };

  endGame = (event) => {
    const gameModeStatus = false;
    this.props.setGameMode(gameModeStatus);
    //this.props.parentCallBack(this.state, gameModeStatus);
    event.preventDefault();
  };

  render() {
    let innerComponent;

    const {
      currentScore,
      scoreList,
      currentWord,
      timerSeconds,
      timerMiliseconds,
      resultMode,
      difficultyFactor,
    } = this.state;

    if (!this.state.resultMode) {
      innerComponent = (
        <div>
          <GameTimer
            value={this.setTimerValue(currentWord, difficultyFactor)}
          />
          <h1 className="current-word">{currentWord}</h1>
          <input
            className="input-word"
            type="text"
            onChange={this.onWordInput}
          />
        </div>
      );
    } else {
      innerComponent = (
        <div>
          <Result currentScore={currentScore} />
          <button onClick={this.onPlayAgain} className="btn-start-game">
            <img className="icon-reload" src={reloadImg} alt="" />
            PLAY AGAIN
          </button>
          <button onClick={this.endGame} className="btn-start-game">
            QUIT
          </button>
        </div>
      );
    }

    return (
      <div className="game-container">
        <Header
          headerData={{
            playerName: this.state.playerName,
            difficulty: this.state.difficultyLevel,
            score: this.state.currentScore,
          }}
        />
        <div className="row row-m-t-b">
          <div className="col-3">
            <ScoreList scoreListData={scoreList} key={scoreList.id} />
          </div>
          <div className="col-6">{innerComponent}</div>
        </div>
      </div>
    );
  }
}

const Game = ({playerName, setPlayerName, gameMode, setGameMode, difficultyLevel, setDifficultyLevel})=> {
 
}

export default Game;
