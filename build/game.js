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
    _this.scale.setTo(_this.sf);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwiYXJ0aWZhY3QuanMiLCJwbGF5ZXIuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIlBsYXRmb3JtIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY2hlY2tDb2xsaXNpb24iLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiaW1tb3ZhYmxlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJjcmVhdGVCdWxsZXRzIiwidmVsb2NpdHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJidWxsZXRzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwicGh5c2ljc0JvZHlUeXBlIiwiY3JlYXRlTXVsdGlwbGUiLCJzZXRBbGwiLCJwbGF5ZXIiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsInJlc2V0IiwiYXJjYWRlIiwibW92ZVRvT2JqZWN0IiwiUGxheWVyIiwiaGVhbHRoIiwiYWxpdmUiLCJ2ZWxYIiwic2YiLCJhbmltYXRpb25zIiwiZ3Jhdml0eSIsInNldFNpemUiLCJ0b3VjaGluZyIsIm9uRmxvb3IiLCJCb290Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdGF0ZSIsInN0YXJ0IiwiUGxheSIsImluaXRNYXAiLCJwbGF0Zm9ybSIsIndvcmxkIiwiY2VudGVyWCIsImV4aXN0aW5nIiwiY2VudGVyWSIsImFydGlmYWN0Q29uZmlnIiwiYXJ0aWZhY3QiLCJjYW1lcmEiLCJmb2xsb3ciLCJzdGFydFN5c3RlbSIsIlRJTEVfQklBUyIsImNvbnRyb2xzIiwiaW5wdXQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsIkQiLCJTIiwic3BhY2ViYXIiLCJTUEFDRUJBUiIsIm1hcCIsInRpbGVtYXAiLCJhZGRUaWxlc2V0SW1hZ2UiLCJsYXllciIsImNyZWF0ZUxheWVyIiwic2V0U2NhbGUiLCJyZXNpemVXb3JsZCIsInNldENvbGxpc2lvbiIsImNvbGxpZGUiLCJzdG9wIiwib3ZlcmxhcCIsImRhbWFnZVBsYXllciIsImlzRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsInRpbWUiLCJub3ciLCJzaG9vdCIsInBsYXkiLCJQcmVsb2FkIiwibG9hZCIsIm9uTG9hZFN0YXJ0IiwibG9hZFN0YXJ0Iiwib25GaWxlQ29tcGxldGUiLCJmaWxlQ29tcGxldGUiLCJvbkxvYWRDb21wbGV0ZSIsImxvYWRDb21wbGV0ZSIsImxvYWRpbmdUZXh0IiwidGV4dCIsImZpbGwiLCJzcHJpdGVzaGVldCIsImltYWdlIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BOzs7QUFDSixvQkFBWUMsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxLQUF4QixFQUErQjtBQUFBOztBQUFBLG9IQUN2QkgsSUFEdUIsRUFDakJDLENBRGlCLEVBQ2RDLENBRGMsRUFDWEMsS0FEVzs7QUFFN0IsVUFBS0gsSUFBTCxHQUFZQSxJQUFaOztBQUVBO0FBQ0EsVUFBS0ksTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCO0FBQ0EsVUFBS0MsS0FBTCxDQUFXRCxLQUFYLENBQWlCLENBQWpCOztBQUVBO0FBQ0EsVUFBS0wsSUFBTCxDQUFVTyxPQUFWLENBQWtCQyxNQUFsQixRQUErQkMsT0FBT0MsT0FBUCxDQUFlQyxNQUE5QztBQUNBLFVBQUtDLElBQUwsQ0FBVUMsY0FBVixDQUF5QkMsSUFBekIsR0FBZ0MsS0FBaEM7QUFDQSxVQUFLRixJQUFMLENBQVVDLGNBQVYsQ0FBeUJFLElBQXpCLEdBQWdDLEtBQWhDO0FBQ0EsVUFBS0gsSUFBTCxDQUFVQyxj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LlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGFzc2V0KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG5cbiAgICAvLyBQaHN5aWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24gPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBBcnRpZmFjdCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuXG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG4gICAgdGhpcy5jcmVhdGVCdWxsZXRzKCk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICB9XG5cbiAgY3JlYXRlQnVsbGV0cygpIHtcbiAgICB0aGlzLmJ1bGxldHMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5idWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMuYnVsbGV0cy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgdGhpcy5idWxsZXRzLmNyZWF0ZU11bHRpcGxlKDMwLCAnYnVsbGV0Jyk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLngnLCAwLjUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci55JywgMSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnb3V0T2ZCb3VuZHNLaWxsJywgdHJ1ZSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnY2hlY2tXb3JsZEJvdW5kcycsIHRydWUpO1xuICB9XG5cbiAgc2hvb3QocGxheWVyKSB7XG4gICAgbGV0IGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgaWYgKGJ1bGxldCkge1xuICAgICAgYnVsbGV0LnJlc2V0KHRoaXMuYm9keS54ICsgMzIsIHRoaXMuYm9keS55ICsgMzIpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb09iamVjdChidWxsZXQsIHBsYXllciwgODAwKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKHRoaXMuc2YpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA0MDAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMuYm9keS5zZXRTaXplKDE2LCAzMCwgMiwgMSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gdGhpcy5zZjtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgICB0aGlzLnNjYWxlLnggPSAtdGhpcy5zZjtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTAwMDtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMuaW5pdE1hcCgpO1xuXG4gICAgLy8gUGxhdGZvcm1zXG4gICAgdGhpcy5wbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShnYW1lLCBnYW1lLndvcmxkLmNlbnRlclgsIDYwMCwgJ3BsYXRmb3JtJyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXRmb3JtKTtcblxuICAgIC8vIFBsYXllclxuICAgIGxldCB4ID0gZ2FtZS53b3JsZC5jZW50ZXJYO1xuICAgIGxldCB5ID0gZ2FtZS53b3JsZC5jZW50ZXJZO1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihnYW1lLCB4LCB5LCAncGxheWVyJyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBBcnRpZmFjdFxuICAgIGxldCBhcnRpZmFjdENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiA0MCxcbiAgICAgIGFzc2V0OiAnYXJ0aWZhY3QnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0ID0gbmV3IEFydGlmYWN0KGFydGlmYWN0Q29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMuYXJ0aWZhY3QpO1xuXG4gICAgLy8gQ2FtZXJhXG4gICAgZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgIC8vIFBoeXNpY3MgZW5naW5lXG4gICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5USUxFX0JJQVMgPSA2NDtcblxuICAgIC8vIENvbnRyb2xzXG4gICAgdGhpcy5jb250cm9scyA9IHtcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BKSxcbiAgICAgIHJpZ2h0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuRCksXG4gICAgICBkb3duOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuUyksXG4gICAgICBzcGFjZWJhcjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKVxuICAgIH07XG4gIH1cblxuICBpbml0TWFwKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMubWFwID0gZ2FtZS5hZGQudGlsZW1hcCgnbWFwJyk7XG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlcycsICd0aWxlcycpO1xuXG4gICAgLy8gTGF5ZXJzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKDApO1xuICAgIHRoaXMubGF5ZXIuc2V0U2NhbGUoMik7XG4gICAgdGhpcy5sYXllci5yZXNpemVXb3JsZCgpO1xuXG4gICAgLy8gQ29sbGlzaW9uc1xuICAgIHRoaXMubWFwLnNldENvbGxpc2lvbigwKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLnN0b3AoKTtcblxuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLnBsYXRmb3JtKTtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLmFydGlmYWN0LmJ1bGxldHMsIHRoaXMucGxheWVyLFxuICAgICAgICB0aGlzLmRhbWFnZVBsYXllciwgbnVsbCwgdGhpcyk7XG5cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0KSB7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3QubGFzdEJ1bGxldCA9IHRoaXMuZ2FtZS50aW1lLm5vd1xuICAgICAgICAgICsgdGhpcy5hcnRpZmFjdC5idWxsZXREZWxheTtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duIHx8IHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZGFtYWdlUGxheWVyKCkge1xuICAgIHRoaXMucGxheWVyLmhlYWx0aCAtPSAyO1xuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvZW50aXRpZXMvcGxheWVyL3BsYXllci5wbmcnLCAzNCwgMzEpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYXJ0aWZhY3QnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1bGxldCcsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnRpbGVtYXAoJ21hcCcsICcvYXNzZXRzL21hcC9tYXAuY3N2Jyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCd0aWxlcycsICcvYXNzZXRzL21hcC9zcHJpdGVzaGVldC5wbmcnKTtcblxuICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICB9XG5cbiAgbG9hZFN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZGluZy4uLicpO1xuICB9XG5cbiAgZmlsZUNvbXBsZXRlKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0ZpbGUgQ29tcGxldGU6ICcgKyBwcm9ncmVzcyArICclIC0gJ1xuICAgICAgKyB0b3RhbExvYWRlZCArICcgb3V0IG9mICcgKyB0b3RhbEZpbGVzKTtcbiAgfVxuXG4gIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWQgQ29tcGxldGUnKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XG4gIH1cbn1cbiIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEyODAsIDcyMCwgUGhhc2VyLkFVVE8sICdnYW1lJywgbnVsbCwgZmFsc2UsIGZhbHNlKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
