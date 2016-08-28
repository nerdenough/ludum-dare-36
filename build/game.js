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
    _this.flashing = false;
    _this.flashTimer = 0;

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

      if (this.flashing && this.game.time.now > this.flashTimer) {
        this.flashing = false;
        this.tint = 0xffffffff;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwiYXJ0aWZhY3QuanMiLCJwbGF5ZXIuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIlBsYXRmb3JtIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY2hlY2tDb2xsaXNpb24iLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiaW1tb3ZhYmxlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJjcmVhdGVCdWxsZXRzIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiYnVsbGV0cyIsImFkZCIsImdyb3VwIiwiZW5hYmxlQm9keSIsInBoeXNpY3NCb2R5VHlwZSIsImNyZWF0ZU11bHRpcGxlIiwic2V0QWxsIiwicGxheWVyIiwiYnVsbGV0IiwiZ2V0Rmlyc3RFeGlzdHMiLCJyZXNldCIsImFyY2FkZSIsIm1vdmVUb09iamVjdCIsIlBsYXllciIsImhlYWx0aCIsImRlYXRoQW5pbWF0aW9uUGxheWVkIiwiYWxpdmUiLCJ2ZWxYIiwic2YiLCJmbGFzaGluZyIsImZsYXNoVGltZXIiLCJhbmltYXRpb25zIiwiZ3Jhdml0eSIsInNldFNpemUiLCJ0aW1lIiwibm93IiwidGludCIsInZlbG9jaXR5IiwidG91Y2hpbmciLCJvbkZsb29yIiwiSHVkIiwiYXZhdGFyIiwic3ByaXRlIiwiZml4ZWRUb0NhbWVyYSIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiaW5pdE1hcCIsInBsYXRmb3JtIiwid29ybGQiLCJjZW50ZXJYIiwiZXhpc3RpbmciLCJwbGF5ZXJDb25maWciLCJoZWlnaHQiLCJhcnRpZmFjdENvbmZpZyIsImFydGlmYWN0IiwiaHVkQ29uZmlnIiwiaHVkIiwiY2FtZXJhIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJUSUxFX0JJQVMiLCJjb250cm9scyIsImlucHV0Iiwia2V5Ym9hcmQiLCJhZGRLZXkiLCJLZXlib2FyZCIsIkEiLCJEIiwiUyIsInNwYWNlYmFyIiwiU1BBQ0VCQVIiLCJtYXAiLCJ0aWxlbWFwIiwiYWRkVGlsZXNldEltYWdlIiwibGF5ZXIiLCJjcmVhdGVMYXllciIsInNldFNjYWxlIiwicmVzaXplV29ybGQiLCJzZXRDb2xsaXNpb25CZXR3ZWVuIiwiY29sbGlkZSIsInN0b3AiLCJvdmVybGFwIiwiZGFtYWdlUGxheWVyIiwiaXNEb3duIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJqdW1wIiwic2hvb3QiLCJwbGF5Iiwia2lsbCIsImZsYXNoIiwiUHJlbG9hZCIsImxvYWQiLCJvbkxvYWRTdGFydCIsImxvYWRTdGFydCIsIm9uRmlsZUNvbXBsZXRlIiwiZmlsZUNvbXBsZXRlIiwib25Mb2FkQ29tcGxldGUiLCJsb2FkQ29tcGxldGUiLCJsb2FkaW5nVGV4dCIsInRleHQiLCJmaWxsIiwic3ByaXRlc2hlZXQiLCJpbWFnZSIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BOzs7QUFDSixvQkFBWUMsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxLQUF4QixFQUErQjtBQUFBOztBQUFBLG9IQUN2QkgsSUFEdUIsRUFDakJDLENBRGlCLEVBQ2RDLENBRGMsRUFDWEMsS0FEVzs7QUFFN0IsVUFBS0gsSUFBTCxHQUFZQSxJQUFaOztBQUVBO0FBQ0EsVUFBS0ksTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCO0FBQ0EsVUFBS0MsS0FBTCxDQUFXRCxLQUFYLENBQWlCLENBQWpCOztBQUVBO0FBQ0EsVUFBS0wsSUFBTCxD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QUFDVixXQUFLdUQsV0FBTCxDQUFpQk8sT0FBakIsQ0FBeUIsWUFBekI7QUFDRDs7O2lDQUVZQyxVQUFVQyxVQUFVQyxTQUFTQyxhQUFhQyxZQUFZO0FBQ2pFLFdBQUtaLFdBQUwsQ0FBaUJPLE9BQWpCLENBQXlCLG9CQUFvQkMsUUFBcEIsR0FBK0IsTUFBL0IsR0FDckJHLFdBRHFCLEdBQ1AsVUFETyxHQUNNQyxVQUQvQjtBQUVEOzs7bUNBRWM7QUFDYixXQUFLWixXQUFMLENBQWlCTyxPQUFqQixDQUF5QixlQUF6QjtBQUNBNUgsV0FBSzZELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQjtBQUNEOzs7Ozs7O0FDckNILElBQUk5RCxPQUFPLElBQUlTLE9BQU95SCxJQUFYLENBQWdCLElBQWhCLEVBQXNCLEdBQXRCLEVBQTJCekgsT0FBTzBILElBQWxDLEVBQXdDLE1BQXhDLEVBQWdELElBQWhELEVBQXNELEtBQXRELEVBQTZELEtBQTdELENBQVg7O0FBRUFuSSxLQUFLNkQsS0FBTCxDQUFXcEMsR0FBWCxDQUFlLE1BQWYsRUFBdUJpQyxJQUF2QjtBQUNBMUQsS0FBSzZELEtBQUwsQ0FBV3BDLEdBQVgsQ0FBZSxTQUFmLEVBQTBCb0YsT0FBMUI7QUFDQTdHLEtBQUs2RCxLQUFMLENBQVdwQyxHQUFYLENBQWUsTUFBZixFQUF1QnNDLElBQXZCOztBQUVBL0QsS0FBSzZELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQiIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGxhdGZvcm0gZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcblxuICAgIC8vIFBoc3lpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24uZG93biA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0ID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLnJpZ2h0ID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG4gIH1cbn1cbiIsImNsYXNzIEFydGlmYWN0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmJ1bGxldERlbGF5ID0gMjAwO1xuICAgIHRoaXMubGFzdEJ1bGxldCA9IDA7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG4gICAgdGhpcy5jcmVhdGVCdWxsZXRzKCk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gIH1cblxuICBjcmVhdGVCdWxsZXRzKCkge1xuICAgIHRoaXMuYnVsbGV0cyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLmJ1bGxldHMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgdGhpcy5idWxsZXRzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICB0aGlzLmJ1bGxldHMuY3JlYXRlTXVsdGlwbGUoMzAsICdidWxsZXQnKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueCcsIDAuNSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLnknLCAxKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdvdXRPZkJvdW5kc0tpbGwnLCB0cnVlKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdjaGVja1dvcmxkQm91bmRzJywgdHJ1ZSk7XG4gIH1cblxuICBzaG9vdChwbGF5ZXIpIHtcbiAgICBsZXQgYnVsbGV0ID0gdGhpcy5idWxsZXRzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICBpZiAoYnVsbGV0KSB7XG4gICAgICBidWxsZXQucmVzZXQodGhpcy5ib2R5LnggKyAzMiwgdGhpcy5ib2R5LnkgKyAzMik7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvT2JqZWN0KGJ1bGxldCwgcGxheWVyLCA4MDApO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5hbGl2ZSA9IHRydWU7XG4gICAgdGhpcy52ZWxYID0gNTAwO1xuICAgIHRoaXMuc2YgPSAzO1xuICAgIHRoaXMuZmxhc2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmZsYXNoVGltZXIgPSAwO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnaWRsZScsIFswLCAxXSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgncnVuJywgWzUsIDYsIDcsIDhdLCB0cnVlKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdkZWF0aCcsIFsxMCwgMTEsIDEyLCAxMywgMTRdLCB0cnVlKTtcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjQpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oLXRoaXMuc2YsIHRoaXMuc2YpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA0MDAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMuYm9keS5zZXRTaXplKDE2LCAzMCwgMiwgMSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mbGFzaGluZyAmJiB0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmZsYXNoVGltZXIpIHtcbiAgICAgIHRoaXMuZmxhc2hpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IHRoaXMuc2Y7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gLXRoaXMuc2Y7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEwMDA7XG4gICAgfVxuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG59XG4iLCJjbGFzcyBIdWQge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgcGxheWVyfSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICB0aGlzLmF2YXRhciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDMyLCAzMiwgJ2F2YXRhcicpO1xuICAgIHRoaXMuYXZhdGFyLmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBCb290IHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheSB7XG4gIGNyZWF0ZSgpIHtcbiAgICAvLyBNYXBcbiAgICB0aGlzLmluaXRNYXAoKTtcblxuICAgIC8vIFBsYXRmb3Jtc1xuICAgIHRoaXMucGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ2FtZSwgZ2FtZS53b3JsZC5jZW50ZXJYLCA2MDAsICdwbGF0Zm9ybScpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF0Zm9ybSk7XG5cbiAgICAvLyBQbGF5ZXJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gMzAwLFxuICAgICAgYXNzZXQ6ICdwbGF5ZXInXG4gICAgfTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyQ29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIEFydGlmYWN0XG4gICAgbGV0IGFydGlmYWN0Q29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gNzAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICAvLyBIVURcbiAgICBsZXQgaHVkQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHBsYXllcjogdGhpcy5wbGF5ZXJcbiAgICB9O1xuICAgIHRoaXMuaHVkID0gbmV3IEh1ZChodWRDb25maWcpO1xuXG4gICAgLy8gQ2FtZXJhXG4gICAgZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgIC8vIFBoeXNpY3MgZW5naW5lXG4gICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5USUxFX0JJQVMgPSA2NDtcblxuICAgIC8vIENvbnRyb2xzXG4gICAgdGhpcy5jb250cm9scyA9IHtcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BKSxcbiAgICAgIHJpZ2h0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuRCksXG4gICAgICBkb3duOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuUyksXG4gICAgICBzcGFjZWJhcjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKVxuICAgIH07XG4gIH1cblxuICBpbml0TWFwKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMubWFwID0gZ2FtZS5hZGQudGlsZW1hcCgnbWFwJyk7XG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlcycsICd0aWxlcycpO1xuXG4gICAgLy8gTGF5ZXJzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKDApO1xuICAgIHRoaXMubGF5ZXIuc2V0U2NhbGUoMik7XG4gICAgdGhpcy5sYXllci5yZXNpemVXb3JsZCgpO1xuXG4gICAgLy8gQ29sbGlzaW9uc1xuICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJldHdlZW4oMSwgNCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcbiAgICB0aGlzLnBsYXllci5zdG9wKCk7XG5cbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybSk7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5hcnRpZmFjdC5idWxsZXRzLCB0aGlzLnBsYXllcixcbiAgICAgICAgdGhpcy5kYW1hZ2VQbGF5ZXIsIG51bGwsIHRoaXMpO1xuXG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMuc3BhY2ViYXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuYXJ0aWZhY3QubGFzdEJ1bGxldCkge1xuICAgICAgICB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQgPSB0aGlzLmdhbWUudGltZS5ub3dcbiAgICAgICAgICArIHRoaXMuYXJ0aWZhY3QuYnVsbGV0RGVsYXk7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3Quc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duIHx8IHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncnVuJywgMTIsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wbGF5ZXIuZGVhdGhBbmltYXRpb25QbGF5ZWQpIHtcbiAgICAgIHRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnZGVhdGgnLCAxMiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGRhbWFnZVBsYXllcihwbGF5ZXIsIGJ1bGxldCkge1xuICAgIGJ1bGxldC5raWxsKCk7XG5cbiAgICBpZiAoIXBsYXllci5mbGFzaGluZykge1xuICAgICAgcGxheWVyLmZsYXNoKCk7XG4gICAgICB0aGlzLnBsYXllci5oZWFsdGggLT0gMTA7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIC8vIFNwcml0ZXNcbiAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsICcvYXNzZXRzL2VudGl0aWVzL3BsYXllci9wbGF5ZXIucG5nJywgMzQsIDMxKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2FydGlmYWN0JywgJy9hc3NldHMvZW50aXRpZXMvYXJ0aWZhY3QucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdidWxsZXQnLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcblxuICAgIC8vIE1hcFxuICAgIGdhbWUubG9hZC50aWxlbWFwKCdtYXAnLCAnL2Fzc2V0cy9tYXAvbWFwLmpzb24nLCBudWxsLFxuICAgICAgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCd0aWxlcycsICcvYXNzZXRzL21hcC90aWxlcy5wbmcnKTtcblxuICAgIC8vIEhVRFxuICAgIGdhbWUubG9hZC5pbWFnZSgnYXZhdGFyJywgJy9hc3NldHMvaHVkL2F2YXRhci5wbmcnKTtcblxuICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICB9XG5cbiAgbG9hZFN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZGluZy4uLicpO1xuICB9XG5cbiAgZmlsZUNvbXBsZXRlKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0ZpbGUgQ29tcGxldGU6ICcgKyBwcm9ncmVzcyArICclIC0gJ1xuICAgICAgKyB0b3RhbExvYWRlZCArICcgb3V0IG9mICcgKyB0b3RhbEZpbGVzKTtcbiAgfVxuXG4gIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWQgQ29tcGxldGUnKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XG4gIH1cbn1cbiIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEyODAsIDcyMCwgUGhhc2VyLkFVVE8sICdnYW1lJywgbnVsbCwgZmFsc2UsIGZhbHNlKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
