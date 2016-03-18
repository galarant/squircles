class LoadingState extends Phaser.State {

  preload() {
    this.ready = false;
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    // add loading text
    this.loadingText = new Phaser.BitmapText(this.game, this.game.world.centerX,
        this.game.world.centerY,"proxima_nova", "LOADING");
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.world.add(this.loadingText);

    // add loading squircle outline sprite
    this.loadingSquircle = new Phaser.Sprite(this.game, this.game.world.centerX,
        this.game.world.centerY, "squircle_outline");
    this.loadingSquircle.anchor.setTo(0.5, 0.5);
    let area = this.game.world.height * this.game.world.width;
    this.loadingSquircle.width = Math.sqrt(area/20);
    this.loadingSquircle.height = this.loadingSquircle.width;
    this.loadingText.addChild(this.loadingSquircle);
    this.world.add(this.loadingSquircle);

    // ** LOAD APP-SPECIFIC ASSETS ** //

    // load app image assets
    this.load.image("squircle_fill", "static/assets/app/squircle_fill.png");

    // ** LOAD DOMLESS PACKAGE ASSETS ** //

    // load domless button image assets
    this.load.image("button_squircle", "static/assets/domless/images/button/squircle.png");
    this.load.image("button_rectircle", "static/assets/domless/images/button/rectircle.png");
    this.load.image("button_squircle_fill", "static/assets/domless/images/button/squircle_fill.png");

    // load domless modal image assets
    this.load.image("modal_bg", "static/assets/domless/images/modal/bg.png");

  }

  create() {

  }

  update() {
    this.loadingSquircle.angle += 1;

    if(this.ready) {
      this.game.state.start("play");
    }
  }

  onLoadComplete() {
    this.ready = true;
  }

}

export default LoadingState;
