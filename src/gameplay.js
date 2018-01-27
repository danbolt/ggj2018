var Gameplay = function () {
  this.map = null;
  this.foreground = null;
};
Gameplay.prototype.init = function() {
  //
};
Gameplay.prototype.preload = function() {
  //
};
Gameplay.prototype.create = function() {
  this.map = this.game.add.tilemap('sandbox');
  this.map.addTilesetImage('16x16SquareSheet', 'coloured_squares_tiles');
  this.foreground = this.map.createLayer('foreground');

  var text = this.game.add.bitmapText(32, 32, 'newsgeek', 'hello, world!', 16);

  var square = this.game.add.sprite(100, 100, 'coloured_squares', 5);
  square.anchor.set(0.5, 0.5);
  square.update = function () {
    this.rotation += this.game.time.elapsed * 0.0025;
  };

  var t = this.game.add.tween(square.scale);
  t.to({ x: 3, y: 3 }, 1000, Phaser.Easing.Cubic.InOut, false, undefined, -1, true);
  t.start();

  var i = 0;
  this.game.time.events.loop(100, function () {
    text.children[i].tint = 0xFFFFFF * Math.sin(this.game.time.now);

    i = (i + 1) % text.children.length;
  }, this);

};
Gameplay.prototype.update = function () {
  //
};
Gameplay.prototype.shutdown = function () {
  this.map = null;
  this.foreground = null;
};