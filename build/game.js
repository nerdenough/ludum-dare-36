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
      game.physics.arcade.collide(this.player, this.platform);

      this.player.stop();

      if (this.controls.left.isDown) {
        this.player.moveLeft();
      }

      if (this.controls.right.isDown) {
        this.player.moveRight();
      }

      if (this.controls.spacebar.isDown) {
        this.player.jump();
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

      game.load.image('player', '/assets/player/player.png');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXRmb3JtLmpzIiwicGxheWVyLmpzIiwiYm9vdC5qcyIsInBsYXkuanMiLCJwcmVsb2FkLmpzIiwiZ2FtZS5qcyJdLCJuYW1lcyI6WyJQbGF0Zm9ybSIsImdhbWUiLCJ4IiwieSIsImFzc2V0IiwiYW5jaG9yIiwic2V0VG8iLCJzY2FsZSIsInBoeXNpY3MiLCJlbmFibGUiLCJQaGFzZXIiLCJQaHlzaWNzIiwiQVJDQURFIiwiYm9keSIsImNoZWNrQ29sbGlzaW9uIiwiZG93biIsImxlZnQiLCJyaWdodCIsImltbW92YWJsZSIsIlNwcml0ZSIsIlBsYXllciIsInZlbFgiLCJncmF2aXR5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwidmVsb2NpdHkiLCJ0b3VjaGluZyIsIm9uRmxvb3IiLCJCb290Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdGF0ZSIsInN0YXJ0IiwiUGxheSIsInBsYXRmb3JtIiwid29ybGQiLCJjZW50ZXJYIiwiYWRkIiwiZXhpc3RpbmciLCJjZW50ZXJZIiwicGxheWVyIiwiY2FtZXJhIiwiZm9sbG93Iiwic3RhcnRTeXN0ZW0iLCJjb250cm9scyIsImlucHV0Iiwia2V5Ym9hcmQiLCJhZGRLZXkiLCJLZXlib2FyZCIsIkEiLCJEIiwiUyIsInNwYWNlYmFyIiwiU1BBQ0VCQVIiLCJhcmNhZGUiLCJjb2xsaWRlIiwic3RvcCIsImlzRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsIlByZWxvYWQiLCJsb2FkIiwib25Mb2FkU3RhcnQiLCJsb2FkU3RhcnQiLCJvbkZpbGVDb21wbGV0ZSIsImZpbGVDb21wbGV0ZSIsIm9uTG9hZENvbXBsZXRlIiwibG9hZENvbXBsZXRlIiwibG9hZGluZ1RleHQiLCJ0ZXh0IiwiZmlsbCIsImltYWdlIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7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QUF6QjtBQUNBdkUsV0FBSzZCLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQjtBQUNEOzs7Ozs7O0FDMUJILElBQUk5QixPQUFPLElBQUlTLE9BQU9vRSxJQUFYLENBQWdCLElBQWhCLEVBQXNCLEdBQXRCLEVBQTJCcEUsT0FBT3FFLElBQWxDLEVBQXdDLE1BQXhDLEVBQWdELElBQWhELEVBQXNELEtBQXRELEVBQTZELEtBQTdELENBQVg7O0FBRUE5RSxLQUFLNkIsS0FBTCxDQUFXTSxHQUFYLENBQWUsTUFBZixFQUF1QlQsSUFBdkI7QUFDQTFCLEtBQUs2QixLQUFMLENBQVdNLEdBQVgsQ0FBZSxTQUFmLEVBQTBCd0IsT0FBMUI7QUFDQTNELEtBQUs2QixLQUFMLENBQVdNLEdBQVgsQ0FBZSxNQUFmLEVBQXVCSixJQUF2Qjs7QUFFQS9CLEtBQUs2QixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBsYXRmb3JtIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGFzc2V0KSB7XG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQpO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG5cbiAgICAvLyBQaHN5aWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24gPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgYXNzZXQpIHtcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLnZlbFggPSA1MDA7XG5cbiAgICAvLyBTcHJpdGVcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xuICAgIHRoaXMuc2NhbGUuc2V0VG8oMSk7XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDQwMDA7XG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnZlbFg7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnZlbFg7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgfVxuXG4gIGp1bXAoKSB7XG4gICAgaWYgKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5vbkZsb29yKCkpIHtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTEyMDA7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBCb290IHtcbiAgY3JlYXRlKCkge1xuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgfVxufVxuIiwiY2xhc3MgUGxheSB7XG4gIGNyZWF0ZSgpIHtcbiAgICAvLyBQbGF0Zm9ybXNcbiAgICB0aGlzLnBsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdhbWUsIGdhbWUud29ybGQuY2VudGVyWCwgNjAwLCAncGxhdGZvcm0nKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxhdGZvcm0pO1xuXG4gICAgLy8gUGxheWVyXG4gICAgbGV0IHggPSBnYW1lLndvcmxkLmNlbnRlclg7XG4gICAgbGV0IHkgPSBnYW1lLndvcmxkLmNlbnRlclk7XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGdhbWUsIHgsIHksICdwbGF5ZXInKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vIENhbWVyYVxuICAgIGdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBQaHlzaWNzIGVuZ2luZVxuICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuXG4gICAgLy8gQ29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0ge1xuICAgICAgbGVmdDogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxuICAgICAgcmlnaHQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcbiAgICAgIGRvd246IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcbiAgICAgIHNwYWNlYmFyOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm0pO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuXG4gICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24pIHtcbiAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF5ZXInLCAnL2Fzc2V0cy9wbGF5ZXIvcGxheWVyLnBuZycpO1xuICAgIGdhbWUubG9hZC5pbWFnZSgncGxhdGZvcm0nLCAnL2Fzc2V0cy9wbGF0Zm9ybXMvcGxhdGZvcm0ucG5nJyk7XG5cbiAgICBnYW1lLmxvYWQuc3RhcnQoKTtcbiAgfVxuXG4gIGxvYWRTdGFydCgpIHtcbiAgICB0aGlzLmxvYWRpbmdUZXh0LnNldFRleHQoJ0xvYWRpbmcuLi4nKTtcbiAgfVxuXG4gIGZpbGVDb21wbGV0ZShwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdGaWxlIENvbXBsZXRlOiAnICsgcHJvZ3Jlc3MgKyAnJSAtICdcbiAgICAgICsgdG90YWxMb2FkZWQgKyAnIG91dCBvZiAnICsgdG90YWxGaWxlcyk7XG4gIH1cblxuICBsb2FkQ29tcGxldGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkIENvbXBsZXRlJyk7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncGxheScpO1xuICB9XG59XG4iLCJsZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMjgwLCA3MjAsIFBoYXNlci5BVVRPLCAnZ2FtZScsIG51bGwsIGZhbHNlLCBmYWxzZSk7XG5cbmdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XG5nYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3BsYXknLCBQbGF5KTtcblxuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
