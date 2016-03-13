import _ from "lodash";

import Squircle from "./squircle";
import Cell from "./cell";
import CellBlock from "./cell_block";

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
    this.cells = [];
    this.cell_blocks = [];
    this.make_cells();

    this.x = game.world.centerX - this.width / 2;
    this.y = game.world.centerY - this.height / 2;

  }

  // Add a bunch of empty Cells, then populate them into CellGroups.
  // Populating them involves adding a Squircle to each Cell.
  make_cells() {
    // set up iterator vars
    let grid = this;
    let cell_index = new Phaser.Point(0,0);
    let pos = new Phaser.Point(0,0);

    // initialize cells
    _.times(grid.num_rows, function() {
      _.times(grid.cells_per_row, function() {
        let cell = new Cell(grid.game, grid, cell_index,
            pos.x, pos.y, grid.cell_width, grid.cell_height);
        grid.add(cell);
        grid.cells.push(cell);
        pos.x += grid.cell_width;
        cell_index.x += 1;
      });
      pos.x = 0;
      cell_index.x = 0;
      pos.y += grid.cell_height;
      cell_index.y += 1;
    });
    this.populate_cells();
  }

  populate_cells() {
    // populate cells with squircles
    // build cell_blocks
    while (this.empty_cells.length > 0) {
      this.cell_blocks.push(new CellBlock(this.game, this));
    }
  }

  cell(cell_index) {
    //return a cell by its index, or undefined
    return _.find(this.cells, function(cell) {
      return cell.index.x === cell_index.x && cell.index.y === cell_index.y;
    });
  }

  get empty_cells() {
    return _.filter(this.cells, function(cell) {
      return !cell.squircle;
    });
  }

  get populated_cells() {
    return _.filter(this.cells, function(cell) {
      return !!cell.squircle;
    });
  }
}

export default Grid;
