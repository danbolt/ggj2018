var PushBlock = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 5);
  this.anchor.set(0.5, 0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
PushBlock.prototype = Object.create(Phaser.Sprite.prototype);
PushBlock.prototype.constructor = PushBlock;
