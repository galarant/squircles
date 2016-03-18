import _ from "lodash";

import Cell from "./cell";

class CellBlock extends Phaser.Group {

  constructor(game, cell_block_group, starting_cell, max_size, color) {
    super(game, cell_block_group);
    this.starting_cell = starting_cell;
    this.x = starting_cell.x;
    this.y = starting_cell.y;
    this.max_size = max_size;
    this.color = color;
    this.cells = [];
    this.add_cells();
    this.group_cells();
  }

  add_cells() {
    let cell = this.starting_cell;

    while (this.cells.length < this.max_size) {
      this.add_cell(cell);
      let open_neighbors = _.filter(cell.adjacent_cells, function(neighbor) {
        return !neighbor.squircle;
      });
      if (open_neighbors.length > 0) {
        cell = _.sample(open_neighbors);
      } else {
        return;
      }
    }
  }

  add_cell(cell) {
    cell.color = this.color;
    cell.add_squircle();
    this.cells.push(cell);
  }

  group_cells() {
    // set the pos of this group
    this.x = _.minBy(this.cells, "x").x;
    this.y = _.minBy(this.cells, "y").y;
    console.log("cell block:", this);

    // overwrite the pos of each cell
    // with the Group-relative value
    // then add it to the Group
    let cell_block = this;
    _.forEach(this.cells, function(cell) {
      cell.x = cell.x - cell_block.x;
      cell.y = cell.y - cell_block.y;
      cell_block.add(cell);
    });
  }
}

export default CellBlock;
