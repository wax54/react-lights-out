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

function Board({ nrows=4, ncols=4, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // my initial board is an array containing nrows 
    //    of arrays ncols long each either true or false 
    //    based on math.random and chanceLightsStartOn
    let initialBoard = Array.from({ length: nrows }).map(() => (
            Array.from({ length: ncols }).map(cell =>
                Math.random() < chanceLightStartsOn
                )
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

      // Make a (deep) copy of the oldBoard
      const copy = oldBoard.map( row => row.map( cell => cell));

      // in the copy, flip this cell and the cells around it
      flipCell(x,y, copy); // the cell
      flipCell(x, y + 1, copy); // the cell above
      flipCell(x, y - 1, copy); // the cell below
      flipCell(x + 1, y, copy); // the cell to the right
      flipCell(x - 1, y, copy); // the cell to the left
      
      // return the copy
      return copy;
    });
  }
  if(hasWon()){
  // if the game is won, just show a winning msg & render nothing else
    return <h1>You Won!</h1>
  }  else {
    // make table board
    return (
    <div className="Board">
        { board.map((row, y) => 
          <div className="Board-row">
            { row.map((cell, x) =>
              <Cell isLit={cell} flipCellsAroundMe={() => flipCellsAround(`${x}-${y}`)} />
            ) }
            </div> 
        ) }
    </div>
    )
    
  }
}

export default Board;
