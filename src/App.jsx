import { useRef, useState } from "react";
import "./App.css";

import redStrip from "./assets/red-strip.png";
import blueStrip from "./assets/blue-strip.png";

const START_WIDTH = 5;
const TAP_INCREMENT = 5;
const FINISH_WIDTH = 100;

function App() {
  const [width1, setWidth1] = useState(START_WIDTH);
  const [width2, setWidth2] = useState(START_WIDTH);
  const [winner, setWinner] = useState(null);
  const [touching, setTouching] = useState({
    player1: false,
    player2: false,
  });

  // Track each active finger independently.
  const activePointers = useRef(new Map());

  function handlePlayerTap(player) {
    if (winner) return;

    const updateWidth = player === 1 ? setWidth1 : setWidth2;
    const currentWidth = player === 1 ? width1 : width2;
    const nextWidth = Math.min(
      currentWidth + TAP_INCREMENT,
      FINISH_WIDTH
    );

    updateWidth(nextWidth);

    if (nextWidth >= FINISH_WIDTH) {
      setWinner(player);
    }
  }

  function handlePointerDown(e, player) {
    e.preventDefault();

    // Ignore duplicate pointer-down events.
    if (activePointers.current.has(e.pointerId)) return;

    activePointers.current.set(e.pointerId, player);

    setTouching((prev) => ({
      ...prev,
      [player === 1 ? "player1" : "player2"]: true,
    }));

    handlePlayerTap(player);
  }

  function handlePointerUp(e) {
    const player = activePointers.current.get(e.pointerId);

    if (!player) return;

    activePointers.current.delete(e.pointerId);

    // Keep the player's touch indicator active if another
    // finger is still touching that player's area.
    const stillTouching = [...activePointers.current.values()].includes(
      player
    );

    setTouching((prev) => ({
      ...prev,
      [player === 1 ? "player1" : "player2"]: stillTouching,
    }));
  }

  function restartGame() {
    activePointers.current.clear();
    setWidth1(START_WIDTH);
    setWidth2(START_WIDTH);
    setWinner(null);
    setTouching({
      player1: false,
      player2: false,
    });
  }

  return (
    <main
      className="game"
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <h1>🎮 Finger Battle</h1>
      <p className="instructions">
        Tap your side as fast as you can! First to the finish wins.
      </p>

      <section className="player player-red">
        <h2>🔴 Player 1</h2>

        <div className="race-track">
          <img
            src={redStrip}
            alt="Red player progress"
            className="strip"
            draggable="false"
            style={{ width: `${width1}%` }}
          />
          <div className="finish-line" />
        </div>

        <p>Progress: {width1}%</p>

        <button
          className="tap-button red-button"
          disabled={Boolean(winner)}
          onPointerDown={(e) => handlePointerDown(e, 1)}
          onContextMenu={(e) => e.preventDefault()}
          style={{ touchAction: "none" }}
        >
          {touching.player1 ? "TAPPING!" : "PLAYER 1: TAP!"}
        </button>
      </section>

      <section className="player player-blue">
        <h2>🔵 Player 2</h2>

        <div className="race-track">
          <img
            src={blueStrip}
            alt="Blue player progress"
            className="strip"
            draggable="false"
            style={{ width: `${width2}%` }}
          />
          <div className="finish-line" />
        </div>

        <p>Progress: {width2}%</p>

        <button
          className="tap-button blue-button"
          disabled={Boolean(winner)}
          onPointerDown={(e) => handlePointerDown(e, 2)}
          onContextMenu={(e) => e.preventDefault()}
          style={{ touchAction: "none" }}
        >
          {touching.player2 ? "TAPPING!" : "PLAYER 2: TAP!"}
        </button>
      </section>

      {winner && (
        <h2 className="winner-message">
          🏆 Player {winner} Wins!
        </h2>
      )}

      <button className="restart-button" onClick={restartGame}>
        🔄 Restart Game
      </button>
    </main>
  );
}

export default App;