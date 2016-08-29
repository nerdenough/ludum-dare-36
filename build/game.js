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
      game.physics.arcade.collide(this.player, this.platforms);
      this.player.stop();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LmpzIiwicGxheWVyLmpzIiwiaHVkLmpzIiwiYm9vdC5qcyIsInBsYXkuanMiLCJwcmVsb2FkLmpzIiwiZ2FtZS5qcyJdLCJuYW1lcyI6WyJBcnRpZmFjdCIsImdhbWUiLCJ4IiwieSIsImFzc2V0IiwiYnVsbGV0RGVsYXkiLCJsYXN0QnVsbGV0IiwiYW5jaG9yIiwic2V0VG8iLCJzY2FsZSIsImNyZWF0ZUJ1bGxldHMiLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGhhc2VyIiwiUGh5c2ljcyIsIkFSQ0FERSIsImJvZHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJidWxsZXRzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwicGh5c2ljc0JvZHlUeXBlIiwiY3JlYXRlTXVsdGlwbGUiLCJzZXRBbGwiLCJwbGF5ZXIiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsInJlc2V0IiwiYXJjYWRlIiwibW92ZVRvT2JqZWN0IiwiU3ByaXRlIiwiUGxheWVyIiwiaGVhbHRoIiwiZGVhdGhBbmltYXRpb25QbGF5ZWQiLCJhbGl2ZSIsInZlbFgiLCJzZiIsImZsYXNoaW5nIiwiZmxhc2hUaW1lciIsImFuaW1hdGlvbnMiLCJncmF2aXR5Iiwic2V0U2l6ZSIsInRpbnQiLCJpbnB1dCIsImFjdGl2ZVBvaW50ZXIiLCJpc0Rvd24iLCJzaG9vdCIsInRpbWUiLCJub3ciLCJjYW1lcmEiLCJ2ZWxvY2l0eSIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJtb3ZlVG9Qb2ludGVyIiwiSHVkIiwiYXZhdGFyIiwic3ByaXRlIiwiZml4ZWRUb0NhbWVyYSIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiaW5pdE1hcCIsImluaXRQbGF0Zm9ybXMiLCJwbGF5ZXJDb25maWciLCJ3b3JsZCIsImNlbnRlclgiLCJoZWlnaHQiLCJleGlzdGluZyIsImFydGlmYWN0Q29uZmlnIiwiYXJ0aWZhY3QiLCJodWRDb25maWciLCJodWQiLCJmb2xsb3ciLCJzdGFydFN5c3RlbSIsIlRJTEVfQklBUyIsImNvbnRyb2xzIiwibGVmdCIsImtleWJvYXJkIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJBIiwicmlnaHQiLCJEIiwiUyIsInNwYWNlYmFyIiwiU1BBQ0VCQVIiLCJtYXAiLCJ0aWxlbWFwIiwiYWRkVGlsZXNldEltYWdlIiwibGF5ZXIiLCJjcmVhdGVMYXllciIsInNldFNjYWxlIiwicmVzaXplV29ybGQiLCJzZXRDb2xsaXNpb25CZXR3ZWVuIiwicGxhdGZvcm1zIiwiY3JlYXRlRnJvbU9iamVjdHMiLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJjb2xsaWRlIiwic3RvcCIsIm92ZXJsYXAiLCJkYW1hZ2VQbGF5ZXIiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImp1bXAiLCJwbGF5Iiwia2lsbCIsImZsYXNoIiwiUHJlbG9hZCIsImxvYWQiLCJvbkxvYWRTdGFydCIsImxvYWRTdGFydCIsIm9uRmlsZUNvbXBsZXRlIiwiZmlsZUNvbXBsZXRlIiwib25Mb2FkQ29tcGxldGUiLCJsb2FkQ29tcGxldGUiLCJsb2FkaW5nVGV4dCIsInRleHQiLCJmaWxsIiwic3ByaXRlc2hlZXQiLCJpbWFnZSIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUE7OztBQUNKLDBCQUFpQztBQUFBLFFBQXBCQyxJQUFvQixRQUFwQkEsSUFBb0I7QUFBQSxRQUFkQyxDQUFjLFFBQWRBLENBQWM7QUFBQSxRQUFYQyxDQUFXLFFBQVhBLENBQVc7QUFBQSxRQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQUE7O0FBQUEsb0hBQ3pCSCxJQUR5QixFQUNuQkMsQ0FEbUIsRUFDaEJDLENBRGdCLEVBQ2JDLEtBRGE7O0FBRS9CLFVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNB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QUFlLE1BQWYsRUFBdUJ5QyxJQUF2QjtBQUNBM0QsS0FBSzhELEtBQUwsQ0FBVzVDLEdBQVgsQ0FBZSxTQUFmLEVBQTBCOEYsT0FBMUI7QUFDQWhILEtBQUs4RCxLQUFMLENBQVc1QyxHQUFYLENBQWUsTUFBZixFQUF1QjhDLElBQXZCOztBQUVBaEUsS0FBSzhELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQiIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXJ0aWZhY3QgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcbiAgICB0aGlzLmNyZWF0ZUJ1bGxldHMoKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgfVxuXG4gIGNyZWF0ZUJ1bGxldHMoKSB7XG4gICAgdGhpcy5idWxsZXRzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuYnVsbGV0cy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICB0aGlzLmJ1bGxldHMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuICAgIHRoaXMuYnVsbGV0cy5jcmVhdGVNdWx0aXBsZSgzMCwgJ2J1bGxldCcpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci54JywgMC41KTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueScsIDEpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ291dE9mQm91bmRzS2lsbCcsIHRydWUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2NoZWNrV29ybGRCb3VuZHMnLCB0cnVlKTtcbiAgfVxuXG4gIHNob290KHBsYXllcikge1xuICAgIGxldCBidWxsZXQgPSB0aGlzLmJ1bGxldHMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgIGlmIChidWxsZXQpIHtcbiAgICAgIGJ1bGxldC5yZXNldCh0aGlzLmJvZHkueCArIDMyLCB0aGlzLmJvZHkueSArIDMyKTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9PYmplY3QoYnVsbGV0LCBwbGF5ZXIsIDgwMCk7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuZGVhdGhBbmltYXRpb25QbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFsaXZlID0gdHJ1ZTtcbiAgICB0aGlzLnZlbFggPSA1MDA7XG4gICAgdGhpcy5zZiA9IDM7XG4gICAgdGhpcy5mbGFzaGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZmxhc2hUaW1lciA9IDA7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdpZGxlJywgWzAsIDFdLCB0cnVlKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdydW4nLCBbNSwgNiwgNywgOF0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2RlYXRoJywgWzEwLCAxMSwgMTIsIDEzLCAxNF0sIHRydWUpO1xuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNCk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygtdGhpcy5zZiwgdGhpcy5zZik7XG4gICAgdGhpcy5jcmVhdGVCdWxsZXRzKCk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDQwMDA7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgdGhpcy5ib2R5LnNldFNpemUoMTYsIDMwLCAyLCAxKTtcbiAgfVxuXG4gIGNyZWF0ZUJ1bGxldHMoKSB7XG4gICAgdGhpcy5idWxsZXRzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuYnVsbGV0cy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICB0aGlzLmJ1bGxldHMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuICAgIHRoaXMuYnVsbGV0cy5jcmVhdGVNdWx0aXBsZSgzMCwgJ2J1bGxldCcpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci54JywgMC41KTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueScsIDEpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ291dE9mQm91bmRzS2lsbCcsIHRydWUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2NoZWNrV29ybGRCb3VuZHMnLCB0cnVlKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy50aW50ID0gMHhmZmZmZmZmZjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hbGl2ZSkge1xuICAgICAgaWYgKHRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bikge1xuICAgICAgICB0aGlzLnNob290KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZsYXNoaW5nICYmIHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuZmxhc2hUaW1lcikge1xuICAgICAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmdhbWUuaW5wdXQueCA8IHRoaXMueCAtIHRoaXMuZ2FtZS5jYW1lcmEueCkge1xuICAgICAgICB0aGlzLnNjYWxlLnggPSB0aGlzLnNmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLXRoaXMuc2Y7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy52ZWxYO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gIH1cblxuICBqdW1wKCkge1xuICAgIGlmICh0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkub25GbG9vcigpKSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC0xNDAwO1xuICAgIH1cbiAgfVxuXG4gIHNob290KCkge1xuICAgIGxldCBidWxsZXQgPSB0aGlzLmJ1bGxldHMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgIGlmIChidWxsZXQpIHtcbiAgICAgIGJ1bGxldC5yZXNldCh0aGlzLmJvZHkueCArIDMyLCB0aGlzLmJvZHkueSArIDMyKTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9Qb2ludGVyKGJ1bGxldCwgODAwKTtcbiAgICB9XG4gIH1cblxuICBmbGFzaCgpIHtcbiAgICB0aGlzLmZsYXNoaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmZsYXNoVGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xuICAgIHRoaXMudGludCA9IDB4ZmY4MDgwODA7XG4gIH1cbn1cbiIsImNsYXNzIEh1ZCB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCBwbGF5ZXJ9KSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcblxuICAgIHRoaXMuYXZhdGFyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMzIsIDMyLCAnYXZhdGFyJyk7XG4gICAgdGhpcy5hdmF0YXIuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgIHRoaXMuaW5pdFBsYXRmb3JtcygpO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDMwMCxcbiAgICAgIGFzc2V0OiAncGxheWVyJ1xuICAgIH07XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllckNvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBBcnRpZmFjdFxuICAgIGxldCBhcnRpZmFjdENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDcwMCxcbiAgICAgIGFzc2V0OiAnYXJ0aWZhY3QnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0ID0gbmV3IEFydGlmYWN0KGFydGlmYWN0Q29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMuYXJ0aWZhY3QpO1xuXG4gICAgLy8gSFVEXG4gICAgbGV0IGh1ZENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICBwbGF5ZXI6IHRoaXMucGxheWVyXG4gICAgfTtcbiAgICB0aGlzLmh1ZCA9IG5ldyBIdWQoaHVkQ29uZmlnKTtcblxuICAgIC8vIENhbWVyYVxuICAgIGdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBQaHlzaWNzIGVuZ2luZVxuICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuVElMRV9CSUFTID0gNjQ7XG5cbiAgICAvLyBDb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSB7XG4gICAgICBsZWZ0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQSksXG4gICAgICByaWdodDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxuICAgICAgZG93bjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxuICAgICAgc3BhY2ViYXI6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUilcbiAgICB9O1xuICB9XG5cbiAgaW5pdE1hcCgpIHtcbiAgICAvLyBNYXBcbiAgICB0aGlzLm1hcCA9IGdhbWUuYWRkLnRpbGVtYXAoJ21hcCcpO1xuICAgIHRoaXMubWFwLmFkZFRpbGVzZXRJbWFnZSgndGlsZXMnLCAndGlsZXMnKTtcblxuICAgIC8vIExheWVyc1xuICAgIHRoaXMubGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcigwKTtcbiAgICB0aGlzLmxheWVyLnNldFNjYWxlKDIpO1xuICAgIHRoaXMubGF5ZXIucmVzaXplV29ybGQoKTtcblxuICAgIC8vIENvbGxpc2lvbnNcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDEsIDQpO1xuICB9XG5cbiAgaW5pdFBsYXRmb3JtcygpIHtcbiAgICB0aGlzLnBsYXRmb3JtcyA9IGdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuZW5hYmxlQm9keSA9IHRydWU7XG5cbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTAsICdwbGF0Zm9ybS1sZWZ0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDExLCAncGxhdGZvcm0nLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTIsICdwbGF0Zm9ybS1yaWdodCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuXG4gICAgdGhpcy5wbGF0Zm9ybXMuc2NhbGUuc2V0VG8oMik7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmltbW92YWJsZScsIHRydWUpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5kb3duJywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgcGxhdGZvcm0uYm9keS5zZXRTaXplKDMyLCA4LCAwLCAyOCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLnBsYXllci5zdG9wKCk7XG5cbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLmFydGlmYWN0LmJ1bGxldHMsIHRoaXMucGxheWVyLFxuICAgICAgICB0aGlzLmRhbWFnZVBsYXllciwgbnVsbCwgdGhpcyk7XG5cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0KSB7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3QubGFzdEJ1bGxldCA9IHRoaXMuZ2FtZS50aW1lLm5vd1xuICAgICAgICAgICsgdGhpcy5hcnRpZmFjdC5idWxsZXREZWxheTtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24gfHwgdGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdydW4nLCAxMiwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnLCAyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCkge1xuICAgICAgdGhpcy5wbGF5ZXIuZGVhdGhBbmltYXRpb25QbGF5ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdkZWF0aCcsIDEyLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZGFtYWdlUGxheWVyKHBsYXllciwgYnVsbGV0KSB7XG4gICAgYnVsbGV0LmtpbGwoKTtcblxuICAgIGlmICghcGxheWVyLmZsYXNoaW5nKSB7XG4gICAgICBwbGF5ZXIuZmxhc2goKTtcbiAgICAgIHRoaXMucGxheWVyLmhlYWx0aCAtPSAxMDtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgLy8gU3ByaXRlc1xuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvZW50aXRpZXMvcGxheWVyL3BsYXllci5wbmcnLCAzNCwgMzEpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYXJ0aWZhY3QnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1bGxldCcsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuXG4gICAgLy8gTWFwXG4gICAgZ2FtZS5sb2FkLnRpbGVtYXAoJ21hcCcsICcvYXNzZXRzL21hcC9tYXAuanNvbicsIG51bGwsXG4gICAgICBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJy9hc3NldHMvbWFwL3RpbGVzLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1sZWZ0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLWxlZnQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1yaWdodCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS1yaWdodC5wbmcnKTtcblxuICAgIC8vIEhVRFxuICAgIGdhbWUubG9hZC5pbWFnZSgnYXZhdGFyJywgJy9hc3NldHMvaHVkL2F2YXRhci5wbmcnKTtcblxuICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICB9XG5cbiAgbG9hZFN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZGluZy4uLicpO1xuICB9XG5cbiAgZmlsZUNvbXBsZXRlKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0ZpbGUgQ29tcGxldGU6ICcgKyBwcm9ncmVzcyArICclIC0gJ1xuICAgICAgKyB0b3RhbExvYWRlZCArICcgb3V0IG9mICcgKyB0b3RhbEZpbGVzKTtcbiAgfVxuXG4gIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWQgQ29tcGxldGUnKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XG4gIH1cbn1cbiIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEyODAsIDcyMCwgUGhhc2VyLkFVVE8sICdnYW1lJywgbnVsbCwgZmFsc2UsIGZhbHNlKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
