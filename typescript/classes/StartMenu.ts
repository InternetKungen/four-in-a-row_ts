import prompt from "../helpers/prompt.js";

export class StartMenu {
  select(): number {
  
    console.clear();
    console.log("=== Four in a row ===");
    console.log("");
    console.log("1. Player vs. Player");
    console.log("2. Player vs. Computer");
    console.log("3. Computer vs. Computer");
    console.log("4. Exit Game");
    console.log("");

    const choice = parseInt(prompt("Enter your choice (1-4): "));

    if (isNaN(choice) || choice < 1 || choice > 4) {
      console.log("Invalid choice. Try again...");
      setTimeout(() => this.select(), 400);
      
      return -1;
    }
    return choice;
  }
}
