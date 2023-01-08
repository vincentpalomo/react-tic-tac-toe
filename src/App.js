import Board from './Board';
import './App.css';
import Square from './Square';
import { useState } from 'react';

const defaultSquares = () => new Array(9).fill(null);

function App() {
  const [squares, setSquares] = useState(defaultSquares());

  function handleSquareClick(index) {
    let newSquares = squares;
    newSquares[index] = 'X';
    setSquares([...newSquares]);
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
