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
    _this.alive = true;

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
      if (this.alive) {
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
      } else {
        this.body.velocity.y = 300;
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
    _this.alive = true;

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
      if (this.alive) {
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
      } else {
        this.body.velocity.y = 400;
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
      var _this = this;

      game.physics.arcade.collide(this.player, this.layer);
      this.player.stop();

      this.artifact.moveTo(this.player);
      this.artifactLeftModule.moveTo(this.player);
      this.artifactRightModule.moveTo(this.player);

      this.activators.forEach(function (activator) {
        if (activator.deactivated) {
          _this.artifact.alive = false;
          _this.artifactLeftModule.alive = false;
          _this.artifactRightModule.alive = false;
        }
      });

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
      activator.deactivated = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LW1vZHVsZS5qcyIsImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0TW9kdWxlIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJ2ZWxYIiwicm5kIiwiaW50ZWdlckluUmFuZ2UiLCJ2ZWxZIiwib2ZmWCIsIm9mZlkiLCJhbGl2ZSIsImFuY2hvciIsInNldFRvIiwic2NhbGUiLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGhhc2VyIiwiUGh5c2ljcyIsIkFSQ0FERSIsImJvZHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJpbml0V2VhcG9ucyIsIndlYXBvbnMiLCJwdXNoIiwiU2luZ2xlQnVsbGV0IiwiTGFzZXJCZWFtIiwicGxheWVyIiwibGVmdFNpZGUiLCJvZmZzZXQiLCJ2ZWxvY2l0eSIsImZpcmUiLCJhcmNhZGUiLCJvdmVybGFwIiwidGFrZURhbWFnZSIsIlNwcml0ZSIsIkFydGlmYWN0IiwiYW5pbWF0aW9ucyIsImFkZCIsInBsYXkiLCJCdWxsZXQiLCJzZXQiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZXhpc3RzIiwiYW5nbGUiLCJzcGVlZCIsImd4IiwiZ3kiLCJyZXNldCIsInZlbG9jaXR5RnJvbUFuZ2xlIiwiZ3Jhdml0eSIsIlBsYXllciIsImhlYWx0aCIsImRlYXRoQW5pbWF0aW9uUGxheWVkIiwic2YiLCJmbGFzaGluZyIsImZsYXNoVGltZXIiLCJzZXRTaXplIiwianVtcFNvdW5kIiwiYXVkaW8iLCJ3ZWFwb24iLCJ0aW50IiwidGltZSIsIm5vdyIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJidWxsZXQiLCJraWxsIiwiZmxhc2giLCJuZXh0RmlyZSIsImJ1bGxldFNwZWVkIiwiZmlyZVJhdGUiLCJzb3VyY2UiLCJ3b3JsZCIsImkiLCJzaG9vdCIsImdldEZpcnN0RXhpc3RzIiwibW92ZVRvUG9pbnRlciIsIkdyb3VwIiwiSHVkIiwiYXZhdGFyIiwic3ByaXRlIiwiZml4ZWRUb0NhbWVyYSIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwiYmFja2dyb3VuZCIsImluaXRNYXAiLCJpbml0UGxhdGZvcm1zIiwicGxheWVyQ29uZmlnIiwiY2VudGVyWCIsImhlaWdodCIsImV4aXN0aW5nIiwiYXJ0aWZhY3RDb25maWciLCJhcnRpZmFjdCIsImFydGlmYWN0TW9kdWxlQ29uZmlnIiwiYXJ0aWZhY3RMZWZ0TW9kdWxlIiwiYXJ0aWZhY3RSaWdodE1vZHVsZSIsImh1ZENvbmZpZyIsImh1ZCIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiVElMRV9CSUFTIiwiY29udHJvbHMiLCJsZWZ0IiwiaW5wdXQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsIm1vdmluZ1BsYXRmb3JtcyIsImFjdGl2YXRvcnMiLCJjcmVhdGVGcm9tT2JqZWN0cyIsInNldEFsbCIsImZvckVhY2giLCJwbGF0Zm9ybSIsIm9yaWdpblkiLCJtb3ZpbmdEb3duIiwiY29sbGlkZSIsInN0b3AiLCJtb3ZlVG8iLCJhY3RpdmF0b3IiLCJkZWFjdGl2YXRlZCIsImlzRG93biIsImNoZWNrQ29sbGlzaW9uIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJqdW1wIiwid2luIiwibG9hZFRleHR1cmUiLCJQcmVsb2FkIiwibG9hZCIsIm9uTG9hZFN0YXJ0IiwibG9hZFN0YXJ0Iiwib25GaWxlQ29tcGxldGUiLCJmaWxlQ29tcGxldGUiLCJvbkxvYWRDb21wbGV0ZSIsImxvYWRDb21wbGV0ZSIsImxvYWRpbmdUZXh0IiwidGV4dCIsImZpbGwiLCJzcHJpdGVzaGVldCIsImltYWdlIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJzZXRUZXh0IiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJHYW1lIiwiQVVUTyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQTs7O0FBQ0osZ0NBQWlDO0FBQUEsUUFBcEJDLElBQW9CLFFBQXBCQSxJQUFvQjtBQUFBLFFBQWRDLENBQWMsUUFBZEEsQ0FBYztBQUFBLFFBQVhDLENBQVcsUUFBWEEsQ0FBVztBQUFBLFFBQVJDLEtBQVEsUUFBUkEsS0FBUTs7QUFBQTs7QUFBQSxnSUFDekJILElBRHlCLEVBQ25CQyxDQURtQixFQUNoQkMsQ0FEZ0IsRUFDYkMsS0FEYTs7QUFFL0IsVUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS0ksV0FBTCxHQUFtQixHQUFuQjtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQUtQLElBQUwsQ0FBVVEsR0FBVixDQUFjQyxjQUFkLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBQVo7QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBS1YsSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBWjtBQUNBLFVBQUtFLElBQUwsR0FBWSxNQUFLWCxJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FBZCxDQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQUFaO0FBQ0EsVUFBS0csSUFBTCxHQUFZLE1BQUtaLElBQUwsQ0FBVVEs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QXVCb0QsSUFBdkI7O0FBRUE1RixLQUFLMEYsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcnRpZmFjdE1vZHVsZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuICAgIHRoaXMuYWN0aXZlV2VhcG9uID0gMDtcbiAgICB0aGlzLnZlbFggPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDEwMCwgMjAwKTtcbiAgICB0aGlzLnZlbFkgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDMwMCwgNDAwKTtcbiAgICB0aGlzLm9mZlggPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDIwMCwgMzAwKTtcbiAgICB0aGlzLm9mZlkgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKC00MCwgNDApO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDQpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuXG4gICAgdGhpcy5pbml0V2VhcG9ucygpO1xuICB9XG5cbiAgaW5pdFdlYXBvbnMoKSB7XG4gICAgdGhpcy53ZWFwb25zID0gW107XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IFNpbmdsZUJ1bGxldCh0aGlzLmdhbWUpKTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgTGFzZXJCZWFtKHRoaXMuZ2FtZSkpO1xuICB9XG5cbiAgbW92ZVRvKHBsYXllcikge1xuICAgIGlmICh0aGlzLmFsaXZlKSB7XG4gICAgICBsZXQgbGVmdFNpZGUgPSB0aGlzLnNjYWxlLnggPiAwO1xuICAgICAgbGV0IG9mZnNldCA9IGxlZnRTaWRlID8gLXRoaXMub2ZmWCA6IHRoaXMub2ZmWDtcblxuICAgICAgaWYgKHBsYXllci54IC0gMjAgKyBvZmZzZXQgPiB0aGlzLngpIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgICB9IGVsc2UgaWYgKHBsYXllci54ICsgMjAgKyBvZmZzZXQgPCB0aGlzLngpIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAocGxheWVyLnkgLSAyODAgKyB0aGlzLm9mZlkgPCB0aGlzLnkpIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtdGhpcy52ZWxZO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIueSAtIDMyMCArIHRoaXMub2ZmWSA+IHRoaXMueSkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IHRoaXMudmVsWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAzMDA7XG4gICAgfVxuICB9XG5cbiAgc2hvb3QoKSB7XG4gICAgdGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXS5maXJlKHRoaXMpO1xuICB9XG5cbiAgY2hlY2tDb2xsaXNpb24ocGxheWVyKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMud2VhcG9uc1t0aGlzLmFjdGl2ZVdlYXBvbl0sIHBsYXllcixcbiAgICAgIHBsYXllci50YWtlRGFtYWdlLCBudWxsLCB0aGlzKTtcbiAgfVxufVxuIiwiY2xhc3MgQXJ0aWZhY3QgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcbiAgICB0aGlzLmFjdGl2ZVdlYXBvbiA9IDA7XG4gICAgdGhpcy5hbGl2ZSA9IHRydWU7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oNCk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZmxvYXRpbmcnLCBbMCwgMSwgMiwgM10sIHRydWUpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuXG4gICAgdGhpcy5pbml0V2VhcG9ucygpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdmbG9hdGluZycsIDQsIHRydWUpO1xuICB9XG5cbiAgaW5pdFdlYXBvbnMoKSB7XG4gICAgdGhpcy53ZWFwb25zID0gW107XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IFNpbmdsZUJ1bGxldCh0aGlzLmdhbWUpKTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgTGFzZXJCZWFtKHRoaXMuZ2FtZSkpO1xuICB9XG5cbiAgbW92ZVRvKHBsYXllcikge1xuICAgIGlmICh0aGlzLmFsaXZlKSB7XG4gICAgICBpZiAocGxheWVyLnggLSAyMCA+IHRoaXMueCkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDIwMDtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyLnggKyAyMCA8IHRoaXMueCkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0yMDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChwbGF5ZXIueSAtIDI4MCA8IHRoaXMueSkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC00MDA7XG4gICAgICB9IGVsc2UgaWYgKHBsYXllci55IC0gMzIwID4gdGhpcy55KSB7XG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gNDAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IDQwMDtcbiAgICB9XG4gIH1cblxuICBzaG9vdChwbGF5ZXIpIHtcbiAgICB0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLmZpcmUodGhpcyk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihwbGF5ZXIpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXSwgcGxheWVyLFxuICAgICAgcGxheWVyLnRha2VEYW1hZ2UsIG51bGwsIHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBCdWxsZXQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCAwLCAwLCBhc3NldCk7XG5cbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcbiAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXN0cyA9IGZhbHNlO1xuICB9XG5cbiAgZmlyZSh4LCB5LCBhbmdsZSwgc3BlZWQsIGd4LCBneSkge1xuICAgIGd4ID0gZ3ggfHwgMDtcbiAgICBneSA9IGd5IHx8IDA7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHkpO1xuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xuXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbUFuZ2xlKGFuZ2xlLCBzcGVlZCxcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eSk7XG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkuc2V0KGd4LCBneSk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kZWF0aEFuaW1hdGlvblBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcbiAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGVhdGgnLCBbMTAsIDExLCAxMiwgMTMsIDE0XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKC10aGlzLnNmLCB0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuc2V0U2l6ZSgxNiwgMzAsIDIsIDEpO1xuXG4gICAgdGhpcy5qdW1wU291bmQgPSBnYW1lLmFkZC5hdWRpbygnanVtcCcpO1xuXG4gICAgdGhpcy53ZWFwb24gPSBuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmZsYXNoaW5nICYmIHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuZmxhc2hUaW1lcikge1xuICAgICAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IHRoaXMuc2Y7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gLXRoaXMuc2Y7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEyMDA7XG4gICAgICB0aGlzLmp1bXBTb3VuZC5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG5cbiAgdGFrZURhbWFnZShwbGF5ZXIsIGJ1bGxldCkge1xuICAgIGJ1bGxldC5raWxsKCk7XG5cbiAgICBpZiAoIXBsYXllci5mbGFzaGluZykge1xuICAgICAgcGxheWVyLmZsYXNoKCk7XG4gICAgICBwbGF5ZXIuaGVhbHRoIC09IDA7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBMYXNlckJlYW0ge1xuICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gMTAwMDtcbiAgICB0aGlzLmZpcmVSYXRlID0gMjA7XG4gIH1cblxuICBmaXJlKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgU2luZ2xlQnVsbGV0IGV4dGVuZHMgUGhhc2VyLkdyb3VwIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHN1cGVyKGdhbWUsIGdhbWUud29ybGQsICdTaW5nbGUgQnVsbGV0JywgZmFsc2UsIHRydWUsXG4gICAgICBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmJ1bGxldFNwZWVkID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSg3MDAsIDkwMCk7XG4gICAgdGhpcy5maXJlUmF0ZSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoOTAwLCAxMTAwKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgdGhpcy5hZGQobmV3IEJ1bGxldChnYW1lLCAnYnVsbGV0JyksIHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuc2hvb3QgPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdzaG9vdCcpO1xuICB9XG5cbiAgZmlyZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICB0aGlzXG4gICAgICAuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpXG4gICAgICAuZmlyZSh4LCB5LCA5MCwgdGhpcy5idWxsZXRTcGVlZCwgMCwgMCk7XG4gICAgdGhpcy5zaG9vdC5wbGF5KCk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cblxuICBmaXJlVG9Qb2ludGVyKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLmdhbWUudGltZS50aW1lIDwgdGhpcy5uZXh0RmlyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4ID0gc291cmNlLng7XG4gICAgbGV0IHkgPSBzb3VyY2UueTtcblxuICAgIGxldCBidWxsZXQgPSB0aGlzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICBpZiAoYnVsbGV0KSB7XG4gICAgICBidWxsZXQucmVzZXQoeCwgeSk7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvUG9pbnRlcihidWxsZXQsIDE0MDApO1xuICAgICAgdGhpcy5zaG9vdC5wbGF5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0RmlyZSA9IHRoaXMuZ2FtZS50aW1lLnRpbWUgKyB0aGlzLmZpcmVSYXRlO1xuICB9XG59XG4iLCJjbGFzcyBIdWQge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgcGxheWVyfSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICB0aGlzLmF2YXRhciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDMyLCAzMiwgJ2F2YXRhcicpO1xuICAgIHRoaXMuYXZhdGFyLmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBCb290IHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheSB7XG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLmJhY2tncm91bmQgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ2JhY2tncm91bmQnKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2NhbGUuc2V0VG8oMik7XG5cbiAgICAvLyBNYXBcbiAgICB0aGlzLmluaXRNYXAoKTtcbiAgICB0aGlzLmluaXRQbGF0Zm9ybXMoKTtcblxuICAgIC8vIFBsYXllclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAzMDAsXG4gICAgICBhc3NldDogJ3BsYXllcidcbiAgICB9O1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gQXJ0aWZhY3RcbiAgICBsZXQgYXJ0aWZhY3RDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMDAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdCdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoYXJ0aWZhY3RDb25maWcpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdCk7XG5cbiAgICBsZXQgYXJ0aWZhY3RNb2R1bGVDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogZ2FtZS53b3JsZC5oZWlnaHQgLSAxMTAwLFxuICAgICAgYXNzZXQ6ICdhcnRpZmFjdC1tb2R1bGUnXG4gICAgfTtcbiAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZSA9IG5ldyBBcnRpZmFjdE1vZHVsZShhcnRpZmFjdE1vZHVsZUNvbmZpZyk7XG4gICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlID0gbmV3IEFydGlmYWN0TW9kdWxlKGFydGlmYWN0TW9kdWxlQ29uZmlnKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuc2NhbGUueCA9IC00O1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdExlZnRNb2R1bGUpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlKTtcblxuICAgIC8vIEhVRFxuICAgIGxldCBodWRDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgcGxheWVyOiB0aGlzLnBsYXllclxuICAgIH07XG4gICAgdGhpcy5odWQgPSBuZXcgSHVkKGh1ZENvbmZpZyk7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLlRJTEVfQklBUyA9IDY0O1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIGluaXRNYXAoKSB7XG4gICAgLy8gTWFwXG4gICAgdGhpcy5tYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdtYXAnKTtcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVzJywgJ3RpbGVzJyk7XG5cbiAgICAvLyBMYXllcnNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoMCk7XG4gICAgdGhpcy5sYXllci5zZXRTY2FsZSgyKTtcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLCA0KTtcbiAgfVxuXG4gIGluaXRQbGF0Zm9ybXMoKSB7XG4gICAgdGhpcy5wbGF0Zm9ybXMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMucGxhdGZvcm1zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRvcnMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuYWN0aXZhdG9ycy5lbmFibGVCb2R5ID0gdHJ1ZTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMSwgJ3BsYXRmb3JtJywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDEwLCAncGxhdGZvcm0tbGVmdCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMiwgJ3BsYXRmb3JtLXJpZ2h0JywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLnBsYXRmb3Jtcyk7XG5cbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTksICdtb3ZpbmctcGxhdGZvcm0nLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMubW92aW5nUGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTgsICdtb3ZpbmctcGxhdGZvcm0tbGVmdCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAyMCwgJ21vdmluZy1wbGF0Zm9ybS1yaWdodCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMpO1xuXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDE3LCAnYWN0aXZhdGVkJywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLmFjdGl2YXRvcnMpO1xuXG4gICAgdGhpcy5wbGF0Zm9ybXMuc2NhbGUuc2V0VG8oMik7XG4gICAgdGhpcy5wbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmltbW92YWJsZScsIHRydWUpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5kb3duJywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0JywgZmFsc2UpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgcGxhdGZvcm0uYm9keS5zZXRTaXplKDMyLCA4LCAwLCAyKTtcbiAgICB9KTtcblxuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLnNjYWxlLnNldFRvKDIpO1xuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLnNldEFsbCgnYm9keS5pbW1vdmFibGUnLCB0cnVlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24uZG93bicsIGZhbHNlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCcsIGZhbHNlKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQnLCBmYWxzZSk7XG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIHBsYXRmb3JtLmJvZHkuc2V0U2l6ZSgzMiwgOCwgMCwgMik7XG4gICAgICBwbGF0Zm9ybS5vcmlnaW5ZID0gcGxhdGZvcm0ueTtcbiAgICAgIHBsYXRmb3JtLm1vdmluZ0Rvd24gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmF0b3JzLnNjYWxlLnNldFRvKDIpO1xuICAgIHRoaXMuYWN0aXZhdG9ycy5zZXRBbGwoJ2JvZHkuaW1tb3ZhYmxlJywgdHJ1ZSk7XG4gICAgdGhpcy5hY3RpdmF0b3JzLnNldEFsbCgnYWN0aXZhdGVkJywgdHJ1ZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcbiAgICB0aGlzLnBsYXllci5zdG9wKCk7XG5cbiAgICB0aGlzLmFydGlmYWN0Lm1vdmVUbyh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcblxuICAgIHRoaXMuYWN0aXZhdG9ycy5mb3JFYWNoKChhY3RpdmF0b3IpID0+IHtcbiAgICAgIGlmIChhY3RpdmF0b3IuZGVhY3RpdmF0ZWQpIHtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuYWxpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghdGhpcy5jb250cm9scy5kb3duLmlzRG93biB8fCAhdGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLm1vdmluZ1BsYXRmb3Jtcyk7XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIGlmIChwbGF0Zm9ybS5tb3ZpbmdEb3duKSB7XG4gICAgICAgIHBsYXRmb3JtLmJvZHkudmVsb2NpdHkueSA9IDUwO1xuXG4gICAgICAgIGlmIChwbGF0Zm9ybS55ID4gcGxhdGZvcm0ub3JpZ2luWSArIDMyKSB7XG4gICAgICAgICAgcGxhdGZvcm0ubW92aW5nRG93biA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF0Zm9ybS5ib2R5LnZlbG9jaXR5LnkgPSAtNTA7XG5cbiAgICAgICAgaWYgKHBsYXRmb3JtLnkgPCBwbGF0Zm9ybS5vcmlnaW5ZIC0gMzIpIHtcbiAgICAgICAgICBwbGF0Zm9ybS5tb3ZpbmdEb3duID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlKSB7XG4gICAgICB0aGlzLmFydGlmYWN0LmNoZWNrQ29sbGlzaW9uKHRoaXMucGxheWVyKTtcbiAgICAgIHRoaXMuYXJ0aWZhY3RMZWZ0TW9kdWxlLmNoZWNrQ29sbGlzaW9uKHRoaXMucGxheWVyKTtcbiAgICAgIHRoaXMuYXJ0aWZhY3RSaWdodE1vZHVsZS5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMuc3BhY2ViYXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnRpZmFjdC5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5zaG9vdCh0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgIH1cblxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmFjdGl2YXRvcnMsIHRoaXMud2luKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duIHx8IHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncnVuJywgMTIsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wbGF5ZXIuZGVhdGhBbmltYXRpb25QbGF5ZWQpIHtcbiAgICAgIHRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnZGVhdGgnLCAxMiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHdpbihwbGF5ZXIsIGFjdGl2YXRvcikge1xuICAgIGFjdGl2YXRvci5kZWFjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdG9yLmxvYWRUZXh0dXJlKCdkZWFjdGl2YXRlZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIC8vIFNwcml0ZXNcbiAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsICcvYXNzZXRzL2VudGl0aWVzL3BsYXllci9wbGF5ZXIucG5nJywgMzQsIDMxKTtcbiAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2FydGlmYWN0JywgJy9hc3NldHMvZW50aXRpZXMvYXJ0aWZhY3QvYXJ0aWZhY3QucG5nJywgNDEsIDM0KTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2FydGlmYWN0LW1vZHVsZScsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0L2FydGlmYWN0LW1vZHVsZS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1bGxldCcsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldHMvYnVsbGV0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYmVhbScsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldHMvYmVhbS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsICcvYXNzZXRzL2JhY2tncm91bmQucG5nJyk7XG5cbiAgICAvLyBNYXBcbiAgICBnYW1lLmxvYWQudGlsZW1hcCgnbWFwJywgJy9hc3NldHMvbWFwL21hcC5qc29uJywgbnVsbCxcbiAgICAgIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIGdhbWUubG9hZC5pbWFnZSgndGlsZXMnLCAnL2Fzc2V0cy9tYXAvdGlsZXMucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLWxlZnQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0tbGVmdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLXJpZ2h0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLXJpZ2h0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnbW92aW5nLXBsYXRmb3JtLXJpZ2h0JywgJy9hc3NldHMvcGxhdGZvcm1zL21vdmluZy1wbGF0Zm9ybS1yaWdodC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ21vdmluZy1wbGF0Zm9ybS1sZWZ0JywgJy9hc3NldHMvcGxhdGZvcm1zL21vdmluZy1wbGF0Zm9ybS1sZWZ0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnbW92aW5nLXBsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL21vdmluZy1wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2FjdGl2YXRlZCcsICcvYXNzZXRzL29iamVjdHMvYWN0aXZhdG9yLWFjdGl2YXRlZC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2RlYWN0aXZhdGVkJywgJy9hc3NldHMvb2JqZWN0cy9hY3RpdmF0b3ItZGVhY3RpdmF0ZWQucG5nJyk7XG5cbiAgICAvLyBIVURcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2F2YXRhcicsICcvYXNzZXRzL2h1ZC9hdmF0YXIucG5nJyk7XG5cbiAgICAvLyBBdWRpb1xuICAgIGdhbWUubG9hZC5hdWRpbygnanVtcCcsICcvYXNzZXRzL3NvdW5kcy9qdW1wLndhdicpO1xuICAgIGdhbWUubG9hZC5hdWRpbygnc2hvb3QnLCAnL2Fzc2V0cy9zb3VuZHMvc2hvb3Qud2F2Jyk7XG5cbiAgICBnYW1lLmxvYWQuc3RhcnQoKTtcbiAgfVxuXG4gIGxvYWRTdGFydCgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWRpbmcuLi4nKTtcbiAgfVxuXG4gIGZpbGVDb21wbGV0ZShwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdGaWxlIENvbXBsZXRlOiAnICsgcHJvZ3Jlc3MgKyAnJSAtICdcbiAgICAgICsgdG90YWxMb2FkZWQgKyAnIG91dCBvZiAnICsgdG90YWxGaWxlcyk7XG4gIH1cblxuICBsb2FkQ29tcGxldGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkIENvbXBsZXRlJyk7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncGxheScpO1xuICB9XG59XG4iLCJsZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMjgwLCA3MjAsIFBoYXNlci5BVVRPLCAnZ2FtZScsIG51bGwsIGZhbHNlLCBmYWxzZSk7XG5cbmdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XG5nYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3BsYXknLCBQbGF5KTtcblxuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
