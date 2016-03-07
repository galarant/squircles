class Squircle extends Phaser.Group {

  constructor(game, x, y, width, height) {

    //basic properties
    super(game);
    this.x = x;
    this.y = y;

    //add outline sprite
    this.outline_sprite = new Phaser.Sprite(game, 0, 0, "squircle_outline");
    this.outline_sprite.width = width;
    this.outline_sprite.height = height;
    this.outline_sprite.tint = Math.random() * 0xFFFFFF;
    this.add(this.outline_sprite);

    //add fill sprite
    this.fill_sprite = new Phaser.Sprite(game, 0, 0, "squircle_fill");
    this.fill_sprite.width = width;
    this.fill_sprite.height = height;
    this.fill_sprite.alpha = 0.1;
    this.fill_sprite.tint = this.outline_sprite.tint;
    this.add(this.fill_sprite);

    //input handling
    this.outline_sprite.inputEnabled = true;
    this.outline_sprite.events.onInputOver.addOnce(this.touched, this);
  }

  touched() {
    this.game.add.tween(this.fill_sprite).to(
      {"alpha": 1}, Phaser.Timer.SECOND * 0.25, "Linear", true);
  }

}

export default Squircle;
