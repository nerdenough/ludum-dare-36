"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArtifactModule = function (_Phaser$Sprite) {
  _inherits(ArtifactModule, _Phaser$Sprite);

  function ArtifactModule(_ref) {
    var game = _ref.game;
    var x = _ref.x;
    var y = _ref.y;
    var asset = _ref.asset;

    _classCallCheck(this, ArtifactModule);

    var _this = _possibleConstructorReturn(this, (ArtifactModule.__proto__ || Object.getPrototypeOf(ArtifactModule)).call(this, game, x, y, asset));

    _this.game = game;
    _this.bulletDelay = 200;
    _this.lastBullet = 0;
    _this.activeWeapon = 0;
    _this.velX = _this.game.rnd.integerInRange(100, 200);
    _this.velY = _this.game.rnd.integerInRange(300, 400);
    _this.offX = _this.game.rnd.integerInRange(200, 300);
    _this.offY = _this.game.rnd.integerInRange(-40, 40);

    // Sprite
    _this.anchor.setTo(0.5);
    _this.scale.setTo(4);

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.collideWorldBounds = true;

    _this.initWeapons();
    return _this;
  }

  _createClass(ArtifactModule, [{
    key: "initWeapons",
    value: function initWeapons() {
      this.weapons = [];
      this.weapons.push(new SingleBullet(this.game));
      this.weapons.push(new LaserBeam(this.game));
    }
  }, {
    key: "moveTo",
    value: function moveTo(player) {
      var leftSide = this.scale.x > 0;
      var offset = leftSide ? -this.offX : this.offX;

      if (player.x - 20 + offset > this.x) {
        this.body.velocity.x = this.velX;
      } else if (player.x + 20 + offset < this.x) {
        this.body.velocity.x = -this.velX;
      } else {
        this.body.velocity.x = 0;
      }

      if (player.y - 280 + this.offY < this.y) {
        this.body.velocity.y = -this.velY;
      } else if (player.y - 320 + this.offY > this.y) {
        this.body.velocity.y = this.velY;
      } else {
        this.body.velocity.y = 0;
      }
    }
  }, {
    key: "shoot",
    value: function shoot() {
      this.weapons[this.activeWeapon].fire(this);
    }
  }]);

  return ArtifactModule;
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
    _this.fireRate = 1000;

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
        y: game.world.height - 1000,
        asset: 'artifact'
      };
      this.artifact = new Artifact(artifactConfig);
      this.game.add.existing(this.artifact);

      var artifactModuleConfig = {
        game: game,
        x: game.world.centerX,
        y: game.world.height - 1100,
        asset: 'artifact-module'
      };
      this.artifactLeftModule = new ArtifactModule(artifactModuleConfig);
      this.artifactRightModule = new ArtifactModule(artifactModuleConfig);
      this.artifactRightModule.scale.x = -4;
      this.game.add.existing(this.artifactLeftModule);
      this.game.add.existing(this.artifactRightModule);

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
      this.artifactLeftModule.moveTo(this.player);
      this.artifactRightModule.moveTo(this.player);

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

        this.artifact.shoot(this.player);
        this.artifactLeftModule.shoot(this.player);
        this.artifactRightModule.shoot(this.player);
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
      game.load.image('artifact-module', '/assets/entities/artifact/artifact-module.png');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LW1vZHVsZS5qcyIsImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0TW9kdWxlIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJ2ZWxYIiwicm5kIiwiaW50ZWdlckluUmFuZ2UiLCJ2ZWxZIiwib2ZmWCIsIm9mZlkiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiaW5pdFdlYXBvbnMiLCJ3ZWFwb25zIiwicHVzaCIsIlNpbmdsZUJ1bGxldCIsIkxhc2VyQmVhbSIsInBsYXllciIsImxlZnRTaWRlIiwib2Zmc2V0IiwidmVsb2NpdHkiLCJmaXJlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJhbmltYXRpb25zIiwiYWRkIiwicGxheSIsIkJ1bGxldCIsInNldCIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJleGlzdHMiLCJhbmdsZSIsInNwZWVkIiwiZ3giLCJneSIsInJlc2V0IiwiYXJjYWRlIiwidmVsb2NpdHlGcm9tQW5nbGUiLCJncmF2aXR5IiwiUGxheWVyIiwiaGVhbHRoIiwiZGVhdGhBbmltYXRpb25QbGF5ZWQiLCJhbGl2ZSIsInNmIiwiZmxhc2hpbmciLCJmbGFzaFRpbWVyIiwic2V0U2l6ZSIsImp1bXBTb3VuZCIsImF1ZGlvIiwid2VhcG9uIiwidGludCIsImlucHV0IiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsInNob290IiwidGltZSIsIm5vdyIsImNhbWVyYSIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJmaXJlVG9Qb2ludGVyIiwibmV4dEZpcmUiLCJidWxsZXRTcGVlZCIsImZpcmVSYXRlIiwic291cmNlIiwid29ybGQiLCJpIiwiZ2V0Rmlyc3RFeGlzdHMiLCJidWxsZXQiLCJtb3ZlVG9Qb2ludGVyIiwiR3JvdXAiLCJIdWQiLCJhdmF0YXIiLCJzcHJpdGUiLCJmaXhlZFRvQ2FtZXJhIiwiQm9vdCIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBsYXkiLCJiYWNrZ3JvdW5kIiwiaW5pdE1hcCIsImluaXRQbGF0Zm9ybXMiLCJwbGF5ZXJDb25maWciLCJjZW50ZXJYIiwiaGVpZ2h0IiwiZXhpc3RpbmciLCJhcnRpZmFjdENvbmZpZyIsImFydGlmYWN0IiwiYXJ0aWZhY3RNb2R1bGVDb25maWciLCJhcnRpZmFjdExlZnRNb2R1bGUiLCJhcnRpZmFjdFJpZ2h0TW9kdWxlIiwiaHVkQ29uZmlnIiwiaHVkIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJUSUxFX0JJQVMiLCJjb250cm9scyIsImxlZnQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsImNyZWF0ZUZyb21PYmplY3RzIiwic2V0QWxsIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwiY29sbGlkZSIsInN0b3AiLCJtb3ZlVG8iLCJvdmVybGFwIiwiYnVsbGV0cyIsImRhbWFnZVBsYXllciIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsImtpbGwiLCJmbGFzaCIsIlByZWxvYWQiLCJsb2FkIiwib25Mb2FkU3RhcnQiLCJsb2FkU3RhcnQiLCJvbkZpbGVDb21wbGV0ZSIsImZpbGVDb21wbGV0ZSIsIm9uTG9hZENvbXBsZXRlIiwibG9hZENvbXBsZXRlIiwibG9hZGluZ1RleHQiLCJ0ZXh0IiwiZmlsbCIsInNwcml0ZXNoZWV0IiwiaW1hZ2UiLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsInNldFRleHQiLCJwcm9ncmVzcyIsImNhY2hlS2V5Iiwic3VjY2VzcyIsInRvdGFsTG9hZGVkIiwidG90YWxGaWxlcyIsIkdhbWUiLCJBVVRPIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BOzs7QUFDSixnQ0FBaUM7QUFBQSxRQUFwQkMsSUFBb0IsUUFBcEJBLElBQW9CO0FBQUEsUUFBZEMsQ0FBYyxRQUFkQSxDQUFjO0FBQUEsUUFBWEMsQ0FBVyxRQUFYQSxDQUFXO0FBQUEsUUFBUkMsS0FBUSxRQUFSQSxLQUFROztBQUFBOztBQUFBLGdJQUN6QkgsSUFEeUIsRUFDbkJDLENBRG1CLEVBQ2hCQyxDQURnQixFQUNiQyxLQURhOztBQUUvQixVQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLSSxXQUFMLEdBQW1CLEdBQW5CO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBS1AsSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBWjtBQUNBLFVBQUtDLElBQUwsR0FBWSxNQUFLVixJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FBZCxDQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQUFaO0FBQ0EsVUFBS0UsSUFBTCxHQUFZLE1BQUtYLElBQUwsQ0FBVVEsR0FBVixDQUFjQyxjQUFkLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBQVo7QUFDQSxVQUFLRyxJQUFMLEdBQVksTUFBS1osSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsQ0FBQyxFQUE5QixFQUFrQyxFQUFsQyxDQUFaOztBQUVBO0FBQ0EsVUFBS0ksTUFBTCxD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QUtnRSxXQUFMLENBQWlCTyxPQUFqQixDQUF5QixZQUF6QjtBQUNEOzs7aUNBRVlDLFVBQVVDLFVBQVVDLFNBQVNDLGFBQWFDLFlBQVk7QUFDakUsV0FBS1osV0FBTCxDQUFpQk8sT0FBakIsQ0FBeUIsb0JBQW9CQyxRQUFwQixHQUErQixNQUEvQixHQUNyQkcsV0FEcUIsR0FDUCxVQURPLEdBQ01DLFVBRC9CO0FBRUQ7OzttQ0FFYztBQUNiLFdBQUtaLFdBQUwsQ0FBaUJPLE9BQWpCLENBQXlCLGVBQXpCO0FBQ0FuSyxXQUFLMkYsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCO0FBQ0Q7Ozs7Ozs7QUMvQ0gsSUFBSTVGLE9BQU8sSUFBSWtCLE9BQU91SixJQUFYLENBQWdCLElBQWhCLEVBQXNCLEdBQXRCLEVBQTJCdkosT0FBT3dKLElBQWxDLEVBQXdDLE1BQXhDLEVBQWdELElBQWhELEVBQXNELEtBQXRELEVBQTZELEtBQTdELENBQVg7O0FBRUExSyxLQUFLMkYsS0FBTCxDQUFXdkQsR0FBWCxDQUFlLE1BQWYsRUFBdUJvRCxJQUF2QjtBQUNBeEYsS0FBSzJGLEtBQUwsQ0FBV3ZELEdBQVgsQ0FBZSxTQUFmLEVBQTBCZ0gsT0FBMUI7QUFDQXBKLEtBQUsyRixLQUFMLENBQVd2RCxHQUFYLENBQWUsTUFBZixFQUF1QnlELElBQXZCOztBQUVBN0YsS0FBSzJGLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQiIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXJ0aWZhY3RNb2R1bGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcbiAgICB0aGlzLmFjdGl2ZVdlYXBvbiA9IDA7XG4gICAgdGhpcy52ZWxYID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgxMDAsIDIwMCk7XG4gICAgdGhpcy52ZWxZID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgzMDAsIDQwMCk7XG4gICAgdGhpcy5vZmZYID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgyMDAsIDMwMCk7XG4gICAgdGhpcy5vZmZZID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgtNDAsIDQwKTtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbyg0KTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5pdFdlYXBvbnMoKTtcbiAgfVxuXG4gIGluaXRXZWFwb25zKCkge1xuICAgIHRoaXMud2VhcG9ucyA9IFtdO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBTaW5nbGVCdWxsZXQodGhpcy5nYW1lKSk7XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IExhc2VyQmVhbSh0aGlzLmdhbWUpKTtcbiAgfVxuXG4gIG1vdmVUbyhwbGF5ZXIpIHtcbiAgICBsZXQgbGVmdFNpZGUgPSB0aGlzLnNjYWxlLnggPiAwO1xuICAgIGxldCBvZmZzZXQgPSBsZWZ0U2lkZSA/IC10aGlzLm9mZlggOiB0aGlzLm9mZlg7XG5cbiAgICBpZiAocGxheWVyLnggLSAyMCArIG9mZnNldCA+IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueCArIDIwICsgb2Zmc2V0IDwgdGhpcy54KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICB9XG5cbiAgICBpZiAocGxheWVyLnkgLSAyODAgKyB0aGlzLm9mZlkgPCB0aGlzLnkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLXRoaXMudmVsWTtcbiAgICB9IGVsc2UgaWYgKHBsYXllci55IC0gMzIwICsgdGhpcy5vZmZZID4gdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IHRoaXMudmVsWTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHNob290KCkge1xuICAgIHRoaXMud2VhcG9uc1t0aGlzLmFjdGl2ZVdlYXBvbl0uZmlyZSh0aGlzKTtcbiAgfVxufVxuIiwiY2xhc3MgQXJ0aWZhY3QgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcbiAgICB0aGlzLmFjdGl2ZVdlYXBvbiA9IDA7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oNCk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZmxvYXRpbmcnLCBbMCwgMSwgMiwgM10sIHRydWUpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuXG4gICAgdGhpcy5pbml0V2VhcG9ucygpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdmbG9hdGluZycsIDQsIHRydWUpO1xuICB9XG5cbiAgaW5pdFdlYXBvbnMoKSB7XG4gICAgdGhpcy53ZWFwb25zID0gW107XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IFNpbmdsZUJ1bGxldCh0aGlzLmdhbWUpKTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgTGFzZXJCZWFtKHRoaXMuZ2FtZSkpO1xuICB9XG5cbiAgbW92ZVRvKHBsYXllcikge1xuICAgIGlmIChwbGF5ZXIueCAtIDIwID4gdGhpcy54KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDIwMDtcbiAgICB9IGVsc2UgaWYgKHBsYXllci54ICsgMjAgPCB0aGlzLngpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLTIwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgIH1cblxuICAgIGlmIChwbGF5ZXIueSAtIDI4MCA8IHRoaXMueSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtNDAwO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLnkgLSAzMjAgPiB0aGlzLnkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gNDAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IDA7XG4gICAgfVxuICB9XG5cbiAgc2hvb3QocGxheWVyKSB7XG4gICAgdGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXS5maXJlKHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBCdWxsZXQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCAwLCAwLCBhc3NldCk7XG5cbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcbiAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXN0cyA9IGZhbHNlO1xuICB9XG5cbiAgZmlyZSh4LCB5LCBhbmdsZSwgc3BlZWQsIGd4LCBneSkge1xuICAgIGd4ID0gZ3ggfHwgMDtcbiAgICBneSA9IGd5IHx8IDA7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHkpO1xuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xuXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbUFuZ2xlKGFuZ2xlLCBzcGVlZCxcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eSk7XG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkuc2V0KGd4LCBneSk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kZWF0aEFuaW1hdGlvblBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcbiAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGVhdGgnLCBbMTAsIDExLCAxMiwgMTMsIDE0XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKC10aGlzLnNmLCB0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuc2V0U2l6ZSgxNiwgMzAsIDIsIDEpO1xuXG4gICAgdGhpcy5qdW1wU291bmQgPSBnYW1lLmFkZC5hdWRpbygnanVtcCcpO1xuXG4gICAgdGhpcy53ZWFwb24gPSBuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mbGFzaGluZyAmJiB0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmZsYXNoVGltZXIpIHtcbiAgICAgICAgdGhpcy5mbGFzaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbnQgPSAweGZmZmZmZmZmO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nYW1lLmlucHV0LnggPCB0aGlzLnggLSB0aGlzLmdhbWUuY2FtZXJhLngpIHtcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gdGhpcy5zZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC10aGlzLnNmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTIwMDtcbiAgICAgIHRoaXMuanVtcFNvdW5kLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBzaG9vdCgpIHtcbiAgICB0aGlzLndlYXBvbi5maXJlVG9Qb2ludGVyKHRoaXMpO1xuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG59XG4iLCJjbGFzcyBMYXNlckJlYW0ge1xuICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gMTAwMDtcbiAgICB0aGlzLmZpcmVSYXRlID0gMjA7XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgU2luZ2xlQnVsbGV0IGV4dGVuZHMgUGhhc2VyLkdyb3VwIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHN1cGVyKGdhbWUsIGdhbWUud29ybGQsICdTaW5nbGUgQnVsbGV0JywgZmFsc2UsIHRydWUsXG4gICAgICBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gODAwO1xuICAgIHRoaXMuZmlyZVJhdGUgPSAxMDAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZChuZXcgQnVsbGV0KGdhbWUsICdidWxsZXQnKSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zaG9vdCA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oJ3Nob290Jyk7XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXNcbiAgICAgIC5nZXRGaXJzdEV4aXN0cyhmYWxzZSlcbiAgICAgIC5maXJlKHgsIHksIDkwLCB0aGlzLmJ1bGxldFNwZWVkLCAwLCAwKTtcbiAgICB0aGlzLnNob290LnBsYXkoKTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxuXG4gIGZpcmVUb1BvaW50ZXIoc291cmNlKSB7XG4gICAgaWYgKHRoaXMuZ2FtZS50aW1lLnRpbWUgPCB0aGlzLm5leHRGaXJlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHggPSBzb3VyY2UueDtcbiAgICBsZXQgeSA9IHNvdXJjZS55O1xuXG4gICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgIGlmIChidWxsZXQpIHtcbiAgICAgIGJ1bGxldC5yZXNldCh4LCB5KTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9Qb2ludGVyKGJ1bGxldCwgMTQwMCk7XG4gICAgICB0aGlzLnNob290LnBsYXkoKTtcbiAgICB9XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cbn1cbiIsImNsYXNzIEh1ZCB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCBwbGF5ZXJ9KSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcblxuICAgIHRoaXMuYXZhdGFyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMzIsIDMyLCAnYXZhdGFyJyk7XG4gICAgdGhpcy5hdmF0YXIuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IGdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnYmFja2dyb3VuZCcpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zY2FsZS5zZXRUbygyKTtcblxuICAgIC8vIE1hcFxuICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgIHRoaXMuaW5pdFBsYXRmb3JtcygpO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDMwMCxcbiAgICAgIGFzc2V0OiAncGxheWVyJ1xuICAgIH07XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllckNvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBBcnRpZmFjdFxuICAgIGxldCBhcnRpZmFjdENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDEwMDAsXG4gICAgICBhc3NldDogJ2FydGlmYWN0J1xuICAgIH07XG4gICAgdGhpcy5hcnRpZmFjdCA9IG5ldyBBcnRpZmFjdChhcnRpZmFjdENvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLmFydGlmYWN0KTtcblxuICAgIGxldCBhcnRpZmFjdE1vZHVsZUNvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDExMDAsXG4gICAgICBhc3NldDogJ2FydGlmYWN0LW1vZHVsZSdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3RMZWZ0TW9kdWxlID0gbmV3IEFydGlmYWN0TW9kdWxlKGFydGlmYWN0TW9kdWxlQ29uZmlnKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUgPSBuZXcgQXJ0aWZhY3RNb2R1bGUoYXJ0aWZhY3RNb2R1bGVDb25maWcpO1xuICAgIHRoaXMuYXJ0aWZhY3RSaWdodE1vZHVsZS5zY2FsZS54ID0gLTQ7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLmFydGlmYWN0TGVmdE1vZHVsZSk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUpO1xuXG4gICAgLy8gSFVEXG4gICAgbGV0IGh1ZENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICBwbGF5ZXI6IHRoaXMucGxheWVyXG4gICAgfTtcbiAgICB0aGlzLmh1ZCA9IG5ldyBIdWQoaHVkQ29uZmlnKTtcblxuICAgIC8vIENhbWVyYVxuICAgIGdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBQaHlzaWNzIGVuZ2luZVxuICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuVElMRV9CSUFTID0gNjQ7XG5cbiAgICAvLyBDb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSB7XG4gICAgICBsZWZ0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQSksXG4gICAgICByaWdodDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxuICAgICAgZG93bjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxuICAgICAgc3BhY2ViYXI6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUilcbiAgICB9O1xuICB9XG5cbiAgaW5pdE1hcCgpIHtcbiAgICAvLyBNYXBcbiAgICB0aGlzLm1hcCA9IGdhbWUuYWRkLnRpbGVtYXAoJ21hcCcpO1xuICAgIHRoaXMubWFwLmFkZFRpbGVzZXRJbWFnZSgndGlsZXMnLCAndGlsZXMnKTtcblxuICAgIC8vIExheWVyc1xuICAgIHRoaXMubGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcigwKTtcbiAgICB0aGlzLmxheWVyLnNldFNjYWxlKDIpO1xuICAgIHRoaXMubGF5ZXIucmVzaXplV29ybGQoKTtcblxuICAgIC8vIENvbGxpc2lvbnNcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDEsIDQpO1xuICB9XG5cbiAgaW5pdFBsYXRmb3JtcygpIHtcbiAgICB0aGlzLnBsYXRmb3JtcyA9IGdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuZW5hYmxlQm9keSA9IHRydWU7XG5cbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTAsICdwbGF0Zm9ybS1sZWZ0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDExLCAncGxhdGZvcm0nLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTIsICdwbGF0Zm9ybS1yaWdodCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuXG4gICAgdGhpcy5wbGF0Zm9ybXMuc2NhbGUuc2V0VG8oMik7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmltbW92YWJsZScsIHRydWUpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5kb3duJywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgcGxhdGZvcm0uYm9keS5zZXRTaXplKDMyLCA4LCAwLCAyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGF5ZXIpO1xuICAgIHRoaXMucGxheWVyLnN0b3AoKTtcblxuICAgIHRoaXMuYXJ0aWZhY3QubW92ZVRvKHRoaXMucGxheWVyKTtcbiAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5tb3ZlVG8odGhpcy5wbGF5ZXIpO1xuICAgIHRoaXMuYXJ0aWZhY3RSaWdodE1vZHVsZS5tb3ZlVG8odGhpcy5wbGF5ZXIpO1xuXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xzLmRvd24uaXNEb3duIHx8ICF0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5hcnRpZmFjdC5idWxsZXRzLCB0aGlzLnBsYXllcixcbiAgICAgICAgdGhpcy5kYW1hZ2VQbGF5ZXIsIG51bGwsIHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJ0aWZhY3Quc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUuc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlLnNob290KHRoaXMucGxheWVyKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScsIDIsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkKSB7XG4gICAgICB0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2RlYXRoJywgMTIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBkYW1hZ2VQbGF5ZXIocGxheWVyLCBidWxsZXQpIHtcbiAgICBidWxsZXQua2lsbCgpO1xuXG4gICAgaWYgKCFwbGF5ZXIuZmxhc2hpbmcpIHtcbiAgICAgIHBsYXllci5mbGFzaCgpO1xuICAgICAgdGhpcy5wbGF5ZXIuaGVhbHRoIC09IDEwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgUHJlbG9hZCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLmxvYWQub25Mb2FkU3RhcnQuYWRkKHRoaXMubG9hZFN0YXJ0LCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMuZmlsZUNvbXBsZXRlLCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKHRoaXMubG9hZENvbXBsZXRlLCB0aGlzKTtcblxuICAgIHRoaXMubG9hZGluZ1RleHQgPSBnYW1lLmFkZC50ZXh0KDMyLCAzMiwgJ0xvYWRpbmcuLi4nLCB7ZmlsbDogJyNmZmYnfSk7XG5cbiAgICAvLyBTcHJpdGVzXG4gICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnL2Fzc2V0cy9lbnRpdGllcy9wbGF5ZXIvcGxheWVyLnBuZycsIDM0LCAzMSk7XG4gICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdhcnRpZmFjdCcsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0L2FydGlmYWN0LnBuZycsIDQxLCAzNCk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhcnRpZmFjdC1tb2R1bGUnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC9hcnRpZmFjdC1tb2R1bGUucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdidWxsZXQnLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXRzL2J1bGxldC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2JlYW0nLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXRzL2JlYW0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCAnL2Fzc2V0cy9iYWNrZ3JvdW5kLnBuZycpO1xuXG4gICAgLy8gTWFwXG4gICAgZ2FtZS5sb2FkLnRpbGVtYXAoJ21hcCcsICcvYXNzZXRzL21hcC9tYXAuanNvbicsIG51bGwsXG4gICAgICBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJy9hc3NldHMvbWFwL3RpbGVzLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1sZWZ0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLWxlZnQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1yaWdodCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS1yaWdodC5wbmcnKTtcblxuICAgIC8vIEhVRFxuICAgIGdhbWUubG9hZC5pbWFnZSgnYXZhdGFyJywgJy9hc3NldHMvaHVkL2F2YXRhci5wbmcnKTtcblxuICAgIC8vIEF1ZGlvXG4gICAgZ2FtZS5sb2FkLmF1ZGlvKCdqdW1wJywgJy9hc3NldHMvc291bmRzL2p1bXAud2F2Jyk7XG4gICAgZ2FtZS5sb2FkLmF1ZGlvKCdzaG9vdCcsICcvYXNzZXRzL3NvdW5kcy9zaG9vdC53YXYnKTtcblxuICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICB9XG5cbiAgbG9hZFN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZGluZy4uLicpO1xuICB9XG5cbiAgZmlsZUNvbXBsZXRlKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0ZpbGUgQ29tcGxldGU6ICcgKyBwcm9ncmVzcyArICclIC0gJ1xuICAgICAgKyB0b3RhbExvYWRlZCArICcgb3V0IG9mICcgKyB0b3RhbEZpbGVzKTtcbiAgfVxuXG4gIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWQgQ29tcGxldGUnKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XG4gIH1cbn1cbiIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEyODAsIDcyMCwgUGhhc2VyLkFVVE8sICdnYW1lJywgbnVsbCwgZmFsc2UsIGZhbHNlKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
