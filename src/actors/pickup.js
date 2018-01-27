var Pickup = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 6);
  this.anchor.set(0.5, 0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
Pickup.prototype = Object.create(Phaser.Sprite.prototype);
Pickup.prototype.constructor = Pickup;
Pickup.prototype.onCollected = function (game, player) {
  this.destroy();
};