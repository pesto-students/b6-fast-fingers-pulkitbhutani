import React from "react";
import {
  addZeroForSingleDigit,
  checkIfHighestScore,
} from "../../utility/UtilityFunctions";
import "./ScoreList.css";

const ScoreList = ({ scoreListData }) => {

  return (
    <ul className="score-list"><h4 className = "text score-board-text">SCORE BOARD</h4>
      {scoreListData.map((scoreItem) => (
        <li key={scoreItem.scoreId} className="score-list-li">
          {checkIfHighestScore(scoreItem.score,   scoreListData) ? (
            <p className="best-score-text text">PERSONAL BEST</p>
          ) : null}
          {"Game " +
             (scoreListData.indexOf(scoreItem)+1) +
            " : " +
            Math.floor(scoreItem.score / 60) +
            ":" +
            addZeroForSingleDigit(scoreItem.score % 60)}
        </li>
      ))}
    </ul>
  );
};

export default ScoreList;
