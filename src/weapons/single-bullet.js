class SingleBullet extends Phaser.Group {
  constructor(game) {
    super(game, game.world, 'Single Bullet', false, true,
      Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 300;

    for (let i = 0; i < 64; i++) {
      this.add(new Bullet(game, 'bullet'), true);
    }
  }

  fire(source) {
    if (this.game.time.time < this.nextFire) {
      return;
    }

    let x = source.x;
    let y = source.y;

    this
      .getFirstExists(false)
      .fire(x, y, 90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
  }
}
