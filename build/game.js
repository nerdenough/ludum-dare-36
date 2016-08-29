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

    _this.jumpSound = game.add.audio('jump', 0.05);

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

    _this.shoot = _this.game.add.audio('shoot', 0.05);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hud = function () {
  function Hud(_ref) {
    var game = _ref.game;
    var player = _ref.player;

    _classCallCheck(this, Hud);

    this.game = game;
    this.player = player;

    this.hp = this.game.add.text(32, 32, 'HP: 100', { fill: '#fff' });
    this.hp.fixedToCamera = true;
  }

  _createClass(Hud, [{
    key: 'update',
    value: function update() {
      this.hp.setText('HP: ' + this.player.health);
    }
  }]);

  return Hud;
}();
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
        spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        enter: this.input.keyboard.addKey(Phaser.Keyboard.ENTER)
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

      this.winner = game.add.sprite(0, 0, 'winner');
      this.gameover = game.add.sprite(0, 0, 'gameover');
      this.winner.fixedToCamera = true;
      this.gameover.fixedToCamera = true;
      this.winner.visible = false;
      this.gameover.visible = false;
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
          _this.winner.visible = true;
          _this.won = true;
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

      if (this.player.alive && !this.won) {
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
      } else {
        if (this.controls.enter.isDown) {
          this.won = false;
          this.game.state.start('play');
        }
      }
      this.hud.update();

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
      } else {
        this.gameover.visible = true;
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
      game.load.image('winner', '/assets/screens/winner.png');
      game.load.image('gameover', '/assets/screens/gameover.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlmYWN0LW1vZHVsZS5qcyIsImFydGlmYWN0LmpzIiwiYnVsbGV0LmpzIiwicGxheWVyLmpzIiwibGFzZXItYmVhbS5qcyIsInNpbmdsZS1idWxsZXQuanMiLCJodWQuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIkFydGlmYWN0TW9kdWxlIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJhY3RpdmVXZWFwb24iLCJ2ZWxYIiwicm5kIiwiaW50ZWdlckluUmFuZ2UiLCJ2ZWxZIiwib2ZmWCIsIm9mZlkiLCJhbGl2ZSIsImFuY2hvciIsInNldFRvIiwic2NhbGUiLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGhhc2VyIiwiUGh5c2ljcyIsIkFSQ0FERSIsImJvZHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJpbml0V2VhcG9ucyIsIndlYXBvbnMiLCJwdXNoIiwiU2luZ2xlQnVsbGV0IiwiTGFzZXJCZWFtIiwicGxheWVyIiwibGVmdFNpZGUiLCJvZmZzZXQiLCJ2ZWxvY2l0eSIsImZpcmUiLCJhcmNhZGUiLCJvdmVybGFwIiwidGFrZURhbWFnZSIsIlNwcml0ZSIsIkFydGlmYWN0IiwiYW5pbWF0aW9ucyIsImFkZCIsInBsYXkiLCJCdWxsZXQiLCJzZXQiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZXhpc3RzIiwiYW5nbGUiLCJzcGVlZCIsImd4IiwiZ3kiLCJyZXNldCIsInZlbG9jaXR5RnJvbUFuZ2xlIiwiZ3Jhdml0eSIsIlBsYXllciIsImhlYWx0aCIsImRlYXRoQW5pbWF0aW9uUGxheWVkIiwic2YiLCJmbGFzaGluZyIsImZsYXNoVGltZXIiLCJzZXRTaXplIiwianVtcFNvdW5kIiwiYXVkaW8iLCJ3ZWFwb24iLCJ0aW50IiwidGltZSIsIm5vdyIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJidWxsZXQiLCJraWxsIiwiZmxhc2giLCJuZXh0RmlyZSIsImJ1bGxldFNwZWVkIiwiZmlyZVJhdGUiLCJzb3VyY2UiLCJ3b3JsZCIsImkiLCJzaG9vdCIsImdldEZpcnN0RXhpc3RzIiwibW92ZVRvUG9pbnRlciIsIkdyb3VwIiwiSHVkIiwiaHAiLCJ0ZXh0IiwiZmlsbCIsImZpeGVkVG9DYW1lcmEiLCJzZXRUZXh0IiwiQm9vdCIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBsYXkiLCJiYWNrZ3JvdW5kIiwic3ByaXRlIiwiaW5pdE1hcCIsImluaXRQbGF0Zm9ybXMiLCJwbGF5ZXJDb25maWciLCJjZW50ZXJYIiwiaGVpZ2h0IiwiZXhpc3RpbmciLCJhcnRpZmFjdENvbmZpZyIsImFydGlmYWN0IiwiYXJ0aWZhY3RNb2R1bGVDb25maWciLCJhcnRpZmFjdExlZnRNb2R1bGUiLCJhcnRpZmFjdFJpZ2h0TW9kdWxlIiwiaHVkQ29uZmlnIiwiaHVkIiwiY2FtZXJhIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJUSUxFX0JJQVMiLCJjb250cm9scyIsImxlZnQiLCJpbnB1dCIsImtleWJvYXJkIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJBIiwicmlnaHQiLCJEIiwiUyIsInNwYWNlYmFyIiwiU1BBQ0VCQVIiLCJlbnRlciIsIkVOVEVSIiwibWFwIiwidGlsZW1hcCIsImFkZFRpbGVzZXRJbWFnZSIsImxheWVyIiwiY3JlYXRlTGF5ZXIiLCJzZXRTY2FsZSIsInJlc2l6ZVdvcmxkIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsInBsYXRmb3JtcyIsImdyb3VwIiwiZW5hYmxlQm9keSIsIm1vdmluZ1BsYXRmb3JtcyIsImFjdGl2YXRvcnMiLCJjcmVhdGVGcm9tT2JqZWN0cyIsInNldEFsbCIsImZvckVhY2giLCJwbGF0Zm9ybSIsIm9yaWdpblkiLCJtb3ZpbmdEb3duIiwid2lubmVyIiwiZ2FtZW92ZXIiLCJ2aXNpYmxlIiwiY29sbGlkZSIsInN0b3AiLCJtb3ZlVG8iLCJhY3RpdmF0b3IiLCJkZWFjdGl2YXRlZCIsIndvbiIsImlzRG93biIsImNoZWNrQ29sbGlzaW9uIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJqdW1wIiwidXBkYXRlIiwid2luIiwibG9hZFRleHR1cmUiLCJQcmVsb2FkIiwibG9hZCIsIm9uTG9hZFN0YXJ0IiwibG9hZFN0YXJ0Iiwib25GaWxlQ29tcGxldGUiLCJmaWxlQ29tcGxldGUiLCJvbkxvYWRDb21wbGV0ZSIsImxvYWRDb21wbGV0ZSIsImxvYWRpbmdUZXh0Iiwic3ByaXRlc2hlZXQiLCJpbWFnZSIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJHYW1lIiwiQVVUTyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQTs7O0FBQ0osZ0NBQWlDO0FBQUEsUUFBcEJDLElBQW9CLFFBQXBCQSxJQUFvQjtBQUFBLFFBQWRDLENBQWMsUUFBZEEsQ0FBYztBQUFBLFFBQVhDLENBQVcsUUFBWEEsQ0FBVztBQUFBLFFBQVJDLEtBQVEsUUFBUkEsS0FBUTs7QUFBQTs7QUFBQSxnSUFDekJILElBRHlCLEVBQ25CQyxDQURtQixFQUNoQkMsQ0FEZ0IsRUFDYkMsS0FEYTs7QUFFL0IsVUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS0ksV0FBTCxHQUFtQixHQUFuQjtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQUtQLElBQUwsQ0FBVVEsR0FBVixDQUFjQyxjQUFkLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBQVo7QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBS1YsSUFBTCxDQUFVUSxHQUFWLENBQWNDLGNBQWQsQ0FBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBWjtBQUNBLFVBQUtFLElBQUwsR0FBWSxNQUFLWCxJQUFMLENBQVVRLEdBQVYsQ0FBY0MsY0FBZCxDQUE2QixHQUE3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S0FBN0QsQ0FBWDs7QUFFQXZMLEtBQUs0RixLQUFMLENBQVdwRCxHQUFYLENBQWUsTUFBZixFQUF1QmlELElBQXZCO0FBQ0F6RixLQUFLNEYsS0FBTCxDQUFXcEQsR0FBWCxDQUFlLFNBQWYsRUFBMEI0SCxPQUExQjtBQUNBcEssS0FBSzRGLEtBQUwsQ0FBV3BELEdBQVgsQ0FBZSxNQUFmLEVBQXVCc0QsSUFBdkI7O0FBRUE5RixLQUFLNEYsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcnRpZmFjdE1vZHVsZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuICAgIHRoaXMuYWN0aXZlV2VhcG9uID0gMDtcbiAgICB0aGlzLnZlbFggPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDEwMCwgMjAwKTtcbiAgICB0aGlzLnZlbFkgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDMwMCwgNDAwKTtcbiAgICB0aGlzLm9mZlggPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDIwMCwgMzAwKTtcbiAgICB0aGlzLm9mZlkgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKC00MCwgNDApO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuXG4gICAgLy8gU3ByaXRlXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKDQpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuXG4gICAgdGhpcy5pbml0V2VhcG9ucygpO1xuICB9XG5cbiAgaW5pdFdlYXBvbnMoKSB7XG4gICAgdGhpcy53ZWFwb25zID0gW107XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IFNpbmdsZUJ1bGxldCh0aGlzLmdhbWUpKTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgTGFzZXJCZWFtKHRoaXMuZ2FtZSkpO1xuICB9XG5cbiAgbW92ZVRvKHBsYXllcikge1xuICAgIGlmICh0aGlzLmFsaXZlKSB7XG4gICAgICBsZXQgbGVmdFNpZGUgPSB0aGlzLnNjYWxlLnggPiAwO1xuICAgICAgbGV0IG9mZnNldCA9IGxlZnRTaWRlID8gLXRoaXMub2ZmWCA6IHRoaXMub2ZmWDtcblxuICAgICAgaWYgKHBsYXllci54IC0gMjAgKyBvZmZzZXQgPiB0aGlzLngpIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgICB9IGVsc2UgaWYgKHBsYXllci54ICsgMjAgKyBvZmZzZXQgPCB0aGlzLngpIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAocGxheWVyLnkgLSAyODAgKyB0aGlzLm9mZlkgPCB0aGlzLnkpIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtdGhpcy52ZWxZO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIueSAtIDMyMCArIHRoaXMub2ZmWSA+IHRoaXMueSkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IHRoaXMudmVsWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAzMDA7XG4gICAgfVxuICB9XG5cbiAgc2hvb3QoKSB7XG4gICAgdGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXS5maXJlKHRoaXMpO1xuICB9XG5cbiAgY2hlY2tDb2xsaXNpb24ocGxheWVyKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMud2VhcG9uc1t0aGlzLmFjdGl2ZVdlYXBvbl0sIHBsYXllcixcbiAgICAgIHBsYXllci50YWtlRGFtYWdlLCBudWxsLCB0aGlzKTtcbiAgfVxufVxuIiwiY2xhc3MgQXJ0aWZhY3QgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHgsIHksIGFzc2V0fSkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuYnVsbGV0RGVsYXkgPSAyMDA7XG4gICAgdGhpcy5sYXN0QnVsbGV0ID0gMDtcbiAgICB0aGlzLmFjdGl2ZVdlYXBvbiA9IDA7XG4gICAgdGhpcy5hbGl2ZSA9IHRydWU7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oNCk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZmxvYXRpbmcnLCBbMCwgMSwgMiwgM10sIHRydWUpO1xuXG4gICAgLy8gUGh5c2ljc1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuXG4gICAgdGhpcy5pbml0V2VhcG9ucygpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdmbG9hdGluZycsIDQsIHRydWUpO1xuICB9XG5cbiAgaW5pdFdlYXBvbnMoKSB7XG4gICAgdGhpcy53ZWFwb25zID0gW107XG4gICAgdGhpcy53ZWFwb25zLnB1c2gobmV3IFNpbmdsZUJ1bGxldCh0aGlzLmdhbWUpKTtcbiAgICB0aGlzLndlYXBvbnMucHVzaChuZXcgTGFzZXJCZWFtKHRoaXMuZ2FtZSkpO1xuICB9XG5cbiAgbW92ZVRvKHBsYXllcikge1xuICAgIGlmICh0aGlzLmFsaXZlKSB7XG4gICAgICBpZiAocGxheWVyLnggLSAyMCA+IHRoaXMueCkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDIwMDtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyLnggKyAyMCA8IHRoaXMueCkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0yMDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChwbGF5ZXIueSAtIDI4MCA8IHRoaXMueSkge1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC00MDA7XG4gICAgICB9IGVsc2UgaWYgKHBsYXllci55IC0gMzIwID4gdGhpcy55KSB7XG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gNDAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IDQwMDtcbiAgICB9XG4gIH1cblxuICBzaG9vdChwbGF5ZXIpIHtcbiAgICB0aGlzLndlYXBvbnNbdGhpcy5hY3RpdmVXZWFwb25dLmZpcmUodGhpcyk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihwbGF5ZXIpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy53ZWFwb25zW3RoaXMuYWN0aXZlV2VhcG9uXSwgcGxheWVyLFxuICAgICAgcGxheWVyLnRha2VEYW1hZ2UsIG51bGwsIHRoaXMpO1xuICB9XG59XG4iLCJjbGFzcyBCdWxsZXQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCAwLCAwLCBhc3NldCk7XG5cbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcbiAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXN0cyA9IGZhbHNlO1xuICB9XG5cbiAgZmlyZSh4LCB5LCBhbmdsZSwgc3BlZWQsIGd4LCBneSkge1xuICAgIGd4ID0gZ3ggfHwgMDtcbiAgICBneSA9IGd5IHx8IDA7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHkpO1xuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xuXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbUFuZ2xlKGFuZ2xlLCBzcGVlZCxcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eSk7XG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkuc2V0KGd4LCBneSk7XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kZWF0aEFuaW1hdGlvblBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcbiAgICB0aGlzLnNmID0gMztcbiAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMCwgMV0sIHRydWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsIFs1LCA2LCA3LCA4XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGVhdGgnLCBbMTAsIDExLCAxMiwgMTMsIDE0XSwgdHJ1ZSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC40KTtcbiAgICB0aGlzLnNjYWxlLnNldFRvKC10aGlzLnNmLCB0aGlzLnNmKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuc2V0U2l6ZSgxNiwgMzAsIDIsIDEpO1xuXG4gICAgdGhpcy5qdW1wU291bmQgPSBnYW1lLmFkZC5hdWRpbygnanVtcCcsIDAuMDUpO1xuXG4gICAgdGhpcy53ZWFwb24gPSBuZXcgU2luZ2xlQnVsbGV0KHRoaXMuZ2FtZSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmZsYXNoaW5nICYmIHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuZmxhc2hUaW1lcikge1xuICAgICAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmZmY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy52ZWxYO1xuICAgIHRoaXMuc2NhbGUueCA9IHRoaXMuc2Y7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gICAgdGhpcy5zY2FsZS54ID0gLXRoaXMuc2Y7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEyMDA7XG4gICAgICB0aGlzLmp1bXBTb3VuZC5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgZmxhc2goKSB7XG4gICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgdGhpcy5mbGFzaFRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcbiAgICB0aGlzLnRpbnQgPSAweGZmODA4MDgwO1xuICB9XG5cbiAgdGFrZURhbWFnZShwbGF5ZXIsIGJ1bGxldCkge1xuICAgIGJ1bGxldC5raWxsKCk7XG5cbiAgICBpZiAoIXBsYXllci5mbGFzaGluZykge1xuICAgICAgcGxheWVyLmZsYXNoKCk7XG4gICAgICBwbGF5ZXIuaGVhbHRoIC09IDEwO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgTGFzZXJCZWFtIHtcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5uZXh0RmlyZSA9IDA7XG4gICAgdGhpcy5idWxsZXRTcGVlZCA9IDEwMDA7XG4gICAgdGhpcy5maXJlUmF0ZSA9IDIwO1xuICB9XG5cbiAgZmlyZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICB0aGlzLm5leHRGaXJlID0gdGhpcy5nYW1lLnRpbWUudGltZSArIHRoaXMuZmlyZVJhdGU7XG4gIH1cbn1cbiIsImNsYXNzIFNpbmdsZUJ1bGxldCBleHRlbmRzIFBoYXNlci5Hcm91cCB7XG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcbiAgICBzdXBlcihnYW1lLCBnYW1lLndvcmxkLCAnU2luZ2xlIEJ1bGxldCcsIGZhbHNlLCB0cnVlLFxuICAgICAgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuXG4gICAgdGhpcy5uZXh0RmlyZSA9IDA7XG4gICAgdGhpcy5idWxsZXRTcGVlZCA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoNzAwLCA5MDApO1xuICAgIHRoaXMuZmlyZVJhdGUgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDkwMCwgMTEwMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkKG5ldyBCdWxsZXQoZ2FtZSwgJ2J1bGxldCcpLCB0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNob290ID0gdGhpcy5nYW1lLmFkZC5hdWRpbygnc2hvb3QnLCAwLjA1KTtcbiAgfVxuXG4gIGZpcmUoc291cmNlKSB7XG4gICAgaWYgKHRoaXMuZ2FtZS50aW1lLnRpbWUgPCB0aGlzLm5leHRGaXJlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHggPSBzb3VyY2UueDtcbiAgICBsZXQgeSA9IHNvdXJjZS55O1xuXG4gICAgdGhpc1xuICAgICAgLmdldEZpcnN0RXhpc3RzKGZhbHNlKVxuICAgICAgLmZpcmUoeCwgeSwgOTAsIHRoaXMuYnVsbGV0U3BlZWQsIDAsIDApO1xuICAgIHRoaXMuc2hvb3QucGxheSgpO1xuXG4gICAgdGhpcy5uZXh0RmlyZSA9IHRoaXMuZ2FtZS50aW1lLnRpbWUgKyB0aGlzLmZpcmVSYXRlO1xuICB9XG5cbiAgZmlyZVRvUG9pbnRlcihzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5nYW1lLnRpbWUudGltZSA8IHRoaXMubmV4dEZpcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9IHNvdXJjZS54O1xuICAgIGxldCB5ID0gc291cmNlLnk7XG5cbiAgICBsZXQgYnVsbGV0ID0gdGhpcy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgaWYgKGJ1bGxldCkge1xuICAgICAgYnVsbGV0LnJlc2V0KHgsIHkpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb1BvaW50ZXIoYnVsbGV0LCAxNDAwKTtcbiAgICAgIHRoaXMuc2hvb3QucGxheSgpO1xuICAgIH1cblxuICAgIHRoaXMubmV4dEZpcmUgPSB0aGlzLmdhbWUudGltZS50aW1lICsgdGhpcy5maXJlUmF0ZTtcbiAgfVxufVxuIiwiY2xhc3MgSHVkIHtcbiAgY29uc3RydWN0b3Ioe2dhbWUsIHBsYXllcn0pIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuXG4gICAgdGhpcy5ocCA9IHRoaXMuZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdIUDogMTAwJywge2ZpbGw6ICcjZmZmJ30pO1xuICAgIHRoaXMuaHAuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5ocC5zZXRUZXh0KCdIUDogJyArIHRoaXMucGxheWVyLmhlYWx0aCk7XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IGdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnYmFja2dyb3VuZCcpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zY2FsZS5zZXRUbygyKTtcblxuICAgIC8vIE1hcFxuICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgIHRoaXMuaW5pdFBsYXRmb3JtcygpO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDMwMCxcbiAgICAgIGFzc2V0OiAncGxheWVyJ1xuICAgIH07XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllckNvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBBcnRpZmFjdFxuICAgIGxldCBhcnRpZmFjdENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDEwMDAsXG4gICAgICBhc3NldDogJ2FydGlmYWN0J1xuICAgIH07XG4gICAgdGhpcy5hcnRpZmFjdCA9IG5ldyBBcnRpZmFjdChhcnRpZmFjdENvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLmFydGlmYWN0KTtcblxuICAgIGxldCBhcnRpZmFjdE1vZHVsZUNvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICB4OiBnYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB5OiBnYW1lLndvcmxkLmhlaWdodCAtIDExMDAsXG4gICAgICBhc3NldDogJ2FydGlmYWN0LW1vZHVsZSdcbiAgICB9O1xuICAgIHRoaXMuYXJ0aWZhY3RMZWZ0TW9kdWxlID0gbmV3IEFydGlmYWN0TW9kdWxlKGFydGlmYWN0TW9kdWxlQ29uZmlnKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUgPSBuZXcgQXJ0aWZhY3RNb2R1bGUoYXJ0aWZhY3RNb2R1bGVDb25maWcpO1xuICAgIHRoaXMuYXJ0aWZhY3RSaWdodE1vZHVsZS5zY2FsZS54ID0gLTQ7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLmFydGlmYWN0TGVmdE1vZHVsZSk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUpO1xuXG4gICAgLy8gSFVEXG4gICAgbGV0IGh1ZENvbmZpZyA9IHtcbiAgICAgIGdhbWU6IGdhbWUsXG4gICAgICBwbGF5ZXI6IHRoaXMucGxheWVyXG4gICAgfTtcbiAgICB0aGlzLmh1ZCA9IG5ldyBIdWQoaHVkQ29uZmlnKTtcblxuICAgIC8vIENhbWVyYVxuICAgIGdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBQaHlzaWNzIGVuZ2luZVxuICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuVElMRV9CSUFTID0gNjQ7XG5cbiAgICAvLyBDb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSB7XG4gICAgICBsZWZ0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQSksXG4gICAgICByaWdodDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxuICAgICAgZG93bjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxuICAgICAgc3BhY2ViYXI6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUiksXG4gICAgICBlbnRlcjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkVOVEVSKVxuICAgIH07XG4gIH1cblxuICBpbml0TWFwKCkge1xuICAgIC8vIE1hcFxuICAgIHRoaXMubWFwID0gZ2FtZS5hZGQudGlsZW1hcCgnbWFwJyk7XG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlcycsICd0aWxlcycpO1xuXG4gICAgLy8gTGF5ZXJzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKDApO1xuICAgIHRoaXMubGF5ZXIuc2V0U2NhbGUoMik7XG4gICAgdGhpcy5sYXllci5yZXNpemVXb3JsZCgpO1xuXG4gICAgLy8gQ29sbGlzaW9uc1xuICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJldHdlZW4oMSwgNCk7XG4gIH1cblxuICBpbml0UGxhdGZvcm1zKCkge1xuICAgIHRoaXMucGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3JtcyA9IGdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0b3JzID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLmFjdGl2YXRvcnMuZW5hYmxlQm9keSA9IHRydWU7XG5cbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTEsICdwbGF0Zm9ybScsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxMCwgJ3BsYXRmb3JtLWxlZnQnLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMucGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMTIsICdwbGF0Zm9ybS1yaWdodCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5wbGF0Zm9ybXMpO1xuXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDE5LCAnbW92aW5nLXBsYXRmb3JtJywgMCwgdHJ1ZSxcbiAgICAgIGZhbHNlLCB0aGlzLm1vdmluZ1BsYXRmb3Jtcyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsIDE4LCAnbW92aW5nLXBsYXRmb3JtLWxlZnQnLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMubW92aW5nUGxhdGZvcm1zKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJywgMjAsICdtb3ZpbmctcGxhdGZvcm0tcmlnaHQnLCAwLCB0cnVlLFxuICAgICAgZmFsc2UsIHRoaXMubW92aW5nUGxhdGZvcm1zKTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLCAxNywgJ2FjdGl2YXRlZCcsIDAsIHRydWUsXG4gICAgICBmYWxzZSwgdGhpcy5hY3RpdmF0b3JzKTtcblxuICAgIHRoaXMucGxhdGZvcm1zLnNjYWxlLnNldFRvKDIpO1xuICAgIHRoaXMucGxhdGZvcm1zLnNldEFsbCgnYm9keS5pbW1vdmFibGUnLCB0cnVlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24uZG93bicsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCcsIGZhbHNlKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQnLCBmYWxzZSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIHBsYXRmb3JtLmJvZHkuc2V0U2l6ZSgzMiwgOCwgMCwgMik7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zY2FsZS5zZXRUbygyKTtcbiAgICB0aGlzLm1vdmluZ1BsYXRmb3Jtcy5zZXRBbGwoJ2JvZHkuaW1tb3ZhYmxlJywgdHJ1ZSk7XG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24nLCBmYWxzZSk7XG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLmxlZnQnLCBmYWxzZSk7XG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuc2V0QWxsKCdib2R5LmNoZWNrQ29sbGlzaW9uLnJpZ2h0JywgZmFsc2UpO1xuICAgIHRoaXMubW92aW5nUGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICBwbGF0Zm9ybS5ib2R5LnNldFNpemUoMzIsIDgsIDAsIDIpO1xuICAgICAgcGxhdGZvcm0ub3JpZ2luWSA9IHBsYXRmb3JtLnk7XG4gICAgICBwbGF0Zm9ybS5tb3ZpbmdEb3duID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZhdG9ycy5zY2FsZS5zZXRUbygyKTtcbiAgICB0aGlzLmFjdGl2YXRvcnMuc2V0QWxsKCdib2R5LmltbW92YWJsZScsIHRydWUpO1xuICAgIHRoaXMuYWN0aXZhdG9ycy5zZXRBbGwoJ2FjdGl2YXRlZCcsIHRydWUpO1xuXG4gICAgdGhpcy53aW5uZXIgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ3dpbm5lcicpO1xuICAgIHRoaXMuZ2FtZW92ZXIgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ2dhbWVvdmVyJyk7XG4gICAgdGhpcy53aW5uZXIuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG4gICAgdGhpcy5nYW1lb3Zlci5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgICB0aGlzLndpbm5lci52aXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5nYW1lb3Zlci52aXNpYmxlID0gZmFsc2U7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcbiAgICB0aGlzLnBsYXllci5zdG9wKCk7XG5cbiAgICB0aGlzLmFydGlmYWN0Lm1vdmVUbyh0aGlzLnBsYXllcik7XG4gICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcbiAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUubW92ZVRvKHRoaXMucGxheWVyKTtcblxuICAgIHRoaXMuYWN0aXZhdG9ycy5mb3JFYWNoKChhY3RpdmF0b3IpID0+IHtcbiAgICAgIGlmIChhY3RpdmF0b3IuZGVhY3RpdmF0ZWQpIHtcbiAgICAgICAgdGhpcy5hcnRpZmFjdC5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuYWxpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53aW5uZXIudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMud29uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghdGhpcy5jb250cm9scy5kb3duLmlzRG93biB8fCAhdGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLm1vdmluZ1BsYXRmb3Jtcyk7XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZpbmdQbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIGlmIChwbGF0Zm9ybS5tb3ZpbmdEb3duKSB7XG4gICAgICAgIHBsYXRmb3JtLmJvZHkudmVsb2NpdHkueSA9IDUwO1xuXG4gICAgICAgIGlmIChwbGF0Zm9ybS55ID4gcGxhdGZvcm0ub3JpZ2luWSArIDMyKSB7XG4gICAgICAgICAgcGxhdGZvcm0ubW92aW5nRG93biA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF0Zm9ybS5ib2R5LnZlbG9jaXR5LnkgPSAtNTA7XG5cbiAgICAgICAgaWYgKHBsYXRmb3JtLnkgPCBwbGF0Zm9ybS5vcmlnaW5ZIC0gMzIpIHtcbiAgICAgICAgICBwbGF0Zm9ybS5tb3ZpbmdEb3duID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGxheWVyLmFsaXZlICYmICF0aGlzLndvbikge1xuICAgICAgdGhpcy5hcnRpZmFjdC5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0TGVmdE1vZHVsZS5jaGVja0NvbGxpc2lvbih0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLmFydGlmYWN0UmlnaHRNb2R1bGUuY2hlY2tDb2xsaXNpb24odGhpcy5wbGF5ZXIpO1xuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5sZWZ0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250cm9scy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnNwYWNlYmFyLmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJ0aWZhY3Quc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdExlZnRNb2R1bGUuc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5hcnRpZmFjdFJpZ2h0TW9kdWxlLnNob290KHRoaXMucGxheWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29udHJvbHMuZW50ZXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMud29uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncGxheScpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmh1ZC51cGRhdGUoKTtcblxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmFjdGl2YXRvcnMsIHRoaXMud2luKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duIHx8IHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncnVuJywgMTIsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wbGF5ZXIuZGVhdGhBbmltYXRpb25QbGF5ZWQpIHtcbiAgICAgIHRoaXMucGxheWVyLmRlYXRoQW5pbWF0aW9uUGxheWVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnZGVhdGgnLCAxMiwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhbWVvdmVyLnZpc2libGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHdpbihwbGF5ZXIsIGFjdGl2YXRvcikge1xuICAgIGFjdGl2YXRvci5kZWFjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdG9yLmxvYWRUZXh0dXJlKCdkZWFjdGl2YXRlZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIC8vIFNwcml0ZXNcbiAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsICcvYXNzZXRzL2VudGl0aWVzL3BsYXllci9wbGF5ZXIucG5nJywgMzQsIDMxKTtcbiAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2FydGlmYWN0JywgJy9hc3NldHMvZW50aXRpZXMvYXJ0aWZhY3QvYXJ0aWZhY3QucG5nJywgNDEsIDM0KTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2FydGlmYWN0LW1vZHVsZScsICcvYXNzZXRzL2VudGl0aWVzL2FydGlmYWN0L2FydGlmYWN0LW1vZHVsZS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1bGxldCcsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldHMvYnVsbGV0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYmVhbScsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldHMvYmVhbS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsICcvYXNzZXRzL2JhY2tncm91bmQucG5nJyk7XG5cbiAgICAvLyBNYXBcbiAgICBnYW1lLmxvYWQudGlsZW1hcCgnbWFwJywgJy9hc3NldHMvbWFwL21hcC5qc29uJywgbnVsbCxcbiAgICAgIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIGdhbWUubG9hZC5pbWFnZSgndGlsZXMnLCAnL2Fzc2V0cy9tYXAvdGlsZXMucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICcvYXNzZXRzL3BsYXRmb3Jtcy9wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLWxlZnQnLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0tbGVmdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtLXJpZ2h0JywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLXJpZ2h0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnbW92aW5nLXBsYXRmb3JtLXJpZ2h0JywgJy9hc3NldHMvcGxhdGZvcm1zL21vdmluZy1wbGF0Zm9ybS1yaWdodC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ21vdmluZy1wbGF0Zm9ybS1sZWZ0JywgJy9hc3NldHMvcGxhdGZvcm1zL21vdmluZy1wbGF0Zm9ybS1sZWZ0LnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnbW92aW5nLXBsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL21vdmluZy1wbGF0Zm9ybS5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2FjdGl2YXRlZCcsICcvYXNzZXRzL29iamVjdHMvYWN0aXZhdG9yLWFjdGl2YXRlZC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2RlYWN0aXZhdGVkJywgJy9hc3NldHMvb2JqZWN0cy9hY3RpdmF0b3ItZGVhY3RpdmF0ZWQucG5nJyk7XG5cbiAgICAvLyBIVURcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2F2YXRhcicsICcvYXNzZXRzL2h1ZC9hdmF0YXIucG5nJyk7XG4gICAgZ2FtZS5sb2FkLmltYWdlKCd3aW5uZXInLCAnL2Fzc2V0cy9zY3JlZW5zL3dpbm5lci5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2dhbWVvdmVyJywgJy9hc3NldHMvc2NyZWVucy9nYW1lb3Zlci5wbmcnKTtcblxuICAgIC8vIEF1ZGlvXG4gICAgZ2FtZS5sb2FkLmF1ZGlvKCdqdW1wJywgJy9hc3NldHMvc291bmRzL2p1bXAud2F2Jyk7XG4gICAgZ2FtZS5sb2FkLmF1ZGlvKCdzaG9vdCcsICcvYXNzZXRzL3NvdW5kcy9zaG9vdC53YXYnKTtcblxuICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICB9XG5cbiAgbG9hZFN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZGluZy4uLicpO1xuICB9XG5cbiAgZmlsZUNvbXBsZXRlKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0ZpbGUgQ29tcGxldGU6ICcgKyBwcm9ncmVzcyArICclIC0gJ1xuICAgICAgKyB0b3RhbExvYWRlZCArICcgb3V0IG9mICcgKyB0b3RhbEZpbGVzKTtcbiAgfVxuXG4gIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWQgQ29tcGxldGUnKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XG4gIH1cbn1cbiIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEyODAsIDcyMCwgUGhhc2VyLkFVVE8sICdnYW1lJywgbnVsbCwgZmFsc2UsIGZhbHNlKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
