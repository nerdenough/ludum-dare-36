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
"use strict";

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
    _this.anchor.setTo(0.5);
    _this.scale.setTo(_this.sf);

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.gravity.y = 4000;
    _this.body.collideWorldBounds = true;
    return _this;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      if (this.health <= 0) {
        this.alive = false;
      }
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.body.velocity.x = -this.velX;
      this.scale.x = this.sf;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.body.velocity.x = this.velX;
      this.scale.x = -this.sf;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.body.velocity.x = 0;
    }
  }, {
    key: "jump",
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

      game.load.image('player', '/assets/entities/player.png');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwiYXJ0aWZhY3QuanMiLCJwbGF5ZXIuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIlBsYXRmb3JtIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY2hlY2tDb2xsaXNpb24iLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiaW1tb3ZhYmxlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJjcmVhdGVCdWxsZXRzIiwidmVsb2NpdHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJidWxsZXRzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwicGh5c2ljc0JvZHlUeXBlIiwiY3JlYXRlTXVsdGlwbGUiLCJzZXRBbGwiLCJwbGF5ZXIiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsInJlc2V0IiwiYXJjYWRlIiwibW92ZVRvT2JqZWN0IiwiUGxheWVyIiwiaGVhbHRoIiwiYWxpdmUiLCJ2ZWxYIiwic2YiLCJncmF2aXR5IiwidG91Y2hpbmciLCJvbkZsb29yIiwiQm9vdCIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBsYXkiLCJpbml0TWFwIiwicGxhdGZvcm0iLCJ3b3JsZCIsImNlbnRlclgiLCJleGlzdGluZyIsImNlbnRlclkiLCJhcnRpZmFjdENvbmZpZyIsImFydGlmYWN0IiwiY2FtZXJhIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJUSUxFX0JJQVMiLCJjb250cm9scyIsImlucHV0Iiwia2V5Ym9hcmQiLCJhZGRLZXkiLCJLZXlib2FyZCIsIkEiLCJEIiwiUyIsInNwYWNlYmFyIiwiU1BBQ0VCQVIiLCJtYXAiLCJ0aWxlbWFwIiwiYWRkVGlsZXNldEltYWdlIiwibGF5ZXIiLCJjcmVhdGVMYXllciIsInNldFNjYWxlIiwicmVzaXplV29ybGQiLCJzZXRDb2xsaXNpb24iLCJjb2xsaWRlIiwic3RvcCIsIm92ZXJsYXAiLCJkYW1hZ2VQbGF5ZXIiLCJpc0Rvd24iLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImp1bXAiLCJ0aW1lIiwibm93Iiwic2hvb3QiLCJQcmVsb2FkIiwibG9hZCIsIm9uTG9hZFN0YXJ0IiwibG9hZFN0YXJ0Iiwib25GaWxlQ29tcGxldGUiLCJmaWxlQ29tcGxldGUiLCJvbkxvYWRDb21wbGV0ZSIsImxvYWRDb21wbGV0ZSIsImxvYWRpbmdUZXh0IiwidGV4dCIsImZpbGwiLCJpbWFnZSIsInNldFRleHQiLCJwcm9ncmVzcyIsImNhY2hlS2V5Iiwic3VjY2VzcyIsInRvdGFsTG9hZGVkIiwidG90YWxGaWxlcyIsIkdhbWUiLCJBVVRPIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUFNQTs7O0FBQ0osb0JBQVlDLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsS0FBeEIsRUFBK0I7QUFBQTs7QUFBQSxvSEFDdkJILElBRHVCLEVBQ2pCQyxDQURpQixFQUNkQyxDQURjLEVBQ1hDLEtBRFc7O0FBRTdCLFVBQUtILElBQUwsR0FBWUEsSUFBWjs7QUFFQTtBQUNBLFVBQUtJLE1BQUwsQ0FBWUMsS0FBWixDQUFrQixHQUFsQjtBQUNBLFVBQUtDLEtBQUwsQ0FBV0QsS0FBWCxDQUFpQixDQUFqQjs7QUFFQTtBQUNBLFVBQUtMLElBQUwsQ0FBVU8sT0FBVixDQUFrQkMsTUFBbEIsUUFBK0JDLE9BQU9DLE9BQVAsQ0FBZUMsTUFBOUM7QUFDQSxVQUFLQyxJQUFMLENBQVVDLGNBQVYsQ0FBeUJDLElBQXpCLEdBQWdDLEtBQWhDO0FBQ0EsVUFBS0YsSUFBTCxDQUFVQyxjQUFWLENBQXlCRSxJQUF6QixHQUFnQyxLQUFoQztBQUNBLFVBQUtILElBQUwsQ0FBVUMsY0FBVixDQUF5QkcsS0FBekIsR0FBaUMsS0FBakM7QUFDQSxVQUFLSixJQUFM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QUVBaEgsS0FBS2lELEtBQUwsQ0FBV3ZCLEdBQVgsQ0FBZSxNQUFmLEVBQXVCb0IsSUFBdkI7QUFDQTlDLEtBQUtpRCxLQUFMLENBQVd2QixHQUFYLENBQWUsU0FBZixFQUEwQm1FLE9BQTFCO0FBQ0E3RixLQUFLaUQsS0FBTCxDQUFXdkIsR0FBWCxDQUFlLE1BQWYsRUFBdUJ5QixJQUF2Qjs7QUFFQW5ELEtBQUtpRCxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBsYXRmb3JtIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGFzc2V0KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG5cbiAgICAvLyBQaHN5aWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24gPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBBcnRpZmFjdCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuXG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG4gICAgdGhpcy5jcmVhdGVCdWxsZXRzKCk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICB9XG5cbiAgY3JlYXRlQnVsbGV0cygpIHtcbiAgICB0aGlzLmJ1bGxldHMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5idWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMuYnVsbGV0cy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgdGhpcy5idWxsZXRzLmNyZWF0ZU11bHRpcGxlKDMwLCAnYnVsbGV0Jyk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLngnLCAwLjUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci55JywgMSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnb3V0T2ZCb3VuZHNLaWxsJywgdHJ1ZSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnY2hlY2tXb3JsZEJvdW5kcycsIHRydWUpO1xuICB9XG5cbiAgc2hvb3QocGxheWVyKSB7XG4gICAgbGV0IGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgaWYgKGJ1bGxldCkge1xuICAgICAgYnVsbGV0LnJlc2V0KHRoaXMuYm9keS54ICsgMzIsIHRoaXMuYm9keS55ICsgMzIpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb09iamVjdChidWxsZXQsIHBsYXllciwgODAwKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbyh0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgICB0aGlzLnNjYWxlLnggPSB0aGlzLnNmO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IC10aGlzLnNmO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gIH1cblxuICBqdW1wKCkge1xuICAgIGlmICh0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkub25GbG9vcigpKSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC0xMDAwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgQm9vdCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXkge1xuICBjcmVhdGUoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5pbml0TWFwKCk7XG5cbiAgICAvLyBQbGF0Zm9ybXNcbiAgICB0aGlzLnBsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdhbWUsIGdhbWUud29ybGQuY2VudGVyWCwgNjAwLCAncGxhdGZvcm0nKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxhdGZvcm0pO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHggPSBnYW1lLndvcmxkLmNlbnRlclg7XG4gICAgbGV0IHkgPSBnYW1lLndvcmxkLmNlbnRlclk7XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGdhbWUsIHgsIHksICdwbGF5ZXInKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIEFydGlmYWN0XG4gICAgbGV0IGFydGlmYWN0Q29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IDQwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLlRJTEVfQklBUyA9IDY0O1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIGluaXRNYXAoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5tYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdtYXAnKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVzJywgJ3RpbGVzJyk7XG5cbiAgICAvLyBMYXllcnNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoMCk7XG4gICAgdGhpcy5sYXllci5zZXRTY2FsZSgyKTtcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uKDApO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuYXJ0aWZhY3QuYnVsbGV0cywgdGhpcy5wbGF5ZXIsXG4gICAgICAgIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcblxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQpIHtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0ID0gdGhpcy5nYW1lLnRpbWUubm93XG4gICAgICAgICAgKyB0aGlzLmFydGlmYWN0LmJ1bGxldERlbGF5O1xuICAgICAgICB0aGlzLmFydGlmYWN0LnNob290KHRoaXMucGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkYW1hZ2VQbGF5ZXIoKSB7XG4gICAgdGhpcy5wbGF5ZXIuaGVhbHRoIC09IDI7XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF5ZXInLCAnL2Fzc2V0cy9lbnRpdGllcy9wbGF5ZXIucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhcnRpZmFjdCcsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYnVsbGV0JywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG5cbiAgICBnYW1lLmxvYWQudGlsZW1hcCgnbWFwJywgJy9hc3NldHMvbWFwL21hcC5jc3YnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJy9hc3NldHMvbWFwL3Nwcml0ZXNoZWV0LnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
