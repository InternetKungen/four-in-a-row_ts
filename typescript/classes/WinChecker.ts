export class WinChecker {

  constructor(private matrix: string[][], private rows: number, private columns: number) { }

  winCheck(row: number, column: number, currentPlayerColor: string): boolean | void {
    
    const directions = [
      [[0, 1], [0, -1]],  // Horizontal
      [[1, 0], [-1, 0]],  // Vertical
      [[1, 1], [-1, -1]], // Diagonal down-right
      [[1, -1], [-1, 1]]  // Diagonal up-right
    ];

    // check if there are 4 in a row in any direction, if so, the player has won
    for (const [[x1, y1], [x2, y2]] of directions) {
      const count = 1 +
        this.countInDirection(row, column, x1, y1, currentPlayerColor) +
        this.countInDirection(row, column, x2, y2, currentPlayerColor);
      if (count >= 4) {
        // this.winner = this.currentPlayerColor;
        // this.gameOver = true;
        // console.log(`${this.currentPlayerColor} has won!`);
        // break;
        return true;
      }
    }
  }
  // count the number of pieces in a direction
  countInDirection(row: number, column: number, rowDirection: number, columnDirection: number, currentPlayerColor: string): number {
    let count = 0;
    let r = row + rowDirection; // row to check
    let c = column + columnDirection; // column to check
    while (
      r >= 0 && r < this.rows && // check if row are within bounds
      c >= 0 && c < this.columns && // check if column are within bounds
      this.matrix[r][c] === currentPlayerColor) { // check if the piece is the same color
      count++;
      r += rowDirection;
      c += columnDirection;
    }
    return count;
  }
}

