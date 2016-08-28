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
    _this.anchor.setTo(0.5);
    _this.scale.setTo(_this.sf);

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.gravity.y = 4000;
    _this.body.collideWorldBounds = true;
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
      var y = game.world.centerY;
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
      this.map.setCollision(0);
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

      game.load.tilemap('map', '/assets/map/map.csv');
      game.load.image('tiles', '/assets/map/spritesheet.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwiYXJ0aWZhY3QuanMiLCJwbGF5ZXIuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIlBsYXRmb3JtIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY2hlY2tDb2xsaXNpb24iLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiaW1tb3ZhYmxlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJjcmVhdGVCdWxsZXRzIiwidmVsb2NpdHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJidWxsZXRzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwicGh5c2ljc0JvZHlUeXBlIiwiY3JlYXRlTXVsdGlwbGUiLCJzZXRBbGwiLCJwbGF5ZXIiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsInJlc2V0IiwiYXJjYWRlIiwibW92ZVRvT2JqZWN0IiwiUGxheWVyIiwiaGVhbHRoIiwiYWxpdmUiLCJ2ZWxYIiwic2YiLCJhbmltYXRpb25zIiwiZ3Jhdml0eSIsInRvdWNoaW5nIiwib25GbG9vciIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiaW5pdE1hcCIsInBsYXRmb3JtIiwid29ybGQiLCJjZW50ZXJYIiwiZXhpc3RpbmciLCJjZW50ZXJZIiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJpbnB1dCIsImtleWJvYXJkIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJBIiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uIiwiY29sbGlkZSIsInN0b3AiLCJvdmVybGFwIiwiZGFtYWdlUGxheWVyIiwiaXNEb3duIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJqdW1wIiwidGltZSIsIm5vdyIsInNob290IiwicGxheSIsIlByZWxvYWQiLCJsb2FkIiwib25Mb2FkU3RhcnQiLCJsb2FkU3RhcnQiLCJvbkZpbGVDb21wbGV0ZSIsImZpbGVDb21wbGV0ZSIsIm9uTG9hZENvbXBsZXRlIiwibG9hZENvbXBsZXRlIiwibG9hZGluZ1RleHQiLCJ0ZXh0IiwiZmlsbCIsInNwcml0ZXNoZWV0IiwiaW1hZ2UiLCJzZXRUZXh0IiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJHYW1lIiwiQVVUTyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUE7OztBQUNKLG9CQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLEtBQXhCLEVBQStCO0FBQUE7O0FBQUEsb0hBQ3ZCSCxJQUR1QixFQUNqQkMsQ0FEaUIsRUFDZEMsQ0FEYyxFQUNYQyxLQURXOztBQUU3QixVQUFLSCxJQUFMLEdBQVlBLElBQVo7O0FBRUE7QUFDQSxVQUFLSSxNQUFMLENBQVlDLEtBQVosQ0FBa0IsR0FBbEI7QUFDQSxVQUFLQyxLQUFMLENBQVdELEtBQVgsQ0FBaUIsQ0FBakI7O0FBRUE7QUFDQSxVQUFLTCxJQUFMLENBQVVPLE9BQVYsQ0FBa0JDLE1BQWxCLFFBQStCQyxPQUFPQyxPQUFQLENBQWVDLE1BQTlDO0FBQ0EsVUFBS0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCQyxJQUF6QixHQUFnQyxLQUFoQztBQUNBLFVBQUtGLElBQUwsQ0FBVUMsY0FBVixDQUF5QkUsSUFBekIsR0FBZ0MsS0FBaEM7QUFDQSxVQUFLSCxJQUFMLENBQVVDLGNBQVYsQ0FBeUJH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bEIsRUFBeUIscUJBQXpCO0FBQ0E1RSxXQUFLZ0csSUFBTCxDQUFVVyxLQUFWLENBQWdCLE9BQWhCLEVBQXlCLDZCQUF6Qjs7QUFFQTNHLFdBQUtnRyxJQUFMLENBQVU3QyxLQUFWO0FBQ0Q7OztnQ0FFVztBQUNWLFdBQUtvRCxXQUFMLENBQWlCSyxPQUFqQixDQUF5QixZQUF6QjtBQUNEOzs7aUNBRVlDLFVBQVVDLFVBQVVDLFNBQVNDLGFBQWFDLFlBQVk7QUFDakUsV0FBS1YsV0FBTCxDQUFpQkssT0FBakIsQ0FBeUIsb0JBQW9CQyxRQUFwQixHQUErQixNQUEvQixHQUNyQkcsV0FEcUIsR0FDUCxVQURPLEdBQ01DLFVBRC9CO0FBRUQ7OzttQ0FFYztBQUNiLFdBQUtWLFdBQUwsQ0FBaUJLLE9BQWpCLENBQXlCLGVBQXpCO0FBQ0E1RyxXQUFLa0QsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCO0FBQ0Q7Ozs7Ozs7QUMvQkgsSUFBSW5ELE9BQU8sSUFBSVMsT0FBT3lHLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0IsR0FBdEIsRUFBMkJ6RyxPQUFPMEcsSUFBbEMsRUFBd0MsTUFBeEMsRUFBZ0QsSUFBaEQsRUFBc0QsS0FBdEQsRUFBNkQsS0FBN0QsQ0FBWDs7QUFFQW5ILEtBQUtrRCxLQUFMLENBQVd4QixHQUFYLENBQWUsTUFBZixFQUF1QnFCLElBQXZCO0FBQ0EvQyxLQUFLa0QsS0FBTCxDQUFXeEIsR0FBWCxDQUFlLFNBQWYsRUFBMEJxRSxPQUExQjtBQUNBL0YsS0FBS2tELEtBQUwsQ0FBV3hCLEdBQVgsQ0FBZSxNQUFmLEVBQXVCMEIsSUFBdkI7O0FBRUFwRCxLQUFLa0QsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQbGF0Zm9ybSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDEpO1xuXG4gICAgLy8gUGhzeWljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5kb3duID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLmxlZnQgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbiAgfVxufVxuIiwiY2xhc3MgQXJ0aWZhY3QgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcblxuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDEpO1xuICAgIHRoaXMuY3JlYXRlQnVsbGV0cygpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgfVxuXG4gIGNyZWF0ZUJ1bGxldHMoKSB7XG4gICAgdGhpcy5idWxsZXRzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuYnVsbGV0cy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICB0aGlzLmJ1bGxldHMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuICAgIHRoaXMuYnVsbGV0cy5jcmVhdGVNdWx0aXBsZSgzMCwgJ2J1bGxldCcpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci54JywgMC41KTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueScsIDEpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ291dE9mQm91bmRzS2lsbCcsIHRydWUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2NoZWNrV29ybGRCb3VuZHMnLCB0cnVlKTtcbiAgfVxuXG4gIHNob290KHBsYXllcikge1xuICAgIGxldCBidWxsZXQgPSB0aGlzLmJ1bGxldHMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgIGlmIChidWxsZXQpIHtcbiAgICAgIGJ1bGxldC5yZXNldCh0aGlzLmJvZHkueCArIDMyLCB0aGlzLmJvZHkueSArIDMyKTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9PYmplY3QoYnVsbGV0LCBwbGF5ZXIsIDgwMCk7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLmFsaXZlID0gdHJ1ZTtcbiAgICB0aGlzLnZlbFggPSA1MDA7XG4gICAgdGhpcy5zZiA9IDM7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdpZGxlJywgWzAsIDFdLCB0cnVlKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdydW4nLCBbNSwgNiwgNywgOF0sIHRydWUpO1xuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbyh0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgICB0aGlzLnNjYWxlLnggPSB0aGlzLnNmO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IC10aGlzLnNmO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gIH1cblxuICBqdW1wKCkge1xuICAgIGlmICh0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkub25GbG9vcigpKSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC0xMDAwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgQm9vdCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXkge1xuICBjcmVhdGUoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5pbml0TWFwKCk7XG5cbiAgICAvLyBQbGF0Zm9ybXNcbiAgICB0aGlzLnBsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdhbWUsIGdhbWUud29ybGQuY2VudGVyWCwgNjAwLCAncGxhdGZvcm0nKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxhdGZvcm0pO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHggPSBnYW1lLndvcmxkLmNlbnRlclg7XG4gICAgbGV0IHkgPSBnYW1lLndvcmxkLmNlbnRlclk7XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGdhbWUsIHgsIHksICdwbGF5ZXInKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIEFydGlmYWN0XG4gICAgbGV0IGFydGlmYWN0Q29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IDQwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLlRJTEVfQklBUyA9IDY0O1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIGluaXRNYXAoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5tYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdtYXAnKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVzJywgJ3RpbGVzJyk7XG5cbiAgICAvLyBMYXllcnNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoMCk7XG4gICAgdGhpcy5sYXllci5zZXRTY2FsZSgyKTtcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uKDApO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuYXJ0aWZhY3QuYnVsbGV0cywgdGhpcy5wbGF5ZXIsXG4gICAgICAgIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcblxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQpIHtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0ID0gdGhpcy5nYW1lLnRpbWUubm93XG4gICAgICAgICAgKyB0aGlzLmFydGlmYWN0LmJ1bGxldERlbGF5O1xuICAgICAgICB0aGlzLmFydGlmYWN0LnNob290KHRoaXMucGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24gfHwgdGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncnVuJywgMTIsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnLCAyLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBkYW1hZ2VQbGF5ZXIoKSB7XG4gICAgdGhpcy5wbGF5ZXIuaGVhbHRoIC09IDI7XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnL2Fzc2V0cy9lbnRpdGllcy9wbGF5ZXIvcGxheWVyLnBuZycsIDM0LCAzMSk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhcnRpZmFjdCcsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYnVsbGV0JywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG5cbiAgICBnYW1lLmxvYWQudGlsZW1hcCgnbWFwJywgJy9hc3NldHMvbWFwL21hcC5jc3YnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJy9hc3NldHMvbWFwL3Nwcml0ZXNoZWV0LnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
