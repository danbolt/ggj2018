var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player', 1);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(12, 12);
  this.body.offset.set(2, 20);

  this.animations.add('right', [3, 4, 5, 6], 8, true);
  this.animations.add('down', [0, 1, 2, 1], 8, true);
  this.animations.add('left', [11, 12, 13, 14], 8, true);
  this.animations.add('up', [8, 9, 10, 9], 8, true);

  this.animations.play('down');

  this.moveSpeed = 75;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
  this.body.velocity.set(0, 0);
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.body.velocity.y = -this.moveSpeed;
    this.animations.play('up');
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.body.velocity.y = this.moveSpeed;
    this.animations.play('down');
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    this.body.velocity.x = -this.moveSpeed;
    this.animations.play('left');
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.body.velocity.x = this.moveSpeed;
    this.animations.play('right');
  }
};
