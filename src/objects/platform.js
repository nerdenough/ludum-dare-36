class Platform extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.game = game;

    // Sprite
    this.anchor.setTo(0.5);
    this.scale.setTo(1);

    // Phsyics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.immovable = true;
  }
}
