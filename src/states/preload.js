class Preload {
  create() {
    game.load.onLoadStart.add(this.loadStart, this);
    game.load.onFileComplete.add(this.fileComplete, this);
    game.load.onLoadComplete.add(this.loadComplete, this);

    this.loadingText = game.add.text(32, 32, 'Loading...', {fill: '#fff'});

    // TODO: Load assets

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
