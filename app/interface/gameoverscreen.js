class GameOverScreen extends Phaser.Group {

  constructor(game, submitSignal) {

    super(game, game.world);

    //this.submitSignal = new Phaser.Signal();

    this.gameOverText = new Phaser.BitmapText(this.game, game.camera.width / 2,
                            game.camera.height / 2, "proxima_nova", "GAME OVER", 40);
    this.gameOverText.anchor.setTo(0.5, 0.5);
    this.add(this.gameOverText);

    this.restartText = new Phaser.BitmapText(this.game, 0, 0,
                       "proxima_nova", "RESTART", 40);
    this.restartText.anchor.setTo(0.5, 0.5);
    this.add(this.restartText);

    this.restartRectircle = new Phaser.Sprite(this.game, 0, 0,
                               "button_rectircle");
    this.restartRectircle.anchor.setTo(0.5, 0.5);
    this.restartText.addChild(this.restartRectircle);

    this.restartRectircle.inputEnabled = true;
    this.restartRectircle.events.onInputDown.add(this.restart, this);
    /*
    this.submitSignal.dispatch(this.restartRectircle.inputEnabled);
    this.submitSignal.addOnce(this.restart, this);
    console.log(this.submitSignal);
    */
  }

  restart() {
    console.log("restart function runs");
    this.game.state.start("play");
    //this.restartRectircle.input.onDown(this.game.state.start("play"));
  }
}

export default GameOverScreen;
