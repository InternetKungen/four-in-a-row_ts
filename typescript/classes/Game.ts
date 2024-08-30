import prompt from '../helpers/prompt.js';
import { Player } from './Player.js';
import { Board } from './Board.js';
import { StartMenu } from './StartMenu.js';
import { MenuDrawer } from './MenuDrawer.js';

export class Game {

  player1: Player | null = null;
  player2: Player | null = null; 
  board: Board | null = null;
  menuDrawer = new MenuDrawer();
  // validInput: boolean = false;


  constructor() {

    this.startMenu();

  }

  //Start Menu
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
        console.log("Exiting game...");
        return;
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
  
  startPlayerVsComputer(): void { //TODO: add computer player
    this.menuDrawer.drawMenuPlayerX();
    this.player1 = new Player(prompt('Name of Player X: '), 'X');
    this.player2 = new Player("Computer", 'O');
    this.board = new Board();
    this.start();
  }
  
  start(): void {
    if (!this.board) {
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
        let column: number = parseInt(prompt(
          `Make your move, ${player.name}! ( ${player.color} ) - Input column number (1-${this.board.columns}): `)) - 1;
          
        // try to make the move
        //send current player color and column number
        this.board.moveManager.makeMove(player.color, column);
      } else {
        console.log('No player available');
      }
    }

    this.handleGameOver();
  }

    // Game is over
  handleGameOver(): void {
    if(!this.board) {
      return;
    }
      if (this.board.gameOver) {
        if (!this.board.isADraw) {
          // when the game is over
          console.clear();
          this.board.render();
          console.log(this.board.currentPlayerColor === 'X' ? `${this.player1?.name} wins!` : `${this.player2?.name} wins!`);
          console.log('Game over!');
          // this.validInput = true;
        } else {
          // it's a draw
          console.clear();
          this.board.render();
          console.log('It\'s a draw!');
          console.log('Game over!');
        }
      }
      // while (!this.validInput) {
    //Play again?
    console.log("Do you want to play again ?");
    console.log("1. Play again");
    console.log("2. Return to menu");
    console.log("3. Exit Game")
    let playAgain = parseInt(prompt('Enter your choice: '));
      // if (playAgain !== 1) {
      //   this.startMenu(); // Start the game again
      // } else {
      //   this.board.reset();
      //   this.board = new Board();
      //   this.start();
      // }
      switch (playAgain) {
        case 1:
          this.board.currentPlayerColor = 'X';
          this.board.gameOver = false;
          this.board.isADraw = false;
          this.board.winner = '';
          this.board = new Board();
          this.start();
          
          break;
        case 2:
          this.startMenu();
          // this.validInput = true;
          break;
        case 3:
          console.log("Exiting game...");
          // this.validInput = true;
          break;
        default:
          console.log('Invalid choice. Try again...');
          this.handleGameOver();
        }
      }
    }
  


