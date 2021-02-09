import React from "react";
import "./ScoreList.css";

export class ScoreList extends React.Component {
  
  checkForBestScore(score) {
    //const maxScore = Math.max(...this.state.scoreList.score);
    const maxScore = Math.max.apply(Math, this.props.scoreListData.map(function(o) { return o.score; }))
    if (maxScore === score) {
      return "PERSONAL BEST";
    } else return "";
  }

  addZeroForSingleDigit(num) {
    return num < 10 ? "0" + num : num;
  }

  render() {
    let scoreListComponent;

    if (this.props.scoreListData) {
      scoreListComponent = this.props.scoreListData.map((scoreItem) => (
        <li key={scoreItem.id} className= "score-list-li">
          <p className="best-score-text text">{this.checkForBestScore(scoreItem.score)}</p>
          {"Game " +
            scoreItem.id +
            " : " +
            Math.floor(scoreItem.score / 60) +
            ":" +
            this.addZeroForSingleDigit(scoreItem.score % 60)}
        </li>
      ));
    }

    return <ul className="score-list"><h4 className = "text score-board-text">SCORE BOARD</h4>{scoreListComponent}</ul>;
  }
}

export default ScoreList;
