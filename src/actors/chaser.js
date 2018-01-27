var Chaser = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 7);
};
Chaser.prototype = Object.create(Phaser.Sprite.prototype);
Chaser.prototype.constructor = Chaser;
Chaser.prototype.update = function () {
};
