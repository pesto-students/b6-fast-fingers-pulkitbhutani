import React from "react";
import data from "../../data/dictionary.json";
import Result from "../Result/Result";
import ScoreList from "../ScoreList/ScoreList";
import Header from "../Header/Header";
import GameTimer from "../GameTimer/GameTimer";
import personImg from "../../images/icons/person.png";
import reloadImg from "../../images/icons/reload.png";
import gamePadImg from "../../images/icons/gamepad.png";
import "./Game.css";

const easyWords = [];
const mediumWords = [];
const hardWords = [];

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: this.props.stateData.playerName,
      difficultyLevel: this.props.stateData.difficultyLevel,
      difficultyFactor: 1,
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
    this.setInitialDifficultyFactor();
    this.populateWordLists();
    //this.loadWord();
    let newWord = this.loadNewWord();
    this.startTimer(newWord);
    this.startScoreTimer();
  }

  setInitialDifficultyFactor() {
    const difficultyLevel = this.state.difficultyLevel;
    if (difficultyLevel === "medium") this.setState({ difficultyFactor: 1.5 });
    if (difficultyLevel === "hard") this.setState({ difficultyFactor: 2 });
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
          console.log(this.state);
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

  setTimerValue(currentWord, difficultyFactor) {
    let seconds = currentWord.length / difficultyFactor;

    if (seconds < 2) {
      seconds = 2;
    } else {
      seconds = Math.round(seconds);
    }

    this.setState({
      timerSeconds: seconds,
      timerMiliseconds: 0,
      currentWord: currentWord,
    });
  }

 

  loadNewWord() {
    const difficultyLevel = this.state.difficultyLevel;
    if (difficultyLevel === "easy") {
      return easyWords[
        Math.floor(Math.random() * easyWords.length)
      ].toUpperCase();
    } else if (difficultyLevel === "medium") {
      return mediumWords[
        Math.floor(Math.random() * mediumWords.length)
      ].toUpperCase();
    } else {
      return hardWords[
        Math.floor(Math.random() * hardWords.length)
      ].toUpperCase();
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
      let newWord = this.loadNewWord();
      clearInterval(this.timerID);
      this.startTimer(newWord);
    }

    event.preventDefault();
  };

  updateDifficultyLevel() {
    const currentDifficultyFactor = this.state.difficultyFactor;
    console.log(currentDifficultyFactor);
    if (currentDifficultyFactor < 1.5) {
      this.setState({ difficultyLevel: "easy" });
    } else if (
      currentDifficultyFactor >= 1.5 &&
      currentDifficultyFactor < 2.0
    ) {
      this.setState({ difficultyLevel: "medium" });
    } else if (currentDifficultyFactor >= 2) {
      this.setState({ difficultyLevel: "hard" });
    }
  }

  increaseDifficultyFactor() {
    this.setState(
      {
        difficultyFactor: +Number.parseFloat(
          this.state.difficultyFactor + 0.01
        ).toFixed(2),
      },
      function () {
        this.updateDifficultyLevel();
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
    this.props.parentCallBack(this.state, gameModeStatus);
    event.preventDefault();
  };

  render() {
    let innerComponent;

    const {currentScore, scoreList, currentWord, timerSeconds, timerMiliseconds} = this.state;

    if (!this.state.resultMode) {
      innerComponent = (
        <div>
         <GameTimer timerSeconds = {timerSeconds} timerMiliseconds = {timerMiliseconds}/>
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
       <Header headerData = {{playerName : this.state.playerName, difficulty : this.state.difficultyLevel, score: this.state.currentScore}} />
        <div className="row row-m-t-b">
          <div className="col-3"><ScoreList scoreListData={scoreList} key={scoreList.id} /></div>
          <div className="col-6">{innerComponent}</div>
        </div>
      </div>
    );
  }
}

export default Game;
