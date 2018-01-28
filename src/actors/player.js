var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player', 1);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(12, 12);
  this.body.offset.set(2, 20);

  this.animations.add('right', [3, 4, 5, 6], 8, true);
  this.animations.add('down', [0, 1, 2, 1], 8, true);
  this.animations.add('left', [11, 12, 13, 14], 8, true);
  this.animations.add('up', [8, 9, 10, 9], 8, true);

  this.animations.add('get_wifi', [16, 17, 18, 17, 16, 17, 18, 17], 9, false).onComplete.add(function () {
    this.animations.play('down');
  }, this);
  this.animations.add('die', [22, 23, 24], 6, true);
  this.animations.add('fall_down', [19, 20, 21], 8, false).onComplete.add(function () {
    this.animations.play('die');
  }, this);

  this.animations.play('down');

  this.moveSpeed = 75;

  this.isDead = false;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
  this.body.velocity.set(0, 0);

  this.isDead = this.animations.currentAnim.name === 'die' || this.animations.currentAnim.name === 'fall_down';
  this.body.enable = !(this.isDead);

  if (this.isDead === false && this.animations.currentAnim.name !== 'get_wifi') {
    var isMovingSideways = false;
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
      this.body.velocity.x = -this.moveSpeed;
      this.animations.play('left');
      isMovingSideways = true;
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
      this.body.velocity.x = this.moveSpeed;
      this.animations.play('right');
      isMovingSideways = true;
    }

    if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      this.body.velocity.y = -this.moveSpeed;
      if (!isMovingSideways) {
        this.animations.play('up');
      }
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      this.body.velocity.y = this.moveSpeed;
      if (!isMovingSideways) {
        this.animations.play('down');
      }
    }
  }
};
