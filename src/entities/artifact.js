class Artifact extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
    this.game = game;
    this.bulletDelay = 200;
    this.lastBullet = 0;
    this.activeWeapon = 0;

    // Sprite
    this.anchor.setTo(0.5);
    this.scale.setTo(4);
    this.animations.add('floating', [0, 1, 2, 3], true);

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

    this.initWeapons();
    this.animations.play('floating', 4, true);
  }

  initWeapons() {
    this.weapons = [];
    this.weapons.push(new SingleBullet(this.game));
    this.weapons.push(new LaserBeam(this.game));
  }

  moveTo(player) {
    if (player.x - 20 > this.x) {
      this.body.velocity.x = 200;
    } else if (player.x + 20 < this.x) {
      this.body.velocity.x = -200;
    } else {
      this.body.velocity.x = 0;
    }

    if (player.y - 280 < this.y) {
      this.body.velocity.y = -400;
    } else if (player.y - 320 > this.y) {
      this.body.velocity.y = 400;
    } else {
      this.body.velocity.y = 0;
    }
  }

  shoot(player) {
    this.weapons[this.activeWeapon].fire(this);
  }

  checkCollision(player) {
    game.physics.arcade.overlap(this.weapons[this.activeWeapon], player,
      player.takeDamage, null, this);
  }
}
