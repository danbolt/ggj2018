var Chaser = function (game, spawnData) {
  Phaser.Sprite.call(this, game, spawnData.x, spawnData.y, 'coloured_squares', 7);
};
Chaser.prototype = Object.create(Phaser.Sprite.prototype);
Chaser.prototype.constructor = Chaser;
Chaser.prototype.update = function () {
};
