// import { WinChecker } from './WinChecker.js';
import { Board } from './Board.js';
export class MoveManager {

  constructor(private board: Board) {
    // WinChecker;
  }
  makeMove(color: string, column: number): boolean {

    // don't make any move if the game is over
    if (this.board.gameOver) { return false; }

    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }

    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.board.currentPlayerColor) { return false; }

    // check that the column are numbers - otherwise don't make the move
    if (isNaN(column)) { return false; }
    
    // check that the column is between 0 and columns set - otherwise don't make the move
    if (column < 0 || column >= this.board.columns) { return false; }

    // loop through rows from bottom to top
    for (let row = this.board.rows - 1; row >= 0; row--) {
      if (this.board.matrix[row][column] === ' ') {
        this.board.matrix[row][column] = this.board.currentPlayerColor;

        // check if someone has won or if it's a draw/tie and update properties
        // this.winCheck(row, column);

        //New Win Checker - return true if the player has won
        if (this.board.winChecker.winCheck(row, column, this.board.currentPlayerColor)) {
          this.board.gameOver = true;
          this.board.winner = this.board.currentPlayerColor;
        }

        // check if the board is full (if it's a draw)
        this.board.checkBoardFull();

        // change the current player color, if the game is not over
        if (!this.board.gameOver) {
          this.board.currentPlayerColor = this.board.currentPlayerColor === 'X' ? 'O' : 'X';
        }

        return true;
      }
    }
    // if the column is full, don't make the move
    console.log('Column is full');
    return false;
  }
}