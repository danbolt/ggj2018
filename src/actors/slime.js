var Slime = function (gameplay, spawnData) {
  Phaser.Sprite.call(this, gameplay.game, spawnData.x + 8, spawnData.y + 8, 'coloured_squares', 17);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.anchor.set(0.5, 0.5);

  this.map = gameplay.map;
  this.foreground = gameplay.foreground;
  this.player = gameplay.player;

  this.body.moves = false;

  this.timeSinceLastMove = 0;
  this.moveCycle = spawnData.properties.moveCycle || 0;

  this.playerDefaultMoveSpeed = this.player.moveSpeed;
  this.playerMoveSpeedRestoreTimer = 0;
  this.playerIsSlowed = false;
};
Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;
Slime.prototype.update = function () {
  var movePeriod = 2000;
  this.timeSinceLastMove += this.game.time.elapsed;
  while (this.timeSinceLastMove > movePeriod) {
    this.timeSinceLastMove -= movePeriod;
    this.wanderingMove();
  }

  if (this.playerIsSlowed) {
    this.playerMoveSpeedRestoreTimer += this.game.time.elapsed;
    if (this.playerMoveSpeedRestoreTimer > 400) {
      this.player.moveSpeed = this.playerDefaultMoveSpeed;
      this.playerIsSlowed = false;
    }
  }
};
Slime.prototype.pushedFrom = function(directon) {

  directon = Phaser.Point.normalize(directon);
  var theta = Math.atan2(directon.y, directon.x);
  if (Math.abs(theta) <= Math.PI * 0.25) {
    directon.set(1, 0);
  } else if (theta < Math.PI * 0.75 && theta > Math.PI * 0.25) {
    directon.set(0, 1);
  } else if (theta > Math.PI * -0.75 && theta < Math.PI * -0.25) {
    directon.set(0, -1);
  } else if (Math.abs(theta) >= Math.PI * 0.75) {
    directon.set(-1, 0);
  }

  // don't move if there is no vector or if we are already moving
  if (directon.getMagnitude() < 0.01 || this.body.enable === false) {
    return;
  }

  if (this.map.getTileWorldXY(this.x + (directon.x * 16) - 8, this.y + (directon.y * 16) - 8, undefined, undefined, this.foreground) !== null) {
    return true;
  }

  this.body.enable = false;

  var moveTween = this.game.add.tween(this.position);
  moveTween.to( { x: this.x + (directon.x * 16), y: this.y + (directon.y * 16) }, 230);
  moveTween.onComplete.add(function () {
    this.body.enable = true;
    this.body.velocity.set(0);
  }, this);

  var scaleTween = this.game.add.tween(this.scale);
  scaleTween.to( { x: [1, (Math.abs(directon.x) > 0 ? 0.5 : 1.4), 1], y: [1, (Math.abs(directon.y) > 0 ? 0.5 : 1.4), 1] }, 230, Phaser.Easing.Cubic.InOut);

  moveTween.start();
  scaleTween.start();
};
Slime.prototype.wanderingMove = function() {
  if (this.moveCycle === 0) {
    this.pushedFrom(new Phaser.Point(1, 0));
    this.moveCycle++;
  } else if (this.moveCycle === 1) {
    this.pushedFrom(new Phaser.Point(0, 1));
    this.moveCycle++;
  } else if (this.moveCycle === 2) {
    this.pushedFrom(new Phaser.Point(-1, 0));
    this.moveCycle++;
  } else {
    this.pushedFrom(new Phaser.Point(0, -1));
    this.moveCycle = 0;
  }
};
Slime.prototype.onTouchedPlayer = function () {
  this.player.moveSpeed = this.playerDefaultMoveSpeed * 0.5;
  this.playerMoveSpeedRestoreTimer = 0;
  this.playerIsSlowed = true;
};
