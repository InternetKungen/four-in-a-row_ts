import { WinChecker } from './WinChecker.js';

export class Board {
  matrix: string[][];
  currentPlayerColor: string;
  gameOver: boolean;
  winner: string | null;
  isADraw: boolean;
  winChecker: WinChecker;

  constructor(public rows: number = 6, public columns: number = 7) {
    
    // set matrix to number of rows and columns
    this.matrix = Array.from({ length: rows }, () => Array(columns).fill(' '));

    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';

    this.winChecker = new WinChecker(this.matrix, this.rows, this.columns);

    // status of game (updated after each move)
    this.winner = null;
    this.isADraw = false;
    this.gameOver = false;
  }
  
  // render = output/draw something
  render() {
    // column numbers
    const columnNumbers = Array.from({ length: this.columns }, (_, i) => `  ${i + 1} `).join('');
    console.log(columnNumbers);
    
    console.log('-'.repeat(this.columns * 4) + '-');
    console.log(
      this.matrix.map(row =>
        row.map(cell => `| ${cell} `).join('') + '|'
      ).join('\n' + '-'.repeat(this.columns * 4) + '-\n')
    );
    console.log('-'.repeat(this.columns * 4) + '-\n');
  }
  
  makeMove(color: string, column: number): boolean {

    // don't make any move if the game is over
    if (this.gameOver) { return false; }

    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }

    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }

    // check that the column are numbers - otherwise don't make the move
    if (isNaN(column)) { return false; }
    
    // check that the column is between 0 and columns set - otherwise don't make the move
    if (column < 0 || column >= this.columns) { return false; }

    // loop through rows from bottom to top
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = this.currentPlayerColor;

        // check if someone has won or if it's a draw/tie and update properties
        // this.winCheck(row, column);

        //New Win Checker - return true if the player has won
        if (this.winChecker.winCheck(row, column, this.currentPlayerColor)) {
          this.gameOver = true;
          this.winner = this.currentPlayerColor;
        }

        // check if the board is full (if it's a draw)
        this.checkBoardFull();

        // change the current player color, if the game is not over
        if (!this.gameOver) {
          this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
        }

        return true;
      }
    }
    // if the column is full, don't make the move
    console.log('Column is full');
    return false;
  }

  //Testing class winChecker
  /*
  winCheck(row: number, column: number): void {
    
    const directions = [
      [[0, 1], [0, -1]],  // Horizontal
      [[1, 0], [-1, 0]],  // Vertical
      [[1, 1], [-1, -1]], // Diagonal down-right
      [[1, -1], [-1, 1]]  // Diagonal up-right
    ];

    // check if there are 4 in a row in any direction, if so, the player has won
    for (const [[x1, y1], [x2, y2]] of directions) {
      const count = 1 +
        this.countInDirection(row, column, x1, y1) +
        this.countInDirection(row, column, x2, y2);
      if (count >= 4) {
        this.winner = this.currentPlayerColor;
        this.gameOver = true;
        console.log(`${this.currentPlayerColor} has won!`);
        break;
      }
    }
  }
  
  // count the number of pieces in a direction
  countInDirection(row: number, column: number, rowDirection: number, columnDirection: number): number {
    let count = 0;
    let r = row + rowDirection; // row to check
    let c = column + columnDirection; // column to check
    while (
      r >= 0 && r < this.rows && // check if row are within bounds
      c >= 0 && c < this.columns && // check if column are within bounds
      this.matrix[r][c] === this.currentPlayerColor) { // check if the piece is the same color
        count++;
        r += rowDirection;
        c += columnDirection;
    }
    return count;
  }
*/

  // check if the board is full (for draw)
  checkBoardFull(): void {
    if (this.matrix.flat().every(cell => cell !== ' ')) {
      this.isADraw = true; // Do I need this?
      this.gameOver = true;
      console.log('It is a draw!');
    }
  }
}
