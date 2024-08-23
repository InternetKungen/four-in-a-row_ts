import prompt from '../helpers/prompt.js';

export class Game {

  constructor() {
  }

  start(): void {
    let name = prompt('Vad heter du? ');
    console.log(`Hej ${name}!`);
  }
}
1