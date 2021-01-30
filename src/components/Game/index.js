import React from "react";
import data from "../../data/dictionary.json";

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
    };
  }

  componentDidMount() {
    this.populateWordLists();
    //this.loadWord();
    let newWord = this.loadNewWord();
    this.startTimer(newWord);
    this.startScoreTimer();
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
          this.setState((state) => {
            state.scoreList.push(this.state.currentScore);
           });
          clearInterval(this.scoreTimer);
          console.log(this.state.currentScore);
        } else {
          this.setState({
            timerSeconds: seconds - 1,
            timerMiliseconds: 59,
          });
        }
      }
    }, 20);
  }

  addToScoreBoard = (currentScore) => {
    
  }

  startScoreTimer() {
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
    } else if (currentDifficultyFactor >= 1.5) {
      this.setState({ difficultyLevel: "medium" });
    } else {
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

  render() {
    return (
      <div>
        <h1>Lets play</h1>
        <h2>Score Board - {this.state.scoreList[0]} and {this.state.scoreList[1]}</h2>
        <h2>
          Total Score - {Math.floor(this.state.currentScore / 60)} :{" "}
          {this.state.currentScore % 60}{" "}
        </h2>
        Player Name - {this.props.stateData.playerName}
        Level : {this.state.difficultyLevel}
        <h1>
          {this.state.timerSeconds} : {this.state.timerMiliseconds}
        </h1>
        <h1>{this.state.currentWord}</h1>
        <input type="text" onChange={this.onWordInput} />
      </div>
    );
  }
}

export default Game;
