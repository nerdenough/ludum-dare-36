class LaserBeam {
  constructor(game) {
    this.game = game;
    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 20;
  }

  fire(source) {
    if (this.game.time.time < this.nextFire) {
      return;
    }

    let x = source.x;
    let y = source.y;

    this.nextFire = this.game.time.time + this.fireRate;
  }
}
