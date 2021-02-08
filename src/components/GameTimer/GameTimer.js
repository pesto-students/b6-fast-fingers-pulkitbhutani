import React from "react";
import "./GameTimer.css";

export class GameTimer extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.props.stateData;
    }

    componentDidMount() {
        this.startTimer(this.state.currentWord);
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

    render() {
        const timerSeconds = this.state.timerSeconds;
        const timerMiliseconds = this.state.timerMiliseconds;

        return (<div>
            <h1 className="countdown-timer">
              {this.addZeroForSingleDigit(timerSeconds)}:
              {this.addZeroForSingleDigit(timerMiliseconds)}
            </h1>
            </div>)
    }

}


export default GameTimer;