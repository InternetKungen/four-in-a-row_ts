import { Player } from './Player.js';
import { Board } from './Board.js';

export class ComputerPlayer {
  difficulty: number;
  player: Player;
  name: string;
  color: string;

  constructor(name: string, color: string, difficulty: number) {
    this.player = new Player(name, color);
    this.name = name;
    this.color = color;
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
      column = this.defensiveMove(board);
      if (column === -1) {
        column = this.offensiveMove(board);
      }
      if (column === -1) {
        column = this.randomMove(board);
      }
    }

    return column;
  }

  defensiveMove(board: Board): number {
    const opponentColor = this.player.color === 'X' ? 'O' : 'X';
    return this.findBestMove(board, opponentColor, 3);
  }

  offensiveMove(board: Board): number {
    return this.findBestMove(board, this.player.color, 3);
  }

  findBestMove(board: Board, currentPlayerColor: string, threshold: number): number {
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.columns; col++) {
        if (board.matrix[row][col] === currentPlayerColor) {
          const directions = [
            [[0, 1], [0, -1]],  // Horizontal
            [[1, 0], [-1, 0]],  // Vertical
            [[1, 1], [-1, -1]], // Diagonal down-right
            [[1, -1], [-1, 1]]  // Diagonal up-right
          ];

          for (const [[x1, y1], [x2, y2]] of directions) {
            const count = 1 +
              this.countInDirection(board, row, col, x1, y1, currentPlayerColor) +
              this.countInDirection(board, row, col, x2, y2, currentPlayerColor);

            if (count >= threshold) {
              const move = this.findBlockingMove(board, row, col, x1, y1, x2, y2);
              if (move !== -1) {
                return move;
              }
            }
          }
        }
      }
    }
    return -1;
  }

  findBlockingMove(board: Board, row: number, col: number, x1: number, y1: number, x2: number, y2: number): number {
    const potentialMoves = [
      [row + x1, col + y1],
      [row + x2, col + y2]
    ];

    for (const [r, c] of potentialMoves) {
      if (r >= 0 && r < board.rows && c >= 0 && c < board.columns) {
        if (board.matrix[r][c] === ' ' && (r === board.rows - 1 || board.matrix[r + 1][c] !== ' ')) {
          return c;
        }
      }
    }
    return -1;
  }

  countInDirection(board: Board, row: number, column: number, rowDirection: number, columnDirection: number, currentPlayerColor: string): number {
    let count = 0;
    let r = row + rowDirection;
    let c = column + columnDirection;

    while (
      r >= 0 && r < board.rows &&
      c >= 0 && c < board.columns &&
      board.matrix[r][c] === currentPlayerColor) {
      count++;
      r += rowDirection;
      c += columnDirection;
    }
    return count;
  }

  randomMove(board: Board): number {
    const availableColumns = [];
    for (let i = 0; i < board.columns; i++) {
      if (board.matrix[0][i] === ' ') {
        availableColumns.push(i);
      }
    }
    return availableColumns[Math.floor(Math.random() * availableColumns.length)];
  }

  firstAvailableColumn(board: Board): number {
    for (let i = 0; i < board.columns; i++) {
      if (board.matrix[0][i] === ' ') {
        return i;
      }
    }
    return -1;
  }
}