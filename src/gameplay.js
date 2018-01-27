var Gameplay = function () {
  this.map = null;
  this.background = null;
  this.foreground = null;
  this.player = null;
  this.pushblocks = null;
  this.pickups = null;
  this.ui = null;
  this.itemsCollected = 0;
  this.itemsOnMap = 999;
  this.timeLeft = 0;
  this.scoreText = null;
  this.jpegsText = null;
  this.timeText = null;
  this.countdownTimer = null;
  this.score = 0;
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

  this.player = new Player(this.game, 100, 100);
  this.game.add.existing(this.player);

  this.uiSetup();
  this.scoreSetup();

  // setup timer
  this.countdownTimer = this.game.time.events.loop(1000, function () {
    this.timeLeft--;
    this.timeText.text = this.timeLeft;
    if (this.timeLeft === -1) {
      this.game.state.start('Gameplay');
    }
  }, this);
};
Gameplay.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.foreground);

  updatePushblocks(this);
  updatePickups(this);
};
Gameplay.prototype.scoreSetup = function () {
  this.itemsCollected = 0;
  this.timeLeft = 500;
  this.itemsOnMap = this.pickups.countLiving();
  this.score = 0;

  this.jpegsText.text = this.itemsCollected + '/' + this.itemsOnMap;
  this.timeText.text = this.timeLeft;
  this.updateScore(0);
};
Gameplay.prototype.updateScore = function (increment) {
  // second answer from:
  // https://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
  var pad = function(num, size) {
    var s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

  this.score += increment;
  this.scoreText.text = pad(this.score, 5);
};
Gameplay.prototype.uiSetup = function () {
  var uiPaneWidth = this.game.width - this.map.widthInPixels;

  this.ui = this.game.add.group();
  this.ui.x = this.map.widthInPixels;

  var scoreText = this.game.add.bitmapText(uiPaneWidth * 0.5, 8, 'font', 'score', 8);
  scoreText.anchor.x = 0.5;
  var scoreTextCount = this.game.add.bitmapText(0, 12, 'font', '000320', 8);
  scoreTextCount.anchor.x = 0.5;
  scoreText.addChild(scoreTextCount);

  var jpegsText = this.game.add.bitmapText(uiPaneWidth * 0.5, 48, 'font', 'cat pics', 8);
  jpegsText.anchor.x = 0.5;
  var jpegsTextCount = this.game.add.bitmapText(0, 12, 'font', '06/10', 8);
  jpegsTextCount.anchor.x = 0.5;
  jpegsText.addChild(jpegsTextCount);

  var timeLeftText = this.game.add.bitmapText(uiPaneWidth * 0.5, 96, 'font', 'time left', 8);
  timeLeftText.anchor.x = 0.5;
  var timeLeftTextCount = this.game.add.bitmapText(0, 12, 'font', '120', 8);
  timeLeftTextCount.anchor.x = 0.5;
  timeLeftText.addChild(timeLeftTextCount);

  this.scoreText = scoreTextCount;
  this.jpegsText = jpegsTextCount;
  this.timeText = timeLeftTextCount;

  this.ui.addChild(scoreText);
  this.ui.addChild(jpegsText);
  this.ui.addChild(timeLeftText);
};
Gameplay.prototype.shutdown = function () {
  this.map = null;
  this.foreground = null;
  this.ui = null;
  this.scoreText = null;
  this.jpegsText = null;
  this.timeText = null;
  this.countdownTimer = null;
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
    var block = gameplay.game.add.existing(new Pickup(gameplay.game, spawnData.x + 8, spawnData.y + 8));
    gameplay.pickups.addChild(block);
    gameplay.pickups.addToHash(block);
  }, gameplay);
};

function updatePickups(gameplay) {
  gameplay.game.physics.arcade.overlap(gameplay.player, gameplay.pickups, function (player, pickup) {
    pickup.onCollected(gameplay.game, player);

    this.itemsCollected++;
    this.jpegsText.text = this.itemsCollected + '/' + this.itemsOnMap;
    this.updateScore(10);
  }, undefined, gameplay);
};
