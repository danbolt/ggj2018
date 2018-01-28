var LevelExit = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 40);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.animations.add('open', [40, 41, 42, 43], 10, false);

  this.lock();
  this.tween = null;
};
LevelExit.prototype = Object.create(Phaser.Sprite.prototype);
LevelExit.prototype.constructor = LevelExit;
LevelExit.prototype.lock = function () {
  this.data.unlocked = false;
  this.frame = 40;

  if (this.tween) {
    this.tween.stop();
    this.tween = null;
  }
};
LevelExit.prototype.unlock = function () {
  this.data.unlocked = true;
  this.animations.play('open');

  if (this.tween === null) {
    this.tween = this.game.add.tween(this);
    this.tween.to( { tint: [0xDDDDDD, 0xFFFFFF] }, 500, Phaser.Easing.Cubic.InOut, true, 0, -1);
    this.tween.start();
  }
};