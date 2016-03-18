import _ from "lodash";

import CellBlock from "./cell_block";

class CellBlockGroup extends Phaser.Group {

  constructor(game, grid, max_size,
      max_cells_per_cell_block, color=Math.random() * 0xFFFFFF) {
    super(game, grid);
    this.grid = grid;
    this.max_size = max_size;
    this.max_cells_per_cell_block= max_cells_per_cell_block;
    this.color = color;
    this.add_cell_blocks();
  }

  add_cell_blocks() {
    while(this.grid.empty_cells.length > 0 &&
        this.children.length < this.max_size) {

      let block_starting_cell = _.sample(this.grid.empty_cells);
      if (!block_starting_cell) {
        return;
      }

      let cb = new CellBlock(this.game, this,
          block_starting_cell, this.max_cells_per_cell_block, this.color);
      this.add(cb);
    }
  }
}

export default CellBlockGroup;
