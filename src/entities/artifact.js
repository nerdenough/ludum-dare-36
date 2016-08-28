class Artifact extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
    this.game = game;
    this.bulletDelay = 200;
    this.lastBullet = 0;


    // Sprite
    this.anchor.setTo(0.5);
    this.scale.setTo(1);
    this.createBullets();

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.y = -100;
    this.body.collideWorldBounds = true;
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
    let bullet = this.bullets.getFirstExists(false);
    if (bullet) {
      bullet.reset(this.body.x + 32, this.body.y + 32);
      this.game.physics.arcade.moveToObject(bullet, player, 800);
    }
  }
}
