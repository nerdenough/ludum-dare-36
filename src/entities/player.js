class Player extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
    this.game = game;
    this.health = 100;
    this.deathAnimationPlayed = false;
    this.alive = true;
    this.velX = 500;
    this.sf = 3;
    this.flashing = false;
    this.flashTimer = 0;

    // Sprite
    this.animations.add('idle', [0, 1], true);
    this.animations.add('run', [5, 6, 7, 8], true);
    this.animations.add('death', [10, 11, 12, 13, 14], true);
    this.anchor.setTo(0.4);
    this.scale.setTo(-this.sf, this.sf);
    this.createBullets();

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 4000;
    this.body.collideWorldBounds = true;
    this.body.setSize(16, 30, 2, 1);
  }

  createBullets() {
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
  }

  update() {
    if (this.health <= 0) {
      this.alive = false;
      this.tint = 0xffffffff;
    }

    if (this.alive) {
      if (this.game.input.activePointer.isDown) {
        this.shoot();
      }

      if (this.flashing && this.game.time.now > this.flashTimer) {
        this.flashing = false;
        this.tint = 0xffffffff;
      }

      if (this.game.input.x < this.x - this.game.camera.x) {
        this.scale.x = this.sf;
      } else {
        this.scale.x = -this.sf;
      }
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
      this.body.velocity.y = -1400;
    }
  }

  shoot() {
    let bullet = this.bullets.getFirstExists(false);
    if (bullet) {
      bullet.reset(this.body.x + 32, this.body.y + 32);
      this.game.physics.arcade.moveToPointer(bullet, 800);
    }
  }

  flash() {
    this.flashing = true;
    this.flashTimer = this.game.time.now + 1000;
    this.tint = 0xff808080;
  }
}
