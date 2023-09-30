import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CellProps, Color, GameState, Shape } from '../types';
import Cell from './Cell';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const NewGameButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const SHAPES: Shape[] = ['circle', 'square', 'triangle'];
const COLORS: Color[] = ['red', 'green', 'blue'];

const generateRandomCells = (): CellProps[] => {
  const cells: CellProps[] = [];
  const shapeColorPairs: CellProps[] = [];

  for (let i = 0; i < 8; i++) {
    const shape = SHAPES[i % 3];
    const color = COLORS[Math.floor(i / 3)];
    const cell: CellProps = { id: i, shape, color, revealed: false };
    shapeColorPairs.push(cell, { ...cell }); // Create pairs
  }

  for (let i = shapeColorPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shapeColorPairs[i], shapeColorPairs[j]] = [shapeColorPairs[j], shapeColorPairs[i]];
  }

  return shapeColorPairs;
};

const Board: React.FC = () => {
  
  const initialGameState: GameState = {
    cells: generateRandomCells(), 
    selectedCells: [], 
    attempts: 0, 
  };

  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleCellClick = (cell: CellProps) => {
    const { selectedCells } = gameState;
  
    // Check if the user can reveal more cells
    if (selectedCells.length < 2 && !cell.revealed) {
      const updatedCells = gameState.cells.map((c) =>
        c === cell ? { ...c, revealed: true } : c
      );
  
      // Update the game state with the revealed cell
      setGameState((prevState) => ({
        ...prevState,
        cells: updatedCells,
        selectedCells: [...prevState.selectedCells, cell], // Add the selected cell
      }));
      // Check for a match when two cells are selected
      if (selectedCells.length === 1) {
        const [cell1] = selectedCells;
  
        // Check if the two selected cells match
        if (cell1.shape === cell.shape && cell1.color === cell.color) {
          // If they match, keep them open immediately
          const updatedMatchedCells = gameState.cells.map((c) =>
            c === cell || c === cell1 ? { ...c, revealed: true } : c
          );
  
          setGameState((prevState) => ({
            ...prevState,
            cells: updatedMatchedCells,
            selectedCells: [], // Clear the selected cells
          }));
        }
      }
    }
  };

  const isGameComplete = gameState.cells.every((cell) => cell.revealed);

  const resetGame = () => {
    setGameState(initialGameState);
  };

  useEffect(() => {
    if (gameState.selectedCells.length === 2) {
      document.body.style.pointerEvents = 'none';

      const [cell1, cell2] = gameState.selectedCells;

      if (cell1.shape === cell2.shape && cell1.color === cell2.color) {
        const updatedCells = gameState.cells.map((cell) =>
          cell === cell1 || cell === cell2 ? { ...cell, revealed: true } : cell
        );

        setGameState((prevState) => ({
          ...prevState,
          cells: updatedCells,
          selectedCells: [], 
        }));

        setTimeout(() => {
          document.body.style.pointerEvents = 'auto';
        }, 1000);
      } else {
        setTimeout(() => {
          const updatedCells = gameState.cells.map((cell) =>
            cell === cell1 || cell === cell2 ? { ...cell, revealed: false } : cell
          );

          setGameState((prevState) => ({
            ...prevState,
            cells: updatedCells,
            selectedCells: [], 
          }));

          setTimeout(() => {
            document.body.style.pointerEvents = 'auto';
          }, 1000);
        }, 1000);
      }

      setGameState((prevState) => ({ ...prevState, attempts: prevState.attempts + 1 }));
    }
  }, [gameState.selectedCells, gameState.cells]);

  return (
    <>
    <Container>
      <Grid>
        {gameState.cells.map((cell, index) => (
          <Cell
            key={index}
            shape={cell.shape}
            id={cell.id}
            color={cell.color}
            handleClick={() => handleCellClick(cell)}
            revealed={cell.revealed}  />
        ))}
      </Grid>
      {isGameComplete && (
        <div>
          <p>Congratulations! You completed the game in {gameState.attempts} attempts.</p>
        </div>
      )}
    </Container>
    <NewGameButton onClick={resetGame}>New Game</NewGameButton>
    </>
    
  );
};

export default Board;