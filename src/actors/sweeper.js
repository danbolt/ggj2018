var Sweeper = function (game, player, spawnData) {
  Phaser.Sprite.call(this, game, spawnData.x, spawnData.y, 'coloured_squares', 28);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.speed = spawnData.properties.speed || 50;

  this.body.velocity.x = this.speed;

  // cosmetic scaling
  var actualSprite = this.game.add.sprite(8, 8, 'coloured_squares', 8);
  actualSprite.anchor.set(0.5);
  this.addChild(actualSprite);
  actualSprite.animations.add('go', [25, 26, 27, 26], 8, true);
  actualSprite.animations.play('go');
  var t = this.game.add.tween(actualSprite.scale);
  t.to( {x: [1.4, 1, 0.6, 1], y: [0.6, 1, 1.4, 1]}, 750, Phaser.Easing.Cubic.InOut, false, undefined, -1);
  t.start();
};
Sweeper.prototype = Object.create(Phaser.Sprite.prototype);
Sweeper.prototype.constructor = Sweeper;
Sweeper.prototype.update = function () {
  if (this.body.blocked.right) {
    this.body.velocity.x = this.speed * -1;
  } else if (this.body.blocked.left) {
    this.body.velocity.x = this.speed;
  }
  this.body.velocity.y = 0;
};
Sweeper.prototype.onCollision = function (player) {
  player.kill();
};
