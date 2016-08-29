class Play {
  create() {
    this.background = game.add.sprite(0, 0, 'background');
    this.background.scale.setTo(2);

    // Map
    this.initMap();
    this.initPlatforms();

    // Player
    let playerConfig = {
      game: game,
      x: game.world.centerX,
      y: game.world.height - 300,
      asset: 'player'
    };
    this.player = new Player(playerConfig);
    this.game.add.existing(this.player);

    // Artifact
    let artifactConfig = {
      game: game,
      x: game.world.centerX,
      y: game.world.height - 1000,
      asset: 'artifact'
    };
    this.artifact = new Artifact(artifactConfig);
    this.game.add.existing(this.artifact);

    let artifactModuleConfig = {
      game: game,
      x: game.world.centerX,
      y: game.world.height - 1100,
      asset: 'artifact-module'
    };
    this.artifactLeftModule = new ArtifactModule(artifactModuleConfig);
    this.artifactRightModule = new ArtifactModule(artifactModuleConfig);
    this.artifactRightModule.scale.x = -4;
    this.game.add.existing(this.artifactLeftModule);
    this.game.add.existing(this.artifactRightModule);

    // HUD
    let hudConfig = {
      game: game,
      player: this.player
    };
    this.hud = new Hud(hudConfig);

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
    this.map.setCollisionBetween(1, 4);
  }

  initPlatforms() {
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    this.movingPlatforms = game.add.group();
    this.movingPlatforms.enableBody = true;

    this.map.createFromObjects('platforms', 11, 'platform', 0, true,
      false, this.platforms);
    this.map.createFromObjects('platforms', 10, 'platform-left', 0, true,
      false, this.platforms);
    this.map.createFromObjects('platforms', 12, 'platform-right', 0, true,
      false, this.platforms);

    this.map.createFromObjects('platforms', 19, 'moving-platform', 0, true,
      false, this.movingPlatforms);
    this.map.createFromObjects('platforms', 18, 'moving-platform-left', 0, true,
      false, this.movingPlatforms);
    this.map.createFromObjects('platforms', 20, 'moving-platform-right', 0, true,
      false, this.movingPlatforms);

    this.platforms.scale.setTo(2);
    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.checkCollision.down', false);
    this.platforms.setAll('body.checkCollision.left', false);
    this.platforms.setAll('body.checkCollision.right', false);
    this.platforms.forEach((platform) => {
      platform.body.setSize(32, 8, 0, 2);
    });

    this.movingPlatforms.scale.setTo(2);
    this.movingPlatforms.setAll('body.immovable', true);
    this.movingPlatforms.setAll('body.checkCollision.down', false);
    this.movingPlatforms.setAll('body.checkCollision.left', false);
    this.movingPlatforms.setAll('body.checkCollision.right', false);
    this.movingPlatforms.forEach((platform) => {
      platform.body.setSize(32, 8, 0, 2);
      platform.originY = platform.y;
      platform.movingDown = true;
    });
  }

  update() {
    game.physics.arcade.collide(this.player, this.layer);
    this.player.stop();

    this.artifact.moveTo(this.player);
    this.artifactLeftModule.moveTo(this.player);
    this.artifactRightModule.moveTo(this.player);

    if (!this.controls.down.isDown || !this.controls.spacebar.isDown) {
      game.physics.arcade.collide(this.player, this.platforms);
      game.physics.arcade.collide(this.player, this.movingPlatforms);
    }

    this.movingPlatforms.forEach((platform) => {
      if (platform.movingDown) {
        platform.body.velocity.y = 50;

        if (platform.y > platform.originY + 32) {
          platform.movingDown = false;
        }
      } else {
        platform.body.velocity.y = -50;

        if (platform.y < platform.originY - 32) {
          platform.movingDown = true;
        }
      }
    });

    if (this.player.alive) {
      this.artifact.checkCollision(this.player);
      this.artifactLeftModule.checkCollision(this.player);
      this.artifactRightModule.checkCollision(this.player);

      if (this.controls.left.isDown) {
        this.player.moveLeft();
      }

      if (this.controls.right.isDown) {
        this.player.moveRight();
      }

      if (this.controls.spacebar.isDown) {
        this.player.jump();
      }

      this.artifact.shoot(this.player);
      this.artifactLeftModule.shoot(this.player);
      this.artifactRightModule.shoot(this.player);
    }
  }

  render() {
    if (this.player.alive) {
      if (this.controls.left.isDown || this.controls.right.isDown) {
        this.player.animations.play('run', 12, true);
      } else {
        this.player.animations.play('idle', 2, true);
      }
    } else if (!this.player.deathAnimationPlayed) {
      this.player.deathAnimationPlayed = true;
      this.player.animations.play('death', 12, false);
    }
  }
}
