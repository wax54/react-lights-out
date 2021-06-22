import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float between 0 and 1, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // now my initial board is an array containing nrows of arrays ncols long
    let initialBoard = Array.from({ length: nrows }).map( () => Array.from({ length: ncols}));
    // create array-of-arrays of true/false values based on chanceLightsStartOn
    initialBoard = initialBoard.map(row => 
      row.map(cell => 
        Math.random < chanceLightStartsOn
    ));

    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    //    this returns true only if every cell is false
    return board.every(row => row.every(cell => cell === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }
  if(hasWon){
  // if the game is won, just show a winning msg & render nothing else
    return <h1>You Won!</h1>
  }  else {
    // make table board
    return <div className="Board">
          </div>
    
  }
}

export default Board;
