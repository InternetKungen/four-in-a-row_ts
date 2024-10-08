import prompt from '../helpers/prompt.js';
import { Player } from './Player.js';
import { Board } from './Board.js';
import { StartMenu } from './StartMenu.js';
import { MenuDrawer } from './MenuDrawer.js';
import { ComputerPlayer } from './ComputerPlayer.js';

export class Game {

  player1: Player | null = null;
  player2: Player | null = null; 
  board: Board | null = null;
  menuDrawer = new MenuDrawer();
  isRunning: boolean = true;


  constructor() {
    while (this.isRunning) {
      this.startMenu();
    }
  }

  startMenu(): void {
    const startMenu = new StartMenu();
    const choice = startMenu.select();
    switch (choice) {
      case 1:
        this.startPlayerVsPlayer();
        break;
      case 2:
        this.startPlayerVsComputer();
        break;
      case 3:
        this.startComputerVsComputer();
        break;
      case 4:
        console.log("Exiting game...");
        this.exitGame();
        break;
    }
  }

  startPlayerVsPlayer(): void {
    //draw menu player x
    this.menuDrawer.drawMenuPlayerX();
    this.player1 = new Player(prompt('Name of Player X: '), 'X');

    //draw menu player o
    this.menuDrawer.drawMenuPlayerO();
    this.player2 = new Player(prompt('Name of Player O: '), 'O');
    
    //draw board
    this.board = new Board();

    //start game
    this.start();
  }
  
  startPlayerVsComputer(): void {

    const difficulty: number = this.selectDifficulty();

    this.menuDrawer.drawMenuPlayerX();
    this.player1 = new Player(prompt('Name of Player X: '), 'X');
    this.player2 = new ComputerPlayer("Computer", 'O', difficulty);
    this.board = new Board();
    this.start();
  }

  startComputerVsComputer(): void {
    const difficulty1 = this.selectDifficulty();
    const difficulty2 = this.selectDifficulty();
    this.player1 = new ComputerPlayer("Copmuter 1", 'X', difficulty1);
    this.player2 = new ComputerPlayer("Computer 2", 'O', difficulty2);
    this.board = new Board();
    this.start();
  }

  selectDifficulty(): number {
    console.clear();
    console.log("= Select Difficulty =");
    console.log("");
    console.log("1. Easy");
    console.log("2. Medium");
    console.log("3. Hard");
    console.log("");
    return parseInt(prompt('Enter your choice: ')) || 1;
  }
  
  start(): void {
    if (!this.board || !this.isRunning) {
      return;
    }
    console.clear();
    this.board.render();
    this.gameLoop();
  }

  gameLoop(): void {
    if (!this.board) {
      return;
    }
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
      if (player) {
        let column: number;

        if (player instanceof ComputerPlayer) {
          console.log(`Computer is making its move...`);
          column = player.makeMove(this.board);
          this.delay(1000);
        } else {
          console.log(`Make your move, ${player.name}! ( ${player.color} )`);
          column = parseInt(prompt(
          `Input column number (1-${this.board.columns}): `)) - 1;
        } 
        // try to make the move
        //send current player color and column number
        this.board.moveManager.makeMove(player.color, column);
      } else {
        console.log('No player available');
      }
    }

    this.handleGameOver();
  }

  delay(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
    }
  }
  // Game is over
  handleGameOver(): void {
    if (!this.board) {
      return;
    }
      if (this.board.gameOver) {
        if (!this.board.isADraw) {
          // when the game is over
          console.clear();
          this.board.render();
          console.log(this.board.currentPlayerColor === 'X' ? `${this.player1?.name} wins!` : `${this.player2?.name} wins!`);
          console.log('Game over!');
        } else {
          // it's a draw
          console.clear();
          this.board.render();
          console.log('It\'s a draw!');
          console.log('Game over!');
        }
      }
    //Play again?
    console.log("Do you want to play again ?");
    console.log("1. Play again");
    console.log("2. Return to menu");
    console.log("3. Exit Game") //exit game - loops one more time..
    let playAgain = parseInt(prompt('Enter your choice: '));
    
    switch (playAgain) {
      case 1:
        this.resetGame();
        this.start();        
        break;
      case 2:
        this.startMenu();
        break;
      case 3: //exit game - loops one more time..
        console.log("Exiting game...");
        this.exitGame();
        break;
      default:
        console.log('Invalid choice. Try again...');
        this.handleGameOver();
      }
  }

  resetGame(): void {
    this.board = new Board();
    this.board.currentPlayerColor = 'X';
    this.board.gameOver = false;
    this.board.isADraw = false;
    this.board.winner = '';
  }

  exitGame(): void {
    console.log("Thank you for playing. Goodbye!");
    this.isRunning = false;
  }
}
  


