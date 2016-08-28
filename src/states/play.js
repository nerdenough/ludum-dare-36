class Play {
  create() {
    // Platforms
    this.platform = new Platform(game, game.world.centerX, 600, 'platform');
    this.game.add.existing(this.platform);

    // Player
    let x = game.world.centerX;
    let y = game.world.centerY;
    this.player = new Player(game, x, y, 'player');
    this.game.add.existing(this.player);

    // Camera
    game.camera.follow(this.player);

    // Physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Controls
    this.controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
      spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
  }

  update() {
    game.physics.arcade.collide(this.player, this.platform);

    this.player.stop();

    if (this.controls.left.isDown) {
      this.player.moveLeft();
    }

    if (this.controls.right.isDown) {
      this.player.moveRight();
    }

    if (this.controls.spacebar.isDown) {
      this.player.jump();
    }
  }
}
