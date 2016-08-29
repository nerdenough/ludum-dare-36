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
    _this.flashing = false;
    _this.flashTimer = 0;

    // Sprite
    _this.animations.add('idle', [0, 1], true);
    _this.animations.add('run', [5, 6, 7, 8], true);
    _this.animations.add('death', [10, 11, 12, 13, 14], true);
    _this.anchor.setTo(0.4);
    _this.scale.setTo(-_this.sf, _this.sf);
    _this.createBullets();

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.gravity.y = 4000;
    _this.body.collideWorldBounds = true;
    _this.body.setSize(16, 30, 2, 1);
    return _this;
  }

  _createClass(Player, [{
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
    key: 'update',
    value: function update() {
      if (this.health <= 0) {
        this.alive = false;
        this.tint = 0xffffffff;
      }

      if (this.alive) {
        if (this.game.input.activePointer.isDown) {
          this.shoot();
        }

        if (this.flashing && this.game.time.now > this.flashTimer) {
          this.flashing = false;
          this.tint = 0xffffffff;
        }

        if (this.game.input.x < this.x - this.game.camera.x) {
          this.scale.x = this.sf;
        } else {
          this.scale.x = -this.sf;
        }
      }
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      this.body.velocity.x = -this.velX;
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      this.body.velocity.x = this.velX;
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
        this.body.velocity.y = -1400;
      }
    }
  }, {
    key: 'shoot',
    value: function shoot() {
      var bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(this.body.x + 32, this.body.y + 32);
        this.game.physics.arcade.moveToPointer(bullet, 800);
      }
    }
  }, {
    key: 'flash',
    value: function flash() {
      this.flashing = true;
      this.flashTimer = this.game.time.now + 1000;
      this.tint = 0xff808080;
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
      this.initPlatforms();

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
    key: 'initPlatforms',
    value: function initPlatforms() {
      this.platforms = game.add.group();
      this.platforms.enableBody = true;

      this.map.createFromObjects('platforms', 10, 'platform-left', 0, true, false, this.platforms);
      this.map.createFromObjects('platforms', 11, 'platform', 0, true, false, this.platforms);
      this.map.createFromObjects('platforms', 12, 'platform-right', 0, true, false, this.platforms);

      this.platforms.scale.setTo(2);
      this.platforms.setAll('body.immovable', true);
      this.platforms.setAll('body.checkCollision.down', false);
      this.platforms.setAll('body.checkCollision.left', false);
      this.platforms.setAll('body.checkCollision.right', false);
      this.platforms.forEach(function (platform) {
        platform.body.setSize(32, 8, 0, 28);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      game.physics.arcade.collide(this.player, this.layer);
      this.player.stop();

      if (!this.controls.down.isDown || !this.controls.spacebar.isDown) {
        game.physics.arcade.collide(this.player, this.platforms);
      }

      if (this.player.alive) {
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

      if (!player.flashing) {
        player.flash();
        this.player.health -= 10;
      }
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
      game.load.image('platform', '/assets/platforms/platform.png');
      game.load.image('platform-left', '/assets/platforms/platform-left.png');
      game.load.image('platform-right', '/assets/platforms/platform-right.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LmpzIiwicGxheWVyLmpzIiwiaHVkLmpzIiwiYm9vdC5qcyIsInBsYXkuanMiLCJwcmVsb2FkLmpzIiwiZ2FtZS5qcyJdLCJuYW1lcyI6WyJBcnRpZmFjdCIsImdhbWUiLCJ4IiwieSIsImFzc2V0IiwiYnVsbGV0RGVsYXkiLCJsYXN0QnVsbGV0IiwiYW5jaG9yIiwic2V0VG8iLCJzY2FsZSIsImNyZWF0ZUJ1bGxldHMiLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGhhc2VyIiwiUGh5c2ljcyIsIkFSQ0FERSIsImJvZHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJidWxsZXRzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwicGh5c2ljc0JvZHlUeXBlIiwiY3JlYXRlTXVsdGlwbGUiLCJzZXRBbGwiLCJwbGF5ZXIiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsInJlc2V0IiwiYXJjYWRlIiwibW92ZVRvT2JqZWN0IiwiU3ByaXRlIiwiUGxheWVyIiwiaGVhbHRoIiwiZGVhdGhBbmltYXRpb25QbGF5ZWQiLCJhbGl2ZSIsInZlbFgiLCJzZiIsImZsYXNoaW5nIiwiZmxhc2hUaW1lciIsImFuaW1hdGlvbnMiLCJncmF2aXR5Iiwic2V0U2l6ZSIsInRpbnQiLCJpbnB1dCIsImFjdGl2ZVBvaW50ZXIiLCJpc0Rvd24iLCJzaG9vdCIsInRpbWUiLCJub3ciLCJjYW1lcmEiLCJ2ZWxvY2l0eSIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJtb3ZlVG9Qb2ludGVyIiwiSHVkIiwiYXZhdGFyIiwic3ByaXRlIiwiZml4ZWRUb0NhbWVyYSIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiaW5pdE1hcCIsImluaXRQbGF0Zm9ybXMiLCJwbGF5ZXJDb25maWciLCJ3b3JsZCIsImNlbnRlclgiLCJoZWlnaHQiLCJleGlzdGluZyIsImFydGlmYWN0Q29uZmlnIiwiYXJ0aWZhY3QiLCJodWRDb25maWciLCJodWQiLCJmb2xsb3ciLCJzdGFydFN5c3RlbSIsIlRJTEVfQklBUyIsImNvbnRyb2xzIiwibGVmdCIsImtleWJvYXJkIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJBIiwicmlnaHQiLCJEIiwiUyIsInNwYWNlYmFyIiwiU1BBQ0VCQVIiLCJtYXAiLCJ0aWxlbWFwIiwiYWRkVGlsZXNldEltYWdlIiwibGF5ZXIiLCJjcmVhdGVMYXllciIsInNldFNjYWxlIiwicmVzaXplV29ybGQiLCJzZXRDb2xsaXNpb25CZXR3ZWVuIiwicGxhdGZvcm1zIiwiY3JlYXRlRnJvbU9iamVjdHMiLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJjb2xsaWRlIiwic3RvcCIsIm92ZXJsYXAiLCJkYW1hZ2VQbGF5ZXIiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImp1bXAiLCJwbGF5Iiwia2lsbCIsImZsYXNoIiwiUHJlbG9hZCIsImxvYWQiLCJvbkxvYWRTdGFydCIsImxvYWRTdGFydCIsIm9uRmlsZUNvbXBsZXRlIiwiZmlsZUNvbXBsZXRlIiwib25Mb2FkQ29tcGxldGUiLCJsb2FkQ29tcGxldGUiLCJsb2FkaW5nVGV4dCIsInRleHQiLCJmaWxsIiwic3ByaXRlc2hlZXQiLCJpbWFnZSIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUE7OztBQUNKLDBCQUFpQztBQUFBLFFBQXBCQyxJQUFvQixRQUFwQkEsSUFBb0I7QUFBQSxRQUFkQyxDQUFjLFFBQWRBLENBQWM7QUFBQSxRQUFYQyxDQUFXLFFBQVhBLENBQVc7QUFBQSxRQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQUE7O0FBQUEsb0hBQ3pCSCxJQUR5QixFQUNuQkMsQ0FEbUIsRUFDaEJDLENBRGdCLEVBQ2JDLEtBRGE7O0FBRS9CLFVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNB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R0FBdEIsRUFBMkJ6SCxPQUFPMEgsSUFBbEMsRUFBd0MsTUFBeEMsRUFBZ0QsSUFBaEQsRUFBc0QsS0FBdEQsRUFBNkQsS0FBN0QsQ0FBWDs7QUFFQXRJLEtBQUs4RCxLQUFMLENBQVc1QyxHQUFYLENBQWUsTUFBZixFQUF1QnlDLElBQXZCO0FBQ0EzRCxLQUFLOEQsS0FBTCxDQUFXNUMsR0FBWCxDQUFlLFNBQWYsRUFBMEI4RixPQUExQjtBQUNBaEgsS0FBSzhELEtBQUwsQ0FBVzVDLEdBQVgsQ0FBZSxNQUFmLEVBQXVCOEMsSUFBdkI7O0FBRUFoRSxLQUFLOEQsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcnRpZmFjdCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDEpO1xuICAgIHRoaXMuY3JlYXRlQnVsbGV0cygpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICB9XG5cbiAgY3JlYXRlQnVsbGV0cygpIHtcbiAgICB0aGlzLmJ1bGxldHMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5idWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMuYnVsbGV0cy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgdGhpcy5idWxsZXRzLmNyZWF0ZU11bHRpcGxlKDMwLCAnYnVsbGV0Jyk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLngnLCAwLjUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci55JywgMSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnb3V0T2ZCb3VuZHNLaWxsJywgdHJ1ZSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnY2hlY2tXb3JsZEJvdW5kcycsIHRydWUpO1xuICB9XG5cbiAgc2hvb3QocGxheWVyKSB7XG4gICAgbGV0IGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgaWYgKGJ1bGxldCkge1xuICAgICAgYnVsbGV0LnJlc2V0KHRoaXMuYm9keS54ICsgMzIsIHRoaXMuYm9keS55ICsgMzIpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb09iamVjdChidWxsZXQsIHBsYXllciwgODAwKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kZWF0aEFuaW1hdGlvblBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcbiAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGVhdGgnLCBbMTAsIDExLCAxMiwgMTMsIDE0XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKC10aGlzLnNmLCB0aGlzLnNmKTtcbiAgICB0aGlzLmNyZWF0ZUJ1bGxldHMoKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuc2V0U2l6ZSgxNiwgMzAsIDIsIDEpO1xuICB9XG5cbiAgY3JlYXRlQnVsbGV0cygpIHtcbiAgICB0aGlzLmJ1bGxldHMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5idWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMuYnVsbGV0cy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgdGhpcy5idWxsZXRzLmNyZWF0ZU11bHRpcGxlKDMwLCAnYnVsbGV0Jyk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLngnLCAwLjUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci55JywgMSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnb3V0T2ZCb3VuZHNLaWxsJywgdHJ1ZSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnY2hlY2tXb3JsZEJvdW5kcycsIHRydWUpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICB0aGlzLmFsaXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnRpbnQgPSAweGZmZmZmZmZmO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMuc2hvb3QoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmxhc2hpbmcgJiYgdGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5mbGFzaFRpbWVyKSB7XG4gICAgICAgIHRoaXMuZmxhc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aW50ID0gMHhmZmZmZmZmZjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2FtZS5pbnB1dC54IDwgdGhpcy54IC0gdGhpcy5nYW1lLmNhbWVyYS54KSB7XG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHRoaXMuc2Y7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNjYWxlLnggPSAtdGhpcy5zZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTE0MDA7XG4gICAgfVxuICB9XG5cbiAgc2hvb3QoKSB7XG4gICAgbGV0IGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgaWYgKGJ1bGxldCkge1xuICAgICAgYnVsbGV0LnJlc2V0KHRoaXMuYm9keS54ICsgMzIsIHRoaXMuYm9keS55ICsgMzIpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb1BvaW50ZXIoYnVsbGV0LCA4MDApO1xuICAgIH1cbiAgfVxuXG4gIGZsYXNoKCkge1xuICAgIHRoaXMuZmxhc2hpbmcgPSB0cnVlO1xuICAgIHRoaXMuZmxhc2hUaW1lciA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDA7XG4gICAgdGhpcy50aW50ID0gMHhmZjgwODA4MDtcbiAgfVxufVxuIiwiY2xhc3MgSHVkIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHBsYXllcn0pIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuXG4gICAgdGhpcy5hdmF0YXIgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgzMiwgMzIsICdhdmF0YXInKTtcbiAgICB0aGlzLmF2YXRhci5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgfVxufVxuIiwiY2xhc3MgQm9vdCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXkge1xuICBjcmVhdGUoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5pbml0TWFwKCk7XG4gICAgdGhpcy5pbml0UGxhdGZvcm1zKCk7XG5cbiAgICAvLyBQbGF5ZXJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gMzAwLFxuICAgICAgYXNzZXQ6ICdwbGF5ZXInXG4gICAgfTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyQ29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIEFydGlmYWN0XG4gICAgbGV0IGFydGlmYWN0Q29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gNzAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICAvLyBIVURcbiAgICBsZXQgaHVkQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHBsYXllcjogdGhpcy5wbGF5ZXJcbiAgICB9O1xuICAgIHRoaXMuaHVkID0gbmV3IEh1ZChodWRDb25maWcpO1xuXG4gICAgLy8gQ2FtZXJhXG4gICAgZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgIC8vIFBoeXNpY3MgZW5naW5lXG4gICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5USUxFX0JJQVMgPSA2NDtcblxuICAgIC8vIENvbnRyb2xzXG4gICAgdGhpcy5jb250cm9scyA9IHtcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BKSxcbiAgICAgIHJpZ2h0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuRCksXG4gICAgICBkb3duOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuUyksXG4gICAgICBzcGFjZWJhcjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKVxuICAgIH07XG4gIH1cblxuICBpbml0TWFwKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMubWFwID0gZ2FtZS5hZGQudGlsZW1hcCgnbWFwJyk7XG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlcycsICd0aWxlcycpO1xuXG4gICAgLy8gTGF5ZXJzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKDApO1xuICAgIHRoaXMubGF5ZXIuc2V0U2NhbGUoMik7XG4gICAgdGhpcy5sYXllci5yZXNpemVXb3JsZCgpO1xuXG4gICAgLy8gQ29sbGlzaW9uc1xuICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJldHdlZW4oMSwgNCk7XG4gIH1cblxuICBpbml0UGxhdGZvcm1zKCkge1xuICAgIHRoaXMucGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5lbmFibGVCb2R5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMCwgJ3BsYXRmb3JtLWxlZnQnLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTEsICdwbGF0Zm9ybScsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMiwgJ3BsYXRmb3JtLXJpZ2h0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG5cbiAgICB0aGlzLnBsYXRmb3Jtcy5zY2FsZS5zZXRUbygyKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuaW1tb3ZhYmxlJywgdHJ1ZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24nLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmxlZnQnLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLnJpZ2h0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICBwbGF0Zm9ybS5ib2R5LnNldFNpemUoMzIsIDgsIDAsIDI4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLnN0b3AoKTtcblxuICAgIGlmICghdGhpcy5jb250cm9scy5kb3duLmlzRG93biB8fCAhdGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuYXJ0aWZhY3QuYnVsbGV0cywgdGhpcy5wbGF5ZXIsXG4gICAgICAgIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcblxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQpIHtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0ID0gdGhpcy5nYW1lLnRpbWUubm93XG4gICAgICAgICAgKyB0aGlzLmFydGlmYWN0LmJ1bGxldERlbGF5O1xuICAgICAgICB0aGlzLmFydGlmYWN0LnNob290KHRoaXMucGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScsIDIsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkKSB7XG4gICAgICB0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2RlYXRoJywgMTIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBkYW1hZ2VQbGF5ZXIocGxheWVyLCBidWxsZXQpIHtcbiAgICBidWxsZXQua2lsbCgpO1xuXG4gICAgaWYgKCFwbGF5ZXIuZmxhc2hpbmcpIHtcbiAgICAgIHBsYXllci5mbGFzaCgpO1xuICAgICAgdGhpcy5wbGF5ZXIuaGVhbHRoIC09IDEwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgUHJlbG9hZCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLmxvYWQub25Mb2FkU3RhcnQuYWRkKHRoaXMubG9hZFN0YXJ0LCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMuZmlsZUNvbXBsZXRlLCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKHRoaXMubG9hZENvbXBsZXRlLCB0aGlzKTtcblxuICAgIHRoaXMubG9hZGluZ1RleHQgPSBnYW1lLmFkZC50ZXh0KDMyLCAzMiwgJ0xvYWRpbmcuLi4nLCB7ZmlsbDogJyNmZmYnfSk7XG5cbiAgICAvLyBTcHJpdGVzXG4gICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnL2Fzc2V0cy9lbnRpdGllcy9wbGF5ZXIvcGxheWVyLnBuZycsIDM0LCAzMSk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhcnRpZmFjdCcsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYnVsbGV0JywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG5cbiAgICAvLyBNYXBcbiAgICBnYW1lLmxvYWQudGlsZW1hcCgnbWFwJywgJy9hc3NldHMvbWFwL21hcC5qc29uJywgbnVsbCxcbiAgICAgIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIGdhbWUubG9hZC5pbWFnZSgndGlsZXMnLCAnL2Fzc2V0cy9tYXAvdGlsZXMucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLWxlZnQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0tbGVmdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLXJpZ2h0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLXJpZ2h0LnBuZycpO1xuXG4gICAgLy8gSFVEXG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhdmF0YXInLCAnL2Fzc2V0cy9odWQvYXZhdGFyLnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
