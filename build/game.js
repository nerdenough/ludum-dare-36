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
    _this.body.velocity.y = -100;
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

  function Player(game, x, y, asset) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, asset));

    _this.game = game;
    _this.health = 100;
    _this.alive = true;
    _this.velX = 500;
    _this.sf = 3;

    // Sprite
    _this.animations.add('idle', [0, 1], true);
    _this.animations.add('run', [5, 6, 7, 8], true);
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
      var x = game.world.centerX;
      var y = game.world.height - 300;
      this.player = new Player(game, x, y, 'player');
      this.game.add.existing(this.player);

      // Artifact
      var artifactConfig = {
        game: game,
        x: game.world.centerX,
        y: 40,
        asset: 'artifact'
      };
      this.artifact = new Artifact(artifactConfig);
      this.game.add.existing(this.artifact);

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
      if (this.controls.left.isDown || this.controls.right.isDown) {
        this.player.animations.play('run', 12, true);
      } else {
        this.player.animations.play('idle', 2, true);
      }
    }
  }, {
    key: 'damagePlayer',
    value: function damagePlayer() {
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

      game.load.spritesheet('player', '/assets/entities/player/player.png', 34, 31);
      game.load.image('artifact', '/assets/entities/artifact.png');
      game.load.image('bullet', '/assets/entities/bullet.png');
      game.load.image('platform', '/assets/platforms/platform.png');

      game.load.tilemap('map', '/assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', '/assets/map/tiles.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwiYXJ0aWZhY3QuanMiLCJwbGF5ZXIuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIlBsYXRmb3JtIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY2hlY2tDb2xsaXNpb24iLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiaW1tb3ZhYmxlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJjcmVhdGVCdWxsZXRzIiwidmVsb2NpdHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJidWxsZXRzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwicGh5c2ljc0JvZHlUeXBlIiwiY3JlYXRlTXVsdGlwbGUiLCJzZXRBbGwiLCJwbGF5ZXIiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsInJlc2V0IiwiYXJjYWRlIiwibW92ZVRvT2JqZWN0IiwiUGxheWVyIiwiaGVhbHRoIiwiYWxpdmUiLCJ2ZWxYIiwic2YiLCJhbmltYXRpb25zIiwiZ3Jhdml0eSIsInNldFNpemUiLCJ0b3VjaGluZyIsIm9uRmxvb3IiLCJCb290Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdGF0ZSIsInN0YXJ0IiwiUGxheSIsImluaXRNYXAiLCJwbGF0Zm9ybSIsIndvcmxkIiwiY2VudGVyWCIsImV4aXN0aW5nIiwiaGVpZ2h0IiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJpbnB1dCIsImtleWJvYXJkIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJBIiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsImNvbGxpZGUiLCJzdG9wIiwib3ZlcmxhcCIsImRhbWFnZVBsYXllciIsImlzRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsInRpbWUiLCJub3ciLCJzaG9vdCIsInBsYXkiLCJQcmVsb2FkIiwibG9hZCIsIm9uTG9hZFN0YXJ0IiwibG9hZFN0YXJ0Iiwib25GaWxlQ29tcGxldGUiLCJmaWxlQ29tcGxldGUiLCJvbkxvYWRDb21wbGV0ZSIsImxvYWRDb21wbGV0ZSIsImxvYWRpbmdUZXh0IiwidGV4dCIsImZpbGwiLCJzcHJpdGVzaGVldCIsImltYWdlIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJzZXRUZXh0IiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJHYW1lIiwiQVVUTyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUE7OztBQUNKLG9CQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLEtBQXhCLEVBQStCO0FBQUE7O0FBQUEsb0hBQ3ZCSCxJQUR1QixFQUNqQkMsQ0FEaUIsRUFDZEMsQ0FEYyxFQUNYQyxLQURXOztBQUU3QixVQUFLSCxJQUFMLEdBQVlBLElBQVo7O0FBRUE7QUFDQSxVQUFLSSxNQUFMLENBQVlDLEtBQVosQ0FBa0IsR0FBbEI7QUFDQSxVQUFLQyxLQUFMLENBQVdELEtBQVgsQ0FBaUIsQ0FBakI7O0FBRUE7QUFDQSxVQUFLTCxJQUFMLENBQVVPLE9BQVYsQ0FBa0JDLE1BQWxCLFFBQStCQyxPQUFPQyxPQUFQLENBQWVDLE1BQTlDO0FBQ0EsVUFBS0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCQyxJQUF6QixHQUFnQyxLQUFoQztBQUNBLFVBQUtGLElBQUwsQ0FBVUMsY0FBVixDQUF5QkUsSUFBekIsR0FBZ0Ms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QjJCLElBQXZCOztBQUVBckQsS0FBS21ELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQiIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGxhdGZvcm0gZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcblxuICAgIC8vIFBoc3lpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24uZG93biA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0ID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLnJpZ2h0ID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG4gIH1cbn1cbiIsImNsYXNzIEFydGlmYWN0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmJ1bGxldERlbGF5ID0gMjAwO1xuICAgIHRoaXMubGFzdEJ1bGxldCA9IDA7XG5cblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcbiAgICB0aGlzLmNyZWF0ZUJ1bGxldHMoKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC0xMDA7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gIH1cblxuICBjcmVhdGVCdWxsZXRzKCkge1xuICAgIHRoaXMuYnVsbGV0cyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLmJ1bGxldHMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgdGhpcy5idWxsZXRzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICB0aGlzLmJ1bGxldHMuY3JlYXRlTXVsdGlwbGUoMzAsICdidWxsZXQnKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueCcsIDAuNSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLnknLCAxKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdvdXRPZkJvdW5kc0tpbGwnLCB0cnVlKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdjaGVja1dvcmxkQm91bmRzJywgdHJ1ZSk7XG4gIH1cblxuICBzaG9vdChwbGF5ZXIpIHtcbiAgICBsZXQgYnVsbGV0ID0gdGhpcy5idWxsZXRzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICBpZiAoYnVsbGV0KSB7XG4gICAgICBidWxsZXQucmVzZXQodGhpcy5ib2R5LnggKyAzMiwgdGhpcy5ib2R5LnkgKyAzMik7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvT2JqZWN0KGJ1bGxldCwgcGxheWVyLCA4MDApO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGFzc2V0KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5hbGl2ZSA9IHRydWU7XG4gICAgdGhpcy52ZWxYID0gNTAwO1xuICAgIHRoaXMuc2YgPSAzO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnaWRsZScsIFswLCAxXSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgncnVuJywgWzUsIDYsIDcsIDhdLCB0cnVlKTtcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjQpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oLXRoaXMuc2YsIHRoaXMuc2YpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA0MDAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMuYm9keS5zZXRTaXplKDE2LCAzMCwgMiwgMSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gdGhpcy5zZjtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgICB0aGlzLnNjYWxlLnggPSAtdGhpcy5zZjtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTAwMDtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMuaW5pdE1hcCgpO1xuXG4gICAgLy8gUGxhdGZvcm1zXG4gICAgdGhpcy5wbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShnYW1lLCBnYW1lLndvcmxkLmNlbnRlclgsIDYwMCwgJ3BsYXRmb3JtJyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXRmb3JtKTtcblxuICAgIC8vIFBsYXllclxuICAgIGxldCB4ID0gZ2FtZS53b3JsZC5jZW50ZXJYO1xuICAgIGxldCB5ID0gZ2FtZS53b3JsZC5oZWlnaHQgLSAzMDA7XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGdhbWUsIHgsIHksICdwbGF5ZXInKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIEFydGlmYWN0XG4gICAgbGV0IGFydGlmYWN0Q29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IDQwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLlRJTEVfQklBUyA9IDY0O1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIGluaXRNYXAoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5tYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdtYXAnKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVzJywgJ3RpbGVzJyk7XG5cbiAgICAvLyBMYXllcnNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoMCk7XG4gICAgdGhpcy5sYXllci5zZXRTY2FsZSgyKTtcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLCA0KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLnN0b3AoKTtcblxuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLnBsYXRmb3JtKTtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLmFydGlmYWN0LmJ1bGxldHMsIHRoaXMucGxheWVyLFxuICAgICAgICB0aGlzLmRhbWFnZVBsYXllciwgbnVsbCwgdGhpcyk7XG5cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0KSB7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3QubGFzdEJ1bGxldCA9IHRoaXMuZ2FtZS50aW1lLm5vd1xuICAgICAgICAgICsgdGhpcy5hcnRpZmFjdC5idWxsZXREZWxheTtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duIHx8IHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZGFtYWdlUGxheWVyKCkge1xuICAgIHRoaXMucGxheWVyLmhlYWx0aCAtPSAyO1xuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvZW50aXRpZXMvcGxheWVyL3BsYXllci5wbmcnLCAzNCwgMzEpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYXJ0aWZhY3QnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1bGxldCcsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnRpbGVtYXAoJ21hcCcsICcvYXNzZXRzL21hcC9tYXAuanNvbicsIG51bGwsXG4gICAgICBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJy9hc3NldHMvbWFwL3RpbGVzLnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
