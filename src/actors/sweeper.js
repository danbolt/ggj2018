var Sweeper = function (game, player, spawnData) {
  Phaser.Sprite.call(this, game, spawnData.x, spawnData.y, 'coloured_squares', 7);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.startX = spawnData.x;
  this.destinationX = spawnData.properties.destinationX || this.startX;
  this.speed = spawnData.properties.speed || 1;
};
Sweeper.prototype = Object.create(Phaser.Sprite.prototype);
Sweeper.prototype.constructor = Sweeper;
Sweeper.prototype.update = function () {
  var dx = this.destinationX - this.startX;
  var t = 1 - (1 + Math.cos(this.game.time.totalElapsedSeconds() * this.speed)) * 0.5;
  this.x = this.startX + dx * t;

  if (this.body) {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
};
Sweeper.prototype.onCollision = function (player) {
  player.kill();
};
