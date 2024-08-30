export class MenuDrawer {
  
  //draw menu player x/o
  drawMenuPlayerX(): void {
    console.clear();
    console.log("====  PLAYER  X  ====");
    console.log("");
    console.log("        X   x        ");
    console.log("          X          ");
    console.log("        x   X        ");
    console.log("");
  }

  drawMenuPlayerO(): void {
    console.clear();
    console.log("====  PLAYER  O  ====");
    console.log("");
    console.log("        O O O        ");
    console.log("        O   O        ");
    console.log("        O O O        ");
    console.log("");
  }
}