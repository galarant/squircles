import Grid from "../sprites/play/grid";

class PlayState extends Phaser.State {

  preload() {
    // config input
    this.game.input.maxPointers = 1;
    this.game.time.advancedTiming = true;

  }

  create() {

    // initialize game world
    this.game.world.setBounds(0, 0, this.game.camera.width, this.game.camera.height);
    //this.game.stage.backgroundColor = "#4488AA";

    // create test grid
    new Grid(this.game, 10);
  }

  update() {
    // foo
    this.game.debug.text("fps: " + this.game.time.fps, 2, 14, "#00ff00");
  }

}

export default PlayState;
