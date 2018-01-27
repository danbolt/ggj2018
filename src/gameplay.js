var Gameplay = function () {
  this.map = null;
  this.background = null;
  this.foreground = null;
  this.player = null;
  this.pushblocks = null;
  this.pickups = null;
};
Gameplay.prototype.init = function() {
  //
};
Gameplay.prototype.preload = function() {
  //
};
Gameplay.prototype.create = function() {
  this.map = this.game.add.tilemap('sandbox');
  this.map.addTilesetImage('16x16SquareSheet', 'coloured_squares_tiles');
  this.background = this.map.createLayer('background');
  this.foreground = this.map.createLayer('foreground');
  this.map.setCollisionByExclusion([], true, this.foreground);
  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);

  this.player = new Player(this.game, 100, 100);
  this.game.add.existing(this.player);

  spawnPushblocks(this);
  spawnPickups(this);
};
Gameplay.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.foreground);

  this.game.physics.arcade.overlap(this.player, this.pushblocks, function (player, pushBlock) {
    pushBlock.pushedFrom(player.x, player.y);
  }, undefined, this);
};
Gameplay.prototype.shutdown = function () {
  this.map = null;
  this.foreground = null;
};

function spawnPushblocks(gameplay) {
  gameplay.pushblocks = gameplay.game.add.group();

  gameplay.map.objects.blocks.forEach(function (spawnData) {
    if (spawnData.type = 'pushBlock') {
      var block = gameplay.game.add.existing(new PushBlock(gameplay.game, spawnData.x, spawnData.y));
      gameplay.pushblocks.addChild(block);
      gameplay.pushblocks.addToHash(block);
    }
  }, gameplay);
};

function spawnPickups(gameplay) {
  gameplay.pickups = gameplay.game.add.group();

  gameplay.map.objects.pickups.forEach(function (spawnData) {
    var block = gameplay.game.add.existing(new Pickup(gameplay.game, spawnData.x, spawnData.y));
    gameplay.pickups.addChild(block);
    gameplay.pickups.addToHash(block);
  }, gameplay);
};
