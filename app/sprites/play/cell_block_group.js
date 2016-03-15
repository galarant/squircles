import _ from "lodash";

import CellBlock from "./cell_block";

class CellBlockGroup extends Phaser.Group {

  constructor(game, grid, max_size,
      max_cells_per_cell_block, color=Math.random() * 0xFFFFFF) {
    super(game);
    this.grid = grid;
    this.max_size = max_size;
    this.max_cells_per_cell_block= max_cells_per_cell_block;
    this.color = color;
    this.cell_blocks = [];
    this.add_cell_blocks();
  }

  add_cell_blocks() {
    while(this.grid.empty_cells.length > 0 && this.cell_blocks.length < this.max_size) {
      this.cell_blocks.push(new CellBlock(this.game, this.grid,
          this.max_cells_per_cell_block, this.color));
    }
  }
}

export default CellBlockGroup;
