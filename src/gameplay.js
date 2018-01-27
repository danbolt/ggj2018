var Gameplay = function () {
  this.map = null;
  this.background = null;
  this.foreground = null;
  this.player = null;
  this.pushBlocks = null;
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

  this.pushBlocks = this.game.add.group();

  this.map.objects.blocks.forEach(function (blockData) {
    if (blockData.type = 'pushBlock') {
      var block = this.game.add.existing(new PushBlock(this.game, blockData.x, blockData.y));
      this.pushBlocks.addChild(block);
      this.pushBlocks.addToHash(block);
    }
  }, this);
};
Gameplay.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.foreground);

  this.game.physics.arcade.overlap(this.player, this.pushBlocks, function (player, pushBlock) {
    pushBlock.pushedFrom(player.x, player.y);
  }, undefined, this);
};
Gameplay.prototype.shutdown = function () {
  this.map = null;
  this.foreground = null;
};