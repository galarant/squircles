class BootState extends Phaser.State {

  preload() {
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.trackParentInterval = 500;

    // load assets
    this.load.image("squircle_outline", "static/assets/app/squircle_outline.png");

    // load domless fonts
    this.load.bitmapFont("proxima_nova",
      "static/assets/domless/fonts/proxima_nova.png",
      "static/assets/domless/fonts/proxima_nova.xml");
  }

  create() {
    this.game.state.start("loading");
  }

}

export default BootState;
