var LevelExit = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 1);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.lock();
};
LevelExit.prototype = Object.create(Phaser.Sprite.prototype);
LevelExit.prototype.constructor = LevelExit;
LevelExit.prototype.update = function () {
  //
};
LevelExit.prototype.lock = function () {
  this.data.unlocked = false;
  this.tint = 0xFFFFFF;
};
LevelExit.prototype.unlock = function () {
  this.data.unlocked = true;
  this.tint = 0x000000;
};