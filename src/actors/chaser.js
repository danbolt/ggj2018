var Chaser = function (game, player, spawnData) {
  Phaser.Sprite.call(this, game, spawnData.x, spawnData.y, 'coloured_squares', 28);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.player = player;
  this.moveSpeed = spawnData.properties.speed || 25;

  this.onCollision = true;

  // cosmetic scaling
  var actualSprite = this.game.add.sprite(8, 16, 'coloured_squares', 8);
  actualSprite.anchor.set(0.5, 1);
  this.addChild(actualSprite);
  actualSprite.animations.add('down', [32, 33], 4, true);
  actualSprite.animations.add('up', [38, 39], 4, true);
  actualSprite.animations.add('right', [34, 35], 4, true);
  actualSprite.animations.add('left', [36, 37], 4, true);
  this.animations = actualSprite.animations;
  var t = this.game.add.tween(actualSprite.scale);
  t.to( {y: [1.4, 1]}, 250, Phaser.Easing.Cubic.InOut, false, undefined, -1);
  t.start();
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

  if (this.body.velocity.y > 0) {
    this.animations.play('down');
  } else if (this.body.velocity.y < 0) {
    this.animations.play('up');
  }

  if (this.body.velocity.x > 0) {
    this.animations.play('right');
  } else if (this.body.velocity.x < 0) {
    this.animations.play('left');
  }
};
