// import prompt from './helpers/prompt.js';

// let name = prompt('Vad heter du? ');
// console.log(`Hej ${name}!`);
//import { Game } from './classes/Game.js'; - skapar en instans av klassen - js för att ts konverteras och körs från ./dist
import { Game } from './classes/Game.js';

const game = new Game();
game.start();