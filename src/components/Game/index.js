import React from "react";
import data from "../../data/dictionary.json";
import Result from "../Result";
import ScoreList from "../ScoreList";
import personImg from "../../images/icons/person.png";
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

  populateWordLists() {
    for (let word of data) {
      if (word.length <= 4) easyWords.push(word);
      else if (word.length >= 5 && word.length <= 8) mediumWords.push(word);
      else if (word.length > 8) hardWords.push(word);
    }
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

  addZeroForSingleDigit(num) {
    return num < 10 ? "0" + num : num;
  }

  checkForBestScore(score) {
    const maxScore = Math.max(...this.state.scoreList);
    if (maxScore === score) {
      return "PERSONAL BEST";
    } else return "";
  }

  render() {
    let innerComponent;
    let scoreComponent;
    let scoreListComponent;
    const playerName = this.props.stateData.playerName.toUpperCase();
    const difficultyLevel = this.state.difficultyLevel.toUpperCase();
    const currentScore = this.state.currentScore;
    const scoreList = this.state.scoreList;
    const currentWord = this.state.currentWord;
    const timerSeconds = this.state.timerSeconds;
    const timerMiliseconds = this.state.timerMiliseconds;

    if (!this.state.resultMode) {
      innerComponent = (
        <div>
          <h1 className="countdown-timer">
            {this.addZeroForSingleDigit(timerSeconds)}:
            {this.addZeroForSingleDigit(timerMiliseconds)}
          </h1>

          <h1 className="current-word">{currentWord}</h1>
          <input
            className="input-word"
            type="text"
            onChange={this.onWordInput}
          />
        </div>
      );

      scoreComponent = (
        <h3 className="text">
          SCORE: {Math.floor(currentScore / 60)}:{currentScore % 60}
        </h3>
      );

      scoreListComponent = (
        <ScoreList scoreListData={scoreList} key={scoreList.id} />
      );
    } else {
      innerComponent = (
        <div>
          <Result currentScore={currentScore}/>
          <button onClick={this.onPlayAgain}>Play Again</button>
          <button onClick={this.onPlayAgain}>Quit</button>
        </div>
      );
    }

    return (
      <div className="game-container">
        <div class="row">
          <div class="col text-left">
            <h3 className="text">
              <img class="person-icon" src={personImg} alt=""></img>{" "}
              {playerName}
            </h3>
          </div>
          <div class="col offset-md-4 text-right">
            <h3 className="text">fast fingers</h3>
          </div>
        </div>
        <div class="row">
          <div class="col text-left">
            <h3 className="text">
              <img class="gamepad-icon" src={gamePadImg} alt=""></img> LEVEL :{" "}
              {difficultyLevel}
            </h3>
          </div>
          <div class="col text-right">{scoreComponent}</div>
        </div>
        <div className="row row-m-t-b">
          <div className="col-3">{scoreListComponent}</div>
          <div className="col-6">{innerComponent}</div>
        </div>
      </div>
    );
  }
}

export default Game;
