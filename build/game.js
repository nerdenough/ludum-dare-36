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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllci5qcyIsImJvb3QuanMiLCJwbGF5LmpzIiwicHJlbG9hZC5qcyIsImdhbWUuanMiXSwibmFtZXMiOlsiUGxheWVyIiwiZ2FtZSIsIngiLCJ5IiwiYXNzZXQiLCJ2ZWxYIiwiYW5jaG9yIiwic2V0VG8iLCJzY2FsZSIsInBoeXNpY3MiLCJlbmFibGUiLCJQaGFzZXIiLCJQaHlzaWNzIiwiQVJDQURFIiwiYm9keSIsImdyYXZpdHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJ2ZWxvY2l0eSIsInRvdWNoaW5nIiwiZG93biIsIm9uRmxvb3IiLCJTcHJpdGUiLCJCb290Iiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdGF0ZSIsInN0YXJ0IiwiUGxheSIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJwbGF5ZXIiLCJhZGQiLCJleGlzdGluZyIsImNhbWVyYSIsImZvbGxvdyIsInN0YXJ0U3lzdGVtIiwiY29udHJvbHMiLCJsZWZ0IiwiaW5wdXQiLCJrZXlib2FyZCIsImFkZEtleSIsIktleWJvYXJkIiwiQSIsInJpZ2h0IiwiRCIsIlMiLCJzcGFjZWJhciIsIlNQQUNFQkFSIiwic3RvcCIsImlzRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwianVtcCIsIlByZWxvYWQiLCJsb2FkIiwib25Mb2FkU3RhcnQiLCJsb2FkU3RhcnQiLCJvbkZpbGVDb21wbGV0ZSIsImZpbGVDb21wbGV0ZSIsIm9uTG9hZENvbXBsZXRlIiwibG9hZENvbXBsZXRlIiwibG9hZGluZ1RleHQiLCJ0ZXh0IiwiZmlsbCIsImltYWdlIiwic2V0VGV4dCIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiR2FtZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUE7OztBQUNKLGtCQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLEtBQXhCLEVBQStCO0FBQUE7O0FB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O0FDekJILElBQUl6QixPQUFPLElBQUlVLE9BQU82RCxJQUFYLENBQWdCLElBQWhCLEVBQXNCLEdBQXRCLEVBQTJCN0QsT0FBTzhELElBQWxDLEVBQXdDLE1BQXhDLEVBQWdELElBQWhELEVBQXNELEtBQXRELEVBQTZELEtBQTdELENBQVg7O0FBRUF4RSxLQUFLd0IsS0FBTCxDQUFXTyxHQUFYLENBQWUsTUFBZixFQUF1QlYsSUFBdkI7QUFDQXJCLEtBQUt3QixLQUFMLENBQVdPLEdBQVgsQ0FBZSxTQUFmLEVBQTBCc0IsT0FBMUI7QUFDQXJELEtBQUt3QixLQUFMLENBQVdPLEdBQVgsQ0FBZSxNQUFmLEVBQXVCTCxJQUF2Qjs7QUFFQTFCLEtBQUt3QixLQUFMLENBQVdDLEtBQVgsQ0FBaUIsTUFBakIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBhc3NldCkge1xuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMudmVsWCA9IDUwMDtcblxuICAgIC8vIFNwcml0ZVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XG4gICAgdGhpcy5zY2FsZS5zZXRUbygxKTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNDAwMDtcbiAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMudmVsWDtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMudmVsWDtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICB9XG5cbiAganVtcCgpIHtcbiAgICBpZiAodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5Lm9uRmxvb3IoKSkge1xuICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTIwMDtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIEJvb3Qge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuICB9XG59XG4iLCJjbGFzcyBQbGF5IHtcbiAgY3JlYXRlKCkge1xuICAgIC8vIFBsYXllclxuICAgIGxldCB4ID0gZ2FtZS53b3JsZC5jZW50ZXJYO1xuICAgIGxldCB5ID0gZ2FtZS53b3JsZC5jZW50ZXJZO1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihnYW1lLCB4LCB5LCAncGxheWVyJyk7XG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICAvLyBDYW1lcmFcbiAgICBnYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy8gUGh5c2ljcyBlbmdpbmVcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgIC8vIENvbnRyb2xzXG4gICAgdGhpcy5jb250cm9scyA9IHtcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BKSxcbiAgICAgIHJpZ2h0OiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuRCksXG4gICAgICBkb3duOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuUyksXG4gICAgICBzcGFjZWJhcjogdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKVxuICAgIH07XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuXG4gICAgaWYgKHRoaXMuY29udHJvbHMubGVmdC5pc0Rvd24pIHtcbiAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udHJvbHMucmlnaHQuaXNEb3duKSB7XG4gICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250cm9scy5zcGFjZWJhci5pc0Rvd24pIHtcbiAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIFByZWxvYWQge1xuICBjcmVhdGUoKSB7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLmxvYWRTdGFydCwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgZ2FtZS5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCh0aGlzLmxvYWRDb21wbGV0ZSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvYWRpbmdUZXh0ID0gZ2FtZS5hZGQudGV4dCgzMiwgMzIsICdMb2FkaW5nLi4uJywge2ZpbGw6ICcjZmZmJ30pO1xuXG4gICAgZ2FtZS5sb2FkLmltYWdlKCdwbGF5ZXInLCAnL2Fzc2V0cy9wbGF5ZXIvcGxheWVyLnBuZycpO1xuXG4gICAgZ2FtZS5sb2FkLnN0YXJ0KCk7XG4gIH1cblxuICBsb2FkU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nVGV4dC5zZXRUZXh0KCdMb2FkaW5nLi4uJyk7XG4gIH1cblxuICBmaWxlQ29tcGxldGUocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnRmlsZSBDb21wbGV0ZTogJyArIHByb2dyZXNzICsgJyUgLSAnXG4gICAgICArIHRvdGFsTG9hZGVkICsgJyBvdXQgb2YgJyArIHRvdGFsRmlsZXMpO1xuICB9XG5cbiAgbG9hZENvbXBsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1RleHQuc2V0VGV4dCgnTG9hZCBDb21wbGV0ZScpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcbiAgfVxufVxuIiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTI4MCwgNzIwLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCBudWxsLCBmYWxzZSwgZmFsc2UpO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdwbGF5JywgUGxheSk7XG5cbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
