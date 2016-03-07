import Squircle from "../sprites/play/squircle";
import Grid from "../sprites/play/grid";

class PlayState extends Phaser.State {

  preload() {
    // config input
    this.game.input.maxPointers = 1;

  }

  create() {

    // initialize game world
    this.game.world.setBounds(0, 0, this.game.camera.width, this.game.camera.height);
    //this.game.stage.backgroundColor = "#4488AA";

    // create test grid
    let test_grid = new Grid(this.game, 10);
  }

  update() {
    // foo
  }

}

export default PlayState;
