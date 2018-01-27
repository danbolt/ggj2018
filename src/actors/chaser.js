var Chaser = function (game, player, spawnData) {
  Phaser.Sprite.call(this, game, spawnData.x, spawnData.y, 'coloured_squares', 7);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.player = player;
  this.moveSpeed = spawnData.properties.speed || 25;
};
Chaser.prototype = Object.create(Phaser.Sprite.prototype);
Chaser.prototype.constructor = Chaser;
Chaser.prototype.update = function () {
  if (Math.abs(this.player.x - this.x) > 4) {
    this.body.velocity.x = (this.player.x > this.x) ? this.moveSpeed : -this.moveSpeed;
    this.body.velocity.y = 0;
  } else {
    this.body.velocity.x = 0;
    this.body.velocity.y = (this.player.y > this.y) ? this.moveSpeed : -this.moveSpeed;
  }
};
