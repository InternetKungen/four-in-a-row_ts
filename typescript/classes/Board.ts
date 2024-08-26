export class Board {
  matrix: string[][];
  currentPlayerColor: string;
  gameOver: boolean;
  winner: string | null;
  isADraw: boolean;

  constructor(public rows: number = 6, public columns: number = 7) {
    
    // set matrix to number of rows and columns
    this.matrix = Array.from({ length: rows }, () => Array(columns).fill(' '));

    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';

    // status of game (updated after each move)
    this.winner = null;
    this.isADraw = false;
    this.gameOver = false;
  }
  
  // render = output/draw something
  render() {
    console.log('-'.repeat(this.columns * 4));
    console.log(
      this.matrix.map(row =>
        row.map(cell => `| ${cell} `).join('') + '|'
      ).join('\n' + '-'.repeat(this.columns * 4) + '\n')
    );
    console.log('-'.repeat(this.columns * 4));
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

    // check that the position is empty - otherwise don't make the move
    // if (this.matrix[column] !== ' ') { return false; }

    // loop through rows from bottom to top
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = this.currentPlayerColor;

        // check if someone has won or if it's a draw/tie and update properties
        this.winCheck(row, column);
        // this.isADraw = this.drawCheck();

        // the game is over if someone has won or if it's a draw
        // this.gameOver = this.winner || this.isADraw;

        // change the current player color
        this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';

        return true;
      }
    }
    // if the column is full, don't make the move
    return false;
  }

  winCheck(row: number, column: number): void {
    
    // check if there are 4 in a row in any direction
    const directions = [
      [[0, 1], [0, -1]],  // Horizontal
      [[1, 0], [-1, 0]],  // Vertical
      [[1, 1], [-1, -1]], // Diagonal down-right
      [[1, -1], [-1, 1]]  // Diagonal up-right
    ];

    // check if there are 4 in a row in any direction
    for (const [[x1, y1], [x2, y2]] of directions) {
      const count = 1 +
        this.countInDirection(row, column, x1, y1) +
        this.countInDirection(row, column, x2, y2);
      if (count >= 4) {
        this.winner = this.currentPlayerColor;
        this.gameOver = true;
        break;
      }
    }
  }
    
  countInDirection(row: number, column: number, rowDirection: number, columnDirection: number): number {
    let count = 0;
    let r = row + rowDirection;
    let c = column + columnDirection;
    while (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.matrix[r][c] === this.currentPlayerColor) {
      count++;
        r += rowDirection;
        c += columnDirection;
    }
    return count;
  }
}
