// import prompt from './helpers/prompt.js';

// let name = prompt('Vad heter du? ');
// console.log(`Hej ${name}!`);


//import { Game } from './classes/Game.js' - js, bacause ts will be converted, and it will run from ./dist
import { Game } from './classes/Game.js';

const game = new Game();
game.start();