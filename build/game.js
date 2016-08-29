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
  }, {
    key: "checkCollision",
    value: function checkCollision(player) {
      game.physics.arcade.overlap(this.weapons[this.activeWeapon], player, player.takeDamage, null, this);
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
  }, {
    key: 'checkCollision',
    value: function checkCollision(player) {
      game.physics.arcade.overlap(this.weapons[this.activeWeapon], player, player.takeDamage, null, this);
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
        if (this.flashing && this.game.time.now > this.flashTimer) {
          this.flashing = false;
          this.tint = 0xffffffff;
        }
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
        this.body.velocity.y = -1200;
        this.jumpSound.play();
      }
    }
  }, {
    key: 'flash',
    value: function flash() {
      this.flashing = true;
      this.flashTimer = this.game.time.now + 1000;
      this.tint = 0xff808080;
    }
  }, {
    key: 'takeDamage',
    value: function takeDamage(player, bullet) {
      bullet.kill();

      if (!player.flashing) {
        player.flash();
        player.health -= 10;
      }
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
        this.artifact.checkCollision(this.player);
        this.artifactLeftModule.checkCollision(this.player);
        this.artifactRightModule.checkCollision(this.player);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LW1vZHVsZS5qcyIsImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0TW9kdWxlIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJ2ZWxYIiwicm5kIiwiaW50ZWdlckluUmFuZ2UiLCJ2ZWxZIiwib2ZmWCIsIm9mZlkiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiaW5pdFdlYXBvbnMiLCJ3ZWFwb25zIiwicHVzaCIsIlNpbmdsZUJ1bGxldCIsIkxhc2VyQmVhbSIsInBsYXllciIsImxlZnRTaWRlIiwib2Zmc2V0IiwidmVsb2NpdHkiLCJmaXJlIiwiYXJjYWRlIiwib3ZlcmxhcCIsInRha2VEYW1hZ2UiLCJTcHJpdGUiLCJBcnRpZmFjdCIsImFuaW1hdGlvbnMiLCJhZGQiLCJwbGF5IiwiQnVsbGV0Iiwic2V0IiwiY2hlY2tXb3JsZEJvdW5kcyIsIm91dE9mQm91bmRzS2lsbCIsImV4aXN0cyIsImFuZ2xlIiwic3BlZWQiLCJneCIsImd5IiwicmVzZXQiLCJ2ZWxvY2l0eUZyb21BbmdsZSIsImdyYXZpdHkiLCJQbGF5ZXIiLCJoZWFsdGgiLCJkZWF0aEFuaW1hdGlvblBsYXllZCIsImFsaXZlIiwic2YiLCJmbGFzaGluZyIsImZsYXNoVGltZXIiLCJzZXRTaXplIiwianVtcFNvdW5kIiwiYXVkaW8iLCJ3ZWFwb24iLCJ0aW50IiwidGltZSIsIm5vdyIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJidWxsZXQiLCJraWxsIiwiZmxhc2giLCJuZXh0RmlyZSIsImJ1bGxldFNwZWVkIiwiZmlyZVJhdGUiLCJzb3VyY2UiLCJ3b3JsZCIsImkiLCJzaG9vdCIsImdldEZpcnN0RXhpc3RzIiwibW92ZVRvUG9pbnRlciIsIkdyb3VwIiwiSHVkIiwiYXZhdGFyIiwic3ByaXRlIiwiZml4ZWRUb0NhbWVyYSIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiYmFja2dyb3VuZCIsImluaXRNYXAiLCJpbml0UGxhdGZvcm1zIiwicGxheWVyQ29uZmlnIiwiY2VudGVyWCIsImhlaWdodCIsImV4aXN0aW5nIiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImFydGlmYWN0TW9kdWxlQ29uZmlnIiwiYXJ0aWZhY3RMZWZ0TW9kdWxlIiwiYXJ0aWZhY3RSaWdodE1vZHVsZSIsImh1ZENvbmZpZyIsImh1ZCIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJsZWZ0IiwiaW5wdXQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsImNyZWF0ZUZyb21PYmplY3RzIiwic2V0QWxsIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwiY29sbGlkZSIsInN0b3AiLCJtb3ZlVG8iLCJpc0Rvd24iLCJjaGVja0NvbGxpc2lvbiIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsIlByZWxvYWQiLCJsb2FkIiwib25Mb2FkU3RhcnQiLCJsb2FkU3RhcnQiLCJvbkZpbGVDb21wbGV0ZSIsImZpbGVDb21wbGV0ZSIsIm9uTG9hZENvbXBsZXRlIiwibG9hZENvbXBsZXRlIiwibG9hZGluZ1RleHQiLCJ0ZXh0IiwiZmlsbCIsInNwcml0ZXNoZWV0IiwiaW1hZ2UiLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsInNldFRleHQiLCJwcm9ncmVzcyIsImNhY2hlS2V5Iiwic3VjY2VzcyIsInRvdGFsTG9hZGVkIiwidG90YWxGaWxlcyIsIkdhbWUiLCJBVVRPIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BOzs7QUFDSixnQ0FBaUM7QUFBQSxRQUFwQkMsSUFBb0IsUUFBcEJBLElBQW9CO0FBQUEsUUFBZEMsQ0FBYyxRQUFkQSxDQUFjO0FBQUEsUUFBWEMsQ0FBVyxRQUFYQSxDQUFXO0FBQUEsUUFBUkMsS0FBUSxRQUFSQSxLQUFROztBQUFBOztBQUFBLGdJQUN6QkgsSUFEeUIsRUFDbkJDLENBRG1CLEVBQ2hCQyxDQURnQixFQUNiQyxLQURhOztBQUUvQixVQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLSSxXQUFMLEdBQW1CLEdBQW5CO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBS1AsSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBWjtBQUNBLFVBQUtDLElBQUwsR0FBWSxNQUFLVixJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FBZCxDQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQUFaO0FBQ0EsVUFBS0UsSUFBTCxHQUFZLE1BQUtYLElBQUwsQ0FBVVEsR0FBVixDQUFjQyxjQUFkLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBQVo7QUFDQSxVQUFLRyxJQUFMLEdBQVksTUFBS1osSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsQ0FBQyxFQUE5QixFQUFrQyxFQUFsQyxDQUFaOztBQUVBO0FBQ0EsVUFBS0ksTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCO0FBQ0EsVUFBS0MsS0FBTCxDQUFXRCxLQUFYLENBQWlCLENBQWpCOztBQUVBO0FBQ0EsVUFBS2QsSUFBTCxDQUFVZ0IsT0FBVixDQUFrQkMsTUFBbEIsUUFBK0JDLE9BQU9DLE9BQVAsQ0FBZUMsTUFBOUM7QUFDQSxVQUFLQyxJQUFMLENBQVVDLGtCQUFWLEdBQStCLElBQS9COztBQUVBLFVBQUtDLFdBQUw7QUFuQitCO0FBb0JoQzs7OztrQ0FFYTtBQUNaLFdBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS0EsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQUlDLFlBQUosQ0FBaUIsS0FBSzFCLElBQXRCLENBQWxCO0FBQ0EsV0FBS3dCLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFJRSxTQUFKLENBQWMsS0FBSzNCLElBQW5CLENBQWxCO0FBQ0Q7OzsyQkFFTTRCLFFBQVE7QUFDYixVQUFJQyxXQUFXLEtBQUtkLEtBQUwsQ0FBV2QsQ0FBWCxHQUFlLENBQTlCO0FBQ0EsVUFBSTZCLFNBQVNELFdBQVcsQ0FBQyxLQUFLbEIsSUFBakIsR0FBd0IsS0FBS0EsSUFBMUM7O0FBRUEsVUFBSWlCLE9BQU8zQixDQUFQLEdBQVcsRUFBWCxHQUFnQjZCLE1BQWhCLEdBQXlCLEtBQUs3QixDQUFsQyxFQUFxQztBQUNuQyxhQUFLb0IsSUFBTCxDQUFVVSxRQUFWLENBQW1COUIsQ0FBbkIsR0FBdUIsS0FBS00sSUFBNUI7QUFDRCxPQUZELE1BRU8sSUFBSXFCLE9BQU8zQixDQUFQLEdBQVcsRUFBWCxHQUFnQjZCLE1BQWhCLEdBQXlCLEtBQUs3QixDQUFsQyxFQUFxQztBQUMxQyxhQUFLb0IsSUFBTCxDQUFVVSxRQUFWLENBQW1COUIsQ0FBbkIsR0FBdUIsQ0FBQyxLQUFLTSxJQUE3QjtBQUNELE9BRk0sTUFFQTtBQUNMLGFBQUtjLElBQUwsQ0FBVVUsUUFBVixDQUFtQjlCLENBQW5CLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsVUFBSTJCLE9BQU8xQixDQUFQLEdBQVcsR0FBWCxHQUFpQixLQUFLVSxJQUF0QixHQUE2QixLQUFLVixDQUF0QyxFQUF5QztBQUN2QyxhQUFLbUIsSUFBTCxDQUFVVSxRQUFWLENBQW1CN0IsQ0FBbkIsR0FBdUIsQ0FBQyxLQUFLUSxJQUE3QjtBQUNELE9BRkQsTUFFTyxJQUFJa0IsT0FBTzFCLENBQVAsR0FBVyxHQUFYLEdBQWlCLEtBQUtVLElBQXRCLEdBQTZCLEtBQUtWLENBQXRDLEVBQXlDO0FBQzlDLGFBQUttQixJQUFMLENBQVVVLFFBQVYsQ0FBbUI3QixDQUFuQixHQUF1QixLQUFLUSxJQUE1QjtBQUNELE9BRk0sTUFFQTtBQUNMLGFBQUtXLElBQUwsQ0FBVVUsUUFBVixDQUFtQjdCLENBQW5CLEdBQXVCLENBQXZCO0FBQ0Q7QUFDRjs7OzRCQUVPO0FBQ04sV0FBS3NCLE9BQUwsQ0FBYSxLQUFLbEIsWUFBbEIsRUFBZ0MwQixJQUFoQyxDQUFxQyxJQUFyQztBQUNEOzs7bUNBRWNKLFFBQVE7QUFDckI1QixXQUFLZ0IsT0FBTCxDQUFhaUIsTUFBYixDQUFvQkMsT0FBcEIsQ0FBNEIsS0FBS1YsT0FBTCxDQUFhLEtBQUtsQixZQUFsQixDQUE1QixFQUE2RHNCLE1BQTdELEVBQ0VBLE9BQU9PLFVBRFQsRUFDcUIsSUFEckIsRUFDMkIsSUFEM0I7QUFFRDs7OztFQXpEMEJqQixPQUFPa0I7Ozs7Ozs7Ozs7O0lDQTlCQzs7O0FBQ0osMEJBQWlDO0FBQUEsUUFBcEJyQyxJQUFvQixRQUFwQkEsSUFBb0I7QUFBQSxRQUFkQyxDQUFjLFFBQWRBLENBQWM7QUFBQSxRQUFYQyxDQUFXLFFBQVhBLENBQVc7QUFBQSxRQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQUE7O0FBQUEsb0hBQ3pCSCxJQUR5QixFQUNuQkMsQ0FEbUIsRUFDaEJDLENBRGdCLEVBQ2JDLEtBRGE7O0FBRS9CLFVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLFVBQUtJLFdBQUwsR0FBbUIsR0FBbkI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjs7QUFFQTtBQUNBLFVBQUtPLE1BQUwsQ0FBWUMsS0FBWixDQUFrQixHQUFsQjtBQUNBLFVBQUtDLEtBQUwsQ0FBV0QsS0FBWCxDQUFpQixDQUFqQjtBQUNBLFVBQUt3QixVQUFMLENBQWdCQyxHQUFoQixDQUFvQixVQUFwQixFQUFnQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FBaEMsRUFBOEMsSUFBOUM7O0FBRUE7QUFDQSxVQUFLdkMsSUFBTCxDQUFVZ0IsT0FBVixDQUFrQkMsTUFBbEIsUUFBK0JDLE9BQU9DLE9BQVAsQ0FBZUMsTUFBOUM7QUFDQSxVQUFLQyxJQUFMLENBQVVDLGtCQUFWLEdBQStCLElBQS9COztBQUVBLFVBQUtDLFdBQUw7QUFDQSxVQUFLZSxVQUFMLENBQWdCRSxJQUFoQixDQUFxQixVQUFyQixFQUFpQyxDQUFqQyxFQUFvQyxJQUFwQztBQWpCK0I7QUFrQmhDOzs7O2tDQUVhO0FBQ1osV0FBS2hCLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS0EsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQUlDLFlBQUosQ0FBaUIsS0FBSzFCLElBQXRCLENBQWxCO0FBQ0EsV0FBS3dCLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFJRSxTQUFKLENBQWMsS0FBSzNCLElBQW5CLENBQWxCO0FBQ0Q7OzsyQkFFTTRCLFFBQVE7QUFDYixVQUFJQSxPQUFPM0IsQ0FBUCxHQUFXLEVBQVgsR0FBZ0IsS0FBS0EsQ0FBekIsRUFBNEI7QUFDMUIsYUFBS29CLElBQUwsQ0FBVVUsUUFBVixDQUFtQjlCLENBQW5CLEdBQXVCLEdBQXZCO0FBQ0QsT0FGRCxNQUVPLElBQUkyQixPQUFPM0IsQ0FBUCxHQUFXLEVBQVgsR0FBZ0IsS0FBS0EsQ0FBekIsRUFBNEI7QUFDakMsYUFBS29CLElBQUwsQ0FBVVUsUUFBVixDQUFtQjlCLENBQW5CLEdBQXVCLENBQUMsR0FBeEI7QUFDRCxPQUZNLE1BRUE7QUFDTCxhQUFLb0IsSUFBTCxDQUFVVSxRQUFWLENBQW1COUIsQ0FBbkIsR0FBdUIsQ0FBdkI7QUFDRDs7QUFFRCxVQUFJMkIsT0FBTzFCLENBQVAsR0FBVyxHQUFYLEdBQWlCLEtBQUtBLENBQTFCLEVBQTZCO0FBQzNCLGFBQUttQixJQUFMLENBQVVVLFFBQVYsQ0FBbUI3QixDQUFuQixHQUF1QixDQUFDLEdBQXhCO0FBQ0QsT0FGRCxNQUVPLElBQUkwQixPQUFPMUIsQ0FBUCxHQUFXLEdBQVgsR0FBaUIsS0FBS0EsQ0FBMUIsRUFBNkI7QUFDbEMsYUFBS21CLElBQUwsQ0FBVVUsUUFBVixDQUFtQjdCLENBQW5CLEdBQXVCLEdBQXZCO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsYUFBS21CLElBQUwsQ0FBVVUsUUFBVixDQUFtQjdCLENBQW5CLEdBQXVCLENBQXZCO0FBQ0Q7QUFDRjs7OzBCQUVLMEIsUUFBUTtBQUNaLFdBQUtKLE9BQUwsQ0FBYSxLQUFLbEIsWUFBbEIsRUFBZ0MwQixJQUFoQyxDQUFxQyxJQUFyQztBQUNEOzs7bUNBRWNKLFFBQVE7QUFDckI1QixXQUFLZ0IsT0FBTCxDQUFhaUIsTUFBYixDQUFvQkMsT0FBcEIsQ0FBNEIsS0FBS1YsT0FBTCxDQUFhLEtBQUtsQixZQUFsQixDQUE1QixFQUE2RHNCLE1BQTdELEVBQ0VBLE9BQU9PLFVBRFQsRUFDcUIsSUFEckIsRUFDMkIsSUFEM0I7QUFFRDs7OztFQXBEb0JqQixPQUFPa0I7Ozs7Ozs7Ozs7O0lDQXhCSzs7O0FBQ0osa0JBQVl6QyxJQUFaLEVBQWtCRyxLQUFsQixFQUF5QjtBQUFBOztBQUFBLGdIQUNqQkgsSUFEaUIsRUFDWCxDQURXLEVBQ1IsQ0FEUSxFQUNMRyxLQURLOztBQUd2QixVQUFLVSxNQUFMLENBQVk2QixHQUFaLENBQWdCLEdBQWhCO0FBQ0EsVUFBS0MsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxVQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLEtBQWQ7QUFOdUI7QUFPeEI7Ozs7eUJBRUk1QyxHQUFHQyxHQUFHNEMsT0FBT0MsT0FBT0MsSUFBSUMsSUFBSTtBQUMvQkQsV0FBS0EsTUFBTSxDQUFYO0FBQ0FDLFdBQUtBLE1BQU0sQ0FBWDs7QUFFQSxXQUFLQyxLQUFMLENBQVdqRCxDQUFYLEVBQWNDLENBQWQ7QUFDQSxXQUFLYSxLQUFMLENBQVcyQixHQUFYLENBQWUsQ0FBZjs7QUFFQSxXQUFLMUMsSUFBTCxDQUFVZ0IsT0FBVixDQUFrQmlCLE1BQWxCLENBQXlCa0IsaUJBQXpCLENBQTJDTCxLQUEzQyxFQUFrREMsS0FBbEQsRUFDRSxLQUFLMUIsSUFBTCxDQUFVVSxRQURaOztBQUdBLFdBQUtlLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFdBQUt6QixJQUFMLENBQVUrQixPQUFWLENBQWtCVixHQUFsQixDQUFzQk0sRUFBdEIsRUFBMEJDLEVBQTFCO0FBQ0Q7Ozs7RUF0QmtCL0IsT0FBT2tCOzs7Ozs7Ozs7OztJQ0F0QmlCOzs7QUFDSix3QkFBaUM7QUFBQSxRQUFwQnJELElBQW9CLFFBQXBCQSxJQUFvQjtBQUFBLFFBQWRDLENBQWMsUUFBZEEsQ0FBYztBQUFBLFFBQVhDLENBQVcsUUFBWEEsQ0FBVztBQUFBLFFBQVJDLEtBQVEsUUFBUkEsS0FBUTs7QUFBQTs7QUFBQSxnSEFDekJILElBRHlCLEVBQ25CQyxDQURtQixFQUNoQkMsQ0FEZ0IsRUFDYkMsS0FEYTs7QUFFL0IsVUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS3NELE1BQUwsR0FBYyxHQUFkO0FBQ0EsVUFBS0Msb0JBQUwsR0FBNEIsS0FBNUI7QUFDQSxVQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLFVBQUtqRCxJQUFMLEdBQVksR0FBWjtBQUNBLFVBQUtrRCxFQUFMLEdBQVUsQ0FBVjtBQUNBLFVBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCOztBQUVBO0FBQ0EsVUFBS3JCLFVBQUwsQ0FBZ0JDLEdBQWhCLENBQW9CLE1BQXBCLEVBQTRCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBNUIsRUFBb0MsSUFBcEM7QUFDQSxVQUFLRCxVQUFMLENBQWdCQyxHQUFoQixDQUFvQixLQUFwQixFQUEyQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FBM0IsRUFBeUMsSUFBekM7QUFDQSxVQUFLRCxVQUFMLENBQWdCQyxHQUFoQixDQUFvQixPQUFwQixFQUE2QixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsQ0FBN0IsRUFBbUQsSUFBbkQ7QUFDQSxVQUFLMUIsTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCO0FBQ0EsVUFBS0MsS0FBTCxDQUFXRCxLQUFYLENBQWlCLENBQUMsTUFBSzJDLEVBQXZCLEVBQTJCLE1BQUtBLEVBQWhDOztBQUVBO0FBQ0EsVUFBS3pELElBQUwsQ0FBVWdCLE9BQVYsQ0FBa0JDLE1BQWxCLFFBQStCQyxPQUFPQyxPQUFQLENBQWVDLE1BQTlDO0FBQ0EsVUFBS0MsSUFBTCxDQUFVK0IsT0FBVixDQUFrQmxELENBQWxCLEdBQXNCLElBQXRCO0FBQ0EsVUFBS21CLElBQUwsQ0FBVUMsa0JBQVYsR0FBK0IsSUFBL0I7QUFDQSxVQUFLRCxJQUFMLENBQVV1QyxPQUFWLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCOztBQUVBLFVBQUtDLFNBQUwsR0FBaUI3RCxLQUFLdUMsR0FBTCxDQUFTdUIsS0FBVCxDQUFlLE1BQWYsQ0FBakI7O0FBRUEsVUFBS0MsTUFBTCxHQUFjLElBQUlyQyxZQUFKLENBQWlCLE1BQUsxQixJQUF0QixDQUFkO0FBMUIrQjtBQTJCaEM7Ozs7NkJBRVE7QUFDUCxVQUFJLEtBQUtzRCxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsYUFBS0UsS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLUSxJQUFMLEdBQVksVUFBWjtBQUNEOztBQUVELFVBQUksS0FBS1IsS0FBVCxFQUFnQjtBQUNkLFlBQUksS0FBS0UsUUFBTCxJQUFpQixLQUFLMUQsSUFBTCxDQUFVaUUsSUFBVixDQUFlQyxHQUFmLEdBQXFCLEtBQUtQLFVBQS9DLEVBQTJEO0FBQ3pELGVBQUtELFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxlQUFLTSxJQUFMLEdBQVksVUFBWjtBQUNEO0FBQ0Y7QUFDRjs7OytCQUVVO0FBQ1QsV0FBSzNDLElBQUwsQ0FBVVUsUUFBVixDQUFtQjlCLENBQW5CLEdBQXVCLENBQUMsS0FBS00sSUFBN0I7QUFDQSxXQUFLUSxLQUFMLENBQVdkLENBQVgsR0FBZSxLQUFLd0QsRUFBcEI7QUFDRDs7O2dDQUVXO0FBQ1YsV0FBS3BDLElBQUwsQ0FBVVUsUUFBVixDQUFtQjlCLENBQW5CLEdBQXVCLEtBQUtNLElBQTVCO0FBQ0EsV0FBS1EsS0FBTCxDQUFXZCxDQUFYLEdBQWUsQ0FBQyxLQUFLd0QsRUFBckI7QUFDRDs7OzJCQUVNO0FBQ0wsV0FBS3BDLElBQUwsQ0FBVVUsUUFBVixDQUFtQjlCLENBQW5CLEdBQXVCLENBQXZCO0FBQ0Q7OzsyQkFFTTtBQUNMLFVBQUksS0FBS29CLElBQUwsQ0FBVThDLFFBQVYsQ0FBbUJDLElBQW5CLElBQTJCLEtBQUsvQyxJQUFMLENBQVVnRCxPQUFWLEVBQS9CLEVBQW9EO0FBQ2xELGFBQUtoRCxJQUFMLENBQVVVLFFBQVYsQ0FBbUI3QixDQUFuQixHQUF1QixDQUFDLElBQXhCO0FBQ0EsYUFBSzJELFNBQUwsQ0FBZXJCLElBQWY7QUFDRDtBQUNGOzs7NEJBRU87QUFDTixXQUFLa0IsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsS0FBSzNELElBQUwsQ0FBVWlFLElBQVYsQ0FBZUMsR0FBZixHQUFxQixJQUF2QztBQUNBLFdBQUtGLElBQUwsR0FBWSxVQUFaO0FBQ0Q7OzsrQkFFVXBDLFFBQVEwQyxRQUFRO0FBQ3pCQSxhQUFPQyxJQUFQOztBQUVBLFVBQUksQ0FBQzNDLE9BQU84QixRQUFaLEVBQXNCO0FBQ3BCOUIsZUFBTzRDLEtBQVA7QUFDQTVDLGVBQU8wQixNQUFQLElBQWlCLEVBQWpCO0FBQ0Q7QUFDRjs7OztFQTlFa0JwQyxPQUFPa0I7Ozs7Ozs7SUNBdEJUO0FBQ0oscUJBQVkzQixJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUt5RSxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRDs7Ozt5QkFFSUMsUUFBUTtBQUNYLFVBQUksS0FBSzVFLElBQUwsQ0FBVWlFLElBQVYsQ0FBZUEsSUFBZixHQUFzQixLQUFLUSxRQUEvQixFQUF5QztBQUN2QztBQUNEOztBQUVELFVBQUl4RSxJQUFJMkUsT0FBTzNFLENBQWY7QUFDQSxVQUFJQyxJQUFJMEUsT0FBTzFFLENBQWY7O0FBRUEsV0FBS3VFLFFBQUwsR0FBZ0IsS0FBS3pFLElBQUwsQ0FBVWlFLElBQVYsQ0FBZUEsSUFBZixHQUFzQixLQUFLVSxRQUEzQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7SUNqQkdqRDs7O0FBQ0osd0JBQVkxQixJQUFaLEVBQWtCO0FBQUE7O0FBQUEsNEhBQ1ZBLElBRFUsRUFDSkEsS0FBSzZFLEtBREQsRUFDUSxlQURSLEVBQ3lCLEtBRHpCLEVBQ2dDLElBRGhDLEVBRWQzRCxPQUFPQyxPQUFQLENBQWVDLE1BRkQ7O0FBR2hCLFVBQUtwQixJQUFMLEdBQVlBLElBQVo7O0FBRUEsVUFBS3lFLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CLEdBQW5CO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQixJQUFoQjs7QUFFQSxTQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSSxFQUFwQixFQUF3QkEsR0FBeEIsRUFBNkI7QUFDM0IsWUFBS3ZDLEdBQUwsQ0FBUyxJQUFJRSxNQUFKLENBQVd6QyxJQUFYLEVBQWlCLFFBQWpCLENBQVQsRUFBcUMsSUFBckM7QUFDRDs7QUFFRCxVQUFLK0UsS0FBTCxHQUFhLE1BQUsvRSxJQUFMLENBQVV1QyxHQUFWLENBQWN1QixLQUFkLENBQW9CLE9BQXBCLENBQWI7QUFiZ0I7QUFjakI7Ozs7eUJBRUljLFFBQVE7QUFDWCxVQUFJLEtBQUs1RSxJQUFMLENBQVVpRSxJQUFWLENBQWVBLElBQWYsR0FBc0IsS0FBS1EsUUFBL0IsRUFBeUM7QUFDdkM7QUFDRDs7QUFFRCxVQUFJeEUsSUFBSTJFLE9BQU8zRSxDQUFmO0FBQ0EsVUFBSUMsSUFBSTBFLE9BQU8xRSxDQUFmOztBQUVBLFdBQ0c4RSxjQURILENBQ2tCLEtBRGxCLEVBRUdoRCxJQUZILENBRVEvQixDQUZSLEVBRVdDLENBRlgsRUFFYyxFQUZkLEVBRWtCLEtBQUt3RSxXQUZ2QixFQUVvQyxDQUZwQyxFQUV1QyxDQUZ2QztBQUdBLFdBQUtLLEtBQUwsQ0FBV3ZDLElBQVg7O0FBRUEsV0FBS2lDLFFBQUwsR0FBZ0IsS0FBS3pFLElBQUwsQ0FBVWlFLElBQVYsQ0FBZUEsSUFBZixHQUFzQixLQUFLVSxRQUEzQztBQUNEOzs7a0NBRWFDLFFBQVE7QUFDcEIsVUFBSSxLQUFLNUUsSUFBTCxDQUFVaUUsSUFBVixDQUFlQSxJQUFmLEdBQXNCLEtBQUtRLFFBQS9CLEVBQXlDO0FBQ3ZDO0FBQ0Q7O0FBRUQsVUFBSXhFLElBQUkyRSxPQUFPM0UsQ0FBZjtBQUNBLFVBQUlDLElBQUkwRSxPQUFPMUUsQ0FBZjs7QUFFQSxVQUFJb0UsU0FBUyxLQUFLVSxjQUFMLENBQW9CLEtBQXBCLENBQWI7QUFDQSxVQUFJVixNQUFKLEVBQVk7QUFDVkEsZUFBT3BCLEtBQVAsQ0FBYWpELENBQWIsRUFBZ0JDLENBQWhCO0FBQ0EsYUFBS0YsSUFBTCxDQUFVZ0IsT0FBVixDQUFrQmlCLE1BQWxCLENBQXlCZ0QsYUFBekIsQ0FBdUNYLE1BQXZDLEVBQStDLElBQS9DO0FBQ0EsYUFBS1MsS0FBTCxDQUFXdkMsSUFBWDtBQUNEOztBQUVELFdBQUtpQyxRQUFMLEdBQWdCLEtBQUt6RSxJQUFMLENBQVVpRSxJQUFWLENBQWVBLElBQWYsR0FBc0IsS0FBS1UsUUFBM0M7QUFDRDs7OztFQWpEd0J6RCxPQUFPZ0U7Ozs7O0lDQTVCQyxNQUNKLG1CQUE0QjtBQUFBLE1BQWZuRixJQUFlLFFBQWZBLElBQWU7QUFBQSxNQUFUNEIsTUFBUyxRQUFUQSxNQUFTOztBQUFBOztBQUMxQixPQUFLNUIsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsT0FBSzRCLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxPQUFLd0QsTUFBTCxHQUFjLEtBQUtwRixJQUFMLENBQVV1QyxHQUFWLENBQWM4QyxNQUFkLENBQXFCLEVBQXJCLEVBQXlCLEVBQXpCLEVBQTZCLFFBQTdCLENBQWQ7QUFDQSxPQUFLRCxNQUFMLENBQVlFLGFBQVosR0FBNEIsSUFBNUI7QUFDRDs7Ozs7OztJQ1BHQzs7Ozs7Ozs2QkFDSztBQUNQdkYsV0FBS3dGLEtBQUwsQ0FBV0MsZUFBWCxHQUE2QixNQUE3QjtBQUNBekYsV0FBSzBGLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixTQUFqQjtBQUNEOzs7Ozs7Ozs7OztJQ0pHQzs7Ozs7Ozs2QkFDSztBQUNQLFdBQUtDLFVBQUwsR0FBa0I3RixLQUFLdUMsR0FBTCxDQUFTOEMsTUFBVCxDQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixZQUF0QixDQUFsQjtBQUNBLFdBQUtRLFVBQUwsQ0FBZ0I5RSxLQUFoQixDQUFzQkQsS0FBdEIsQ0FBNEIsQ0FBNUI7O0FBRUE7QUFDQSxXQUFLZ0YsT0FBTDtBQUNBLFdBQUtDLGFBQUw7O0FBRUE7QUFDQSxVQUFJQyxlQUFlO0FBQ2pCaEcsY0FBTUEsSUFEVztBQUVqQkMsV0FBR0QsS0FBSzZFLEtBQUwsQ0FBV29CLE9BRkc7QUFHakIvRixXQUFHRixLQUFLNkUsS0FBTCxDQUFXcUIsTUFBWCxHQUFvQixHQUhOO0FBSWpCL0YsZUFBTztBQUpVLE9BQW5CO0FBTUEsV0FBS3lCLE1BQUwsR0FBYyxJQUFJeUIsTUFBSixDQUFXMkMsWUFBWCxDQUFkO0FBQ0EsV0FBS2hHLElBQUwsQ0FBVXVDLEdBQVYsQ0FBYzRELFFBQWQsQ0FBdUIsS0FBS3ZFLE1BQTVCOztBQUVBO0FBQ0EsVUFBSXdFLGlCQUFpQjtBQUNuQnBHLGNBQU1BLElBRGE7QUFFbkJDLFdBQUdELEtBQUs2RSxLQUFMLENBQVdvQixPQUZLO0FBR25CL0YsV0FBR0YsS0FBSzZFLEtBQUwsQ0FBV3FCLE1BQVgsR0FBb0IsSUFISjtBQUluQi9GLGVBQU87QUFKWSxPQUFyQjtBQU1BLFdBQUtrRyxRQUFMLEdBQWdCLElBQUloRSxRQUFKLENBQWErRCxjQUFiLENBQWhCO0FBQ0EsV0FBS3BHLElBQUwsQ0FBVXVDLEdBQVYsQ0FBYzRELFFBQWQsQ0FBdUIsS0FBS0UsUUFBNUI7O0FBRUEsVUFBSUMsdUJBQXVCO0FBQ3pCdEcsY0FBTUEsSUFEbUI7QUFFekJDLFdBQUdELEtBQUs2RSxLQUFMLENBQVdvQixPQUZXO0FBR3pCL0YsV0FBR0YsS0FBSzZFLEtBQUwsQ0FBV3FCLE1BQVgsR0FBb0IsSUFIRTtBQUl6Qi9GLGVBQU87QUFKa0IsT0FBM0I7QUFNQSxXQUFLb0csa0JBQUwsR0FBMEIsSUFBSXhHLGNBQUosQ0FBbUJ1RyxvQkFBbkIsQ0FBMUI7QUFDQSxXQUFLRSxtQkFBTCxHQUEyQixJQUFJekcsY0FBSixDQUFtQnVHLG9CQUFuQixDQUEzQjtBQUNBLFdBQUtFLG1CQUFMLENBQXlCekYsS0FBekIsQ0FBK0JkLENBQS9CLEdBQW1DLENBQUMsQ0FBcEM7QUFDQSxXQUFLRCxJQUFMLENBQVV1QyxHQUFWLENBQWM0RCxRQUFkLENBQXVCLEtBQUtJLGtCQUE1QjtBQUNBLFdBQUt2RyxJQUFMLENBQVV1QyxHQUFWLENBQWM0RCxRQUFkLENBQXVCLEtBQUtLLG1CQUE1Qjs7QUFFQTtBQUNBLFVBQUlDLFlBQVk7QUFDZHpHLGNBQU1BLElBRFE7QUFFZDRCLGdCQUFRLEtBQUtBO0FBRkMsT0FBaEI7QUFJQSxXQUFLOEUsR0FBTCxHQUFXLElBQUl2QixHQUFKLENBQVFzQixTQUFSLENBQVg7O0FBRUE7QUFDQXpHLFdBQUsyRyxNQUFMLENBQVlDLE1BQVosQ0FBbUIsS0FBS2hGLE1BQXhCOztBQUVBO0FBQ0E1QixXQUFLZ0IsT0FBTCxDQUFhNkYsV0FBYixDQUF5QjNGLE9BQU9DLE9BQVAsQ0FBZUMsTUFBeEM7QUFDQXBCLFdBQUtnQixPQUFMLENBQWFpQixNQUFiLENBQW9CNkUsU0FBcEIsR0FBZ0MsRUFBaEM7O0FBRUE7QUFDQSxXQUFLQyxRQUFMLEdBQWdCO0FBQ2RDLGNBQU0sS0FBS0MsS0FBTCxDQUFXQyxRQUFYLENBQW9CQyxNQUFwQixDQUEyQmpHLE9BQU9rRyxRQUFQLENBQWdCQyxDQUEzQyxDQURRO0FBRWRDLGVBQU8sS0FBS0wsS0FBTCxDQUFXQyxRQUFYLENBQW9CQyxNQUFwQixDQUEyQmpHLE9BQU9rRyxRQUFQLENBQWdCRyxDQUEzQyxDQUZPO0FBR2RuRCxjQUFNLEtBQUs2QyxLQUFMLENBQVdDLFFBQVgsQ0FBb0JDLE1BQXBCLENBQTJCakcsT0FBT2tHLFFBQVAsQ0FBZ0JJLENBQTNDLENBSFE7QUFJZEMsa0JBQVUsS0FBS1IsS0FBTCxDQUFXQyxRQUFYLENBQW9CQyxNQUFwQixDQUEyQmpHLE9BQU9rRyxRQUFQLENBQWdCTSxRQUEzQztBQUpJLE9BQWhCO0FBTUQ7Ozs4QkFFUztBQUNSO0FBQ0EsV0FBS0MsR0FBTCxHQUFXM0gsS0FBS3VDLEdBQUwsQ0FBU3FGLE9BQVQsQ0FBaUIsS0FBakIsQ0FBWDtBQUNBLFdBQUtELEdBQUwsQ0FBU0UsZUFBVCxDQUF5QixPQUF6QixFQUFrQyxPQUFsQzs7QUFFQTtBQUNBLFdBQUtDLEtBQUwsR0FBYSxLQUFLSCxHQUFMLENBQVNJLFdBQVQsQ0FBcUIsQ0FBckIsQ0FBYjtBQUNBLFdBQUtELEtBQUwsQ0FBV0UsUUFBWCxDQUFvQixDQUFwQjtBQUNBLFdBQUtGLEtBQUwsQ0FBV0csV0FBWDs7QUFFQTtBQUNBLFdBQUtOLEdBQUwsQ0FBU08sbUJBQVQsQ0FBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEM7QUFDRDs7O29DQUVlO0FBQ2QsV0FBS0MsU0FBTCxHQUFpQm5JLEtBQUt1QyxHQUFMLENBQVM2RixLQUFULEVBQWpCO0FBQ0EsV0FBS0QsU0FBTCxDQUFlRSxVQUFmLEdBQTRCLElBQTVCOztBQUVBLFdBQUtWLEdBQUwsQ0FBU1csaUJBQVQsQ0FBMkIsV0FBM0IsRUFBd0MsRUFBeEMsRUFBNEMsZUFBNUMsRUFBNkQsQ0FBN0QsRUFBZ0UsSUFBaEUsRUFDRSxLQURGLEVBQ1MsS0FBS0gsU0FEZDtBQUVBLFdBQUtSLEdBQUwsQ0FBU1csaUJBQVQsQ0FBMkIsV0FBM0IsRUFBd0MsRUFBeEMsRUFBNEMsVUFBNUMsRUFBd0QsQ0FBeEQsRUFBMkQsSUFBM0QsRUFDRSxLQURGLEVBQ1MsS0FBS0gsU0FEZDtBQUVBLFdBQUtSLEdBQUwsQ0FBU1csaUJBQVQsQ0FBMkIsV0FBM0IsRUFBd0MsRUFBeEMsRUFBNEMsZ0JBQTVDLEVBQThELENBQTlELEVBQWlFLElBQWpFLEVBQ0UsS0FERixFQUNTLEtBQUtILFNBRGQ7O0FBR0EsV0FBS0EsU0FBTCxDQUFlcEgsS0FBZixDQUFxQkQsS0FBckIsQ0FBMkIsQ0FBM0I7QUFDQSxXQUFLcUgsU0FBTCxDQUFlSSxNQUFmLENBQXNCLGdCQUF0QixFQUF3QyxJQUF4QztBQUNBLFdBQUtKLFNBQUwsQ0FBZUksTUFBZixDQUFzQiwwQkFBdEIsRUFBa0QsS0FBbEQ7QUFDQSxXQUFLSixTQUFMLENBQWVJLE1BQWYsQ0FBc0IsMEJBQXRCLEVBQWtELEtBQWxEO0FBQ0EsV0FBS0osU0FBTCxDQUFlSSxNQUFmLENBQXNCLDJCQUF0QixFQUFtRCxLQUFuRDtBQUNBLFdBQUtKLFNBQUwsQ0FBZUssT0FBZixDQUF1QixVQUFDQyxRQUFELEVBQWM7QUFDbkNBLGlCQUFTcEgsSUFBVCxDQUFjdUMsT0FBZCxDQUFzQixFQUF0QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQyxDQUFoQztBQUNELE9BRkQ7QUFHRDs7OzZCQUVRO0FBQ1A1RCxXQUFLZ0IsT0FBTCxDQUFhaUIsTUFBYixDQUFvQnlHLE9BQXBCLENBQTRCLEtBQUs5RyxNQUFqQyxFQUF5QyxLQUFLa0csS0FBOUM7QUFDQSxXQUFLbEcsTUFBTCxDQUFZK0csSUFBWjs7QUFFQSxXQUFLdEMsUUFBTCxDQUFjdUMsTUFBZCxDQUFxQixLQUFLaEgsTUFBMUI7QUFDQSxXQUFLMkUsa0JBQUwsQ0FBd0JxQyxNQUF4QixDQUErQixLQUFLaEgsTUFBcEM7QUFDQSxXQUFLNEUsbUJBQUwsQ0FBeUJvQyxNQUF6QixDQUFnQyxLQUFLaEgsTUFBckM7O0FBRUEsVUFBSSxDQUFDLEtBQUttRixRQUFMLENBQWMzQyxJQUFkLENBQW1CeUUsTUFBcEIsSUFBOEIsQ0FBQyxLQUFLOUIsUUFBTCxDQUFjVSxRQUFkLENBQXVCb0IsTUFBMUQsRUFBa0U7QUFDaEU3SSxhQUFLZ0IsT0FBTCxDQUFhaUIsTUFBYixDQUFvQnlHLE9BQXBCLENBQTRCLEtBQUs5RyxNQUFqQyxFQUF5QyxLQUFLdUcsU0FBOUM7QUFDRDs7QUFFRCxVQUFJLEtBQUt2RyxNQUFMLENBQVk0QixLQUFoQixFQUF1QjtBQUNyQixhQUFLNkMsUUFBTCxDQUFjeUMsY0FBZCxDQUE2QixLQUFLbEgsTUFBbEM7QUFDQSxhQUFLMkUsa0JBQUwsQ0FBd0J1QyxjQUF4QixDQUF1QyxLQUFLbEgsTUFBNUM7QUFDQSxhQUFLNEUsbUJBQUwsQ0FBeUJzQyxjQUF6QixDQUF3QyxLQUFLbEgsTUFBN0M7O0FBRUEsWUFBSSxLQUFLbUYsUUFBTCxDQUFjQyxJQUFkLENBQW1CNkIsTUFBdkIsRUFBK0I7QUFDN0IsZUFBS2pILE1BQUwsQ0FBWW1ILFFBQVo7QUFDRDs7QUFFRCxZQUFJLEtBQUtoQyxRQUFMLENBQWNPLEtBQWQsQ0FBb0J1QixNQUF4QixFQUFnQztBQUM5QixlQUFLakgsTUFBTCxDQUFZb0gsU0FBWjtBQUNEOztBQUVELFlBQUksS0FBS2pDLFFBQUwsQ0FBY1UsUUFBZCxDQUF1Qm9CLE1BQTNCLEVBQW1DO0FBQ2pDLGVBQUtqSCxNQUFMLENBQVlxSCxJQUFaO0FBQ0Q7O0FBRUQsYUFBSzVDLFFBQUwsQ0FBY3RCLEtBQWQsQ0FBb0IsS0FBS25ELE1BQXpCO0FBQ0EsYUFBSzJFLGtCQUFMLENBQXdCeEIsS0FBeEIsQ0FBOEIsS0FBS25ELE1BQW5DO0FBQ0EsYUFBSzRFLG1CQUFMLENBQXlCekIsS0FBekIsQ0FBK0IsS0FBS25ELE1BQXBDO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQ1AsVUFBSSxLQUFLQSxNQUFMLENBQVk0QixLQUFoQixFQUF1QjtBQUNyQixZQUFJLEtBQUt1RCxRQUFMLENBQWNDLElBQWQsQ0FBbUI2QixNQUFuQixJQUE2QixLQUFLOUIsUUFBTCxDQUFjTyxLQUFkLENBQW9CdUIsTUFBckQsRUFBNkQ7QUFDM0QsZUFBS2pILE1BQUwsQ0FBWVUsVUFBWixDQUF1QkUsSUFBdkIsQ0FBNEIsS0FBNUIsRUFBbUMsRUFBbkMsRUFBdUMsSUFBdkM7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLWixNQUFMLENBQVlVLFVBQVosQ0FBdUJFLElBQXZCLENBQTRCLE1BQTVCLEVBQW9DLENBQXBDLEVBQXVDLElBQXZDO0FBQ0Q7QUFDRixPQU5ELE1BTU8sSUFBSSxDQUFDLEtBQUtaLE1BQUwsQ0FBWTJCLG9CQUFqQixFQUF1QztBQUM1QyxhQUFLM0IsTUFBTCxDQUFZMkIsb0JBQVosR0FBbUMsSUFBbkM7QUFDQSxhQUFLM0IsTUFBTCxDQUFZVSxVQUFaLENBQXVCRSxJQUF2QixDQUE0QixPQUE1QixFQUFxQyxFQUFyQyxFQUF5QyxLQUF6QztBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7O0lDakpHMEc7Ozs7Ozs7NkJBQ0s7QUFDUGxKLFdBQUttSixJQUFMLENBQVVDLFdBQVYsQ0FBc0I3RyxHQUF0QixDQUEwQixLQUFLOEcsU0FBL0IsRUFBMEMsSUFBMUM7QUFDQXJKLFdBQUttSixJQUFMLENBQVVHLGNBQVYsQ0FBeUIvRyxHQUF6QixDQUE2QixLQUFLZ0gsWUFBbEMsRUFBZ0QsSUFBaEQ7QUFDQXZKLFdBQUttSixJQUFMLENBQVVLLGNBQVYsQ0FBeUJqSCxHQUF6QixDQUE2QixLQUFLa0gsWUFBbEMsRUFBZ0QsSUFBaEQ7O0FBRUEsV0FBS0MsV0FBTCxHQUFtQjFKLEtBQUt1QyxHQUFMLENBQVNvSCxJQUFULENBQWMsRUFBZCxFQUFrQixFQUFsQixFQUFzQixZQUF0QixFQUFvQyxFQUFDQyxNQUFNLE1BQVAsRUFBcEMsQ0FBbkI7O0FBRUE7QUFDQTVKLFdBQUttSixJQUFMLENBQVVVLFdBQVYsQ0FBc0IsUUFBdEIsRUFBZ0Msb0NBQWhDLEVBQXNFLEVBQXRFLEVBQTBFLEVBQTFFO0FBQ0E3SixXQUFLbUosSUFBTCxDQUFVVSxXQUFWLENBQXNCLFVBQXRCLEVBQWtDLHdDQUFsQyxFQUE0RSxFQUE1RSxFQUFnRixFQUFoRjtBQUNBN0osV0FBS21KLElBQUwsQ0FBVVcsS0FBVixDQUFnQixpQkFBaEIsRUFBbUMsK0NBQW5DO0FBQ0E5SixXQUFLbUosSUFBTCxDQUFVVyxLQUFWLENBQWdCLFFBQWhCLEVBQTBCLHFDQUExQjtBQUNBOUosV0FBS21KLElBQUwsQ0FBVVcsS0FBVixDQUFnQixNQUFoQixFQUF3QixtQ0FBeEI7QUFDQTlKLFdBQUttSixJQUFMLENBQVVXLEtBQVYsQ0FBZ0IsVUFBaEIsRUFBNEIsZ0NBQTVCO0FBQ0E5SixXQUFLbUosSUFBTCxDQUFVVyxLQUFWLENBQWdCLFlBQWhCLEVBQThCLHdCQUE5Qjs7QUFFQTtBQUNBOUosV0FBS21KLElBQUwsQ0FBVXZCLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsc0JBQXpCLEVBQWlELElBQWpELEVBQ0UxRyxPQUFPNkksT0FBUCxDQUFlQyxVQURqQjtBQUVBaEssV0FBS21KLElBQUwsQ0FBVVcsS0FBVixDQUFnQixPQUFoQixFQUF5Qix1QkFBekI7QUFDQTlKLFdBQUttSixJQUFMLENBQVVXLEtBQVYsQ0FBZ0IsVUFBaEIsRUFBNEIsZ0NBQTVCO0FBQ0E5SixXQUFLbUosSUFBTCxDQUFVVyxLQUFWLENBQWdCLGVBQWhCLEVBQWlDLHFDQUFqQztBQUNBOUosV0FBS21KLElBQUwsQ0FBVVcsS0FBVixDQUFnQixnQkFBaEIsRUFBa0Msc0NBQWxDOztBQUVBO0FBQ0E5SixXQUFLbUosSUFBTCxDQUFVVyxLQUFWLENBQWdCLFFBQWhCLEVBQTBCLHdCQUExQjs7QUFFQTtBQUNBOUosV0FBS21KLElBQUwsQ0FBVXJGLEtBQVYsQ0FBZ0IsTUFBaEIsRUFBd0IseUJBQXhCO0FBQ0E5RCxXQUFLbUosSUFBTCxDQUFVckYsS0FBVixDQUFnQixPQUFoQixFQUF5QiwwQkFBekI7O0FBRUE5RCxXQUFLbUosSUFBTCxDQUFVeEQsS0FBVjtBQUNEOzs7Z0NBRVc7QUFDVixXQUFLK0QsV0FBTCxDQUFpQk8sT0FBakIsQ0FBeUIsWUFBekI7QUFDRDs7O2lDQUVZQyxVQUFVQyxVQUFVQyxTQUFTQyxhQUFhQyxZQUFZO0FBQ2pFLFdBQUtaLFdBQUwsQ0FBaUJPLE9BQWpCLENBQXlCLG9CQUFvQkMsUUFBcEIsR0FBK0IsTUFBL0IsR0FDckJHLFdBRHFCLEdBQ1AsVUFETyxHQUNNQyxVQUQvQjtBQUVEOzs7bUNBRWM7QUFDYixXQUFLWixXQUFMLENBQWlCTyxPQUFqQixDQUF5QixlQUF6QjtBQUNBakssV0FBSzBGLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQjtBQUNEOzs7Ozs7O0FDL0NILElBQUkzRixPQUFPLElBQUlrQixPQUFPcUosSUFBWCxDQUFnQixJQUFoQixFQUFzQixHQUF0QixFQUEyQnJKLE9BQU9zSixJQUFsQyxFQUF3QyxNQUF4QyxFQUFnRCxJQUFoRCxFQUFzRCxLQUF0RCxFQUE2RCxLQUE3RCxDQUFYOztBQUVBeEssS0FBSzBGLEtBQUwsQ0FBV25ELEdBQVgsQ0FBZSxNQUFmLEVBQXVCZ0QsSUFBdkI7QUFDQXZGLEtBQUswRixLQUFMLENBQVduRCxHQUFYLENBQWUsU0FBZixFQUEwQjJHLE9BQTFCO0FBQ0FsSixLQUFLMEYsS0FBTCxDQUFXbkQsR0FBWCxDQUFlLE1BQWYsRUFBdUJxRCxJQUF2Qjs7QUFFQTVGLEtBQUswRixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFydGlmYWN0TW9kdWxlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmJ1bGxldERlbGF5ID0gMjAwO1xuICAgIHRoaXMubGFzdEJ1bGxldCA9IDA7XG4gICAgdGhpcy5hY3RpdmVXZWFwb24gPSAwO1xuICAgIHRoaXMudmVsWCA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMTAwLCAyMDApO1xuICAgIHRoaXMudmVsWSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMzAwLCA0MDApO1xuICAgIHRoaXMub2ZmWCA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMjAwLCAzMDApO1xuICAgIHRoaXMub2ZmWSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoLTQwLCA0MCk7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oNCk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG5cbiAgICB0aGlzLmluaXRXZWFwb25zKCk7XG4gIH1cblxuICBpbml0V2VhcG9ucygpIHtcbiAgICB0aGlzLndlYXBvbnMgPSBbXTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSkpO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBMYXNlckJlYW0odGhpcy5nYW1lKSk7XG4gIH1cblxuICBtb3ZlVG8ocGxheWVyKSB7XG4gICAgbGV0IGxlZnRTaWRlID0gdGhpcy5zY2FsZS54ID4gMDtcbiAgICBsZXQgb2Zmc2V0ID0gbGVmdFNpZGUgPyAtdGhpcy5vZmZYIDogdGhpcy5vZmZYO1xuXG4gICAgaWYgKHBsYXllci54IC0gMjAgKyBvZmZzZXQgPiB0aGlzLngpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy52ZWxYO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLnggKyAyMCArIG9mZnNldCA8IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHBsYXllci55IC0gMjgwICsgdGhpcy5vZmZZIDwgdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC10aGlzLnZlbFk7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueSAtIDMyMCArIHRoaXMub2ZmWSA+IHRoaXMueSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSB0aGlzLnZlbFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICB9XG4gIH1cblxuICBzaG9vdCgpIHtcbiAgICB0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLmZpcmUodGhpcyk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihwbGF5ZXIpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXSwgcGxheWVyLFxuICAgICAgcGxheWVyLnRha2VEYW1hZ2UsIG51bGwsIHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBBcnRpZmFjdCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuICAgIHRoaXMuYWN0aXZlV2VhcG9uID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbyg0KTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdmbG9hdGluZycsIFswLCAxLCAyLCAzXSwgdHJ1ZSk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG5cbiAgICB0aGlzLmluaXRXZWFwb25zKCk7XG4gICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2Zsb2F0aW5nJywgNCwgdHJ1ZSk7XG4gIH1cblxuICBpbml0V2VhcG9ucygpIHtcbiAgICB0aGlzLndlYXBvbnMgPSBbXTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSkpO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBMYXNlckJlYW0odGhpcy5nYW1lKSk7XG4gIH1cblxuICBtb3ZlVG8ocGxheWVyKSB7XG4gICAgaWYgKHBsYXllci54IC0gMjAgPiB0aGlzLngpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMjAwO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLnggKyAyMCA8IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtMjAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHBsYXllci55IC0gMjgwIDwgdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC00MDA7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueSAtIDMyMCA+IHRoaXMueSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSA0MDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICB9XG4gIH1cblxuICBzaG9vdChwbGF5ZXIpIHtcbiAgICB0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLmZpcmUodGhpcyk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihwbGF5ZXIpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXSwgcGxheWVyLFxuICAgICAgcGxheWVyLnRha2VEYW1hZ2UsIG51bGwsIHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBCdWxsZXQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCAwLCAwLCBhc3NldCk7XG5cbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcbiAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXN0cyA9IGZhbHNlO1xuICB9XG5cbiAgZmlyZSh4LCB5LCBhbmdsZSwgc3BlZWQsIGd4LCBneSkge1xuICAgIGd4ID0gZ3ggfHwgMDtcbiAgICBneSA9IGd5IHx8IDA7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHkpO1xuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xuXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbUFuZ2xlKGFuZ2xlLCBzcGVlZCxcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eSk7XG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkuc2V0KGd4LCBneSk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kZWF0aEFuaW1hdGlvblBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcbiAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGVhdGgnLCBbMTAsIDExLCAxMiwgMTMsIDE0XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKC10aGlzLnNmLCB0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuc2V0U2l6ZSgxNiwgMzAsIDIsIDEpO1xuXG4gICAgdGhpcy5qdW1wU291bmQgPSBnYW1lLmFkZC5hdWRpbygnanVtcCcpO1xuXG4gICAgdGhpcy53ZWFwb24gPSBuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmZsYXNoaW5nICYmIHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuZmxhc2hUaW1lcikge1xuICAgICAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IHRoaXMuc2Y7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gLXRoaXMuc2Y7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEyMDA7XG4gICAgICB0aGlzLmp1bXBTb3VuZC5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG5cbiAgdGFrZURhbWFnZShwbGF5ZXIsIGJ1bGxldCkge1xuICAgIGJ1bGxldC5raWxsKCk7XG5cbiAgICBpZiAoIXBsYXllci5mbGFzaGluZykge1xuICAgICAgcGxheWVyLmZsYXNoKCk7XG4gICAgICBwbGF5ZXIuaGVhbHRoIC09IDEwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgTGFzZXJCZWFtIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5uZXh0RmlyZSA9IDA7XG4gICAgdGhpcy5idWxsZXRTcGVlZCA9IDEwMDA7XG4gICAgdGhpcy5maXJlUmF0ZSA9IDIwO1xuICB9XG5cbiAgZmlyZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cbn1cbiIsImNsYXNzIFNpbmdsZUJ1bGxldCBleHRlbmRzIFBoYXNlci5Hcm91cCB7XG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcbiAgICBzdXBlcihnYW1lLCBnYW1lLndvcmxkLCAnU2luZ2xlIEJ1bGxldCcsIGZhbHNlLCB0cnVlLFxuICAgICAgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuXG4gICAgdGhpcy5uZXh0RmlyZSA9IDA7XG4gICAgdGhpcy5idWxsZXRTcGVlZCA9IDgwMDtcbiAgICB0aGlzLmZpcmVSYXRlID0gMTAwMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgdGhpcy5hZGQobmV3IEJ1bGxldChnYW1lLCAnYnVsbGV0JyksIHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuc2hvb3QgPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdzaG9vdCcpO1xuICB9XG5cbiAgZmlyZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICB0aGlzXG4gICAgICAuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpXG4gICAgICAuZmlyZSh4LCB5LCA5MCwgdGhpcy5idWxsZXRTcGVlZCwgMCwgMCk7XG4gICAgdGhpcy5zaG9vdC5wbGF5KCk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cblxuICBmaXJlVG9Qb2ludGVyKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIGxldCBidWxsZXQgPSB0aGlzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICBpZiAoYnVsbGV0KSB7XG4gICAgICBidWxsZXQucmVzZXQoeCwgeSk7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvUG9pbnRlcihidWxsZXQsIDE0MDApO1xuICAgICAgdGhpcy5zaG9vdC5wbGF5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0RmlyZSA9IHRoaXMuZ2FtZS50aW1lLnRpbWUgKyB0aGlzLmZpcmVSYXRlO1xuICB9XG59XG4iLCJjbGFzcyBIdWQge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgcGxheWVyfSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICB0aGlzLmF2YXRhciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDMyLCAzMiwgJ2F2YXRhcicpO1xuICAgIHRoaXMuYXZhdGFyLmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBCb290IHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheSB7XG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLmJhY2tncm91bmQgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ2JhY2tncm91bmQnKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2NhbGUuc2V0VG8oMik7XG5cbiAgICAvLyBNYXBcbiAgICB0aGlzLmluaXRNYXAoKTtcbiAgICB0aGlzLmluaXRQbGF0Zm9ybXMoKTtcblxuICAgIC8vIFBsYXllclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAzMDAsXG4gICAgICBhc3NldDogJ3BsYXllcidcbiAgICB9O1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gQXJ0aWZhY3RcbiAgICBsZXQgYXJ0aWZhY3RDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMDAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICBsZXQgYXJ0aWZhY3RNb2R1bGVDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMTAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdC1tb2R1bGUnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZSA9IG5ldyBBcnRpZmFjdE1vZHVsZShhcnRpZmFjdE1vZHVsZUNvbmZpZyk7XG4gICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlID0gbmV3IEFydGlmYWN0TW9kdWxlKGFydGlmYWN0TW9kdWxlQ29uZmlnKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuc2NhbGUueCA9IC00O1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdExlZnRNb2R1bGUpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlKTtcblxuICAgIC8vIEhVRFxuICAgIGxldCBodWRDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgcGxheWVyOiB0aGlzLnBsYXllclxuICAgIH07XG4gICAgdGhpcy5odWQgPSBuZXcgSHVkKGh1ZENvbmZpZyk7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLlRJTEVfQklBUyA9IDY0O1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIGluaXRNYXAoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5tYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdtYXAnKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVzJywgJ3RpbGVzJyk7XG5cbiAgICAvLyBMYXllcnNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoMCk7XG4gICAgdGhpcy5sYXllci5zZXRTY2FsZSgyKTtcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLCA0KTtcbiAgfVxuXG4gIGluaXRQbGF0Zm9ybXMoKSB7XG4gICAgdGhpcy5wbGF0Zm9ybXMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMucGxhdGZvcm1zLmVuYWJsZUJvZHkgPSB0cnVlO1xuXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDEwLCAncGxhdGZvcm0tbGVmdCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMSwgJ3BsYXRmb3JtJywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDEyLCAncGxhdGZvcm0tcmlnaHQnLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcblxuICAgIHRoaXMucGxhdGZvcm1zLnNjYWxlLnNldFRvKDIpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5pbW1vdmFibGUnLCB0cnVlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24uZG93bicsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQnLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIHBsYXRmb3JtLmJvZHkuc2V0U2l6ZSgzMiwgOCwgMCwgMik7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcbiAgICB0aGlzLnBsYXllci5zdG9wKCk7XG5cbiAgICB0aGlzLmFydGlmYWN0Lm1vdmVUbyh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcblxuICAgIGlmICghdGhpcy5jb250cm9scy5kb3duLmlzRG93biB8fCAhdGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgdGhpcy5hcnRpZmFjdC5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuY2hlY2tDb2xsaXNpb24odGhpcy5wbGF5ZXIpO1xuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJ0aWZhY3Quc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUuc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlLnNob290KHRoaXMucGxheWVyKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScsIDIsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkKSB7XG4gICAgICB0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2RlYXRoJywgMTIsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgLy8gU3ByaXRlc1xuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvZW50aXRpZXMvcGxheWVyL3BsYXllci5wbmcnLCAzNCwgMzEpO1xuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnYXJ0aWZhY3QnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC9hcnRpZmFjdC5wbmcnLCA0MSwgMzQpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYXJ0aWZhY3QtbW9kdWxlJywgJy9hc3NldHMvZW50aXRpZXMvYXJ0aWZhY3QvYXJ0aWZhY3QtbW9kdWxlLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYnVsbGV0JywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0cy9idWxsZXQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdiZWFtJywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0cy9iZWFtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywgJy9hc3NldHMvYmFja2dyb3VuZC5wbmcnKTtcblxuICAgIC8vIE1hcFxuICAgIGdhbWUubG9hZC50aWxlbWFwKCdtYXAnLCAnL2Fzc2V0cy9tYXAvbWFwLmpzb24nLCBudWxsLFxuICAgICAgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCd0aWxlcycsICcvYXNzZXRzL21hcC90aWxlcy5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0tbGVmdCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS1sZWZ0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0tcmlnaHQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0tcmlnaHQucG5nJyk7XG5cbiAgICAvLyBIVURcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2F2YXRhcicsICcvYXNzZXRzL2h1ZC9hdmF0YXIucG5nJyk7XG5cbiAgICAvLyBBdWRpb1xuICAgIGdhbWUubG9hZC5hdWRpbygnanVtcCcsICcvYXNzZXRzL3NvdW5kcy9qdW1wLndhdicpO1xuICAgIGdhbWUubG9hZC5hdWRpbygnc2hvb3QnLCAnL2Fzc2V0cy9zb3VuZHMvc2hvb3Qud2F2Jyk7XG5cbiAgICBnYW1lLmxvYWQuc3RhcnQoKTtcbiAgfVxuXG4gIGxvYWRTdGFydCgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWRpbmcuLi4nKTtcbiAgfVxuXG4gIGZpbGVDb21wbGV0ZShwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdGaWxlIENvbXBsZXRlOiAnICsgcHJvZ3Jlc3MgKyAnJSAtICdcbiAgICAgICsgdG90YWxMb2FkZWQgKyAnIG91dCBvZiAnICsgdG90YWxGaWxlcyk7XG4gIH1cblxuICBsb2FkQ29tcGxldGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkIENvbXBsZXRlJyk7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncGxheScpO1xuICB9XG59XG4iLCJsZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMjgwLCA3MjAsIFBoYXNlci5BVVRPLCAnZ2FtZScsIG51bGwsIGZhbHNlLCBmYWxzZSk7XG5cbmdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XG5nYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3BsYXknLCBQbGF5KTtcblxuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
