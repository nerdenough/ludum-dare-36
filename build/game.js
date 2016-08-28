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
    _this.body.velocity.y = -100;
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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Phaser$Sprite) {
  _inherits(Player, _Phaser$Sprite);

  function Player(game, x, y, asset) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, asset));

    _this.game = game;
    _this.health = 100;
    _this.alive = true;
    _this.velX = 500;

    // Sprite
    _this.anchor.setTo(0.5);
    _this.scale.setTo(1);

    // Physics
    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.gravity.y = 4000;
    _this.body.collideWorldBounds = true;
    return _this;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      if (this.health <= 0) {
        this.alive = false;
      }
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.body.velocity.x = -this.velX;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.body.velocity.x = this.velX;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.body.velocity.x = 0;
    }
  }, {
    key: "jump",
    value: function jump() {
      if (this.body.touching.down || this.body.onFloor()) {
        this.body.velocity.y = -1200;
      }
    }
  }]);

  return Player;
}(Phaser.Sprite);
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
      // Platforms
      this.platform = new Platform(game, game.world.centerX, 600, 'platform');
      this.game.add.existing(this.platform);

      // Player
      var x = game.world.centerX;
      var y = game.world.centerY;
      this.player = new Player(game, x, y, 'player');
      this.game.add.existing(this.player);

      // Artifact
      var artifactConfig = {
        game: game,
        x: game.world.centerX,
        y: 40,
        asset: 'artifact'
      };
      this.artifact = new Artifact(artifactConfig);
      this.game.add.existing(this.artifact);

      // Camera
      game.camera.follow(this.player);

      // Physics engine
      game.physics.startSystem(Phaser.Physics.ARCADE);

      // Controls
      this.controls = {
        left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.input.keyboard.addKey(Phaser.Keyboard.D),
        down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      };
    }
  }, {
    key: 'update',
    value: function update() {
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
    key: 'damagePlayer',
    value: function damagePlayer() {
      this.player.health -= 2;
      console.log(this.player.health);
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

      game.load.image('player', '/assets/entities/player.png');
      game.load.image('artifact', '/assets/entities/artifact.png');
      game.load.image('bullet', '/assets/entities/bullet.png');
      game.load.image('platform', '/assets/platforms/platform.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwiYXJ0aWZhY3QuanMiLCJwbGF5ZXIuanMiLCJib290LmpzIiwicGxheS5qcyIsInByZWxvYWQuanMiLCJnYW1lLmpzIl0sIm5hbWVzIjpbIlBsYXRmb3JtIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJhbmNob3IiLCJzZXRUbyIsInNjYWxlIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJib2R5IiwiY2hlY2tDb2xsaXNpb24iLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiaW1tb3ZhYmxlIiwiU3ByaXRlIiwiQXJ0aWZhY3QiLCJidWxsZXREZWxheSIsImxhc3RCdWxsZXQiLCJjcmVhdGVCdWxsZXRzIiwidmVsb2NpdHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJidWxsZXRzIiwiYWRkIiwiZ3JvdXAiLCJlbmFibGVCb2R5IiwicGh5c2ljc0JvZHlUeXBlIiwiY3JlYXRlTXVsdGlwbGUiLCJzZXRBbGwiLCJwbGF5ZXIiLCJidWxsZXQiLCJnZXRGaXJzdEV4aXN0cyIsInJlc2V0IiwiYXJjYWRlIiwibW92ZVRvT2JqZWN0IiwiUGxheWVyIiwiaGVhbHRoIiwiYWxpdmUiLCJ2ZWxYIiwiZ3Jhdml0eSIsInRvdWNoaW5nIiwib25GbG9vciIsIkJvb3QiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsInN0YXRlIiwic3RhcnQiLCJQbGF5IiwicGxhdGZvcm0iLCJ3b3JsZCIsImNlbnRlclgiLCJleGlzdGluZyIsImNlbnRlclkiLCJhcnRpZmFjdENvbmZpZyIsImFydGlmYWN0IiwiY2FtZXJhIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJjb250cm9scyIsImlucHV0Iiwia2V5Ym9hcmQiLCJhZGRLZXkiLCJLZXlib2FyZCIsIkEiLCJEIiwiUyIsInNwYWNlYmFyIiwiU1BBQ0VCQVIiLCJzdG9wIiwiY29sbGlkZSIsIm92ZXJsYXAiLCJkYW1hZ2VQbGF5ZXIiLCJpc0Rvd24iLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImp1bXAiLCJ0aW1lIiwibm93Iiwic2hvb3QiLCJjb25zb2xlIiwibG9nIiwiUHJlbG9hZCIsImxvYWQiLCJvbkxvYWRTdGFydCIsImxvYWRTdGFydCIsIm9uRmlsZUNvbXBsZXRlIiwiZmlsZUNvbXBsZXRlIiwib25Mb2FkQ29tcGxldGUiLCJsb2FkQ29tcGxldGUiLCJsb2FkaW5nVGV4dCIsInRleHQiLCJmaWxsIiwiaW1hZ2UiLCJzZXRUZXh0IiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJHYW1lIiwiQVVUTyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUE7OztBQUNKLG9CQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLEtBQXhCLEVBQStCO0FBQUE7O0FBQUEsb0hBQ3ZCSCxJQUR1QixFQUNqQkMsQ0FEaUIsRUFDZEMsQ0FEYyxFQUNYQyxLQURXOztBQUU3QixVQUFLSCxJQUFMLEdBQVlBLElBQVo7O0FBRUE7QUFDQSxVQUFLSSxNQUFMLENBQVlDLEtBQVosQ0FBa0IsR0FBbEI7QUFDQSxVQUFLQyxLQUFMLENBQVdELEtBQVgsQ0FBaUIsQ0FBakI7O0FBRUE7QUFDQSxVQUFLTCxJQUFMLENBQVVPLE9BQVYsQ0FBa0JDLE1BQWxCLFFBQStCQyxPQUFPQyxPQUFQLENBQWVDLE1BQTlDO0FBQ0EsVUFBS0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCQyxJQUF6QixHQUFnQyxLQUFoQztBQUNBLFVBQUtGLElBQUwsQ0FBVUMsY0FBVixDQUF5QkUsSUFBekIsR0FBZ0MsS0FBaEM7QUFDQSxVQUFLSCxJQUFMLENBQVVDLGNBQVYsQ0FBeUJHLEtBQXpCLEdBQWlDLEtBQWpDO0FBQ0EsVUFBS0osSUFBTCxDQUFVSyxTQUFWLEdBQXNCLElBQXRCO0FBYjZCO0FBYzlCOzs7RUFmb0JSLE9BQU9TOzs7Ozs7Ozs7OztJQ0F4QkM7OztBQUNKLDBCQUFpQztBQUFBLFFBQXBCbkIsSUFBb0IsUUFBcEJB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akQsT0FBTyxJQUFJUyxPQUFPNkYsSUFBWCxDQUFnQixJQUFoQixFQUFzQixHQUF0QixFQUEyQjdGLE9BQU84RixJQUFsQyxFQUF3QyxNQUF4QyxFQUFnRCxJQUFoRCxFQUFzRCxLQUF0RCxFQUE2RCxLQUE3RCxDQUFYOztBQUVBdkcsS0FBS2dELEtBQUwsQ0FBV3RCLEdBQVgsQ0FBZSxNQUFmLEVBQXVCbUIsSUFBdkI7QUFDQTdDLEtBQUtnRCxLQUFMLENBQVd0QixHQUFYLENBQWUsU0FBZixFQUEwQjBELE9BQTFCO0FBQ0FwRixLQUFLZ0QsS0FBTCxDQUFXdEIsR0FBWCxDQUFlLE1BQWYsRUFBdUJ3QixJQUF2Qjs7QUFFQWxELEtBQUtnRCxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBsYXRmb3JtIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGFzc2V0KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG5cbiAgICAvLyBQaHN5aWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24gPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBBcnRpZmFjdCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7Z2FtZSwgeCwgeSwgYXNzZXR9KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5idWxsZXREZWxheSA9IDIwMDtcbiAgICB0aGlzLmxhc3RCdWxsZXQgPSAwO1xuXG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG4gICAgdGhpcy5jcmVhdGVCdWxsZXRzKCk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTAwO1xuICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICB9XG5cbiAgY3JlYXRlQnVsbGV0cygpIHtcbiAgICB0aGlzLmJ1bGxldHMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5idWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMuYnVsbGV0cy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgdGhpcy5idWxsZXRzLmNyZWF0ZU11bHRpcGxlKDMwLCAnYnVsbGV0Jyk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnYW5jaG9yLngnLCAwLjUpO1xuICAgIHRoaXMuYnVsbGV0cy5zZXRBbGwoJ2FuY2hvci55JywgMSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnb3V0T2ZCb3VuZHNLaWxsJywgdHJ1ZSk7XG4gICAgdGhpcy5idWxsZXRzLnNldEFsbCgnY2hlY2tXb3JsZEJvdW5kcycsIHRydWUpO1xuICB9XG5cbiAgc2hvb3QocGxheWVyKSB7XG4gICAgbGV0IGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgaWYgKGJ1bGxldCkge1xuICAgICAgYnVsbGV0LnJlc2V0KHRoaXMuYm9keS54ICsgMzIsIHRoaXMuYm9keS55ICsgMzIpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb09iamVjdChidWxsZXQsIHBsYXllciwgODAwKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTIwMDtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIC8vIFBsYXRmb3Jtc1xuICAgIHRoaXMucGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ2FtZSwgZ2FtZS53b3JsZC5jZW50ZXJYLCA2MDAsICdwbGF0Zm9ybScpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF0Zm9ybSk7XG5cbiAgICAvLyBQbGF5ZXJcbiAgICBsZXQgeCA9IGdhbWUud29ybGQuY2VudGVyWDtcbiAgICBsZXQgeSA9IGdhbWUud29ybGQuY2VudGVyWTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoZ2FtZSwgeCwgeSwgJ3BsYXllcicpO1xuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gQXJ0aWZhY3RcbiAgICBsZXQgYXJ0aWZhY3RDb25maWcgPSB7XG4gICAgICBnYW1lOiBnYW1lLFxuICAgICAgeDogZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgeTogNDAsXG4gICAgICBhc3NldDogJ2FydGlmYWN0J1xuICAgIH07XG4gICAgdGhpcy5hcnRpZmFjdCA9IG5ldyBBcnRpZmFjdChhcnRpZmFjdENvbmZpZyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLmFydGlmYWN0KTtcblxuICAgIC8vIENhbWVyYVxuICAgIGdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBQaHlzaWNzIGVuZ2luZVxuICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnBsYXllci5zdG9wKCk7XG5cbiAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpIHtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybSk7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5hcnRpZmFjdC5idWxsZXRzLCB0aGlzLnBsYXllcixcbiAgICAgICAgdGhpcy5kYW1hZ2VQbGF5ZXIsIG51bGwsIHRoaXMpO1xuXG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29udHJvbHMuc3BhY2ViYXIuaXNEb3duKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuYXJ0aWZhY3QubGFzdEJ1bGxldCkge1xuICAgICAgICB0aGlzLmFydGlmYWN0Lmxhc3RCdWxsZXQgPSB0aGlzLmdhbWUudGltZS5ub3dcbiAgICAgICAgICArIHRoaXMuYXJ0aWZhY3QuYnVsbGV0RGVsYXk7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3Quc2hvb3QodGhpcy5wbGF5ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRhbWFnZVBsYXllcigpIHtcbiAgICB0aGlzLnBsYXllci5oZWFsdGggLT0gMjtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnBsYXllci5oZWFsdGgpO1xuICB9XG59XG4iLCJjbGFzcyBQcmVsb2FkIHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUubG9hZC5vbkxvYWRTdGFydC5hZGQodGhpcy5sb2FkU3RhcnQsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICAgIGdhbWUubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGQodGhpcy5sb2FkQ29tcGxldGUsIHRoaXMpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGV4dCA9IGdhbWUuYWRkLnRleHQoMzIsIDMyLCAnTG9hZGluZy4uLicsIHtmaWxsOiAnI2ZmZid9KTtcblxuICAgIGdhbWUubG9hZC5pbWFnZSgncGxheWVyJywgJy9hc3NldHMvZW50aXRpZXMvcGxheWVyLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgnYXJ0aWZhY3QnLCAnL2Fzc2V0cy9lbnRpdGllcy9hcnRpZmFjdC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1bGxldCcsICcvYXNzZXRzL2VudGl0aWVzL2J1bGxldC5wbmcnKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BsYXRmb3JtJywgJy9hc3NldHMvcGxhdGZvcm1zL3BsYXRmb3JtLnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
