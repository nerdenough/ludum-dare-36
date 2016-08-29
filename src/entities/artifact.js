class Artifact extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
    this.game = game;
    this.bulletDelay = 200;
    this.lastBullet = 0;
    this.activeWeapon = 0;

    // Sprite
    this.anchor.setTo(0.5);
    this.scale.setTo(1);

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

    this.initWeapons();
  }

  initWeapons() {
    this.weapons = [];
    this.weapons.push(new SingleBullet(this.game));
    this.weapons.push(new LaserBeam(this.game));
  }

  shoot(player) {
    this.weapons[this.activeWeapon].fire(this);
  }
}
