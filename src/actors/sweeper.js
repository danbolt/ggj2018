var Sweeper = function (game, spawnData) {
  Phaser.Sprite.call(this, game, spawnData.x, spawnData.y, 'coloured_squares', 7);
  this.game = game;
  this.startX = spawnData.x;
  this.destinationX = spawnData.properties.destinationX || this.startX;
  this.speed = spawnData.properties.speed || 1;
};
Sweeper.prototype = Object.create(Phaser.Sprite.prototype);
Sweeper.prototype.constructor = Sweeper;
Sweeper.prototype.update = function () {
	var dx = this.destinationX - this.startX;
	var t = (1 + Math.cos(this.game.time.totalElapsedSeconds() * this.speed)) * 0.5;
	this.x = this.startX + dx * t;
};
