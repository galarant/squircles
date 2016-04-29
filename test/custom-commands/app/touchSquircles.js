import PhaserCommand from "../lib/phaserCommand";
let _ = require("lodash");

class TouchSquircles extends PhaserCommand {
  constructor() {
    super();
  }

  phaserCustomCommand(ms, done) {
    this.game = window.Phaser.GAMES[0];
    this.game.stage.disableVisibilityChange = true;

    _.forEach(this.game.grid.cells, function(cell) {
      cell.squircle.touched();
    });

    done();
  }
}

module.exports = TouchSquircles;
