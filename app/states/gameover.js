import Modal from "../interface/modal";
import GameOverScreen from "../interface/gameoverscreen";

class GameOverState extends Phaser.State {

  preload() {
  }

  create() {
    let gameOverModal = new Modal(this.game,
                        new GameOverScreen(this.game));
  }

  update() {
  }

}

export default GameOverState;
