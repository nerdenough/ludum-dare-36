class ArtifactModule extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
    this.game = game;
    this.bulletDelay = 200;
    this.lastBullet = 0;
    this.activeWeapon = 0;
    this.velX = this.game.rnd.integerInRange(100, 200);
    this.velY = this.game.rnd.integerInRange(300, 400);
    this.offX = this.game.rnd.integerInRange(200, 300);
    this.offY = this.game.rnd.integerInRange(-40, 40);

    // Sprite
    this.anchor.setTo(0.5);
    this.scale.setTo(4);

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

  moveTo(player) {
    let leftSide = this.scale.x > 0;
    let offset = leftSide ? -this.offX : this.offX;

    if (player.x - 20 + offset > this.x) {
      this.body.velocity.x = this.velX;
    } else if (player.x + 20 + offset < this.x) {
      this.body.velocity.x = -this.velX;
    } else {
      this.body.velocity.x = 0;
    }

    if (player.y - 280 + this.offY < this.y) {
      this.body.velocity.y = -this.velY;
    } else if (player.y - 320 + this.offY > this.y) {
      this.body.velocity.y = this.velY;
    } else {
      this.body.velocity.y = 0;
    }
  }

  shoot() {
    this.weapons[this.activeWeapon].fire(this);
  }

  checkCollision(player) {
    game.physics.arcade.overlap(this.weapons[this.activeWeapon], player,
      player.takeDamage, null, this);
  }
}
