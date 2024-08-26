export class Board {
  matrix: string[][];
  currentPlayerColor: string;
  gameOver: boolean;
  winner: boolean;
  isADraw: boolean;

  constructor(public rows: number = 6, public columns: number = 7) {
    
    this.matrix = Array.from({ length: rows }, () => Array(columns).fill(' '));

    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';

    // status of game (updated after each move)
    this.winner = false;
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
  
  makeMove(color: string, column: number) {

    // don't make any move if the game is over
    if (this.gameOver) { return false; }

    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }

    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }

    // check that the row and column are numbers - otherwise don't make the move
    if (isNaN(column)) { return false; }
    
    // check that the column is between 0 and 2 - otherwise don't make the move
    if (column < 0 || column >= this.matrix[0].length) { return false; }

    // check that the position is empty - otherwise don't make the move
    // if (this.matrix[column] !== ' ') { return false; }
  }
}