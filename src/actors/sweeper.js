var Sweeper = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 7);
};
Sweeper.prototype = Object.create(Phaser.Sprite.prototype);
Sweeper.prototype.constructor = Sweeper;
Sweeper.prototype.update = function () {
};
