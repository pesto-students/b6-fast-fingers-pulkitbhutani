import React from "react";
import { useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";
import { DIFFICULTY_LEVELS } from "./utility/constants";
import LandingPage from "./components/LandingPage/LandingPage";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameMode, setGameMode] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(
    DIFFICULTY_LEVELS.EASY
  );

  return (
    <div className="App">
      {gameMode ? (
        <Game
          playerName={playerName}
          setPlayerName={setPlayerName}
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
          setGameMode={setGameMode}
        />
      ) : (
        <LandingPage
          playerName={playerName}
          setPlayerName={setPlayerName}
          gameMode={gameMode}
          setGameMode={setGameMode}
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
        />
      )}
    </div>
  );
}
