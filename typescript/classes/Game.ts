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
    this.gameLoop();  // Kör spel-loopen
  }

  gameLoop(): void {
        // game loop - runs until the game is over
        while (!this.board.gameOver) {
            console.clear();
            this.board.render();
            let player = this.board.currentPlayerColor === 'X'
                ? this.player1 : this.player2;
            let column: number = parseInt(prompt(
                `Make your move ${player.color} ${player.name} - input column number (1-${this.board.columns}): `)
            );
            
            // try to make the move
            this.board.makeMove(player.color, column);
        }
    }
}
