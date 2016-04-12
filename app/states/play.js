import Grid from "../sprites/play/grid";
import Modal from "../interface/modal";

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
    new Grid(this.game, 4);
  }

  update() {
    // foo
    this.game.debug.text("fps: " + this.game.time.fps, 2, 14, "#00ff00");
    this.game.debug.text("Timer countdown:" + this.game.time.events.duration.toFixed(0), 32, 32);
  }

  gameOver() {
    this.gameOverText = new Phaser.BitmapText(this.game, this.game.camera.width / 2,
                          this.game.camera.height / 2, "proxima_nova",
                          "GAME OVER\n\nTAP OR CLICK TO RESTART",
                          this.game.camera.width / 20, "center");
    let gameOverModal = new Modal(this.game, this.gameOverText);
    gameOverModal.submitSignal.addOnce(this.restart, this);
  }

  restart() {
    this.game.state.start("play");
  }
}

export default PlayState;
