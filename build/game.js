"use strict";

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

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.collideWorldBounds = true;

    _this.initWeapons();
    return _this;
  }

  _createClass(Artifact, [{
    key: "initWeapons",
    value: function initWeapons() {
      this.weapons = [];
      this.weapons.push(new SingleBullet(this.game));
      this.weapons.push(new LaserBeam(this.game));
    }
  }, {
    key: "shoot",
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

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.gravity.y = 4000;
    _this.body.collideWorldBounds = true;
    _this.body.setSize(16, 30, 2, 1);

    _this.jumpSound = game.add.audio('jump');

    _this.weapon = new SingleBullet(_this.game);
    return _this;
  }

  _createClass(Player, [{
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
        this.body.velocity.y = -1200;
        this.jumpSound.play();
      }
    }
  }, {
    key: 'shoot',
    value: function shoot() {
      this.weapon.fireToPointer(this);
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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LaserBeam = function () {
  function LaserBeam(game) {
    _classCallCheck(this, LaserBeam);

    this.game = game;
    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 20;
  }

  _createClass(LaserBeam, [{
    key: "fire",
    value: function fire(source) {
      if (this.game.time.time < this.nextFire) {
        return;
      }

      var x = source.x;
      var y = source.y;

      this.nextFire = this.game.time.time + this.fireRate;
    }
  }]);

  return LaserBeam;
}();
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

    _this.game = game;

    _this.nextFire = 0;
    _this.bulletSpeed = 800;
    _this.fireRate = 300;

    for (var i = 0; i < 64; i++) {
      _this.add(new Bullet(game, 'bullet'), true);
    }

    _this.shoot = _this.game.add.audio('shoot');
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
      this.shoot.play();

      this.nextFire = this.game.time.time + this.fireRate;
    }
  }, {
    key: 'fireToPointer',
    value: function fireToPointer(source) {
      if (this.game.time.time < this.nextFire) {
        return;
      }

      var x = source.x;
      var y = source.y;

      var bullet = this.getFirstExists(false);
      if (bullet) {
        bullet.reset(x, y);
        this.game.physics.arcade.moveToPointer(bullet, 1400);
        this.shoot.play();
      }

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
      this.background = game.add.sprite(0, 0, 'background');
      this.background.scale.setTo(2);

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
        platform.body.setSize(32, 8, 0, 2);
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
      game.load.image('bullet', '/assets/entities/bullets/bullet.png');
      game.load.image('beam', '/assets/entities/bullets/beam.png');
      game.load.image('platform', '/assets/platforms/platform.png');
      game.load.image('background', '/assets/background.png');

      // Map
      game.load.tilemap('map', '/assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', '/assets/map/tiles.png');
      game.load.image('platform', '/assets/platforms/platform.png');
      game.load.image('platform-left', '/assets/platforms/platform-left.png');
      game.load.image('platform-right', '/assets/platforms/platform-right.png');

      // HUD
      game.load.image('avatar', '/assets/hud/avatar.png');

      // Audio
      game.load.audio('jump', '/assets/sounds/jump.wav');
      game.load.audio('shoot', '/assets/sounds/shoot.wav');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0IiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiaW5pdFdlYXBvbnMiLCJ3ZWFwb25zIiwicHVzaCIsIlNpbmdsZUJ1bGxldCIsIkxhc2VyQmVhbSIsInBsYXllciIsImZpcmUiLCJTcHJpdGUiLCJCdWxsZXQiLCJzZXQiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZXhpc3RzIiwiYW5nbGUiLCJzcGVlZCIsImd4IiwiZ3kiLCJyZXNldCIsImFyY2FkZSIsInZlbG9jaXR5RnJvbUFuZ2xlIiwidmVsb2NpdHkiLCJncmF2aXR5IiwiUGxheWVyIiwiaGVhbHRoIiwiZGVhdGhBbmltYXRpb25QbGF5ZWQiLCJhbGl2ZSIsInZlbFgiLCJzZiIsImZsYXNoaW5nIiwiZmxhc2hUaW1lciIsImFuaW1hdGlvbnMiLCJhZGQiLCJzZXRTaXplIiwianVtcFNvdW5kIiwiYXVkaW8iLCJ3ZWFwb24iLCJ0aW50IiwiaW5wdXQiLCJhY3RpdmVQb2ludGVyIiwiaXNEb3duIiwic2hvb3QiLCJ0aW1lIiwibm93IiwiY2FtZXJhIiwidG91Y2hpbmciLCJkb3duIiwib25GbG9vciIsInBsYXkiLCJmaXJlVG9Qb2ludGVyIiwibmV4dEZpcmUiLCJidWxsZXRTcGVlZCIsImZpcmVSYXRlIiwic291cmNlIiwid29ybGQiLCJpIiwiZ2V0Rmlyc3RFeGlzdHMiLCJidWxsZXQiLCJtb3ZlVG9Qb2ludGVyIiwiR3JvdXAiLCJIdWQiLCJhdmF0YXIiLCJzcHJpdGUiLCJmaXhlZFRvQ2FtZXJhIiwiQm9vdCIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBsYXkiLCJiYWNrZ3JvdW5kIiwiaW5pdE1hcCIsImluaXRQbGF0Zm9ybXMiLCJwbGF5ZXJDb25maWciLCJjZW50ZXJYIiwiaGVpZ2h0IiwiZXhpc3RpbmciLCJhcnRpZmFjdENvbmZpZyIsImFydGlmYWN0IiwiaHVkQ29uZmlnIiwiaHVkIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJUSUxFX0JJQVMiLCJjb250cm9scyIsImxlZnQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsImNyZWF0ZUZyb21PYmplY3RzIiwic2V0QWxsIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwiY29sbGlkZSIsInN0b3AiLCJvdmVybGFwIiwiYnVsbGV0cyIsImRhbWFnZVBsYXllciIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsImtpbGwiLCJmbGFzaCIsIlByZWxvYWQiLCJsb2FkIiwib25Mb2FkU3RhcnQiLCJsb2FkU3RhcnQiLCJvbkZpbGVDb21wbGV0ZSIsImZpbGVDb21wbGV0ZSIsIm9uTG9hZENvbXBsZXRlIiwibG9hZENvbXBsZXRlIiwibG9hZGluZ1RleHQiLCJ0ZXh0IiwiZmlsbCIsInNwcml0ZXNoZWV0IiwiaW1hZ2UiLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsInNldFRleHQiLCJwcm9ncmVzcyIsImNhY2hlS2V5Iiwic3VjY2VzcyIsInRvdGFsTG9h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SzRELFdBQUwsQ0FBaUJPLE9BQWpCLENBQXlCLFlBQXpCO0FBQ0Q7OztpQ0FFWUMsVUFBVUMsVUFBVUMsU0FBU0MsYUFBYUMsWUFBWTtBQUNqRSxXQUFLWixXQUFMLENBQWlCTyxPQUFqQixDQUF5QixvQkFBb0JDLFFBQXBCLEdBQStCLE1BQS9CLEdBQ3JCRyxXQURxQixHQUNQLFVBRE8sR0FDTUMsVUFEL0I7QUFFRDs7O21DQUVjO0FBQ2IsV0FBS1osV0FBTCxDQUFpQk8sT0FBakIsQ0FBeUIsZUFBekI7QUFDQXZKLFdBQUttRixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakI7QUFDRDs7Ozs7OztBQzlDSCxJQUFJcEYsT0FBTyxJQUFJWSxPQUFPaUosSUFBWCxDQUFnQixJQUFoQixFQUFzQixHQUF0QixFQUEyQmpKLE9BQU9rSixJQUFsQyxFQUF3QyxNQUF4QyxFQUFnRCxJQUFoRCxFQUFzRCxLQUF0RCxFQUE2RCxLQUE3RCxDQUFYOztBQUVBOUosS0FBS21GLEtBQUwsQ0FBV25DLEdBQVgsQ0FBZSxNQUFmLEVBQXVCZ0MsSUFBdkI7QUFDQWhGLEtBQUttRixLQUFMLENBQVduQyxHQUFYLENBQWUsU0FBZixFQUEwQndGLE9BQTFCO0FBQ0F4SSxLQUFLbUYsS0FBTCxDQUFXbkMsR0FBWCxDQUFlLE1BQWYsRUFBdUJxQyxJQUF2Qjs7QUFFQXJGLEtBQUttRixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFydGlmYWN0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmJ1bGxldERlbGF5ID0gMjAwO1xuICAgIHRoaXMubGFzdEJ1bGxldCA9IDA7XG4gICAgdGhpcy5hY3RpdmVXZWFwb24gPSAwO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDEpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuXG4gICAgdGhpcy5pbml0V2VhcG9ucygpO1xuICB9XG5cbiAgaW5pdFdlYXBvbnMoKSB7XG4gICAgdGhpcy53ZWFwb25zID0gW107XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IFNpbmdsZUJ1bGxldCh0aGlzLmdhbWUpKTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgTGFzZXJCZWFtKHRoaXMuZ2FtZSkpO1xuICB9XG5cbiAgc2hvb3QocGxheWVyKSB7XG4gICAgdGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXS5maXJlKHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBCdWxsZXQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCAwLCAwLCBhc3NldCk7XG5cbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcbiAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXN0cyA9IGZhbHNlO1xuICB9XG5cbiAgZmlyZSh4LCB5LCBhbmdsZSwgc3BlZWQsIGd4LCBneSkge1xuICAgIGd4ID0gZ3ggfHwgMDtcbiAgICBneSA9IGd5IHx8IDA7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHkpO1xuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xuXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbUFuZ2xlKGFuZ2xlLCBzcGVlZCxcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eSk7XG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkuc2V0KGd4LCBneSk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kZWF0aEFuaW1hdGlvblBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcbiAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGVhdGgnLCBbMTAsIDExLCAxMiwgMTMsIDE0XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKC10aGlzLnNmLCB0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuc2V0U2l6ZSgxNiwgMzAsIDIsIDEpO1xuXG4gICAgdGhpcy5qdW1wU291bmQgPSBnYW1lLmFkZC5hdWRpbygnanVtcCcpO1xuXG4gICAgdGhpcy53ZWFwb24gPSBuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mbGFzaGluZyAmJiB0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmZsYXNoVGltZXIpIHtcbiAgICAgICAgdGhpcy5mbGFzaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbnQgPSAweGZmZmZmZmZmO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nYW1lLmlucHV0LnggPCB0aGlzLnggLSB0aGlzLmdhbWUuY2FtZXJhLngpIHtcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gdGhpcy5zZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC10aGlzLnNmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTIwMDtcbiAgICAgIHRoaXMuanVtcFNvdW5kLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBzaG9vdCgpIHtcbiAgICB0aGlzLndlYXBvbi5maXJlVG9Qb2ludGVyKHRoaXMpO1xuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG59XG4iLCJjbGFzcyBMYXNlckJlYW0ge1xuICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gMTAwMDtcbiAgICB0aGlzLmZpcmVSYXRlID0gMjA7XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgU2luZ2xlQnVsbGV0IGV4dGVuZHMgUGhhc2VyLkdyb3VwIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHN1cGVyKGdhbWUsIGdhbWUud29ybGQsICdTaW5nbGUgQnVsbGV0JywgZmFsc2UsIHRydWUsXG4gICAgICBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gODAwO1xuICAgIHRoaXMuZmlyZVJhdGUgPSAzMDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkKG5ldyBCdWxsZXQoZ2FtZSwgJ2J1bGxldCcpLCB0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNob290ID0gdGhpcy5nYW1lLmFkZC5hdWRpbygnc2hvb3QnKTtcbiAgfVxuXG4gIGZpcmUoc291cmNlKSB7XG4gICAgaWYgKHRoaXMuZ2FtZS50aW1lLnRpbWUgPCB0aGlzLm5leHRGaXJlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHggPSBzb3VyY2UueDtcbiAgICBsZXQgeSA9IHNvdXJjZS55O1xuXG4gICAgdGhpc1xuICAgICAgLmdldEZpcnN0RXhpc3RzKGZhbHNlKVxuICAgICAgLmZpcmUoeCwgeSwgOTAsIHRoaXMuYnVsbGV0U3BlZWQsIDAsIDApO1xuICAgIHRoaXMuc2hvb3QucGxheSgpO1xuXG4gICAgdGhpcy5uZXh0RmlyZSA9IHRoaXMuZ2FtZS50aW1lLnRpbWUgKyB0aGlzLmZpcmVSYXRlO1xuICB9XG5cbiAgZmlyZVRvUG9pbnRlcihzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICBsZXQgYnVsbGV0ID0gdGhpcy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgaWYgKGJ1bGxldCkge1xuICAgICAgYnVsbGV0LnJlc2V0KHgsIHkpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb1BvaW50ZXIoYnVsbGV0LCAxNDAwKTtcbiAgICAgIHRoaXMuc2hvb3QucGxheSgpO1xuICAgIH1cblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgSHVkIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHBsYXllcn0pIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuXG4gICAgdGhpcy5hdmF0YXIgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgzMiwgMzIsICdhdmF0YXInKTtcbiAgICB0aGlzLmF2YXRhci5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgfVxufVxuIiwiY2xhc3MgQm9vdCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXkge1xuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gZ2FtZS5hZGQuc3ByaXRlKDAsIDAsICdiYWNrZ3JvdW5kJyk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kLnNjYWxlLnNldFRvKDIpO1xuXG4gICAgLy8gTWFwXG4gICAgdGhpcy5pbml0TWFwKCk7XG4gICAgdGhpcy5pbml0UGxhdGZvcm1zKCk7XG5cbiAgICAvLyBQbGF5ZXJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gMzAwLFxuICAgICAgYXNzZXQ6ICdwbGF5ZXInXG4gICAgfTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyQ29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIEFydGlmYWN0XG4gICAgbGV0IGFydGlmYWN0Q29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHg6IGdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIHk6IGdhbWUud29ybGQuaGVpZ2h0IC0gNzAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICAvLyBIVURcbiAgICBsZXQgaHVkQ29uZmlnID0ge1xuICAgICAgZ2FtZTogZ2FtZSxcbiAgICAgIHBsYXllcjogdGhpcy5wbGF5ZXJcbiAgICB9O1xuICAgIHRoaXMuaHVkID0gbmV3IEh1ZChodWRDb25maWcpO1xuXG4gICAgLy8gQ2FtZXJhXG4gICAgZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgIC8vIFBoeXNpY3MgZW5naW5lXG4gICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5USUxFX0JJQVMgPSA2NDtcblxuICAgIC8vIENvbnRyb2xzXG4gICAgdGhpcy5jb250cm9scyA9IHtcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BKSxcbiAgICAgIHJpZ2h0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuRCksXG4gICAgICBkb3duOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuUyksXG4gICAgICBzcGFjZWJhcjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKVxuICAgIH07XG4gIH1cblxuICBpbml0TWFwKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMubWFwID0gZ2FtZS5hZGQudGlsZW1hcCgnbWFwJyk7XG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlcycsICd0aWxlcycpO1xuXG4gICAgLy8gTGF5ZXJzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKDApO1xuICAgIHRoaXMubGF5ZXIuc2V0U2NhbGUoMik7XG4gICAgdGhpcy5sYXllci5yZXNpemVXb3JsZCgpO1xuXG4gICAgLy8gQ29sbGlzaW9uc1xuICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJldHdlZW4oMSwgNCk7XG4gIH1cblxuICBpbml0UGxhdGZvcm1zKCkge1xuICAgIHRoaXMucGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5lbmFibGVCb2R5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMCwgJ3BsYXRmb3JtLWxlZnQnLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTEsICdwbGF0Zm9ybScsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMiwgJ3BsYXRmb3JtLXJpZ2h0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG5cbiAgICB0aGlzLnBsYXRmb3Jtcy5zY2FsZS5zZXRUbygyKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuaW1tb3ZhYmxlJywgdHJ1ZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24nLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmxlZnQnLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLnJpZ2h0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICBwbGF0Zm9ybS5ib2R5LnNldFNpemUoMzIsIDgsIDAsIDIpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xzLmRvd24uaXNEb3duIHx8ICF0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5hcnRpZmFjdC5idWxsZXRzLCB0aGlzLnBsYXllcixcbiAgICAgICAgdGhpcy5kYW1hZ2VQbGF5ZXIsIG51bGwsIHRoaXMpO1xuXG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMuc3BhY2ViYXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuYXJ0aWZhY3QubGFzdEJ1bGxldCkge1xuICAgICAgICB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQgPSB0aGlzLmdhbWUudGltZS5ub3dcbiAgICAgICAgICArIHRoaXMuYXJ0aWZhY3QuYnVsbGV0RGVsYXk7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3Quc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duIHx8IHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncnVuJywgMTIsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wbGF5ZXIuZGVhdGhBbmltYXRpb25QbGF5ZWQpIHtcbiAgICAgIHRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnZGVhdGgnLCAxMiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGRhbWFnZVBsYXllcihwbGF5ZXIsIGJ1bGxldCkge1xuICAgIGJ1bGxldC5raWxsKCk7XG5cbiAgICBpZiAoIXBsYXllci5mbGFzaGluZykge1xuICAgICAgcGxheWVyLmZsYXNoKCk7XG4gICAgICB0aGlzLnBsYXllci5oZWFsdGggLT0gMTA7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIC8vIFNwcml0ZXNcbiAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsICcvYXNzZXRzL2VudGl0aWVzL3BsYXllci9wbGF5ZXIucG5nJywgMzQsIDMxKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2FydGlmYWN0JywgJy9hc3NldHMvZW50aXRpZXMvYXJ0aWZhY3QucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdidWxsZXQnLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXRzL2J1bGxldC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2JlYW0nLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXRzL2JlYW0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCAnL2Fzc2V0cy9iYWNrZ3JvdW5kLnBuZycpO1xuXG4gICAgLy8gTWFwXG4gICAgZ2FtZS5sb2FkLnRpbGVtYXAoJ21hcCcsICcvYXNzZXRzL21hcC9tYXAuanNvbicsIG51bGwsXG4gICAgICBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJy9hc3NldHMvbWFwL3RpbGVzLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1sZWZ0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLWxlZnQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1yaWdodCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS1yaWdodC5wbmcnKTtcblxuICAgIC8vIEhVRFxuICAgIGdhbWUubG9hZC5pbWFnZSgnYXZhdGFyJywgJy9hc3NldHMvaHVkL2F2YXRhci5wbmcnKTtcblxuICAgIC8vIEF1ZGlvXG4gICAgZ2FtZS5sb2FkLmF1ZGlvKCdqdW1wJywgJy9hc3NldHMvc291bmRzL2p1bXAud2F2Jyk7XG4gICAgZ2FtZS5sb2FkLmF1ZGlvKCdzaG9vdCcsICcvYXNzZXRzL3NvdW5kcy9zaG9vdC53YXYnKTtcblxuICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICB9XG5cbiAgbG9hZFN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZGluZy4uLicpO1xuICB9XG5cbiAgZmlsZUNvbXBsZXRlKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0ZpbGUgQ29tcGxldGU6ICcgKyBwcm9ncmVzcyArICclIC0gJ1xuICAgICAgKyB0b3RhbExvYWRlZCArICcgb3V0IG9mICcgKyB0b3RhbEZpbGVzKTtcbiAgfVxuXG4gIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWQgQ29tcGxldGUnKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XG4gIH1cbn1cbiIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEyODAsIDcyMCwgUGhhc2VyLkFVVE8sICdnYW1lJywgbnVsbCwgZmFsc2UsIGZhbHNlKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
