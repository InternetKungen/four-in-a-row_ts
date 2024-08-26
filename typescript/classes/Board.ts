export class Board {
  matrix: string[][];
  currentPlayerColor: string;
  gameOver: boolean;
  winner: boolean;
  isADraw: boolean;

  constructor( public rows: number = 6, public columns: number = 7) {
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

}