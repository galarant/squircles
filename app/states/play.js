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

    // create grid
    let grid = new Grid(this.game, 5);
    this.game.grid = grid;
    this.subState = "playing";
  }

  update() {
    this.game.debug.text("fps: " + this.game.time.fps, 30, 15, "#00ff00");
    this.game.debug.text("Timer countdown:" + this.game.time.events.duration.toFixed(0), 30, 30);
    if (this.game.e2eUpdate) {
      this.game.e2eUpdate.call(this);
    }
  }

  gameOver() {
    let gameOverText = new Phaser.BitmapText(this.game, this.game.camera.width / 2,
                          this.game.camera.height / 2, "proxima_nova",
                          "GAME OVER\n\nTAP OR CLICK TO RESTART",
                          this.game.camera.width / 20, "center");
    this.gameOverModal = new Modal(this.game, gameOverText);
    this.gameOverModal.submitSignal.addOnce(this.restart, this);
    this.subState = "game_over";
  }

  restart() {
    this.game.state.start("play");
  }
}

export default PlayState;
