import _ from "lodash";

import Cell from "./cell";

class CellBlock extends Phaser.Group {

  constructor(game, grid, max_size, color) {
    super(game);
    this.grid = grid;
    this.max_size = max_size;
    this.cells = [];
    this.color = color;
    this.add_cells();
  }

  add_cells() {
    let cell = _.sample(this.grid.empty_cells);

    if (!cell) {
      return;
    }

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
}

export default CellBlock;
