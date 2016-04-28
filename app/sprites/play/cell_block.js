import _ from "lodash";

class CellBlock extends Phaser.Group {

  constructor(game, cell_block_group, starting_cell, max_cells, color) {

    // construction
    super(game, cell_block_group);

    // init attribs
    this.starting_cell = starting_cell;
    this.x = starting_cell.x;
    this.y = starting_cell.y;
    this.max_cells = max_cells;
    this.color = color;
    this.activated = false;
    this.activation_signal = new Phaser.Signal();
    this.cells = [];

    // init methods
    this.add_cells();
    this.group_cells();
  }

  add_cells() {
    let cell = this.starting_cell;

    while (this.cells.length < this.max_cells) {
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
    this.add(cell);
    this.cells.push(cell);
    cell.activation_signal.add(this.child_activated, this);
  }

  group_cells() {
    // set the pos of this group
    this.x = _.minBy(this.cells, "x").x;
    this.y = _.minBy(this.cells, "y").y;

    // overwrite the pos of each cell
    // with the Group-relative value
    // then add it to the Group
    let cell_block = this;
    _.forEach(this.cells, function(cell) {
      cell.x = cell.x - cell_block.x;
      cell.y = cell.y - cell_block.y;
    });
  }

  child_activated() {
    if (_.every(this.cells, "activated")) {
      this.activated = true;
      this.activation_signal.dispatch();
    }
  }

  deactivate() {
    this.activated = false;
    _.forEach(this.children, function(child) {
      child.deactivate();
    });
  }

}

export default CellBlock;
