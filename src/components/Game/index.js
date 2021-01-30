import React from "react";
import data from "../../data/dictionary.json";

const easyWords = [];
const mediumWords = [];
const hardWords = [];
const easyDifficultyFactor = 1;
const mediumDifficultyFactor = 1.5;
const hardDifficultyFactor = 2;

let currentDifficultyFactor;

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
    this.loadWord();
    this.setTimerValue();

    this.timerID = setInterval(() => {
      const seconds = this.state.timerSeconds;
      const miliseconds = this.state.timerMiliseconds;

      if (miliseconds > 0) {
        this.tick(miliseconds);
      }

      if(miliseconds ===0){
        if(seconds ===0) {
          clearInterval(this.timerID);
        } else{
          this.setState({
            timerSeconds : seconds - 1,
            timerMiliseconds : 59
          })
        }
      }
    }, 100);
  }

  setTimerValue() {
    this.setState({
      timerSeconds: 30,
    });
  }

  populateWordLists() {
    for (let word of data) {
      if (word.length <= 4) easyWords.push(word);
      else if (word.length >= 5 && word.length <= 8) mediumWords.push(word);
      else if (word.length > 8) hardWords.push(word);
    }
  }

  loadNewWord = (event) => {
    event.preventDefault();
    if (this.state.difficultyLevel === "easy") {
      this.setState({
        currentWord: easyWords[
          Math.floor(Math.random() * easyWords.length)
        ].toUpperCase(),
      });
    } else if (this.state.difficultyLevel === "medium") {
      this.setState({
        currentWord: mediumWords[
          Math.floor(Math.random() * mediumWords.length)
        ].toUpperCase(),
      });
    } else {
      this.setState({
        currentWord: hardWords[
          Math.floor(Math.random() * hardWords.length)
        ].toUpperCase(),
      });
    }
  };

  loadWord() {
    console.log(this.state);
    if (this.state.difficultyLevel === "easy") {
      this.setState({
        currentWord: easyWords[
          Math.floor(Math.random() * easyWords.length)
        ].toUpperCase(),
      });
    } else if (this.state.difficultyLevel === "medium") {
      this.setState({
        currentWord: mediumWords[
          Math.floor(Math.random() * mediumWords.length)
        ].toUpperCase(),
      });
    } else {
      this.setState({
        currentWord: hardWords[
          Math.floor(Math.random() * hardWords.length)
        ].toUpperCase(),
      });
    }
  }

  onWordInput = (event) => {
    const value = event.target.value;
    this.setState({
      playerName: value,
    });
  };

  tick(miliseconds) {
      this.setState({
        timerMiliseconds: miliseconds - 1,
      });
  }

  render() {
    return (
      <div>
        <h1>Lets play</h1>
        Player Name - {this.props.stateData.playerName}
        Level : {this.props.stateData.difficultyLevel}
        <h1>{this.state.timerSeconds} : {this.state.timerMiliseconds}</h1>
        <h1>{this.state.currentWord}</h1>
        <button onClick={this.loadNewWord}>New Word</button>
        <input
          type="text"
          onChange={this.onWordInput}
          value={this.state.playerName}
        />
      </div>
    );
  }
}

export default Game;
