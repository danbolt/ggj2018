var Gameplay = function () {
  this.map = null;
  this.background = null;
  this.foreground = null;
  this.player = null;
  this.pushblocks = null;
  this.pickups = null;
  this.monsters = null;
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

  spawnPushblocks(this);
  spawnPickups(this);
  spawnMonsters(this);

  this.player = new Player(this.game, 100, 100);
  this.game.add.existing(this.player);
};
Gameplay.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.foreground);

  updatePushblocks(this);
  updatePickups(this);
  updateMonsters(this);
};
Gameplay.prototype.shutdown = function () {
  this.map = null;
  this.foreground = null;
};

function spawnPushblocks(gameplay) {
  gameplay.pushblocks = gameplay.game.add.group();

  gameplay.map.objects.blocks.forEach(function (spawnData) {
    if (spawnData.type = 'pushBlock') {
      var block = gameplay.game.add.existing(new PushBlock(gameplay.game, spawnData.x + 8, spawnData.y + 8, gameplay.map, gameplay.foreground));
      gameplay.pushblocks.addChild(block);
      gameplay.pushblocks.addToHash(block);
    }
  }, gameplay);
};

function updatePushblocks(gameplay) {
  gameplay.game.physics.arcade.collide(gameplay.player, gameplay.pushblocks, function (player, pushblock) {
    pushblock.pushedFrom(gameplay.player.body.velocity);
  }, undefined, gameplay);
};

function spawnPickups(gameplay) {
  gameplay.pickups = gameplay.game.add.group();

  gameplay.map.objects.pickups.forEach(function (spawnData) {
    var spawn = gameplay.game.add.existing(new Pickup(gameplay.game, spawnData.x + 8, spawnData.y + 8));
    gameplay.pickups.addChild(spawn);
    gameplay.pickups.addToHash(spawn);
  }, gameplay);
};

function updatePickups(gameplay) {
  gameplay.game.physics.arcade.overlap(gameplay.player, gameplay.pickups, function (player, pickup) {
    pickup.onCollected(gameplay.game, player);
  }, undefined, gameplay);
};

function spawnMonsters(gameplay) {
  gameplay.monsters = gameplay.game.add.group();

  gameplay.map.objects.monsters.forEach(function (spawnData) {

    if (spawnData.type = 'sweeper') {
      var spawn = gameplay.game.add.existing(new Sweeper(gameplay.game, spawnData));
      gameplay.monsters.addChild(spawn);
      gameplay.monsters.addToHash(spawn);

    } else if (spawnData.type = 'chaser') {
      var spawn = gameplay.game.add.existing(new Chaser(gameplay.game, spawnData));
      gameplay.monsters.addChild(spawn);
      gameplay.monsters.addToHash(spawn);
    }
  }, gameplay);
};

function updateMonsters(gameplay) {
};
