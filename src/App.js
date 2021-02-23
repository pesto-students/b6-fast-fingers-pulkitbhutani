import React from "react";
import { useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";
import LandingPage from "./components/LandingPage/LandingPage";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameMode, setGameMode] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);

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
