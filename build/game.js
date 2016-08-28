"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Platform = function (_Phaser$Sprite) {
  _inherits(Platform, _Phaser$Sprite);

  function Platform(game, x, y, asset) {
    _classCallCheck(this, Platform);

    var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, game, x, y, asset));

    _this.game = game;

    // Sprite
    _this.anchor.setTo(0.5);
    _this.scale.setTo(1);

    // Phsyics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.checkCollision.down = false;
    _this.body.checkCollision.left = false;
    _this.body.checkCollision.right = false;
    _this.body.immovable = true;
    return _this;
  }

  return Platform;
}(Phaser.Sprite);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Artifact = function (_Phaser$Sprite) {
  _inherits(Artifact, _Phaser$Sprite);

  function Artifact(_ref) {
    var game = _ref.game;
    var x = _ref.x;
    var y = _ref.y;
    var asset = _ref.asset;

    _classCallCheck(this, Artifact);

    var _this = _possibleConstructorReturn(this, (Artifact.__proto__ || Object.getPrototypeOf(Artifact)).call(this, game, x, y, asset));

    _this.game = game;
    _this.bulletDelay = 200;
    _this.lastBullet = 0;

    // Sprite
    _this.anchor.setTo(0.5);
    _this.scale.setTo(1);
    _this.createBullets();

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.collideWorldBounds = true;
    return _this;
  }

  _createClass(Artifact, [{
    key: 'createBullets',
    value: function createBullets() {
      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(30, 'bullet');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);
    }
  }, {
    key: 'shoot',
    value: function shoot(player) {
      var bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(this.body.x + 32, this.body.y + 32);
        this.game.physics.arcade.moveToObject(bullet, player, 800);
      }
    }
  }]);

  return Artifact;
}(Phaser.Sprite);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Phaser$Sprite) {
  _inherits(Player, _Phaser$Sprite);

  function Player(_ref) {
    var game = _ref.game;
    var x = _ref.x;
    var y = _ref.y;
    var asset = _ref.asset;

    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, asset));

    _this.game = game;
    _this.health = 100;
    _this.deathAnimationPlayed = false;
    _this.alive = true;
    _this.velX = 500;
    _this.sf = 3;

    // Sprite
    _this.animations.add('idle', [0, 1], true);
    _this.animations.add('run', [5, 6, 7, 8], true);
    _this.animations.add('death', [10, 11, 12, 13, 14], true);
    _this.anchor.setTo(0.4);
    _this.scale.setTo(-_this.sf, _this.sf);

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.gravity.y = 4000;
    _this.body.collideWorldBounds = true;
    _this.body.setSize(16, 30, 2, 1);
    return _this;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
      if (this.health <= 0) {
        this.alive = false;
      }
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      this.body.velocity.x = -this.velX;
      this.scale.x = this.sf;
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      this.body.velocity.x = this.velX;
      this.scale.x = -this.sf;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.body.velocity.x = 0;
    }
  }, {
    key: 'jump',
    value: function jump() {
      if (this.body.touching.down || this.body.onFloor()) {
        this.body.velocity.y = -1000;
      }
    }
  }]);

  return Player;
}(Phaser.Sprite);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hud = function Hud(_ref) {
  var game = _ref.game;
  var player = _ref.player;

  _classCallCheck(this, Hud);

  this.game = game;
  this.player = player;

  this.avatar = this.game.add.sprite(32, 32, 'avatar');
  this.avatar.fixedToCamera = true;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boot = function () {
  function Boot() {
    _classCallCheck(this, Boot);
  }

  _createClass(Boot, [{
    key: 'create',
    value: function create() {
      game.stage.backgroundColor = '#000';
      game.state.start('preload');
    }
  }]);

  return Boot;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Play = function () {
  function Play() {
    _classCallCheck(this, Play);
  }

  _createClass(Play, [{
    key: 'create',
    value: function create() {
      // Map
      this.initMap();

      // Platforms
      this.platform = new Platform(game, game.world.centerX, 600, 'platform');
      this.game.add.existing(this.platform);

      // Player
      var playerConfig = {
        game: game,
        x: game.world.centerX,
        y: game.world.height - 300,
        asset: 'player'
      };
      this.player = new Player(playerConfig);
      this.game.add.existing(this.player);

      // Artifact
      var artifactConfig = {
        game: game,
        x: game.world.centerX,
        y: game.world.height - 700,
        asset: 'artifact'
      };
      this.artifact = new Artifact(artifactConfig);
      this.game.add.existing(this.artifact);

      // HUD
      var hudConfig = {
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
  }, {
    key: 'initMap',
    value: function initMap() {
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
  }, {
    key: 'update',
    value: function update() {
      game.physics.arcade.collide(this.player, this.layer);
      this.player.stop();

      if (this.player.alive) {
        game.physics.arcade.collide(this.player, this.platform);
        game.physics.arcade.overlap(this.artifact.bullets, this.player, this.damagePlayer, null, this);

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
          this.artifact.lastBullet = this.game.time.now + this.artifact.bulletDelay;
          this.artifact.shoot(this.player);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
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
  }, {
    key: 'damagePlayer',
    value: function damagePlayer(player, bullet) {
      bullet.kill();
      this.player.health -= 2;
    }
  }]);

  return Play;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preload = function () {
  function Preload() {
    _classCallCheck(this, Preload);
  }

  _createClass(Preload, [{
    key: 'create',
    value: function create() {
      game.load.onLoadStart.add(this.loadStart, this);
      game.load.onFileComplete.add(this.fileComplete, this);
      game.load.onLoadComplete.add(this.loadComplete, this);

      this.loadingText = game.add.text(32, 32, 'Loading...', { fill: '#fff' });

      // Sprites
      game.load.spritesheet('player', '/assets/entities/player/player.png', 34, 31);
      game.load.image('artifact', '/assets/entities/artifact.png');
      game.load.image('bullet', '/assets/entities/bullet.png');
      game.load.image('platform', '/assets/platforms/platform.png');

      // Map
      game.load.tilemap('map', '/assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', '/assets/map/tiles.png');

      // HUD
      game.load.image('avatar', '/assets/hud/avatar.png');

      game.load.start();
    }
  }, {
    key: 'loadStart',
    value: function loadStart() {
      this.loadingText.setText('Loading...');
    }
  }, {
    key: 'fileComplete',
    value: function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
      this.loadingText.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
    }
  }, {
    key: 'loadComplete',
    value: function loadComplete() {
      this.loadingText.setText('Load Complete');
      game.state.start('play');
    }
  }]);

  return Preload;
}();
'use strict';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game', null, false, false);

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('play', Play);

game.state.start('boot');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwiYXJ0aWZhY3QuanMiLCJwbGF5ZXIuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIlBsYXRmb3JtIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY2hlY2tDb2xsaXNpb24iLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiaW1tb3ZhYmxlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJjcmVhdGVCdWxsZXRzIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiYnVsbGV0cyIsImFkZCIsImdyb3VwIiwiZW5hYmxlQm9keSIsInBoeXNpY3NCb2R5VHlwZSIsImNyZWF0ZU11bHRpcGxlIiwic2V0QWxsIiwicGxheWVyIiwiYnVsbGV0IiwiZ2V0Rmlyc3RFeGlzdHMiLCJyZXNldCIsImFyY2FkZSIsIm1vdmVUb09iamVjdCIsIlBsYXllciIsImhlYWx0aCIsImRlYXRoQW5pbWF0aW9uUGxheWVkIiwiYWxpdmUiLCJ2ZWxYIiwic2YiLCJhbmltYXRpb25zIiwiZ3Jhdml0eSIsInNldFNpemUiLCJ2ZWxvY2l0eSIsInRvdWNoaW5nIiwib25GbG9vciIsIkh1ZCIsImF2YXRhciIsInNwcml0ZSIsImZpeGVkVG9DYW1lcmEiLCJCb290Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdGF0ZSIsInN0YXJ0IiwiUGxheSIsImluaXRNYXAiLCJwbGF0Zm9ybSIsIndvcmxkIiwiY2VudGVyWCIsImV4aXN0aW5nIiwicGxheWVyQ29uZmlnIiwiaGVpZ2h0IiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImh1ZENvbmZpZyIsImh1ZCIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJpbnB1dCIsImtleWJvYXJkIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJBIiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsImNvbGxpZGUiLCJzdG9wIiwib3ZlcmxhcCIsImRhbWFnZVBsYXllciIsImlzRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsInRpbWUiLCJub3ciLCJzaG9vdCIsInBsYXkiLCJraWxsIiwiUHJlbG9hZCIsImxvYWQiLCJvbkxvYWRTdGFydCIsImxvYWRTdGFydCIsIm9uRmlsZUNvbXBsZXRlIiwiZmlsZUNvbXBsZXRlIiwib25Mb2FkQ29tcGxldGUiLCJsb2FkQ29tcGxldGUiLCJsb2FkaW5nVGV4dCIsInRleHQiLCJmaWxsIiwic3ByaXRlc2hlZXQiLCJpbWFnZSIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BOzs7QUFDSixvQkFBWUMsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxLQUF4QixFQUErQjtBQUFBOztBQUFBLG9IQUN2QkgsSUFEdUIsRUFDakJDLENBRGlCLEVBQ2RDLENBRGMsRUFDWEMsS0FEVzs7QUFFN0IsVUFBS0gsSUFBTCxHQUFZQSxJQUFaOztBQUVBO0FBQ0EsVUFBS0ksTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCO0FBQ0EsVUFBS0MsS0FBTCxDQUFXRCxLQUFYLENBQWlCLENBQWpCOztBQUVBO0FBQ0EsVUFBS0wsSUFBTCxDQUFVTyxPQUFWLENBQWtCQyxNQUFsQixRQUErQkMsT0FBT0MsT0FB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QUFMLENBQVcvQixHQUFYLENBQWUsTUFBZixFQUF1QjRCLElBQXZCO0FBQ0FyRCxLQUFLd0QsS0FBTCxDQUFXL0IsR0FBWCxDQUFlLFNBQWYsRUFBMEJnRixPQUExQjtBQUNBekcsS0FBS3dELEtBQUwsQ0FBVy9CLEdBQVgsQ0FBZSxNQUFmLEVBQXVCaUMsSUFBdkI7O0FBRUExRCxLQUFLd0QsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQbGF0Zm9ybSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDEpO1xuXG4gICAgLy8gUGhzeWljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5kb3duID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLmxlZnQgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbiAgfVxufVxuIiwiY2xhc3MgQXJ0aWZhY3QgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcbiAgICB0aGlzLmNyZWF0ZUJ1bGxldHMoKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgfVxuXG4gIGNyZWF0ZUJ1bGxldHMoKSB7XG4gICAgdGhpcy5idWxsZXRzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuYnVsbGV0cy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICB0aGlzLmJ1bGxldHMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuICAgIHRoaXMuYnVsbGV0cy5jcmVhdGVNdWx0aXBsZSgzMCwgJ2J1bGxldCcpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci54JywgMC41KTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueScsIDEpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ291dE9mQm91bmRzS2lsbCcsIHRydWUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2NoZWNrV29ybGRCb3VuZHMnLCB0cnVlKTtcbiAgfVxuXG4gIHNob290KHBsYXllcikge1xuICAgIGxldCBidWxsZXQgPSB0aGlzLmJ1bGxldHMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgIGlmIChidWxsZXQpIHtcbiAgICAgIGJ1bGxldC5yZXNldCh0aGlzLmJvZHkueCArIDMyLCB0aGlzLmJvZHkueSArIDMyKTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9PYmplY3QoYnVsbGV0LCBwbGF5ZXIsIDgwMCk7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuZGVhdGhBbmltYXRpb25QbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFsaXZlID0gdHJ1ZTtcbiAgICB0aGlzLnZlbFggPSA1MDA7XG4gICAgdGhpcy5zZiA9IDM7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdpZGxlJywgWzAsIDFdLCB0cnVlKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdydW4nLCBbNSwgNiwgNywgOF0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2RlYXRoJywgWzEwLCAxMSwgMTIsIDEzLCAxNF0sIHRydWUpO1xuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNCk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygtdGhpcy5zZiwgdGhpcy5zZik7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDQwMDA7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgdGhpcy5ib2R5LnNldFNpemUoMTYsIDMwLCAyLCAxKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgICB0aGlzLnNjYWxlLnggPSB0aGlzLnNmO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IC10aGlzLnNmO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gIH1cblxuICBqdW1wKCkge1xuICAgIGlmICh0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkub25GbG9vcigpKSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC0xMDAwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgSHVkIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHBsYXllcn0pIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuXG4gICAgdGhpcy5hdmF0YXIgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgzMiwgMzIsICdhdmF0YXInKTtcbiAgICB0aGlzLmF2YXRhci5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgfVxufVxuIiwiY2xhc3MgQm9vdCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXkge1xuICBjcmVhdGUoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5pbml0TWFwKCk7XG5cbiAgICAvLyBQbGF0Zm9ybXNcbiAgICB0aGlzLnBsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdhbWUsIGdhbWUud29ybGQuY2VudGVyWCwgNjAwLCAncGxhdGZvcm0nKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxhdGZvcm0pO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDMwMCxcbiAgICAgIGFzc2V0OiAncGxheWVyJ1xuICAgIH07XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllckNvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBBcnRpZmFjdFxuICAgIGxldCBhcnRpZmFjdENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDcwMCxcbiAgICAgIGFzc2V0OiAnYXJ0aWZhY3QnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0ID0gbmV3IEFydGlmYWN0KGFydGlmYWN0Q29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMuYXJ0aWZhY3QpO1xuXG4gICAgLy8gSFVEXG4gICAgbGV0IGh1ZENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICBwbGF5ZXI6IHRoaXMucGxheWVyXG4gICAgfTtcbiAgICB0aGlzLmh1ZCA9IG5ldyBIdWQoaHVkQ29uZmlnKTtcblxuICAgIC8vIENhbWVyYVxuICAgIGdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBQaHlzaWNzIGVuZ2luZVxuICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuVElMRV9CSUFTID0gNjQ7XG5cbiAgICAvLyBDb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSB7XG4gICAgICBsZWZ0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQSksXG4gICAgICByaWdodDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxuICAgICAgZG93bjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxuICAgICAgc3BhY2ViYXI6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUilcbiAgICB9O1xuICB9XG5cbiAgaW5pdE1hcCgpIHtcbiAgICAvLyBNYXBcbiAgICB0aGlzLm1hcCA9IGdhbWUuYWRkLnRpbGVtYXAoJ21hcCcpO1xuICAgIHRoaXMubWFwLmFkZFRpbGVzZXRJbWFnZSgndGlsZXMnLCAndGlsZXMnKTtcblxuICAgIC8vIExheWVyc1xuICAgIHRoaXMubGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcigwKTtcbiAgICB0aGlzLmxheWVyLnNldFNjYWxlKDIpO1xuICAgIHRoaXMubGF5ZXIucmVzaXplV29ybGQoKTtcblxuICAgIC8vIENvbGxpc2lvbnNcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDEsIDQpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuYXJ0aWZhY3QuYnVsbGV0cywgdGhpcy5wbGF5ZXIsXG4gICAgICAgIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcblxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQpIHtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0ID0gdGhpcy5nYW1lLnRpbWUubm93XG4gICAgICAgICAgKyB0aGlzLmFydGlmYWN0LmJ1bGxldERlbGF5O1xuICAgICAgICB0aGlzLmFydGlmYWN0LnNob290KHRoaXMucGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScsIDIsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkKSB7XG4gICAgICB0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2RlYXRoJywgMTIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBkYW1hZ2VQbGF5ZXIocGxheWVyLCBidWxsZXQpIHtcbiAgICBidWxsZXQua2lsbCgpO1xuICAgIHRoaXMucGxheWVyLmhlYWx0aCAtPSAyO1xuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIC8vIFNwcml0ZXNcbiAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsICcvYXNzZXRzL2VudGl0aWVzL3BsYXllci9wbGF5ZXIucG5nJywgMzQsIDMxKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2FydGlmYWN0JywgJy9hc3NldHMvZW50aXRpZXMvYXJ0aWZhY3QucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdidWxsZXQnLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcblxuICAgIC8vIE1hcFxuICAgIGdhbWUubG9hZC50aWxlbWFwKCdtYXAnLCAnL2Fzc2V0cy9tYXAvbWFwLmpzb24nLCBudWxsLFxuICAgICAgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCd0aWxlcycsICcvYXNzZXRzL21hcC90aWxlcy5wbmcnKTtcblxuICAgIC8vIEhVRFxuICAgIGdhbWUubG9hZC5pbWFnZSgnYXZhdGFyJywgJy9hc3NldHMvaHVkL2F2YXRhci5wbmcnKTtcblxuICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICB9XG5cbiAgbG9hZFN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZGluZy4uLicpO1xuICB9XG5cbiAgZmlsZUNvbXBsZXRlKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0ZpbGUgQ29tcGxldGU6ICcgKyBwcm9ncmVzcyArICclIC0gJ1xuICAgICAgKyB0b3RhbExvYWRlZCArICcgb3V0IG9mICcgKyB0b3RhbEZpbGVzKTtcbiAgfVxuXG4gIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWQgQ29tcGxldGUnKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XG4gIH1cbn1cbiIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEyODAsIDcyMCwgUGhhc2VyLkFVVE8sICdnYW1lJywgbnVsbCwgZmFsc2UsIGZhbHNlKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
