var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 4);
  this.anchor.set(0.5, 0.5);
  this.speed = 0.2;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.y -= this.game.time.elapsed * this.speed;
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.y += this.game.time.elapsed * this.speed;
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    this.x -= this.game.time.elapsed * this.speed;
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.x += this.game.time.elapsed * this.speed;
  }
};
