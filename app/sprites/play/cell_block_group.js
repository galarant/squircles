import _ from "lodash";

import CellBlock from "./cell_block";

class CellBlockGroup extends Phaser.Group {

  constructor(game, grid, max_size,
      max_cells_per_cell_block, color=Math.random() * 0xFFFFFF) {

    // construction
    super(game, grid);

    // init attribs
    this.grid = grid;
    this.max_size = max_size;
    this.max_cells_per_cell_block= max_cells_per_cell_block;
    this.color = color;
    this.status = "pending";
    this.activation_signal = new Phaser.Signal();

    // init methods
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
      cb.activation_signal.add(this.child_activated, this);
    }
  }

  child_activated() {
    if (_.every(this.children, "activated")) {
      this.status = "activated";
      this.activation_signal.dispatch();
      console.log("activated CBG:", this);
      this.grid.open_next_cbg();
      this.timer_visual();
      this.cbg_timer = this.game.time.events.add(Phaser.Timer.SECOND * 3,
                      this.deactivate, this);
    }
  }

  timer_visual() {
      this.game.add.tween(this).to({alpha: 0.1}, Phaser.Timer.SECOND * 3, "Linear", true);
  }

  deactivate() {
    this.status = "open";
    console.log(this, "status:", this.status);
    console.log("Children:", this.children);
    _.forEach(this.children, function(child) {
      child.deactivate();
      console.log("CBG child activated:", child.activated);
    });
    this.game.state.start("gameover");
  }

}

export default CellBlockGroup;
