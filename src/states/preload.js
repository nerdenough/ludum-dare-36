class Preload {
  create() {
    game.load.onLoadStart.add(this.loadStart, this);
    game.load.onFileComplete.add(this.fileComplete, this);
    game.load.onLoadComplete.add(this.loadComplete, this);

    this.loadingText = game.add.text(32, 32, 'Loading...', {fill: '#fff'});

    // Sprites
    game.load.spritesheet('player', '/assets/entities/player/player.png', 34, 31);
    game.load.spritesheet('artifact', '/assets/entities/artifact/artifact.png', 41, 34);
    game.load.image('artifact-module', '/assets/entities/artifact/artifact-module.png');
    game.load.image('bullet', '/assets/entities/bullets/bullet.png');
    game.load.image('beam', '/assets/entities/bullets/beam.png');
    game.load.image('platform', '/assets/platforms/platform.png');
    game.load.image('background', '/assets/background.png');

    // Map
    game.load.tilemap('map', '/assets/map/map.json', null,
      Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '/assets/map/tiles.png');
    game.load.image('platform', '/assets/platforms/platform.png');
    game.load.image('platform-left', '/assets/platforms/platform-left.png');
    game.load.image('platform-right', '/assets/platforms/platform-right.png');
    game.load.image('moving-platform-right', '/assets/platforms/moving-platform-right.png');
    game.load.image('moving-platform-left', '/assets/platforms/moving-platform-left.png');
    game.load.image('moving-platform', '/assets/platforms/moving-platform.png');
    game.load.image('activated', '/assets/objects/activator-activated.png');
    game.load.image('deactivated', '/assets/objects/activator-deactivated.png');

    // HUD
    game.load.image('avatar', '/assets/hud/avatar.png');
    game.load.image('winner', '/assets/screens/winner.png');
    game.load.image('gameover', '/assets/screens/gameover.png');

    // Audio
    game.load.audio('jump', '/assets/sounds/jump.wav');
    game.load.audio('shoot', '/assets/sounds/shoot.wav');

    game.load.start();
  }

  loadStart() {
    this.loadingText.setText('Loading...');
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText('File Complete: ' + progress + '% - '
      + totalLoaded + ' out of ' + totalFiles);
  }

  loadComplete() {
    this.loadingText.setText('Load Complete');
    game.state.start('play');
  }
}
