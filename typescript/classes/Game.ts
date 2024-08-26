import prompt from '../helpers/prompt.js';
import { Player } from './Player.js';
import { Board } from './Board.js';

export class Game {

  player1: Player;
  player2: Player;
  board: Board;


  constructor() {

    //Start Menu
    this.startMenu();
    
    this.player1 = new Player(prompt('Name of Player 1: '), 'X');
    this.player2 = new Player(prompt('Name of Player 2: '), 'O');
    this.board = new Board();

  }

  startMenu(): void {
    console.clear();
    console.log("=== Four in a row ===");
    console.log("1. Player vs. Player");
    console.log("2. Player vs. Computer");
    console.log("3. Exit Game");

    const choice = prompt("Enter your choice (1-3): ");

      switch (choice) {
        case '1':
          this.startPlayerVsPlayer();
          break;
        case '2':
          this.startPlayerVsComputer();
          break;
        case '3':
          console.log("Exiting game...");
          break;
        default:
          console.log("Invalid choice. Try again...");
          this.startMenu();
          break;
      }
    }
  
  startPlayerVsPlayer(): void {
    this.player1 = new Player(prompt('Name of Player 1: '), 'X');
    this.player2 = new Player(prompt('Name of Player 2: '), 'O');
    this.board = new Board();
    this.start();
  }
  
  startPlayerVsComputer(): void {
    this.player1 = new Player(prompt('Name of Player 1: '), 'X');
    this.player2 = new Player("Computer", 'O');
    this.board = new Board();
    this.start();
  }
  
  start(): void {
    console.clear();
    this.board.render();
    this.gameLoop();
  }

  gameLoop(): void {
        // game loop - runs until the game is over
        while (!this.board.gameOver) {
          console.clear();
          this.board.render();

          //Set current player
          let player = this.board.currentPlayerColor === 'X'
          ? this.player1 : this.player2;
        
          //Ask player for move, and pass it to makeMove as column number,
          //board colums are 1,2,3,4,5,6,7, but also albe to be dynamic.
          // remove 1 from column number to match array index
          let column: number = parseInt(prompt(
              `Make your move ( ${player.color} ) ${player.name} - input column number (1-${this.board.columns}): `)) - 1;
            
          // try to make the move
          //send current player color and column number
          this.board.makeMove(player.color, column);
        }
    }
}