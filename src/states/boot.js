class Boot {
  create() {
    game.stage.backgroundColor = '#000';
    game.state.start('preload');
  }
}
