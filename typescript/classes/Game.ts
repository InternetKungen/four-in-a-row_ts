import prompt from '../helpers/prompt.js';
import { Player } from './Player.js';
import { Board } from './Board.js';

export class Game {

  player1: Player;
  player2: Player;
  board: Board;

  constructor() {
    this.player1 = new Player(prompt('Name of Player 1: '), 'X');
    this.player2 = new Player(prompt('Name of Player 2: '), 'O');
    this.board = new Board();
  }

  start(): void {
    console.clear();
    console.log(`Hej ${this.player1} och ${this.player2}!`);
    this.board.render();
  }
}
