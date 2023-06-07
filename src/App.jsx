import React, { useState, useEffect } from 'react';
import './App.css';

const Cell = ({ alive, onClick }) => (
  <div className={`cell ${alive ? 'alive' : 'dead'}`}
       onClick={onClick}
  ></div>
);

const GameOfLife = () => {
  const [board, setBoard] = useState([]);
  const [generation, setGeneration] = useState(0);

  const createEmptyBoard = (rows, cols) => {
    const newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard.push(Array(cols).fill(false));
    }
    return newBoard;
  };

  const generationNextGeneration = () => {
    const newBoard = JSON.parse(JSON.stringify(board));

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const aliveNeighbors = countAliveNeighbors(i, j);
        if (board[i][j]) {
          // celula viva
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            newBoard[i][j] = false; //solidao ou muita populção
          }
        } else {
          // celula morta
          if (aliveNeighbors === 3) {
            newBoard[i][j] = true; //nasce
          }
        }
      }
    }
    setBoard(newBoard);
    setGeneration(generation + 1);
  };

  const countAliveNeighbors = (row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[row].length) {
          if (board[newRow][newCol]) {
            count++;
          }
        }
      }
    }
    return count;
  };

  const toggleCellState = (row, col) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = !newBoard[row][col];
    setBoard(newBoard);
  };

  useEffect(() => {
    setBoard(createEmptyBoard(10, 10));
  }, []);

  return (
    <div className='game'>
      <h1>Jogo Da Vida</h1>
      <h2>Geração atual: {generation}</h2>
      <div className='board'>
        {board.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                alive={cell}
                onClick={() => toggleCellState(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
        </div>
        <button className='iniciar' onClick={generationNextGeneration}>Proxima Geração</button>
      </div>
  );
};

export default GameOfLife;
