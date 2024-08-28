import prompt from "../helpers/prompt.js";

export class StartMenu {
  select(): number {
  
    console.clear();
    console.log("=== Four in a row ===");
    console.log("1. Player vs. Player");
    console.log("2. Player vs. Computer");
    console.log("3. Exit Game\n");

    const choice = parseInt(prompt("Enter your choice (1-3): "), 10);

    if (isNaN(choice) || choice < 1 || choice > 3) {
      console.log("Invalid choice. Try again...");
      // return this.select();
      // Wait for 0.4 seconds
      setTimeout(() => this.select(), 400);

      // return this.select();
      return -1;
    }
    return choice;
  }
}
