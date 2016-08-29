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

      this.map.createFromObjects('platforms', 11, 'platform', 0, true, false, this.platforms);
      this.map.createFromObjects('platforms', 10, 'platform-left', 0, true, false, this.platforms);
      this.map.createFromObjects('platforms', 12, 'platform-right', 0, true, false, this.platforms);

      this.map.createFromObjects('platforms', 19, 'moving-platform', 0, true, false, this.movingPlatforms);
      this.map.createFromObjects('platforms', 18, 'moving-platform-left', 0, true, false, this.movingPlatforms);
      this.map.createFromObjects('platforms', 20, 'moving-platform-right', 0, true, false, this.movingPlatforms);

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
      game.load.image('moving-platform-right', '/assets/platforms/moving-platform-right.png');
      game.load.image('moving-platform-left', '/assets/platforms/moving-platform-left.png');
      game.load.image('moving-platform', '/assets/platforms/moving-platform.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LW1vZHVsZS5qcyIsImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0TW9kdWxlIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJ2ZWxYIiwicm5kIiwiaW50ZWdlckluUmFuZ2UiLCJ2ZWxZIiwib2ZmWCIsIm9mZlkiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiaW5pdFdlYXBvbnMiLCJ3ZWFwb25zIiwicHVzaCIsIlNpbmdsZUJ1bGxldCIsIkxhc2VyQmVhbSIsInBsYXllciIsImxlZnRTaWRlIiwib2Zmc2V0IiwidmVsb2NpdHkiLCJmaXJlIiwiYXJjYWRlIiwib3ZlcmxhcCIsInRha2VEYW1hZ2UiLCJTcHJpdGUiLCJBcnRpZmFjdCIsImFuaW1hdGlvbnMiLCJhZGQiLCJwbGF5IiwiQnVsbGV0Iiwic2V0IiwiY2hlY2tXb3JsZEJvdW5kcyIsIm91dE9mQm91bmRzS2lsbCIsImV4aXN0cyIsImFuZ2xlIiwic3BlZWQiLCJneCIsImd5IiwicmVzZXQiLCJ2ZWxvY2l0eUZyb21BbmdsZSIsImdyYXZpdHkiLCJQbGF5ZXIiLCJoZWFsdGgiLCJkZWF0aEFuaW1hdGlvblBsYXllZCIsImFsaXZlIiwic2YiLCJmbGFzaGluZyIsImZsYXNoVGltZXIiLCJzZXRTaXplIiwianVtcFNvdW5kIiwiYXVkaW8iLCJ3ZWFwb24iLCJ0aW50IiwidGltZSIsIm5vdyIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJidWxsZXQiLCJraWxsIiwiZmxhc2giLCJuZXh0RmlyZSIsImJ1bGxldFNwZWVkIiwiZmlyZVJhdGUiLCJzb3VyY2UiLCJ3b3JsZCIsImkiLCJzaG9vdCIsImdldEZpcnN0RXhpc3RzIiwibW92ZVRvUG9pbnRlciIsIkdyb3VwIiwiSHVkIiwiYXZhdGFyIiwic3ByaXRlIiwiZml4ZWRUb0NhbWVyYSIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiYmFja2dyb3VuZCIsImluaXRNYXAiLCJpbml0UGxhdGZvcm1zIiwicGxheWVyQ29uZmlnIiwiY2VudGVyWCIsImhlaWdodCIsImV4aXN0aW5nIiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImFydGlmYWN0TW9kdWxlQ29uZmlnIiwiYXJ0aWZhY3RMZWZ0TW9kdWxlIiwiYXJ0aWZhY3RSaWdodE1vZHVsZSIsImh1ZENvbmZpZyIsImh1ZCIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJsZWZ0IiwiaW5wdXQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsIm1vdmluZ1BsYXRmb3JtcyIsImNyZWF0ZUZyb21PYmplY3RzIiwic2V0QWxsIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwib3JpZ2luWSIsIm1vdmluZ0Rvd24iLCJjb2xsaWRlIiwic3RvcCIsIm1vdmVUbyIsImlzRG93biIsImNoZWNrQ29sbGlzaW9uIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJqdW1wIiwiUHJlbG9hZCIsImxvYWQiLCJvbkxvYWRTdGFydCIsImxvYWRTdGFydCIsIm9uRmlsZUNvbXBsZXRlIiwiZmlsZUNvbXBsZXRlIiwib25Mb2FkQ29tcGxldGUiLCJsb2FkQ29tcGxldGUiLCJsb2FkaW5nVGV4dCIsInRleHQiLCJmaWxsIiwic3ByaXRlc2hlZXQiLCJpbWFnZSIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUE7OztBQUNKLGdDQUFpQztBQUFBLFFBQXBCQyxJQUFvQixRQUFwQkEsSUFBb0I7QUFBQSxRQUFkQyxDQUFjLFFBQWRBLENBQWM7QUFBQSxRQUFYQyxDQUFXLFFBQVhBLENBQVc7QUFBQSxRQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQUE7O0FBQUEsZ0lBQ3pCSCxJQUR5QixFQUNuQkMsQ0FEbUIsRUFDaEJDLENBRGdCLEVBQ2JDLEtBRGE7O0FBRS9CLFVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLFVBQUtJLFdBQUwsR0FBbUIsR0FBbkI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFVBQUtDLElBQUwsR0FBWSxNQUFLUCxJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FBZCxDQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQUFaO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQUtWLElBQUwsQ0FBVVEsR0FBVixDQUFjQyxjQUFkLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBQVo7QUFDQSxVQUFLRSxJQUFMLEdBQVksTUFBS1gsSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBWjtBQUNBLFVBQUtHLElBQUwsR0FBWSxNQUFLWixJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FBZCxDQUE2QixDQUFDLEVBQTlCLEVBQWtDLEVBQWxDLENBQVo7O0FBRUE7QUFD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QUFqQixDQUF5QixZQUF6QjtBQUNEOzs7aUNBRVlDLFVBQVVDLFVBQVVDLFNBQVNDLGFBQWFDLFlBQVk7QUFDakUsV0FBS1osV0FBTCxDQUFpQk8sT0FBakIsQ0FBeUIsb0JBQW9CQyxRQUFwQixHQUErQixNQUEvQixHQUNyQkcsV0FEcUIsR0FDUCxVQURPLEdBQ01DLFVBRC9CO0FBRUQ7OzttQ0FFYztBQUNiLFdBQUtaLFdBQUwsQ0FBaUJPLE9BQWpCLENBQXlCLGVBQXpCO0FBQ0FwSyxXQUFLMEYsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCO0FBQ0Q7Ozs7Ozs7QUNsREgsSUFBSTNGLE9BQU8sSUFBSWtCLE9BQU93SixJQUFYLENBQWdCLElBQWhCLEVBQXNCLEdBQXRCLEVBQTJCeEosT0FBT3lKLElBQWxDLEVBQXdDLE1BQXhDLEVBQWdELElBQWhELEVBQXNELEtBQXRELEVBQTZELEtBQTdELENBQVg7O0FBRUEzSyxLQUFLMEYsS0FBTCxDQUFXbkQsR0FBWCxDQUFlLE1BQWYsRUFBdUJnRCxJQUF2QjtBQUNBdkYsS0FBSzBGLEtBQUwsQ0FBV25ELEdBQVgsQ0FBZSxTQUFmLEVBQTBCOEcsT0FBMUI7QUFDQXJKLEtBQUswRixLQUFMLENBQVduRCxHQUFYLENBQWUsTUFBZixFQUF1QnFELElBQXZCOztBQUVBNUYsS0FBSzBGLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQiIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXJ0aWZhY3RNb2R1bGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcbiAgICB0aGlzLmFjdGl2ZVdlYXBvbiA9IDA7XG4gICAgdGhpcy52ZWxYID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgxMDAsIDIwMCk7XG4gICAgdGhpcy52ZWxZID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgzMDAsIDQwMCk7XG4gICAgdGhpcy5vZmZYID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgyMDAsIDMwMCk7XG4gICAgdGhpcy5vZmZZID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgtNDAsIDQwKTtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbyg0KTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5pdFdlYXBvbnMoKTtcbiAgfVxuXG4gIGluaXRXZWFwb25zKCkge1xuICAgIHRoaXMud2VhcG9ucyA9IFtdO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBTaW5nbGVCdWxsZXQodGhpcy5nYW1lKSk7XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IExhc2VyQmVhbSh0aGlzLmdhbWUpKTtcbiAgfVxuXG4gIG1vdmVUbyhwbGF5ZXIpIHtcbiAgICBsZXQgbGVmdFNpZGUgPSB0aGlzLnNjYWxlLnggPiAwO1xuICAgIGxldCBvZmZzZXQgPSBsZWZ0U2lkZSA/IC10aGlzLm9mZlggOiB0aGlzLm9mZlg7XG5cbiAgICBpZiAocGxheWVyLnggLSAyMCArIG9mZnNldCA+IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueCArIDIwICsgb2Zmc2V0IDwgdGhpcy54KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICB9XG5cbiAgICBpZiAocGxheWVyLnkgLSAyODAgKyB0aGlzLm9mZlkgPCB0aGlzLnkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLXRoaXMudmVsWTtcbiAgICB9IGVsc2UgaWYgKHBsYXllci55IC0gMzIwICsgdGhpcy5vZmZZID4gdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IHRoaXMudmVsWTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHNob290KCkge1xuICAgIHRoaXMud2VhcG9uc1t0aGlzLmFjdGl2ZVdlYXBvbl0uZmlyZSh0aGlzKTtcbiAgfVxuXG4gIGNoZWNrQ29sbGlzaW9uKHBsYXllcikge1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLCBwbGF5ZXIsXG4gICAgICBwbGF5ZXIudGFrZURhbWFnZSwgbnVsbCwgdGhpcyk7XG4gIH1cbn1cbiIsImNsYXNzIEFydGlmYWN0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmJ1bGxldERlbGF5ID0gMjAwO1xuICAgIHRoaXMubGFzdEJ1bGxldCA9IDA7XG4gICAgdGhpcy5hY3RpdmVXZWFwb24gPSAwO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDQpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2Zsb2F0aW5nJywgWzAsIDEsIDIsIDNdLCB0cnVlKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5pdFdlYXBvbnMoKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnZmxvYXRpbmcnLCA0LCB0cnVlKTtcbiAgfVxuXG4gIGluaXRXZWFwb25zKCkge1xuICAgIHRoaXMud2VhcG9ucyA9IFtdO1xuICAgIHRoaXMud2VhcG9ucy5wdXNoKG5ldyBTaW5nbGVCdWxsZXQodGhpcy5nYW1lKSk7XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IExhc2VyQmVhbSh0aGlzLmdhbWUpKTtcbiAgfVxuXG4gIG1vdmVUbyhwbGF5ZXIpIHtcbiAgICBpZiAocGxheWVyLnggLSAyMCA+IHRoaXMueCkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAyMDA7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIueCArIDIwIDwgdGhpcy54KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0yMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICB9XG5cbiAgICBpZiAocGxheWVyLnkgLSAyODAgPCB0aGlzLnkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTQwMDtcbiAgICB9IGVsc2UgaWYgKHBsYXllci55IC0gMzIwID4gdGhpcy55KSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IDQwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHNob290KHBsYXllcikge1xuICAgIHRoaXMud2VhcG9uc1t0aGlzLmFjdGl2ZVdlYXBvbl0uZmlyZSh0aGlzKTtcbiAgfVxuXG4gIGNoZWNrQ29sbGlzaW9uKHBsYXllcikge1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLCBwbGF5ZXIsXG4gICAgICBwbGF5ZXIudGFrZURhbWFnZSwgbnVsbCwgdGhpcyk7XG4gIH1cbn1cbiIsImNsYXNzIEJ1bGxldCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIDAsIDAsIGFzc2V0KTtcblxuICAgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuICAgIHRoaXMuZXhpc3RzID0gZmFsc2U7XG4gIH1cblxuICBmaXJlKHgsIHksIGFuZ2xlLCBzcGVlZCwgZ3gsIGd5KSB7XG4gICAgZ3ggPSBneCB8fCAwO1xuICAgIGd5ID0gZ3kgfHwgMDtcblxuICAgIHRoaXMucmVzZXQoeCwgeSk7XG4gICAgdGhpcy5zY2FsZS5zZXQoMSk7XG5cbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUudmVsb2NpdHlGcm9tQW5nbGUoYW5nbGUsIHNwZWVkLFxuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5KTtcblxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS5zZXQoZ3gsIGd5KTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtnYW1lLCB4LCB5LCBhc3NldH0pIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5hbGl2ZSA9IHRydWU7XG4gICAgdGhpcy52ZWxYID0gNTAwO1xuICAgIHRoaXMuc2YgPSAzO1xuICAgIHRoaXMuZmxhc2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmZsYXNoVGltZXIgPSAwO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnaWRsZScsIFswLCAxXSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgncnVuJywgWzUsIDYsIDcsIDhdLCB0cnVlKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdkZWF0aCcsIFsxMCwgMTEsIDEyLCAxMywgMTRdLCB0cnVlKTtcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjQpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oLXRoaXMuc2YsIHRoaXMuc2YpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA0MDAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMuYm9keS5zZXRTaXplKDE2LCAzMCwgMiwgMSk7XG5cbiAgICB0aGlzLmp1bXBTb3VuZCA9IGdhbWUuYWRkLmF1ZGlvKCdqdW1wJyk7XG5cbiAgICB0aGlzLndlYXBvbiA9IG5ldyBTaW5nbGVCdWxsZXQodGhpcy5nYW1lKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy50aW50ID0gMHhmZmZmZmZmZjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hbGl2ZSkge1xuICAgICAgaWYgKHRoaXMuZmxhc2hpbmcgJiYgdGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5mbGFzaFRpbWVyKSB7XG4gICAgICAgIHRoaXMuZmxhc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aW50ID0gMHhmZmZmZmZmZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gdGhpcy5zZjtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgICB0aGlzLnNjYWxlLnggPSAtdGhpcy5zZjtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTIwMDtcbiAgICAgIHRoaXMuanVtcFNvdW5kLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBmbGFzaCgpIHtcbiAgICB0aGlzLmZsYXNoaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmZsYXNoVGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xuICAgIHRoaXMudGludCA9IDB4ZmY4MDgwODA7XG4gIH1cblxuICB0YWtlRGFtYWdlKHBsYXllciwgYnVsbGV0KSB7XG4gICAgYnVsbGV0LmtpbGwoKTtcblxuICAgIGlmICghcGxheWVyLmZsYXNoaW5nKSB7XG4gICAgICBwbGF5ZXIuZmxhc2goKTtcbiAgICAgIHBsYXllci5oZWFsdGggLT0gMTA7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBMYXNlckJlYW0ge1xuICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gMTAwMDtcbiAgICB0aGlzLmZpcmVSYXRlID0gMjA7XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgU2luZ2xlQnVsbGV0IGV4dGVuZHMgUGhhc2VyLkdyb3VwIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHN1cGVyKGdhbWUsIGdhbWUud29ybGQsICdTaW5nbGUgQnVsbGV0JywgZmFsc2UsIHRydWUsXG4gICAgICBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSg3MDAsIDkwMCk7XG4gICAgdGhpcy5maXJlUmF0ZSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoOTAwLCAxMTAwKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgdGhpcy5hZGQobmV3IEJ1bGxldChnYW1lLCAnYnVsbGV0JyksIHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuc2hvb3QgPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdzaG9vdCcpO1xuICB9XG5cbiAgZmlyZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICB0aGlzXG4gICAgICAuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpXG4gICAgICAuZmlyZSh4LCB5LCA5MCwgdGhpcy5idWxsZXRTcGVlZCwgMCwgMCk7XG4gICAgdGhpcy5zaG9vdC5wbGF5KCk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cblxuICBmaXJlVG9Qb2ludGVyKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIGxldCBidWxsZXQgPSB0aGlzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICBpZiAoYnVsbGV0KSB7XG4gICAgICBidWxsZXQucmVzZXQoeCwgeSk7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvUG9pbnRlcihidWxsZXQsIDE0MDApO1xuICAgICAgdGhpcy5zaG9vdC5wbGF5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0RmlyZSA9IHRoaXMuZ2FtZS50aW1lLnRpbWUgKyB0aGlzLmZpcmVSYXRlO1xuICB9XG59XG4iLCJjbGFzcyBIdWQge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgcGxheWVyfSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICB0aGlzLmF2YXRhciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDMyLCAzMiwgJ2F2YXRhcicpO1xuICAgIHRoaXMuYXZhdGFyLmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBCb290IHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheSB7XG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLmJhY2tncm91bmQgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ2JhY2tncm91bmQnKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2NhbGUuc2V0VG8oMik7XG5cbiAgICAvLyBNYXBcbiAgICB0aGlzLmluaXRNYXAoKTtcbiAgICB0aGlzLmluaXRQbGF0Zm9ybXMoKTtcblxuICAgIC8vIFBsYXllclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAzMDAsXG4gICAgICBhc3NldDogJ3BsYXllcidcbiAgICB9O1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gQXJ0aWZhY3RcbiAgICBsZXQgYXJ0aWZhY3RDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMDAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICBsZXQgYXJ0aWZhY3RNb2R1bGVDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMTAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdC1tb2R1bGUnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZSA9IG5ldyBBcnRpZmFjdE1vZHVsZShhcnRpZmFjdE1vZHVsZUNvbmZpZyk7XG4gICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlID0gbmV3IEFydGlmYWN0TW9kdWxlKGFydGlmYWN0TW9kdWxlQ29uZmlnKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuc2NhbGUueCA9IC00O1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdExlZnRNb2R1bGUpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlKTtcblxuICAgIC8vIEhVRFxuICAgIGxldCBodWRDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgcGxheWVyOiB0aGlzLnBsYXllclxuICAgIH07XG4gICAgdGhpcy5odWQgPSBuZXcgSHVkKGh1ZENvbmZpZyk7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLlRJTEVfQklBUyA9IDY0O1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIGluaXRNYXAoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5tYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdtYXAnKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVzJywgJ3RpbGVzJyk7XG5cbiAgICAvLyBMYXllcnNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoMCk7XG4gICAgdGhpcy5sYXllci5zZXRTY2FsZSgyKTtcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLCA0KTtcbiAgfVxuXG4gIGluaXRQbGF0Zm9ybXMoKSB7XG4gICAgdGhpcy5wbGF0Zm9ybXMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMucGxhdGZvcm1zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5lbmFibGVCb2R5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMSwgJ3BsYXRmb3JtJywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDEwLCAncGxhdGZvcm0tbGVmdCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMiwgJ3BsYXRmb3JtLXJpZ2h0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG5cbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTksICdtb3ZpbmctcGxhdGZvcm0nLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMubW92aW5nUGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTgsICdtb3ZpbmctcGxhdGZvcm0tbGVmdCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAyMCwgJ21vdmluZy1wbGF0Zm9ybS1yaWdodCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMpO1xuXG4gICAgdGhpcy5wbGF0Zm9ybXMuc2NhbGUuc2V0VG8oMik7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmltbW92YWJsZScsIHRydWUpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5kb3duJywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgcGxhdGZvcm0uYm9keS5zZXRTaXplKDMyLCA4LCAwLCAyKTtcbiAgICB9KTtcblxuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLnNjYWxlLnNldFRvKDIpO1xuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLnNldEFsbCgnYm9keS5pbW1vdmFibGUnLCB0cnVlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24uZG93bicsIGZhbHNlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCcsIGZhbHNlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQnLCBmYWxzZSk7XG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIHBsYXRmb3JtLmJvZHkuc2V0U2l6ZSgzMiwgOCwgMCwgMik7XG4gICAgICBwbGF0Zm9ybS5vcmlnaW5ZID0gcGxhdGZvcm0ueTtcbiAgICAgIHBsYXRmb3JtLm1vdmluZ0Rvd24gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sYXllcik7XG4gICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuXG4gICAgdGhpcy5hcnRpZmFjdC5tb3ZlVG8odGhpcy5wbGF5ZXIpO1xuICAgIHRoaXMuYXJ0aWZhY3RMZWZ0TW9kdWxlLm1vdmVUbyh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlLm1vdmVUbyh0aGlzLnBsYXllcik7XG5cbiAgICBpZiAoIXRoaXMuY29udHJvbHMuZG93bi5pc0Rvd24gfHwgIXRoaXMuY29udHJvbHMuc3BhY2ViYXIuaXNEb3duKSB7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm1zKTtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMpO1xuICAgIH1cblxuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICBpZiAocGxhdGZvcm0ubW92aW5nRG93bikge1xuICAgICAgICBwbGF0Zm9ybS5ib2R5LnZlbG9jaXR5LnkgPSA1MDtcblxuICAgICAgICBpZiAocGxhdGZvcm0ueSA+IHBsYXRmb3JtLm9yaWdpblkgKyAzMikge1xuICAgICAgICAgIHBsYXRmb3JtLm1vdmluZ0Rvd24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxhdGZvcm0uYm9keS52ZWxvY2l0eS55ID0gLTUwO1xuXG4gICAgICAgIGlmIChwbGF0Zm9ybS55IDwgcGxhdGZvcm0ub3JpZ2luWSAtIDMyKSB7XG4gICAgICAgICAgcGxhdGZvcm0ubW92aW5nRG93biA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSkge1xuICAgICAgdGhpcy5hcnRpZmFjdC5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuY2hlY2tDb2xsaXNpb24odGhpcy5wbGF5ZXIpO1xuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJ0aWZhY3Quc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUuc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlLnNob290KHRoaXMucGxheWVyKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3J1bicsIDEyLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScsIDIsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkKSB7XG4gICAgICB0aGlzLnBsYXllci5kZWF0aEFuaW1hdGlvblBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2RlYXRoJywgMTIsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgLy8gU3ByaXRlc1xuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvZW50aXRpZXMvcGxheWVyL3BsYXllci5wbmcnLCAzNCwgMzEpO1xuICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnYXJ0aWZhY3QnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC9hcnRpZmFjdC5wbmcnLCA0MSwgMzQpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYXJ0aWZhY3QtbW9kdWxlJywgJy9hc3NldHMvZW50aXRpZXMvYXJ0aWZhY3QvYXJ0aWZhY3QtbW9kdWxlLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYnVsbGV0JywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0cy9idWxsZXQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdiZWFtJywgJy9hc3NldHMvZW50aXRpZXMvYnVsbGV0cy9iZWFtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywgJy9hc3NldHMvYmFja2dyb3VuZC5wbmcnKTtcblxuICAgIC8vIE1hcFxuICAgIGdhbWUubG9hZC50aWxlbWFwKCdtYXAnLCAnL2Fzc2V0cy9tYXAvbWFwLmpzb24nLCBudWxsLFxuICAgICAgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCd0aWxlcycsICcvYXNzZXRzL21hcC90aWxlcy5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0tbGVmdCcsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS1sZWZ0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0tcmlnaHQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0tcmlnaHQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdtb3ZpbmctcGxhdGZvcm0tcmlnaHQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvbW92aW5nLXBsYXRmb3JtLXJpZ2h0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnbW92aW5nLXBsYXRmb3JtLWxlZnQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvbW92aW5nLXBsYXRmb3JtLWxlZnQucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdtb3ZpbmctcGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvbW92aW5nLXBsYXRmb3JtLnBuZycpO1xuXG4gICAgLy8gSFVEXG4gICAgZ2FtZS5sb2FkLmltYWdlKCdhdmF0YXInLCAnL2Fzc2V0cy9odWQvYXZhdGFyLnBuZycpO1xuXG4gICAgLy8gQXVkaW9cbiAgICBnYW1lLmxvYWQuYXVkaW8oJ2p1bXAnLCAnL2Fzc2V0cy9zb3VuZHMvanVtcC53YXYnKTtcbiAgICBnYW1lLmxvYWQuYXVkaW8oJ3Nob290JywgJy9hc3NldHMvc291bmRzL3Nob290LndhdicpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
