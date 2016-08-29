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
    _this.activeWeapon = 0;

    // Sprite
    _this.anchor.setTo(0.5);
    _this.scale.setTo(1);
    _this.createBullets();

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.collideWorldBounds = true;

    _this.initWeapons();
    return _this;
  }

  _createClass(Artifact, [{
    key: 'initWeapons',
    value: function initWeapons() {
      this.weapons = [];
      this.weapons.push(new SingleBullet(this.game));
    }
  }, {
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
      this.weapons[this.activeWeapon].fire(this);
    }
  }]);

  return Artifact;
}(Phaser.Sprite);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Phaser$Sprite) {
  _inherits(Bullet, _Phaser$Sprite);

  function Bullet(game, asset) {
    _classCallCheck(this, Bullet);

    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, game, 0, 0, asset));

    _this.anchor.set(0.5);
    _this.checkWorldBounds = true;
    _this.outOfBoundsKill = true;
    _this.exists = false;
    return _this;
  }

  _createClass(Bullet, [{
    key: "fire",
    value: function fire(x, y, angle, speed, gx, gy) {
      gx = gx || 0;
      gy = gy || 0;

      this.reset(x, y);
      this.scale.set(1);

      this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

      this.angle = angle;
      this.body.gravity.set(gx, gy);
    }
  }]);

  return Bullet;
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleBullet = function (_Phaser$Group) {
  _inherits(SingleBullet, _Phaser$Group);

  function SingleBullet(game) {
    _classCallCheck(this, SingleBullet);

    var _this = _possibleConstructorReturn(this, (SingleBullet.__proto__ || Object.getPrototypeOf(SingleBullet)).call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE));

    _this.nextFire = 0;
    _this.bulletSpeed = 600;
    _this.fireRate = 300;

    for (var i = 0; i < 64; i++) {
      _this.add(new Bullet(game, 'bullet'), true);
    }
    return _this;
  }

  _createClass(SingleBullet, [{
    key: 'fire',
    value: function fire(source) {
      if (this.game.time.time < this.nextFire) {
        return;
      }

      var x = source.x;
      var y = source.y;

      this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);

      this.nextFire = this.game.time.time + this.fireRate;
    }
  }]);

  return SingleBullet;
}(Phaser.Group);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwic2luZ2xlLWJ1bGxldC5qcyIsImh1ZC5qcyIsImJvb3QuanMiLCJwbGF5LmpzIiwicHJlbG9hZC5qcyIsImdhbWUuanMiXSwibmFtZXMiOlsiQXJ0aWZhY3QiLCJnYW1lIiwieCIsInkiLCJhc3NldCIsImJ1bGxldERlbGF5IiwibGFzdEJ1bGxldCIsImFjdGl2ZVdlYXBvbiIsImFuY2hvciIsInNldFRvIiwic2NhbGUiLCJjcmVhdGVCdWxsZXRzIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiaW5pdFdlYXBvbnMiLCJ3ZWFwb25zIiwicHVzaCIsIlNpbmdsZUJ1bGxldCIsImJ1bGxldHMiLCJhZGQiLCJncm91cCIsImVuYWJsZUJvZHkiLCJwaHlzaWNzQm9keVR5cGUiLCJjcmVhdGVNdWx0aXBsZSIsInNldEFsbCIsInBsYXllciIsImZpcmUiLCJTcHJpdGUiLCJCdWxsZXQiLCJzZXQiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZXhpc3RzIiwiYW5nbGUiLCJzcGVlZCIsImd4IiwiZ3kiLCJyZXNldCIsImFyY2FkZSIsInZlbG9jaXR5RnJvbUFuZ2xlIiwidmVsb2NpdHkiLCJncmF2aXR5IiwiUGxheWVyIiwiaGVhbHRoIiwiZGVhdGhBbmltYXRpb25QbGF5ZWQiLCJhbGl2ZSIsInZlbFgiLCJzZiIsImZsYXNoaW5nIiwiZmxhc2hUaW1lciIsImFuaW1hdGlvbnMiLCJzZXRTaXplIiwidGludCIsImlucHV0IiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsInNob290IiwidGltZSIsIm5vdyIsImNhbWVyYSIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsIm1vdmVUb1BvaW50ZXIiLCJ3b3JsZCIsIm5leHRGaXJlIiwiYnVsbGV0U3BlZWQiLCJmaXJlUmF0ZSIsImkiLCJzb3VyY2UiLCJHcm91cCIsIkh1ZCIsImF2YXRhciIsInNwcml0ZSIsImZpeGVkVG9DYW1lcmEiLCJCb290Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdGF0ZSIsInN0YXJ0IiwiUGxheSIsImluaXRNYXAiLCJpbml0UGxhdGZvcm1zIiwicGxheWVyQ29uZmlnIiwiY2VudGVyWCIsImhlaWdodCIsImV4aXN0aW5nIiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImh1ZENvbmZpZyIsImh1ZCIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJsZWZ0Iiwia2V5Ym9hcmQiLCJhZGRLZXkiLCJLZXlib2FyZCIsIkEiLCJyaWdodCIsIkQiLCJTIiwic3BhY2ViYXIiLCJTUEFDRUJBUiIsIm1hcCIsInRpbGVtYXAiLCJhZGRUaWxlc2V0SW1hZ2UiLCJsYXllciIsImNyZWF0ZUxheWVyIiwic2V0U2NhbGUiLCJyZXNpemVXb3JsZCIsInNldENvbGxpc2lvbkJldHdlZW4iLCJwbGF0Zm9ybXMiLCJjcmVhdGVGcm9tT2JqZWN0cyIsImZvckVhY2giLCJwbGF0Zm9ybSIsImNvbGxpZGUiLCJzdG9wIiwib3ZlcmxhcCIsImRhbWFnZVBsYXllciIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsInBsYXkiLCJraWxsIiwiZmxhc2giLCJQcmVsb2FkIiwibG9hZCIsIm9uTG9hZFN0YXJ0IiwibG9hZFN0YXJ0Iiwib25GaWxlQ29tcGxldGUiLCJmaWxlQ29tcGxldGUiLCJvbkxvYWRDb21wbGV0ZSIsImxvYWRDb21wbGV0ZSIsImxvYWRpbmdUZXh0IiwidGV4dCIsImZpbGwiLCJzcHJpdGVzaGVldCIsImltYWdlIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJzZXRUZXh0IiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJHYW1lIiwiQVVUTyJdLCJt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WCxDQUFlLFNBQWYsRUFBMEI4RyxPQUExQjtBQUNBckksS0FBS29GLEtBQUwsQ0FBVzdELEdBQVgsQ0FBZSxNQUFmLEVBQXVCK0QsSUFBdkI7O0FBRUF0RixLQUFLb0YsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcnRpZmFjdCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuICAgIHRoaXMuYWN0aXZlV2VhcG9uID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcbiAgICB0aGlzLmNyZWF0ZUJ1bGxldHMoKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5pdFdlYXBvbnMoKTtcbiAgfVxuXG4gIGluaXRXZWFwb25zKCkge1xuICAgIHRoaXMud2VhcG9ucyA9IFtdO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBTaW5nbGVCdWxsZXQodGhpcy5nYW1lKSk7XG4gIH1cblxuICBjcmVhdGVCdWxsZXRzKCkge1xuICAgIHRoaXMuYnVsbGV0cyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLmJ1bGxldHMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgdGhpcy5idWxsZXRzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICB0aGlzLmJ1bGxldHMuY3JlYXRlTXVsdGlwbGUoMzAsICdidWxsZXQnKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueCcsIDAuNSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLnknLCAxKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdvdXRPZkJvdW5kc0tpbGwnLCB0cnVlKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdjaGVja1dvcmxkQm91bmRzJywgdHJ1ZSk7XG4gIH1cblxuICBzaG9vdChwbGF5ZXIpIHtcbiAgICB0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLmZpcmUodGhpcyk7XG4gIH1cbn1cbiIsImNsYXNzIEJ1bGxldCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIDAsIDAsIGFzc2V0KTtcblxuICAgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuICAgIHRoaXMuZXhpc3RzID0gZmFsc2U7XG4gIH1cblxuICBmaXJlKHgsIHksIGFuZ2xlLCBzcGVlZCwgZ3gsIGd5KSB7XG4gICAgZ3ggPSBneCB8fCAwO1xuICAgIGd5ID0gZ3kgfHwgMDtcblxuICAgIHRoaXMucmVzZXQoeCwgeSk7XG4gICAgdGhpcy5zY2FsZS5zZXQoMSk7XG5cbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUudmVsb2NpdHlGcm9tQW5nbGUoYW5nbGUsIHNwZWVkLFxuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5KTtcblxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS5zZXQoZ3gsIGd5KTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5hbGl2ZSA9IHRydWU7XG4gICAgdGhpcy52ZWxYID0gNTAwO1xuICAgIHRoaXMuc2YgPSAzO1xuICAgIHRoaXMuZmxhc2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmZsYXNoVGltZXIgPSAwO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnaWRsZScsIFswLCAxXSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgncnVuJywgWzUsIDYsIDcsIDhdLCB0cnVlKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdkZWF0aCcsIFsxMCwgMTEsIDEyLCAxMywgMTRdLCB0cnVlKTtcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjQpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oLXRoaXMuc2YsIHRoaXMuc2YpO1xuICAgIHRoaXMuY3JlYXRlQnVsbGV0cygpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA0MDAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMuYm9keS5zZXRTaXplKDE2LCAzMCwgMiwgMSk7XG4gIH1cblxuICBjcmVhdGVCdWxsZXRzKCkge1xuICAgIHRoaXMuYnVsbGV0cyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLmJ1bGxldHMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgdGhpcy5idWxsZXRzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICB0aGlzLmJ1bGxldHMuY3JlYXRlTXVsdGlwbGUoMzAsICdidWxsZXQnKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdhbmNob3IueCcsIDAuNSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLnknLCAxKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdvdXRPZkJvdW5kc0tpbGwnLCB0cnVlKTtcbiAgICB0aGlzLmJ1bGxldHMuc2V0QWxsKCdjaGVja1dvcmxkQm91bmRzJywgdHJ1ZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mbGFzaGluZyAmJiB0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmZsYXNoVGltZXIpIHtcbiAgICAgICAgdGhpcy5mbGFzaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbnQgPSAweGZmZmZmZmZmO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nYW1lLmlucHV0LnggPCB0aGlzLnggLSB0aGlzLmdhbWUuY2FtZXJhLngpIHtcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gdGhpcy5zZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC10aGlzLnNmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTQwMDtcbiAgICB9XG4gIH1cblxuICBzaG9vdCgpIHtcbiAgICBsZXQgYnVsbGV0ID0gdGhpcy5idWxsZXRzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICBpZiAoYnVsbGV0KSB7XG4gICAgICBidWxsZXQucmVzZXQodGhpcy5ib2R5LnggKyAzMiwgdGhpcy5ib2R5LnkgKyAzMik7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvUG9pbnRlcihidWxsZXQsIDgwMCk7XG4gICAgfVxuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG59XG4iLCJjbGFzcyBTaW5nbGVCdWxsZXQgZXh0ZW5kcyBQaGFzZXIuR3JvdXAge1xuICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgc3VwZXIoZ2FtZSwgZ2FtZS53b3JsZCwgJ1NpbmdsZSBCdWxsZXQnLCBmYWxzZSwgdHJ1ZSxcbiAgICAgIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gNjAwO1xuICAgIHRoaXMuZmlyZVJhdGUgPSAzMDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkKG5ldyBCdWxsZXQoZ2FtZSwgJ2J1bGxldCcpLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXNcbiAgICAgIC5nZXRGaXJzdEV4aXN0cyhmYWxzZSlcbiAgICAgIC5maXJlKHgsIHksIDkwLCB0aGlzLmJ1bGxldFNwZWVkLCAwLCAwKTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgSHVkIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHBsYXllcn0pIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuXG4gICAgdGhpcy5hdmF0YXIgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgzMiwgMzIsICdhdmF0YXInKTtcbiAgICB0aGlzLmF2YXRhci5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgfVxufVxuIiwiY2xhc3MgQm9vdCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXkge1xuICBjcmVhdGUoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5pbml0TWFwKCk7XG4gICAgdGhpcy5pbml0UGxhdGZvcm1zKCk7XG5cbiAgICAvLyBQbGF5ZXJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gMzAwLFxuICAgICAgYXNzZXQ6ICdwbGF5ZXInXG4gICAgfTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyQ29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIEFydGlmYWN0XG4gICAgbGV0IGFydGlmYWN0Q29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gNzAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICAvLyBIVURcbiAgICBsZXQgaHVkQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHBsYXllcjogdGhpcy5wbGF5ZXJcbiAgICB9O1xuICAgIHRoaXMuaHVkID0gbmV3IEh1ZChodWRDb25maWcpO1xuXG4gICAgLy8gQ2FtZXJhXG4gICAgZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgIC8vIFBoeXNpY3MgZW5naW5lXG4gICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5USUxFX0JJQVMgPSA2NDtcblxuICAgIC8vIENvbnRyb2xzXG4gICAgdGhpcy5jb250cm9scyA9IHtcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BKSxcbiAgICAgIHJpZ2h0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuRCksXG4gICAgICBkb3duOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuUyksXG4gICAgICBzcGFjZWJhcjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKVxuICAgIH07XG4gIH1cblxuICBpbml0TWFwKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMubWFwID0gZ2FtZS5hZGQudGlsZW1hcCgnbWFwJyk7XG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlcycsICd0aWxlcycpO1xuXG4gICAgLy8gTGF5ZXJzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKDApO1xuICAgIHRoaXMubGF5ZXIuc2V0U2NhbGUoMik7XG4gICAgdGhpcy5sYXllci5yZXNpemVXb3JsZCgpO1xuXG4gICAgLy8gQ29sbGlzaW9uc1xuICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJldHdlZW4oMSwgNCk7XG4gIH1cblxuICBpbml0UGxhdGZvcm1zKCkge1xuICAgIHRoaXMucGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5lbmFibGVCb2R5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMCwgJ3BsYXRmb3JtLWxlZnQnLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTEsICdwbGF0Zm9ybScsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMiwgJ3BsYXRmb3JtLXJpZ2h0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG5cbiAgICB0aGlzLnBsYXRmb3Jtcy5zY2FsZS5zZXRUbygyKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuaW1tb3ZhYmxlJywgdHJ1ZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24nLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmxlZnQnLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLnJpZ2h0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICBwbGF0Zm9ybS5ib2R5LnNldFNpemUoMzIsIDgsIDAsIDI4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLnN0b3AoKTtcblxuICAgIGlmICghdGhpcy5jb250cm9scy5kb3duLmlzRG93biB8fCAhdGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuYXJ0aWZhY3QuYnVsbGV0cywgdGhpcy5wbGF5ZXIsXG4gICAgICAgIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcblxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQpIHtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0ID0gdGhpcy5nYW1lLnRpbWUubm93XG4gICAgICAgICAgKyB0aGlzLmFydGlmYWN0LmJ1bGxldERlbGF5O1xuICAgICAgICB0aGlzLmFydGlmYWN0LnNob290KHRoaXMucGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScsIDIsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkKSB7XG4gICAgICB0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2RlYXRoJywgMTIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBkYW1hZ2VQbGF5ZXIocGxheWVyLCBidWxsZXQpIHtcbiAgICBidWxsZXQua2lsbCgpO1xuXG4gICAgaWYgKCFwbGF5ZXIuZmxhc2hpbmcpIHtcbiAgICAgIHBsYXllci5mbGFzaCgpO1xuICAgICAgdGhpcy5wbGF5ZXIuaGVhbHRoIC09IDEwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgUHJlbG9hZCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLmxvYWQub25Mb2FkU3RhcnQuYWRkKHRoaXMubG9hZFN0YXJ0LCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMuZmlsZUNvbXBsZXRlLCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKHRoaXMubG9hZENvbXBsZXRlLCB0aGlzKTtcblxuICAgIHRoaXMubG9hZGluZ1RleHQgPSBnYW1lLmFkZC50ZXh0KDMyLCAzMiwgJ0xvYWRpbmcuLi4nLCB7ZmlsbDogJyNmZmYnfSk7XG5cbiAgICAvLyBTcHJpdGVzXG4gICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnL2Fzc2V0cy9lbnRpdGllcy9wbGF5ZXIvcGxheWVyLnBuZycsIDM0LCAzMSk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhcnRpZmFjdCcsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYnVsbGV0JywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG5cbiAgICAvLyBNYXBcbiAgICBnYW1lLmxvYWQudGlsZW1hcCgnbWFwJywgJy9hc3NldHMvbWFwL21hcC5qc29uJywgbnVsbCxcbiAgICAgIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIGdhbWUubG9hZC5pbWFnZSgndGlsZXMnLCAnL2Fzc2V0cy9tYXAvdGlsZXMucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLWxlZnQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0tbGVmdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLXJpZ2h0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLXJpZ2h0LnBuZycpO1xuXG4gICAgLy8gSFVEXG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhdmF0YXInLCAnL2Fzc2V0cy9odWQvYXZhdGFyLnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
