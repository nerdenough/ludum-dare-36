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

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 4000;
    this.body.collideWorldBounds = true;
    this.body.setSize(16, 30, 2, 1);

    this.jumpSound = game.add.audio('jump');

    this.weapon = new SingleBullet(this.game);
  }

  update() {
    if (this.health <= 0) {
      this.alive = false;
      this.tint = 0xffffffff;
    }

    if (this.alive) {
      if (this.flashing && this.game.time.now > this.flashTimer) {
        this.flashing = false;
        this.tint = 0xffffffff;
      }
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
      this.body.velocity.y = -1200;
      this.jumpSound.play();
    }
  }

  flash() {
    this.flashing = true;
    this.flashTimer = this.game.time.now + 1000;
    this.tint = 0xff808080;
  }

  takeDamage(player, bullet) {
    bullet.kill();

    if (!player.flashing) {
      player.flash();
      player.health -= 0;
    }
  }
}
