var Pickup = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 21);
  this.anchor.set(0.5, 0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.animations.add('jiggle', [21, 22, 23], 8, true);
  this.animations.play('jiggle');

  var t = this.game.add.tween(this.scale);
  t.to( {x: [0.5, 1.2, 1.5, 1.0], y: [1.5, 1.2, 0.5, 1.0]}, 500, Phaser.Easing.Linear.None, true, 0, -1);
};
Pickup.prototype = Object.create(Phaser.Sprite.prototype);
Pickup.prototype.constructor = Pickup;
Pickup.prototype.onCollected = function (game, player) {
  this.kill();
};