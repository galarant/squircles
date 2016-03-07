import _ from "lodash";

import Squircle from "./squircle";

class Grid extends Phaser.Group {

  constructor(game, cells_per_row=4) {

    // basic properties
    super(game, game.world);
    let width = _.min([game.world.width, game.world.height]);
    let height = width;

    // add cells
    this.cells_per_row = cells_per_row;
    this.num_rows = cells_per_row;
    this.cell_width = width / cells_per_row;
    this.cell_height = this.cell_width;
    this.add_cells();

    this.x = game.world.centerX - this.width / 2;
    this.y = game.world.centerY - this.height / 2;

  }

  add_cells() {
    // set up iterator vars
    let grid = this;
    let pos = new Phaser.Point(0,0);

    // create cells
    _.times(grid.num_rows, function() {
      _.times(grid.cells_per_row, function() {
        let cell = new Squircle(grid.game,
          pos.x, pos.y, grid.cell_width, grid.cell_height);
        grid.add(cell);
        pos.x += grid.cell_width;
      });
      pos.x = 0;
      pos.y += grid.cell_height;
    });
  }
}

export default Grid;
