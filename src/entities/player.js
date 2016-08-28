class Player extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.game = game;
    this.health = 100;
    this.alive = true;
    this.velX = 500;
    this.sf = 3;

    // Sprite
    this.animations.add('idle', [0, 1], true);
    this.animations.add('run', [5, 6, 7, 8], true);
    this.anchor.setTo(0.5);
    this.scale.setTo(this.sf);

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
    this.scale.x = this.sf;
  }

  moveRight() {
    this.body.velocity.x = this.velX;
    this.scale.x = -this.sf;
  }

  stop() {
    this.body.velocity.x = 0;
  }

  jump() {
    if (this.body.touching.down || this.body.onFloor()) {
      this.body.velocity.y = -1000;
    }
  }
}
