class Preload {
  create() {
    game.load.onLoadStart.add(this.loadStart, this);
    game.load.onFileComplete.add(this.fileComplete, this);
    game.load.onLoadComplete.add(this.loadComplete, this);

    this.loadingText = game.add.text(32, 32, 'Loading...', {fill: '#fff'});

    game.load.spritesheet('player', '/assets/entities/player/player.png', 34, 31);
    game.load.image('artifact', '/assets/entities/artifact.png');
    game.load.image('bullet', '/assets/entities/bullet.png');
    game.load.image('platform', '/assets/platforms/platform.png');

    game.load.tilemap('map', '/assets/map/map.json', null,
      Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '/assets/map/tiles.png');

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
