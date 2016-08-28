let game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game', null, false, false);

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('play', Play);

game.state.start('boot');
