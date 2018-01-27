var PushBlock = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 5);
  this.anchor.set(0.5, 0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
PushBlock.prototype = Object.create(Phaser.Sprite.prototype);
PushBlock.prototype.constructor = PushBlock;
PushBlock.prototype.pushedFrom = function(x, y) {
  if (x < this.x - this.width / 2) {
    console.log("pushed right");
  } else if (x > this.x + this.width / 2) {
    console.log("pushed left");
  } else if (y < this.y - this.height / 2) {
    console.log("pushed down");
  } else if (y > this.y + this.height / 2) {
    console.log("pushed up");
  }
};