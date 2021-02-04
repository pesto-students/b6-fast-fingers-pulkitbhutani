import React from "react";
import "./Result.css";

export class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: this.props.currentScore,
    };
  }

  /*  componentWillReceiveProps(){this.setState({scoreList: this.props.scoreListData});
  console.log('len' + this.state.scoreList.length);
} */

  checkIfHighestScore(currentScore) {
    const maxScore = Math.max.apply(
      Math,
      this.state.scoreList.map(function (o) {
        return o.score;
      })
    );
    if (maxScore === currentScore.score) {
      return "NEW HIGH SCORE";
    } else return "";
  }

  addZeroForSingleDigit(num) {
    return num < 10 ? "0" + num : num;
  }

  render() {
    const currentScore = this.state.currentScore;

    return (<p className="score-view">SCORE : {Math.floor(currentScore / 60)}:{this.addZeroForSingleDigit(currentScore % 60)}</p>);
    
  }
}

export default Result;
