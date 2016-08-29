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
        player.health -= 0;
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
    _this.bulletSpeed = _this.game.rnd.integerInRange(700, 900);
    _this.fireRate = _this.game.rnd.integerInRange(900, 1100);

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
      this.movingPlatforms = game.add.group();
      this.movingPlatforms.enableBody = true;
      this.activators = game.add.group();
      this.activators.enableBody = true;

      this.map.createFromObjects('platforms', 11, 'platform', 0, true, false, this.platforms);
      this.map.createFromObjects('platforms', 10, 'platform-left', 0, true, false, this.platforms);
      this.map.createFromObjects('platforms', 12, 'platform-right', 0, true, false, this.platforms);

      this.map.createFromObjects('platforms', 19, 'moving-platform', 0, true, false, this.movingPlatforms);
      this.map.createFromObjects('platforms', 18, 'moving-platform-left', 0, true, false, this.movingPlatforms);
      this.map.createFromObjects('platforms', 20, 'moving-platform-right', 0, true, false, this.movingPlatforms);

      this.map.createFromObjects('platforms', 17, 'activated', 0, true, false, this.activators);

      this.platforms.scale.setTo(2);
      this.platforms.setAll('body.immovable', true);
      this.platforms.setAll('body.checkCollision.down', false);
      this.platforms.setAll('body.checkCollision.left', false);
      this.platforms.setAll('body.checkCollision.right', false);
      this.platforms.forEach(function (platform) {
        platform.body.setSize(32, 8, 0, 2);
      });

      this.movingPlatforms.scale.setTo(2);
      this.movingPlatforms.setAll('body.immovable', true);
      this.movingPlatforms.setAll('body.checkCollision.down', false);
      this.movingPlatforms.setAll('body.checkCollision.left', false);
      this.movingPlatforms.setAll('body.checkCollision.right', false);
      this.movingPlatforms.forEach(function (platform) {
        platform.body.setSize(32, 8, 0, 2);
        platform.originY = platform.y;
        platform.movingDown = true;
      });

      this.activators.scale.setTo(2);
      this.activators.setAll('body.immovable', true);
      this.activators.setAll('activated', true);
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
        game.physics.arcade.collide(this.player, this.movingPlatforms);
      }

      this.movingPlatforms.forEach(function (platform) {
        if (platform.movingDown) {
          platform.body.velocity.y = 50;

          if (platform.y > platform.originY + 32) {
            platform.movingDown = false;
          }
        } else {
          platform.body.velocity.y = -50;

          if (platform.y < platform.originY - 32) {
            platform.movingDown = true;
          }
        }
      });

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

      this.game.physics.arcade.collide(this.player, this.activators, this.win);
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
    key: 'win',
    value: function win(player, activator) {
      activator.loadTexture('deactivated');
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
      game.load.image('moving-platform-right', '/assets/platforms/moving-platform-right.png');
      game.load.image('moving-platform-left', '/assets/platforms/moving-platform-left.png');
      game.load.image('moving-platform', '/assets/platforms/moving-platform.png');
      game.load.image('activated', '/assets/objects/activator-activated.png');
      game.load.image('deactivated', '/assets/objects/activator-deactivated.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LW1vZHVsZS5qcyIsImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0TW9kdWxlIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJ2ZWxYIiwicm5kIiwiaW50ZWdlckluUmFuZ2UiLCJ2ZWxZIiwib2ZmWCIsIm9mZlkiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiaW5pdFdlYXBvbnMiLCJ3ZWFwb25zIiwicHVzaCIsIlNpbmdsZUJ1bGxldCIsIkxhc2VyQmVhbSIsInBsYXllciIsImxlZnRTaWRlIiwib2Zmc2V0IiwidmVsb2NpdHkiLCJmaXJlIiwiYXJjYWRlIiwib3ZlcmxhcCIsInRha2VEYW1hZ2UiLCJTcHJpdGUiLCJBcnRpZmFjdCIsImFuaW1hdGlvbnMiLCJhZGQiLCJwbGF5IiwiQnVsbGV0Iiwic2V0IiwiY2hlY2tXb3JsZEJvdW5kcyIsIm91dE9mQm91bmRzS2lsbCIsImV4aXN0cyIsImFuZ2xlIiwic3BlZWQiLCJneCIsImd5IiwicmVzZXQiLCJ2ZWxvY2l0eUZyb21BbmdsZSIsImdyYXZpdHkiLCJQbGF5ZXIiLCJoZWFsdGgiLCJkZWF0aEFuaW1hdGlvblBsYXllZCIsImFsaXZlIiwic2YiLCJmbGFzaGluZyIsImZsYXNoVGltZXIiLCJzZXRTaXplIiwianVtcFNvdW5kIiwiYXVkaW8iLCJ3ZWFwb24iLCJ0aW50IiwidGltZSIsIm5vdyIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJidWxsZXQiLCJraWxsIiwiZmxhc2giLCJuZXh0RmlyZSIsImJ1bGxldFNwZWVkIiwiZmlyZVJhdGUiLCJzb3VyY2UiLCJ3b3JsZCIsImkiLCJzaG9vdCIsImdldEZpcnN0RXhpc3RzIiwibW92ZVRvUG9pbnRlciIsIkdyb3VwIiwiSHVkIiwiYXZhdGFyIiwic3ByaXRlIiwiZml4ZWRUb0NhbWVyYSIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiYmFja2dyb3VuZCIsImluaXRNYXAiLCJpbml0UGxhdGZvcm1zIiwicGxheWVyQ29uZmlnIiwiY2VudGVyWCIsImhlaWdodCIsImV4aXN0aW5nIiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImFydGlmYWN0TW9kdWxlQ29uZmlnIiwiYXJ0aWZhY3RMZWZ0TW9kdWxlIiwiYXJ0aWZhY3RSaWdodE1vZHVsZSIsImh1ZENvbmZpZyIsImh1ZCIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJsZWZ0IiwiaW5wdXQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsIm1vdmluZ1BsYXRmb3JtcyIsImFjdGl2YXRvcnMiLCJjcmVhdGVGcm9tT2JqZWN0cyIsInNldEFsbCIsImZvckVhY2giLCJwbGF0Zm9ybSIsIm9yaWdpblkiLCJtb3ZpbmdEb3duIiwiY29sbGlkZSIsInN0b3AiLCJtb3ZlVG8iLCJpc0Rvd24iLCJjaGVja0NvbGxpc2lvbiIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsIndpbiIsImFjdGl2YXRvciIsImxvYWRUZXh0dXJlIiwiUHJlbG9hZCIsImxvYWQiLCJvbkxvYWRTdGFydCIsImxvYWRTdGFydCIsIm9uRmlsZUNvbXBsZXRlIiwiZmlsZUNvbXBsZXRlIiwib25Mb2FkQ29tcGxldGUiLCJsb2FkQ29tcGxldGUiLCJsb2FkaW5nVGV4dCIsInRleHQiLCJmaWxsIiwic3ByaXRlc2hlZXQiLCJpbWFnZSIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUE7OztBQUNKLGdDQUFpQztBQUFBLFFBQXBCQyxJQUFvQixRQUFwQkEsSUFBb0I7QUFBQSxRQUFkQyxDQUFjLFFBQWRBLENBQWM7QUFBQSxRQUFYQyxDQUFXLFFBQVhBLENBQVc7QUFBQSxRQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQUE7O0FBQUEsZ0lBQ3pCSCxJQUR5QixFQUNuQkMsQ0FEbUIsRUFDaEJDLENBRGdCLEVBQ2JDLEtBRGE7O0FBRS9CLFVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLFVBQUtJLFdBQUwsR0FBbUIsR0FBbkI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFVBQUtDLElBQUwsR0FBWSxNQUFLUCxJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FBZCxDQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQUFaO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQUtWLElBQUwsQ0FBVVEsR0FBVixDQUFjQyxjQUFkLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBQVo7QUFDQSxVQUFLRSxJQUFMLEdBQVksTUFBS1gsSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBWjtBQUNBLFVBQUtHLElBQUwsR0FBWSxNQUFLWixJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FB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QUF5QixlQUF6QjtBQUNBeEssV0FBSzBGLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQjtBQUNEOzs7Ozs7O0FDcERILElBQUkzRixPQUFPLElBQUlrQixPQUFPNEosSUFBWCxDQUFnQixJQUFoQixFQUFzQixHQUF0QixFQUEyQjVKLE9BQU82SixJQUFsQyxFQUF3QyxNQUF4QyxFQUFnRCxJQUFoRCxFQUFzRCxLQUF0RCxFQUE2RCxLQUE3RCxDQUFYOztBQUVBL0ssS0FBSzBGLEtBQUwsQ0FBV25ELEdBQVgsQ0FBZSxNQUFmLEVBQXVCZ0QsSUFBdkI7QUFDQXZGLEtBQUswRixLQUFMLENBQVduRCxHQUFYLENBQWUsU0FBZixFQUEwQmtILE9BQTFCO0FBQ0F6SixLQUFLMEYsS0FBTCxDQUFXbkQsR0FBWCxDQUFlLE1BQWYsRUFBdUJxRCxJQUF2Qjs7QUFFQTVGLEtBQUswRixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFydGlmYWN0TW9kdWxlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmJ1bGxldERlbGF5ID0gMjAwO1xuICAgIHRoaXMubGFzdEJ1bGxldCA9IDA7XG4gICAgdGhpcy5hY3RpdmVXZWFwb24gPSAwO1xuICAgIHRoaXMudmVsWCA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMTAwLCAyMDApO1xuICAgIHRoaXMudmVsWSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMzAwLCA0MDApO1xuICAgIHRoaXMub2ZmWCA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMjAwLCAzMDApO1xuICAgIHRoaXMub2ZmWSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoLTQwLCA0MCk7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oNCk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG5cbiAgICB0aGlzLmluaXRXZWFwb25zKCk7XG4gIH1cblxuICBpbml0V2VhcG9ucygpIHtcbiAgICB0aGlzLndlYXBvbnMgPSBbXTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSkpO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBMYXNlckJlYW0odGhpcy5nYW1lKSk7XG4gIH1cblxuICBtb3ZlVG8ocGxheWVyKSB7XG4gICAgbGV0IGxlZnRTaWRlID0gdGhpcy5zY2FsZS54ID4gMDtcbiAgICBsZXQgb2Zmc2V0ID0gbGVmdFNpZGUgPyAtdGhpcy5vZmZYIDogdGhpcy5vZmZYO1xuXG4gICAgaWYgKHBsYXllci54IC0gMjAgKyBvZmZzZXQgPiB0aGlzLngpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy52ZWxYO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLnggKyAyMCArIG9mZnNldCA8IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHBsYXllci55IC0gMjgwICsgdGhpcy5vZmZZIDwgdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC10aGlzLnZlbFk7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueSAtIDMyMCArIHRoaXMub2ZmWSA+IHRoaXMueSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSB0aGlzLnZlbFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICB9XG4gIH1cblxuICBzaG9vdCgpIHtcbiAgICB0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLmZpcmUodGhpcyk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihwbGF5ZXIpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXSwgcGxheWVyLFxuICAgICAgcGxheWVyLnRha2VEYW1hZ2UsIG51bGwsIHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBBcnRpZmFjdCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuICAgIHRoaXMuYWN0aXZlV2VhcG9uID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbyg0KTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdmbG9hdGluZycsIFswLCAxLCAyLCAzXSwgdHJ1ZSk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG5cbiAgICB0aGlzLmluaXRXZWFwb25zKCk7XG4gICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2Zsb2F0aW5nJywgNCwgdHJ1ZSk7XG4gIH1cblxuICBpbml0V2VhcG9ucygpIHtcbiAgICB0aGlzLndlYXBvbnMgPSBbXTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSkpO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBMYXNlckJlYW0odGhpcy5nYW1lKSk7XG4gIH1cblxuICBtb3ZlVG8ocGxheWVyKSB7XG4gICAgaWYgKHBsYXllci54IC0gMjAgPiB0aGlzLngpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMjAwO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLnggKyAyMCA8IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtMjAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHBsYXllci55IC0gMjgwIDwgdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC00MDA7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueSAtIDMyMCA+IHRoaXMueSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSA0MDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICB9XG4gIH1cblxuICBzaG9vdChwbGF5ZXIpIHtcbiAgICB0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLmZpcmUodGhpcyk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihwbGF5ZXIpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXSwgcGxheWVyLFxuICAgICAgcGxheWVyLnRha2VEYW1hZ2UsIG51bGwsIHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBCdWxsZXQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCAwLCAwLCBhc3NldCk7XG5cbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcbiAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXN0cyA9IGZhbHNlO1xuICB9XG5cbiAgZmlyZSh4LCB5LCBhbmdsZSwgc3BlZWQsIGd4LCBneSkge1xuICAgIGd4ID0gZ3ggfHwgMDtcbiAgICBneSA9IGd5IHx8IDA7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHkpO1xuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xuXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbUFuZ2xlKGFuZ2xlLCBzcGVlZCxcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eSk7XG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkuc2V0KGd4LCBneSk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kZWF0aEFuaW1hdGlvblBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcbiAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGVhdGgnLCBbMTAsIDExLCAxMiwgMTMsIDE0XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKC10aGlzLnNmLCB0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuc2V0U2l6ZSgxNiwgMzAsIDIsIDEpO1xuXG4gICAgdGhpcy5qdW1wU291bmQgPSBnYW1lLmFkZC5hdWRpbygnanVtcCcpO1xuXG4gICAgdGhpcy53ZWFwb24gPSBuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmZsYXNoaW5nICYmIHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuZmxhc2hUaW1lcikge1xuICAgICAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IHRoaXMuc2Y7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gLXRoaXMuc2Y7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEyMDA7XG4gICAgICB0aGlzLmp1bXBTb3VuZC5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG5cbiAgdGFrZURhbWFnZShwbGF5ZXIsIGJ1bGxldCkge1xuICAgIGJ1bGxldC5raWxsKCk7XG5cbiAgICBpZiAoIXBsYXllci5mbGFzaGluZykge1xuICAgICAgcGxheWVyLmZsYXNoKCk7XG4gICAgICBwbGF5ZXIuaGVhbHRoIC09IDA7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBMYXNlckJlYW0ge1xuICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gMTAwMDtcbiAgICB0aGlzLmZpcmVSYXRlID0gMjA7XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgU2luZ2xlQnVsbGV0IGV4dGVuZHMgUGhhc2VyLkdyb3VwIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHN1cGVyKGdhbWUsIGdhbWUud29ybGQsICdTaW5nbGUgQnVsbGV0JywgZmFsc2UsIHRydWUsXG4gICAgICBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSg3MDAsIDkwMCk7XG4gICAgdGhpcy5maXJlUmF0ZSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoOTAwLCAxMTAwKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgdGhpcy5hZGQobmV3IEJ1bGxldChnYW1lLCAnYnVsbGV0JyksIHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuc2hvb3QgPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdzaG9vdCcpO1xuICB9XG5cbiAgZmlyZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICB0aGlzXG4gICAgICAuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpXG4gICAgICAuZmlyZSh4LCB5LCA5MCwgdGhpcy5idWxsZXRTcGVlZCwgMCwgMCk7XG4gICAgdGhpcy5zaG9vdC5wbGF5KCk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cblxuICBmaXJlVG9Qb2ludGVyKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIGxldCBidWxsZXQgPSB0aGlzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICBpZiAoYnVsbGV0KSB7XG4gICAgICBidWxsZXQucmVzZXQoeCwgeSk7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvUG9pbnRlcihidWxsZXQsIDE0MDApO1xuICAgICAgdGhpcy5zaG9vdC5wbGF5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0RmlyZSA9IHRoaXMuZ2FtZS50aW1lLnRpbWUgKyB0aGlzLmZpcmVSYXRlO1xuICB9XG59XG4iLCJjbGFzcyBIdWQge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgcGxheWVyfSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICB0aGlzLmF2YXRhciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDMyLCAzMiwgJ2F2YXRhcicpO1xuICAgIHRoaXMuYXZhdGFyLmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBCb290IHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheSB7XG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLmJhY2tncm91bmQgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ2JhY2tncm91bmQnKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2NhbGUuc2V0VG8oMik7XG5cbiAgICAvLyBNYXBcbiAgICB0aGlzLmluaXRNYXAoKTtcbiAgICB0aGlzLmluaXRQbGF0Zm9ybXMoKTtcblxuICAgIC8vIFBsYXllclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAzMDAsXG4gICAgICBhc3NldDogJ3BsYXllcidcbiAgICB9O1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gQXJ0aWZhY3RcbiAgICBsZXQgYXJ0aWZhY3RDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMDAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICBsZXQgYXJ0aWZhY3RNb2R1bGVDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMTAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdC1tb2R1bGUnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZSA9IG5ldyBBcnRpZmFjdE1vZHVsZShhcnRpZmFjdE1vZHVsZUNvbmZpZyk7XG4gICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlID0gbmV3IEFydGlmYWN0TW9kdWxlKGFydGlmYWN0TW9kdWxlQ29uZmlnKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuc2NhbGUueCA9IC00O1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdExlZnRNb2R1bGUpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlKTtcblxuICAgIC8vIEhVRFxuICAgIGxldCBodWRDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgcGxheWVyOiB0aGlzLnBsYXllclxuICAgIH07XG4gICAgdGhpcy5odWQgPSBuZXcgSHVkKGh1ZENvbmZpZyk7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLlRJTEVfQklBUyA9IDY0O1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIGluaXRNYXAoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5tYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdtYXAnKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVzJywgJ3RpbGVzJyk7XG5cbiAgICAvLyBMYXllcnNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoMCk7XG4gICAgdGhpcy5sYXllci5zZXRTY2FsZSgyKTtcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLCA0KTtcbiAgfVxuXG4gIGluaXRQbGF0Zm9ybXMoKSB7XG4gICAgdGhpcy5wbGF0Zm9ybXMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMucGxhdGZvcm1zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRvcnMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuYWN0aXZhdG9ycy5lbmFibGVCb2R5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMSwgJ3BsYXRmb3JtJywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDEwLCAncGxhdGZvcm0tbGVmdCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMiwgJ3BsYXRmb3JtLXJpZ2h0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG5cbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTksICdtb3ZpbmctcGxhdGZvcm0nLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMubW92aW5nUGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTgsICdtb3ZpbmctcGxhdGZvcm0tbGVmdCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAyMCwgJ21vdmluZy1wbGF0Zm9ybS1yaWdodCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMpO1xuXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDE3LCAnYWN0aXZhdGVkJywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLmFjdGl2YXRvcnMpO1xuXG4gICAgdGhpcy5wbGF0Zm9ybXMuc2NhbGUuc2V0VG8oMik7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmltbW92YWJsZScsIHRydWUpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5kb3duJywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgcGxhdGZvcm0uYm9keS5zZXRTaXplKDMyLCA4LCAwLCAyKTtcbiAgICB9KTtcblxuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLnNjYWxlLnNldFRvKDIpO1xuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLnNldEFsbCgnYm9keS5pbW1vdmFibGUnLCB0cnVlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24uZG93bicsIGZhbHNlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCcsIGZhbHNlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQnLCBmYWxzZSk7XG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIHBsYXRmb3JtLmJvZHkuc2V0U2l6ZSgzMiwgOCwgMCwgMik7XG4gICAgICBwbGF0Zm9ybS5vcmlnaW5ZID0gcGxhdGZvcm0ueTtcbiAgICAgIHBsYXRmb3JtLm1vdmluZ0Rvd24gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmF0b3JzLnNjYWxlLnNldFRvKDIpO1xuICAgIHRoaXMuYWN0aXZhdG9ycy5zZXRBbGwoJ2JvZHkuaW1tb3ZhYmxlJywgdHJ1ZSk7XG4gICAgdGhpcy5hY3RpdmF0b3JzLnNldEFsbCgnYWN0aXZhdGVkJywgdHJ1ZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcbiAgICB0aGlzLnBsYXllci5zdG9wKCk7XG5cbiAgICB0aGlzLmFydGlmYWN0Lm1vdmVUbyh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcblxuICAgIGlmICghdGhpcy5jb250cm9scy5kb3duLmlzRG93biB8fCAhdGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLm1vdmluZ1BsYXRmb3Jtcyk7XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIGlmIChwbGF0Zm9ybS5tb3ZpbmdEb3duKSB7XG4gICAgICAgIHBsYXRmb3JtLmJvZHkudmVsb2NpdHkueSA9IDUwO1xuXG4gICAgICAgIGlmIChwbGF0Zm9ybS55ID4gcGxhdGZvcm0ub3JpZ2luWSArIDMyKSB7XG4gICAgICAgICAgcGxhdGZvcm0ubW92aW5nRG93biA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF0Zm9ybS5ib2R5LnZlbG9jaXR5LnkgPSAtNTA7XG5cbiAgICAgICAgaWYgKHBsYXRmb3JtLnkgPCBwbGF0Zm9ybS5vcmlnaW5ZIC0gMzIpIHtcbiAgICAgICAgICBwbGF0Zm9ybS5tb3ZpbmdEb3duID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICB0aGlzLmFydGlmYWN0LmNoZWNrQ29sbGlzaW9uKHRoaXMucGxheWVyKTtcbiAgICAgIHRoaXMuYXJ0aWZhY3RMZWZ0TW9kdWxlLmNoZWNrQ29sbGlzaW9uKHRoaXMucGxheWVyKTtcbiAgICAgIHRoaXMuYXJ0aWZhY3RSaWdodE1vZHVsZS5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMuc3BhY2ViYXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnRpZmFjdC5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgIH1cblxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmFjdGl2YXRvcnMsIHRoaXMud2luKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duIHx8IHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncnVuJywgMTIsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wbGF5ZXIuZGVhdGhBbmltYXRpb25QbGF5ZWQpIHtcbiAgICAgIHRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnZGVhdGgnLCAxMiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHdpbihwbGF5ZXIsIGFjdGl2YXRvcikge1xuICAgIGFjdGl2YXRvci5sb2FkVGV4dHVyZSgnZGVhY3RpdmF0ZWQnKTtcbiAgfVxufVxuIiwiY2xhc3MgUHJlbG9hZCB7XG4gIGNyZWF0ZSgpIHtcbiAgICBnYW1lLmxvYWQub25Mb2FkU3RhcnQuYWRkKHRoaXMubG9hZFN0YXJ0LCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMuZmlsZUNvbXBsZXRlLCB0aGlzKTtcbiAgICBnYW1lLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKHRoaXMubG9hZENvbXBsZXRlLCB0aGlzKTtcblxuICAgIHRoaXMubG9hZGluZ1RleHQgPSBnYW1lLmFkZC50ZXh0KDMyLCAzMiwgJ0xvYWRpbmcuLi4nLCB7ZmlsbDogJyNmZmYnfSk7XG5cbiAgICAvLyBTcHJpdGVzXG4gICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnL2Fzc2V0cy9lbnRpdGllcy9wbGF5ZXIvcGxheWVyLnBuZycsIDM0LCAzMSk7XG4gICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdhcnRpZmFjdCcsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0L2FydGlmYWN0LnBuZycsIDQxLCAzNCk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhcnRpZmFjdC1tb2R1bGUnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC9hcnRpZmFjdC1tb2R1bGUucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdidWxsZXQnLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXRzL2J1bGxldC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2JlYW0nLCAnL2Fzc2V0cy9lbnRpdGllcy9idWxsZXRzL2JlYW0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCAnL2Fzc2V0cy9iYWNrZ3JvdW5kLnBuZycpO1xuXG4gICAgLy8gTWFwXG4gICAgZ2FtZS5sb2FkLnRpbGVtYXAoJ21hcCcsICcvYXNzZXRzL21hcC9tYXAuanNvbicsIG51bGwsXG4gICAgICBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJy9hc3NldHMvbWFwL3RpbGVzLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1sZWZ0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLWxlZnQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybS1yaWdodCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS1yaWdodC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ21vdmluZy1wbGF0Zm9ybS1yaWdodCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9tb3ZpbmctcGxhdGZvcm0tcmlnaHQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdtb3ZpbmctcGxhdGZvcm0tbGVmdCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9tb3ZpbmctcGxhdGZvcm0tbGVmdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ21vdmluZy1wbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9tb3ZpbmctcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhY3RpdmF0ZWQnLCAnL2Fzc2V0cy9vYmplY3RzL2FjdGl2YXRvci1hY3RpdmF0ZWQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdkZWFjdGl2YXRlZCcsICcvYXNzZXRzL29iamVjdHMvYWN0aXZhdG9yLWRlYWN0aXZhdGVkLnBuZycpO1xuXG4gICAgLy8gSFVEXG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhdmF0YXInLCAnL2Fzc2V0cy9odWQvYXZhdGFyLnBuZycpO1xuXG4gICAgLy8gQXVkaW9cbiAgICBnYW1lLmxvYWQuYXVkaW8oJ2p1bXAnLCAnL2Fzc2V0cy9zb3VuZHMvanVtcC53YXYnKTtcbiAgICBnYW1lLmxvYWQuYXVkaW8oJ3Nob290JywgJy9hc3NldHMvc291bmRzL3Nob290LndhdicpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
