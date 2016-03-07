import Squircle from "../sprites/play/squircle";

class PlayState extends Phaser.State {

  preload() {
    // config input
    this.game.input.maxPointers = 1;

  }

  create() {

    // initialize game world
    this.game.world.setBounds(0, 0, this.game.camera.width, this.game.camera.height);
    this.game.stage.backgroundColor = "#4488AA";

    // create test squircle
    let test_squircle = new Squircle(this.game,
      this.game.world.centerX, this.game.world.centerY,
      100, 100);
  }

  update() {
    // foo
  }

}

export default PlayState;
