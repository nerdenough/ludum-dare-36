class Player extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.game = game;
    this.health = 100;
    this.alive = true;
    this.velX = 500;

    // Sprite
    this.anchor.setTo(0.5);
    this.scale.setTo(1);

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 4000;
    this.body.collideWorldBounds = true;
  }

  update() {
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  moveLeft() {
    this.body.velocity.x = -this.velX;
  }

  moveRight() {
    this.body.velocity.x = this.velX;
  }

  stop() {
    this.body.velocity.x = 0;
  }

  jump() {
    if (this.body.touching.down || this.body.onFloor()) {
      this.body.velocity.y = -1200;
    }
  }
}
