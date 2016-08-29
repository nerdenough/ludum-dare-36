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
    this.createBullets();

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

    this.initWeapons();
  }

  initWeapons() {
    this.weapons = [];
    this.weapons.push(new SingleBullet(this.game));
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

  shoot(player) {
    this.weapons[this.activeWeapon].fire(this);
  }
}
