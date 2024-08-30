import { Player } from './Player.js';
import { Board } from './Board.js';

export class ComputerPlayer extends Player {
  difficulty: number;

  constructor(name: string, color: string, difficulty: number) {
    super(name, color);
    this.difficulty = difficulty;
  }

  makeMove(board: Board): number {
    
    let column: number = 0;

    if (this.difficulty === 1) {
      // Easy - Randomly choose a column
      column = Math.floor(Math.random() * board.columns);
    } else if (this.difficulty === 2) {
      // Medium - Choose the first available column
      for (let i = 0; i < board.columns; i++) {
        if (board.matrix[0][i] === ' ') {
          column = i;
          break;
        }
      }
    } else {
      // Hard - Lets implement a more sofisticated strategy
      column = Math.floor(Math.random() * board.columns);
    }

    return column;
  }
}
