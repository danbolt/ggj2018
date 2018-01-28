var Slime = function (game, x, y, map, foreground) {
  Phaser.Sprite.call(this, game, x, y, 'coloured_squares', 5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.anchor.set(0.5, 0.5);

  this.map = map;
  this.foreground = foreground;

  this.body.moves = false;
};
Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;
Slime.prototype.pushedFrom = function(directon) {

  directon = Phaser.Point.normalize(directon);
  var theta = Math.atan2(directon.y, directon.x);
  if (Math.abs(theta) < Math.PI * 0.25) {
    directon.set(1, 0);
  } else if (theta < Math.PI * 0.75 && theta > Math.PI * 0.25) {
    directon.set(0, 1);
  } else if (theta > Math.PI * -0.75 && theta < Math.PI * -0.25) {
    directon.set(0, -1);
  } else if (Math.abs(theta) > Math.PI * 0.75) {
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
  moveTween.to( { x: this.x + (directon.x * 16), y: this.y + (directon.y * 16) }, 150);
  moveTween.onComplete.add(function () {
    this.body.enable = true;
    this.body.velocity.set(0);
  }, this);

  var scaleTween = this.game.add.tween(this.scale);
  scaleTween.to( { x: [1, (Math.abs(directon.x) > 0 ? 0.5 : 1.4), 1], y: [1, (Math.abs(directon.y) > 0 ? 0.5 : 1.4), 1] }, 150, Phaser.Easing.Cubic.InOut);

  moveTween.start();
  scaleTween.start();
};