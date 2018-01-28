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
  this.isDeadTimer = 0;

  // cute animation for getting the cat pics
  var sparks = this.game.add.group();
  for (var i = 0; i < 20; i++) {
    var newSpark = this.game.add.sprite(0, 0, 'coloured_squares', 24);
    newSpark.kill();
    sparks.addChild(newSpark);
  }
  this.animations.getAnimation('get_wifi').onStart.add(function () {
    for (var i = 0; i < sparks.children.length; i++) {
      var spark = sparks.children[i];
      spark.revive();
      spark.position.set(this.game.width / 4 + (this.game.width * 0.5 * Math.random()), -32);

      var t = this.game.add.tween(spark.position);
      t.to( {x: [(this.game.width * 0.1) + (this.game.width * 0.5 * Math.random()), this.x + 16], y: [this.y + 16]}, 600 + (Math.random() * 100), Phaser.Easing.Linear.None, false, Math.random() * 300);
      t.onComplete.add(function () {
        spark.kill();
      }, this);
      t.start();

      spark.scale.set(0.6 + Math.random() * 0.4);
      var ts = this.game.add.tween(spark.scale);
      var rs = Math.random() * 0.2;
      ts.to({x: [1.1 + rs, 0], y: [1.1 + rs, 0]}, 700);
      ts.start();
    }
  }, this);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
  this.body.velocity.set(0, 0);

  this.isDead = this.animations.currentAnim.name === 'die' || this.animations.currentAnim.name === 'fall_down';
  this.body.enable = !(this.isDead);

  if (this.isDead === true) {
    this.isDeadTimer += this.game.time.elapsed;
    if (this.isDeadTimer > 3000) {
      this.game.state.start('Gameplay');
    }
  }

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
