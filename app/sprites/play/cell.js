import _ from "lodash";

import Squircle from "./squircle";

class Cell extends Phaser.Group {

  constructor(game, grid, index,
      x, y, width, height,
      squircle=null, color=0xFFFFFF) {

    // construction
    super(game, grid);

    // init attribs
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.color = color;
    this.cell_width = width;
    this.cell_height = height;
    this.index = new Phaser.Point(index.x, index.y);
    this.squircle = squircle;
    this.activated = false;
    this.activation_signal = new Phaser.Signal();
  }

  add_squircle() {
    this.squircle = new Squircle(this.game, this,
        0, 0, this.cell_width, this.cell_height, this.color);
    this.add(this.squircle);
  }

  get adjacent_cells() {
    let neighbors = [
      this.grid.cell({x: this.index.x, y: this.index.y - 1}),
      this.grid.cell({x: this.index.x, y: this.index.y + 1}),
      this.grid.cell({x: this.index.x - 1, y: this.index.y}),
      this.grid.cell({x: this.index.x + 1, y: this.index.y})];
    return _.filter(neighbors, function(o){
      return !!o;
    });
  }

  activate() {
    console.log("activated", this);
    this.activated = true;
    this.activation_signal.dispatch();
  }

}

export default Cell;
