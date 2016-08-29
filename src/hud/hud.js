class Hud {
  constructor({game, player}) {
    this.game = game;
    this.player = player;

    this.hp = this.game.add.text(32, 32, 'HP: 100', {fill: '#fff'});
    this.hp.fixedToCamera = true;
  }

  update() {
    this.hp.setText('HP: ' + this.player.health);
  }
}
