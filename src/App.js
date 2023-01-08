import Board from './Board';
import './App.css';
import Square from './Square';
import { useState, useEffect } from 'react';

const defaultSquares = () => new Array(9).fill(null);

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [squares, setSquares] = useState(defaultSquares());

  useEffect(() => {
    const isComputerTurn =
      squares.filter((square) => square !== null).length % 2 === 1;
    const linesSet = (a, b, c) => {
      return lines.filter((squareIndex) => {
        const squareValues = squareIndex.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };
    const emptyIndex = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);
    const playerWon = linesSet('X', 'X', 'X').length > 0;
    const computerWon = linesSet('O', 'O', 'O').length > 0;
    if (playerWon) {
      alert('player won');
    }
    if (computerWon) {
      alert('computer won');
    }
    const computerMove = (index) => {
      let newSquares = squares;
      newSquares[index] = 'O';
      setSquares([...newSquares]);
    };
    if (isComputerTurn) {
      const blockTurn = linesSet('X', 'X', null);
      if (blockTurn.length > 0) {
        const blockIndex = blockTurn[0].filter(
          (index) => squares[index] === null
        )[0];
        computerMove(blockIndex);
        return;
      }
      const winningLines = linesSet('O', 'O', null);
      if (winningLines.length > 0) {
        const winIndex = winningLines[0].filter(
          (index) => squares[index] === null
        )[0];
        computerMove(winIndex);
        return;
      }
      const randomIndex =
        emptyIndex[Math.ceil(Math.random() * emptyIndex.length)];
      computerMove(randomIndex);
    }
  }, [squares]);

  function handleSquareClick(index) {
    const isPlayerTurn =
      squares.filter((square) => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = 'X';
      setSquares([...newSquares]);
    }
  }

  return (
    <main className='App'>
      <Board>
        {squares.map((square, index) => (
          <Square
            x={square === 'X' ? 1 : 0}
            o={square === 'O' ? 1 : 0}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </Board>
    </main>
  );
}

export default App;
