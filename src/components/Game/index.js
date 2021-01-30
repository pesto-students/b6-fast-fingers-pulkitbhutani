import React from "react";
import data from "../../data/dictionary.json";

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerName: this.props.stateData.playerName,
      difficultyLevel: this.props.stateData.difficultyLevel,
      currentScore: 0,
      easyWords : [],
      mediumWords : [],
      hardWords : [],
      scoreList: []
    };
  }

  

  componentDidMount() {
    this.populateWordLists();
  }
  
  populateWordLists(){
    for (let word of data) {
        if (word.length <= 4) this.state.easyWords.push(word);
        else if (word.length >= 5 && word.length <= 8) this.state.mediumWords.push(word);
        else if (word.length > 8) this.state.hardWords.push(word);
      }
  }

  onWordInput = (event) => {
    const value = event.target.value;
    this.setState({
      playerName: value
    });
  };

  render() {
    return (
      <div>
        <h1>Lets play</h1>
        Player Name - {this.props.stateData.playerName}
        Level : {this.props.stateData.difficultyLevel}
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
