import { WinChecker } from './WinChecker.js';
import { MoveManager } from './MoveManager.js';

export class Board {
  matrix: string[][];
  currentPlayerColor: string;
  gameOver: boolean;
  winner: string | null;
  isADraw: boolean;
  winChecker: WinChecker;
  moveManager: MoveManager;

  constructor(public rows: number = 6, public columns: number = 7) {
    
    // set matrix to number of rows and columns
    this.matrix = Array.from({ length: rows }, () => Array(columns).fill(' '));

    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';

    this.winChecker = new WinChecker(this.matrix, this.rows, this.columns);

    this.moveManager = new MoveManager(this);

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

  // check if the board is full (for draw)
  checkBoardFull(): void {
    if (this.matrix.flat().every(cell => cell !== ' ')) {
      this.isADraw = true; 
      this.gameOver = true;
      console.log('It is a draw!');
    }
  }
}
