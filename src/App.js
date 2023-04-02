import "./App.css";
import { useState } from "react";
import Confite from "react-confetti";

export default function App() {
  const [isXtrun, setIsXturn] = useState(true);
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]);

  const winnerLogic = (board) => {
    const lines = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      //[0, 1, 2]
      // no value should be null
      // a is equal to b 0
      // b is equal to c 0

      if (board[a] != null && board[a] === board[b] && board[b] === board[c]) {
        console.log("winner is ", board[a]);
        return board[a];
      }
    }
    return null;
  };

  const winner = winnerLogic(board);

  const handleClick = (idx) => {
    // check box is empty or null
    if (!board[idx]) {
      // copy of an array
      console.log("board : ", board);
      // new array set
      const boardCopy = [...board];
      boardCopy[idx] = isXtrun ? "X" : "O";
      console.log("BoardCopy :", boardCopy);
      // oldarray - new array
      setBoard(boardCopy);
      setIsXturn(!isXtrun);
    }
  };
  return (
    <div>
      {winner ? <Confite /> : ""}
      <div className="App">
        {board.map((val, index) => (
          <GameBox
            key={index}
            val={val}
            onPlayersClick={() => handleClick(index)}
          />
        ))}
      </div>
      <br />
      <div>
        {winner ? <h1>Winner is {winner}</h1> : ""}
        <button
          onClick={() => {
            setBoard([null, null, null, null, null, null, null, null, null]);
            setIsXturn(true);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

function GameBox({ val, onPlayersClick }) {
  return (
    <div
      style={{ color: val === "X" ? "crimson" : "green" }}
      onClick={() => onPlayersClick()}
      className="game-box"
    >
      {val}
    </div>
  );
}
