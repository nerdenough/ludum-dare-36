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
    _this.scale.setTo(4);
    _this.animations.add('floating', [0, 1, 2, 3], true);

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.collideWorldBounds = true;

    _this.initWeapons();
    _this.animations.play('floating', 4, true);
    return _this;
  }

  _createClass(Artifact, [{
    key: 'initWeapons',
    value: function initWeapons() {
      this.weapons = [];
      this.weapons.push(new SingleBullet(this.game));
      this.weapons.push(new LaserBeam(this.game));
    }
  }, {
    key: 'moveTo',
    value: function moveTo(player) {
      if (player.x - 20 > this.x) {
        this.body.velocity.x = 200;
      } else if (player.x + 20 < this.x) {
        this.body.velocity.x = -200;
      } else {
        this.body.velocity.x = 0;
      }

      if (player.y - 280 < this.y) {
        this.body.velocity.y = -400;
      } else if (player.y - 320 > this.y) {
        this.body.velocity.y = 400;
      } else {
        this.body.velocity.y = 0;
      }
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

      this.artifact.moveTo(this.player);

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
      game.load.spritesheet('artifact', '/assets/entities/artifact/artifact.png', 41, 34);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0IiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwiYW5pbWF0aW9ucyIsImFkZCIsInBoeXNpY3MiLCJlbmFibGUiLCJQaGFzZXIiLCJQaHlzaWNzIiwiQVJDQURFIiwiYm9keSIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImluaXRXZWFwb25zIiwicGxheSIsIndlYXBvbnMiLCJwdXNoIiwiU2luZ2xlQnVsbGV0IiwiTGFzZXJCZWFtIiwicGxheWVyIiwidmVsb2NpdHkiLCJmaXJlIiwiU3ByaXRlIiwiQnVsbGV0Iiwic2V0IiwiY2hlY2tXb3JsZEJvdW5kcyIsIm91dE9mQm91bmRzS2lsbCIsImV4aXN0cyIsImFuZ2xlIiwic3BlZWQiLCJneCIsImd5IiwicmVzZXQiLCJhcmNhZGUiLCJ2ZWxvY2l0eUZyb21BbmdsZSIsImdyYXZpdHkiLCJQbGF5ZXIiLCJoZWFsdGgiLCJkZWF0aEFuaW1hdGlvblBsYXllZCIsImFsaXZlIiwidmVsWCIsInNmIiwiZmxhc2hpbmciLCJmbGFzaFRpbWVyIiwic2V0U2l6ZSIsImp1bXBTb3VuZCIsImF1ZGlvIiwid2VhcG9uIiwidGludCIsImlucHV0IiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsInNob290IiwidGltZSIsIm5vdyIsImNhbWVyYSIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJmaXJlVG9Qb2ludGVyIiwibmV4dEZpcmUiLCJidWxsZXRTcGVlZCIsImZpcmVSYXRlIiwic291cmNlIiwid29ybGQiLCJpIiwiZ2V0Rmlyc3RFeGlzdHMiLCJidWxsZXQiLCJtb3ZlVG9Qb2ludGVyIiwiR3JvdXAiLCJIdWQiLCJhdmF0YXIiLCJzcHJpdGUiLCJmaXhlZFRvQ2FtZXJhIiwiQm9vdCIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBsYXkiLCJiYWNrZ3JvdW5kIiwiaW5pdE1hcCIsImluaXRQbGF0Zm9ybXMiLCJwbGF5ZXJDb25maWciLCJjZW50ZXJYIiwiaGVpZ2h0IiwiZXhpc3RpbmciLCJhcnRpZmFjdENvbmZpZyIsImFydGlmYWN0IiwiaHVkQ29uZmlnIiwiaHVkIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJUSUxFX0JJQVMiLCJjb250cm9scyIsImxlZnQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsImNyZWF0ZUZyb21PYmplY3RzIiwic2V0QWxsIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwiY29sbGlkZSIsInN0b3AiLCJtb3ZlVG8iLCJvdmVybGFwIiwiYnVsbGV0cyIsImRhbWFnZVBsYXllciIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsImtpbGwiLCJmbGFzaCIsIlByZWxvYWQiLCJsb2FkIiwib25Mb2FkU3RhcnQiLCJsb2FkU3RhcnQiLCJvbkZpbGVDb21wbGV0ZSIsImZpbGVDb21wbGV0ZSIsIm9uTG9hZENvbXBsZXRlIiwibG9hZENvbXBsZXRlIiwibG9hZGluZ1RleHQiLCJ0ZXh0IiwiZmlsbCIsInNwcml0ZXNoZWV0IiwiaW1hZ2UiLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsInNldFRleHQiLCJwcm9ncmVzcyIsImNhY2hlS2V5Iiwic3VjY2VzcyIs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aUJPLE9BQWpCLENBQXlCLFlBQXpCO0FBQ0Q7OztpQ0FFWUMsVUFBVUMsVUFBVUMsU0FBU0MsYUFBYUMsWUFBWTtBQUNqRSxXQUFLWixXQUFMLENBQWlCTyxPQUFqQixDQUF5QixvQkFBb0JDLFFBQXBCLEdBQStCLE1BQS9CLEdBQ3JCRyxXQURxQixHQUNQLFVBRE8sR0FDTUMsVUFEL0I7QUFFRDs7O21DQUVjO0FBQ2IsV0FBS1osV0FBTCxDQUFpQk8sT0FBakIsQ0FBeUIsZUFBekI7QUFDQXhKLFdBQUttRixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakI7QUFDRDs7Ozs7OztBQzlDSCxJQUFJcEYsT0FBTyxJQUFJYyxPQUFPZ0osSUFBWCxDQUFnQixJQUFoQixFQUFzQixHQUF0QixFQUEyQmhKLE9BQU9pSixJQUFsQyxFQUF3QyxNQUF4QyxFQUFnRCxJQUFoRCxFQUFzRCxLQUF0RCxFQUE2RCxLQUE3RCxDQUFYOztBQUVBL0osS0FBS21GLEtBQUwsQ0FBV3hFLEdBQVgsQ0FBZSxNQUFmLEVBQXVCcUUsSUFBdkI7QUFDQWhGLEtBQUttRixLQUFMLENBQVd4RSxHQUFYLENBQWUsU0FBZixFQUEwQjhILE9BQTFCO0FBQ0F6SSxLQUFLbUYsS0FBTCxDQUFXeEUsR0FBWCxDQUFlLE1BQWYsRUFBdUIwRSxJQUF2Qjs7QUFFQXJGLEtBQUttRixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFydGlmYWN0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmJ1bGxldERlbGF5ID0gMjAwO1xuICAgIHRoaXMubGFzdEJ1bGxldCA9IDA7XG4gICAgdGhpcy5hY3RpdmVXZWFwb24gPSAwO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDQpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2Zsb2F0aW5nJywgWzAsIDEsIDIsIDNdLCB0cnVlKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5pdFdlYXBvbnMoKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnZmxvYXRpbmcnLCA0LCB0cnVlKTtcbiAgfVxuXG4gIGluaXRXZWFwb25zKCkge1xuICAgIHRoaXMud2VhcG9ucyA9IFtdO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBTaW5nbGVCdWxsZXQodGhpcy5nYW1lKSk7XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IExhc2VyQmVhbSh0aGlzLmdhbWUpKTtcbiAgfVxuXG4gIG1vdmVUbyhwbGF5ZXIpIHtcbiAgICBpZiAocGxheWVyLnggLSAyMCA+IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAyMDA7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueCArIDIwIDwgdGhpcy54KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0yMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICB9XG5cbiAgICBpZiAocGxheWVyLnkgLSAyODAgPCB0aGlzLnkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTQwMDtcbiAgICB9IGVsc2UgaWYgKHBsYXllci55IC0gMzIwID4gdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IDQwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHNob290KHBsYXllcikge1xuICAgIHRoaXMud2VhcG9uc1t0aGlzLmFjdGl2ZVdlYXBvbl0uZmlyZSh0aGlzKTtcbiAgfVxufVxuIiwiY2xhc3MgQnVsbGV0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWUsIGFzc2V0KSB7XG4gICAgc3VwZXIoZ2FtZSwgMCwgMCwgYXNzZXQpO1xuXG4gICAgdGhpcy5hbmNob3Iuc2V0KDAuNSk7XG4gICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XG4gICAgdGhpcy5leGlzdHMgPSBmYWxzZTtcbiAgfVxuXG4gIGZpcmUoeCwgeSwgYW5nbGUsIHNwZWVkLCBneCwgZ3kpIHtcbiAgICBneCA9IGd4IHx8IDA7XG4gICAgZ3kgPSBneSB8fCAwO1xuXG4gICAgdGhpcy5yZXNldCh4LCB5KTtcbiAgICB0aGlzLnNjYWxlLnNldCgxKTtcblxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS52ZWxvY2l0eUZyb21BbmdsZShhbmdsZSwgc3BlZWQsXG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkpO1xuXG4gICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIHRoaXMuYm9keS5ncmF2aXR5LnNldChneCwgZ3kpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuZGVhdGhBbmltYXRpb25QbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFsaXZlID0gdHJ1ZTtcbiAgICB0aGlzLnZlbFggPSA1MDA7XG4gICAgdGhpcy5zZiA9IDM7XG4gICAgdGhpcy5mbGFzaGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZmxhc2hUaW1lciA9IDA7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdpZGxlJywgWzAsIDFdLCB0cnVlKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdydW4nLCBbNSwgNiwgNywgOF0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2RlYXRoJywgWzEwLCAxMSwgMTIsIDEzLCAxNF0sIHRydWUpO1xuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNCk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygtdGhpcy5zZiwgdGhpcy5zZik7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDQwMDA7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgdGhpcy5ib2R5LnNldFNpemUoMTYsIDMwLCAyLCAxKTtcblxuICAgIHRoaXMuanVtcFNvdW5kID0gZ2FtZS5hZGQuYXVkaW8oJ2p1bXAnKTtcblxuICAgIHRoaXMud2VhcG9uID0gbmV3IFNpbmdsZUJ1bGxldCh0aGlzLmdhbWUpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICB0aGlzLmFsaXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnRpbnQgPSAweGZmZmZmZmZmO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMuc2hvb3QoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmxhc2hpbmcgJiYgdGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5mbGFzaFRpbWVyKSB7XG4gICAgICAgIHRoaXMuZmxhc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aW50ID0gMHhmZmZmZmZmZjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2FtZS5pbnB1dC54IDwgdGhpcy54IC0gdGhpcy5nYW1lLmNhbWVyYS54KSB7XG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHRoaXMuc2Y7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNjYWxlLnggPSAtdGhpcy5zZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEyMDA7XG4gICAgICB0aGlzLmp1bXBTb3VuZC5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgc2hvb3QoKSB7XG4gICAgdGhpcy53ZWFwb24uZmlyZVRvUG9pbnRlcih0aGlzKTtcbiAgfVxuXG4gIGZsYXNoKCkge1xuICAgIHRoaXMuZmxhc2hpbmcgPSB0cnVlO1xuICAgIHRoaXMuZmxhc2hUaW1lciA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDA7XG4gICAgdGhpcy50aW50ID0gMHhmZjgwODA4MDtcbiAgfVxufVxuIiwiY2xhc3MgTGFzZXJCZWFtIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5uZXh0RmlyZSA9IDA7XG4gICAgdGhpcy5idWxsZXRTcGVlZCA9IDEwMDA7XG4gICAgdGhpcy5maXJlUmF0ZSA9IDIwO1xuICB9XG5cbiAgZmlyZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cbn1cbiIsImNsYXNzIFNpbmdsZUJ1bGxldCBleHRlbmRzIFBoYXNlci5Hcm91cCB7XG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcbiAgICBzdXBlcihnYW1lLCBnYW1lLndvcmxkLCAnU2luZ2xlIEJ1bGxldCcsIGZhbHNlLCB0cnVlLFxuICAgICAgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuXG4gICAgdGhpcy5uZXh0RmlyZSA9IDA7XG4gICAgdGhpcy5idWxsZXRTcGVlZCA9IDgwMDtcbiAgICB0aGlzLmZpcmVSYXRlID0gMzAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZChuZXcgQnVsbGV0KGdhbWUsICdidWxsZXQnKSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zaG9vdCA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oJ3Nob290Jyk7XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXNcbiAgICAgIC5nZXRGaXJzdEV4aXN0cyhmYWxzZSlcbiAgICAgIC5maXJlKHgsIHksIDkwLCB0aGlzLmJ1bGxldFNwZWVkLCAwLCAwKTtcbiAgICB0aGlzLnNob290LnBsYXkoKTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxuXG4gIGZpcmVUb1BvaW50ZXIoc291cmNlKSB7XG4gICAgaWYgKHRoaXMuZ2FtZS50aW1lLnRpbWUgPCB0aGlzLm5leHRGaXJlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHggPSBzb3VyY2UueDtcbiAgICBsZXQgeSA9IHNvdXJjZS55O1xuXG4gICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgIGlmIChidWxsZXQpIHtcbiAgICAgIGJ1bGxldC5yZXNldCh4LCB5KTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9Qb2ludGVyKGJ1bGxldCwgMTQwMCk7XG4gICAgICB0aGlzLnNob290LnBsYXkoKTtcbiAgICB9XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cbn1cbiIsImNsYXNzIEh1ZCB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCBwbGF5ZXJ9KSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcblxuICAgIHRoaXMuYXZhdGFyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMzIsIDMyLCAnYXZhdGFyJyk7XG4gICAgdGhpcy5hdmF0YXIuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IGdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnYmFja2dyb3VuZCcpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zY2FsZS5zZXRUbygyKTtcblxuICAgIC8vIE1hcFxuICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgIHRoaXMuaW5pdFBsYXRmb3JtcygpO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDMwMCxcbiAgICAgIGFzc2V0OiAncGxheWVyJ1xuICAgIH07XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllckNvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBBcnRpZmFjdFxuICAgIGxldCBhcnRpZmFjdENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDcwMCxcbiAgICAgIGFzc2V0OiAnYXJ0aWZhY3QnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0ID0gbmV3IEFydGlmYWN0KGFydGlmYWN0Q29uZmlnKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMuYXJ0aWZhY3QpO1xuXG4gICAgLy8gSFVEXG4gICAgbGV0IGh1ZENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICBwbGF5ZXI6IHRoaXMucGxheWVyXG4gICAgfTtcbiAgICB0aGlzLmh1ZCA9IG5ldyBIdWQoaHVkQ29uZmlnKTtcblxuICAgIC8vIENhbWVyYVxuICAgIGdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBQaHlzaWNzIGVuZ2luZVxuICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuVElMRV9CSUFTID0gNjQ7XG5cbiAgICAvLyBDb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSB7XG4gICAgICBsZWZ0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQSksXG4gICAgICByaWdodDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxuICAgICAgZG93bjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxuICAgICAgc3BhY2ViYXI6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUilcbiAgICB9O1xuICB9XG5cbiAgaW5pdE1hcCgpIHtcbiAgICAvLyBNYXBcbiAgICB0aGlzLm1hcCA9IGdhbWUuYWRkLnRpbGVtYXAoJ21hcCcpO1xuICAgIHRoaXMubWFwLmFkZFRpbGVzZXRJbWFnZSgndGlsZXMnLCAndGlsZXMnKTtcblxuICAgIC8vIExheWVyc1xuICAgIHRoaXMubGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcigwKTtcbiAgICB0aGlzLmxheWVyLnNldFNjYWxlKDIpO1xuICAgIHRoaXMubGF5ZXIucmVzaXplV29ybGQoKTtcblxuICAgIC8vIENvbGxpc2lvbnNcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDEsIDQpO1xuICB9XG5cbiAgaW5pdFBsYXRmb3JtcygpIHtcbiAgICB0aGlzLnBsYXRmb3JtcyA9IGdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuZW5hYmxlQm9keSA9IHRydWU7XG5cbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTAsICdwbGF0Zm9ybS1sZWZ0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDExLCAncGxhdGZvcm0nLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTIsICdwbGF0Zm9ybS1yaWdodCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuXG4gICAgdGhpcy5wbGF0Zm9ybXMuc2NhbGUuc2V0VG8oMik7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmltbW92YWJsZScsIHRydWUpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5kb3duJywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgcGxhdGZvcm0uYm9keS5zZXRTaXplKDMyLCA4LCAwLCAyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLnN0b3AoKTtcblxuICAgIHRoaXMuYXJ0aWZhY3QubW92ZVRvKHRoaXMucGxheWVyKTtcblxuICAgIGlmICghdGhpcy5jb250cm9scy5kb3duLmlzRG93biB8fCAhdGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuYXJ0aWZhY3QuYnVsbGV0cywgdGhpcy5wbGF5ZXIsXG4gICAgICAgIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5hcnRpZmFjdC5sYXN0QnVsbGV0KSB7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3QubGFzdEJ1bGxldCA9IHRoaXMuZ2FtZS50aW1lLm5vd1xuICAgICAgICAgICsgdGhpcy5hcnRpZmFjdC5idWxsZXREZWxheTtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24gfHwgdGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdydW4nLCAxMiwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnLCAyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCkge1xuICAgICAgdGhpcy5wbGF5ZXIuZGVhdGhBbmltYXRpb25QbGF5ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdkZWF0aCcsIDEyLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZGFtYWdlUGxheWVyKHBsYXllciwgYnVsbGV0KSB7XG4gICAgYnVsbGV0LmtpbGwoKTtcblxuICAgIGlmICghcGxheWVyLmZsYXNoaW5nKSB7XG4gICAgICBwbGF5ZXIuZmxhc2goKTtcbiAgICAgIHRoaXMucGxheWVyLmhlYWx0aCAtPSAxMDtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgLy8gU3ByaXRlc1xuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvZW50aXRpZXMvcGxheWVyL3BsYXllci5wbmcnLCAzNCwgMzEpO1xuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnYXJ0aWZhY3QnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC9hcnRpZmFjdC5wbmcnLCA0MSwgMzQpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYnVsbGV0JywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0cy9idWxsZXQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdiZWFtJywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0cy9iZWFtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywgJy9hc3NldHMvYmFja2dyb3VuZC5wbmcnKTtcblxuICAgIC8vIE1hcFxuICAgIGdhbWUubG9hZC50aWxlbWFwKCdtYXAnLCAnL2Fzc2V0cy9tYXAvbWFwLmpzb24nLCBudWxsLFxuICAgICAgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCd0aWxlcycsICcvYXNzZXRzL21hcC90aWxlcy5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0tbGVmdCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS1sZWZ0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0tcmlnaHQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0tcmlnaHQucG5nJyk7XG5cbiAgICAvLyBIVURcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2F2YXRhcicsICcvYXNzZXRzL2h1ZC9hdmF0YXIucG5nJyk7XG5cbiAgICAvLyBBdWRpb1xuICAgIGdhbWUubG9hZC5hdWRpbygnanVtcCcsICcvYXNzZXRzL3NvdW5kcy9qdW1wLndhdicpO1xuICAgIGdhbWUubG9hZC5hdWRpbygnc2hvb3QnLCAnL2Fzc2V0cy9zb3VuZHMvc2hvb3Qud2F2Jyk7XG5cbiAgICBnYW1lLmxvYWQuc3RhcnQoKTtcbiAgfVxuXG4gIGxvYWRTdGFydCgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWRpbmcuLi4nKTtcbiAgfVxuXG4gIGZpbGVDb21wbGV0ZShwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdGaWxlIENvbXBsZXRlOiAnICsgcHJvZ3Jlc3MgKyAnJSAtICdcbiAgICAgICsgdG90YWxMb2FkZWQgKyAnIG91dCBvZiAnICsgdG90YWxGaWxlcyk7XG4gIH1cblxuICBsb2FkQ29tcGxldGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkIENvbXBsZXRlJyk7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncGxheScpO1xuICB9XG59XG4iLCJsZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMjgwLCA3MjAsIFBoYXNlci5BVVRPLCAnZ2FtZScsIG51bGwsIGZhbHNlLCBmYWxzZSk7XG5cbmdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XG5nYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3BsYXknLCBQbGF5KTtcblxuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
