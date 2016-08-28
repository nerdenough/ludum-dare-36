class Play {
  create() {
    // Map
    this.initMap();

    // Platforms
    this.platform = new Platform(game, game.world.centerX, 600, 'platform');
    this.game.add.existing(this.platform);

    // Player
    let x = game.world.centerX;
    let y = game.world.centerY;
    this.player = new Player(game, x, y, 'player');
    this.game.add.existing(this.player);

    // Artifact
    let artifactConfig = {
      game: game,
      x: game.world.centerX,
      y: 40,
      asset: 'artifact'
    };
    this.artifact = new Artifact(artifactConfig);
    this.game.add.existing(this.artifact);

    // Camera
    game.camera.follow(this.player);

    // Physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.TILE_BIAS = 64;

    // Controls
    this.controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
      spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
  }

  initMap() {
    // Map
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('tiles', 'tiles');

    // Layers
    this.layer = this.map.createLayer(0);
    this.layer.setScale(2);
    this.layer.resizeWorld();

    // Collisions
    this.map.setCollision(0);
  }

  update() {
    game.physics.arcade.collide(this.player, this.layer);
    this.player.stop();

    if (this.player.alive) {
      game.physics.arcade.collide(this.player, this.platform);
      game.physics.arcade.overlap(this.artifact.bullets, this.player,
        this.damagePlayer, null, this);


      if (this.controls.left.isDown) {
        this.player.moveLeft();
      }

      if (this.controls.right.isDown) {
        this.player.moveRight();
      }

      if (this.controls.spacebar.isDown) {
        this.player.jump();
      }

      if (this.game.time.now > this.artifact.lastBullet) {
        this.artifact.lastBullet = this.game.time.now
          + this.artifact.bulletDelay;
        this.artifact.shoot(this.player);
      }
    }
  }

  render() {
    if (this.controls.left.isDown || this.controls.right.isDown) {
      this.player.animations.play('run', 12, true);
    } else {
      this.player.animations.play('idle', 2, true);
    }
  }

  damagePlayer() {
    this.player.health -= 2;
  }
}
