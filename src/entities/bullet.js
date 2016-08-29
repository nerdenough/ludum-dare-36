class Bullet extends Phaser.Sprite {
  constructor(game, asset) {
    super(game, 0, 0, asset);

    this.anchor.set(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
  }

  fire(x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed,
      this.body.velocity);

    this.angle = angle;
    this.body.gravity.set(gx, gy);
  }
}
