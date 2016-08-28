class Hud {
  constructor({game, player}) {
    this.game = game;
    this.player = player;

    this.avatar = this.game.add.sprite(32, 32, 'avatar');
    this.avatar.fixedToCamera = true;
  }
}
