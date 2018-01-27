var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 4);
  this.anchor.set(0.5, 0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
  this.body.velocity.set(0, 0);
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.body.velocity.y = -100;
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.body.velocity.y = 100;
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    this.body.velocity.x = -100;
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.body.velocity.x = 100;
  }
};
