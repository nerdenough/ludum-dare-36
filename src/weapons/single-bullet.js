class SingleBullet extends Phaser.Group {
  constructor(game) {
    super(game, game.world, 'Single Bullet', false, true,
      Phaser.Physics.ARCADE);
    this.game = game;

    this.nextFire = 0;
    this.bulletSpeed = this.game.rnd.integerInRange(700, 900);
    this.fireRate = this.game.rnd.integerInRange(900, 1100);

    for (let i = 0; i < 64; i++) {
      this.add(new Bullet(game, 'bullet'), true);
    }

    this.shoot = this.game.add.audio('shoot');
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
    this.shoot.play();

    this.nextFire = this.game.time.time + this.fireRate;
  }

  fireToPointer(source) {
    if (this.game.time.time < this.nextFire) {
      return;
    }

    let x = source.x;
    let y = source.y;

    let bullet = this.getFirstExists(false);
    if (bullet) {
      bullet.reset(x, y);
      this.game.physics.arcade.moveToPointer(bullet, 1400);
      this.shoot.play();
    }

    this.nextFire = this.game.time.time + this.fireRate;
  }
}
