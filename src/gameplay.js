var Gameplay = function () {
  this.map = null;
  this.background = null;
  this.foreground = null;
  this.player = null;
  this.playerSpawn = null;
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
  this.monsters = null;
  this.exit = null;

  this.levelProgression = [
    'sandbox',
    'slime_world',
    'push_maze'
  ];
  this.currentLevelIndex = 0;
};
Gameplay.prototype.init = function() {
  //
};
Gameplay.prototype.preload = function() {
  //
};
Gameplay.prototype.create = function() {
  this.urlParams = getUrlParams();

  var levelName = this.urlParams.level ||
    this.levelProgression[this.currentLevelIndex % this.levelProgression.length];

  this.map = this.game.add.tilemap(levelName);
  this.map.addTilesetImage('16x16SquareSheet', 'coloured_squares_tiles');
  this.background = this.map.createLayer('background');
  this.foreground = this.map.createLayer('foreground');
  this.map.setCollisionByExclusion([], true, this.foreground);
  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);

  this.misc = this.game.add.group();
  this.pushblocks = this.game.add.group();
  this.pickups = this.game.add.group();
  this.monsters = this.game.add.group();

  this.player = new Player(this.game, 100, 100);
  spawnMisc(this);
  spawnPushblocks(this);
  spawnPickups(this);
  spawnMonsters(this);
  this.game.add.existing(this.player);

  if (this.playerSpawn) {
    this.player.x = this.playerSpawn.x;
    this.player.y = this.playerSpawn.y;
  } else {
    console.log("warning: level has no player spawn");
  }

  if (!this.exit) {
    console.log("warning: level has no exit");
  }

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

  this.game.input.keyboard.addKey(Phaser.KeyCode.R).onUp.add(function () {
      this.game.state.start('Gameplay'); // restart level
  }, this);
};
Gameplay.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.foreground);

  updatePushblocks(this);
  updatePickups(this);
  updateMonsters(this);

  // win level condition
  if (this.exit && this.exit.data.unlocked === true) {
    this.game.physics.arcade.overlap(this.player, this.exit, function () {
      this.currentLevelIndex++;
      if (this.currentLevelIndex >= this.levelProgression.length) {
        this.game.state.start('WinScreen');
        this.currentLevelIndex = 0;
      } else {
        this.game.state.start('Gameplay');
      }
    }, undefined, this);
  };
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

  if (this.itemsCollected === this.itemsOnMap) {
    this.exit.unlock();
  }
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
  this.game.input.keyboard.onPressCallback = null;
  this.map = null;
  this.foreground = null;
  this.ui = null;
  this.scoreText = null;
  this.jpegsText = null;
  this.timeText = null;
  this.countdownTimer = null;
  this.exit = null;
  this.playerSpawn = null;
};

function getUrlParams() {
  var paramStr = window.location.search.substr(1);
  if (paramStr == null || paramStr == "") { return {}; }
  var result = {}
  paramStr.split("&").forEach(function (paramPairStr) {
    var paramPairArr = paramPairStr.split("=");
    result[paramPairArr[0]] = paramPairArr[1];
  });
  return result;
};

function spawnEntity(gameplay, spawnData) {

  if (spawnData.type === 'pushBlock') {
    var spawn = gameplay.game.add.existing(new PushBlock(gameplay.game, spawnData.x + 8, spawnData.y + 8, gameplay.map, gameplay.foreground));
    gameplay.pushblocks.addChild(spawn);
    gameplay.pushblocks.addToHash(spawn);

  } else if (spawnData.type === 'pickup') {
    var spawn = gameplay.game.add.existing(new Pickup(gameplay.game, spawnData.x + 8, spawnData.y + 8));
    gameplay.pickups.addChild(spawn);
    gameplay.pickups.addToHash(spawn);

  } else if (spawnData.type === 'sweeper') {
    var spawn = gameplay.game.add.existing(new Sweeper(gameplay.game, gameplay.player, spawnData));
    gameplay.monsters.addChild(spawn);
    gameplay.monsters.addToHash(spawn);

  } else if (spawnData.type === 'chaser') {
    var spawn = gameplay.game.add.existing(new Chaser(gameplay.game, gameplay.player, spawnData));
    gameplay.monsters.addChild(spawn);
    gameplay.monsters.addToHash(spawn);

  } else if (spawnData.type === 'slime') {
    var spawn = gameplay.game.add.existing(new Slime(gameplay, spawnData));
    gameplay.monsters.addChild(spawn);
    gameplay.monsters.addToHash(spawn);

  } else if (spawnData.type === 'exit') {
    var spawn = gameplay.game.add.existing(new LevelExit(gameplay.game, spawnData.x, spawnData.y));

    if (gameplay.exit) {
      console.log("warning: multiple exits in the level");
    } else {
      gameplay.exit = spawn;
    }

  } else if (spawnData.type === 'playerSpawn') {
    if (gameplay.playerSpawn) {
      console.log("warning: multiple player spawns in the level");
    } else {
      gameplay.playerSpawn = spawnData;
    }
  }
};

function spawnPushblocks(gameplay) {
  gameplay.map.objects.blocks.forEach(function (spawnData) {
    spawnEntity(gameplay, spawnData);
  }, gameplay);
};

function updatePushblocks(gameplay) {
  gameplay.game.physics.arcade.collide(gameplay.player, gameplay.pushblocks, function (player, pushblock) {
    pushblock.pushedFrom(gameplay.player.body.velocity);
  }, undefined, gameplay);
};

function spawnPickups(gameplay) {
  gameplay.map.objects.pickups.forEach(function (spawnData) {
    spawnEntity(gameplay, spawnData);
  }, gameplay);
};

function updatePickups(gameplay) {
  gameplay.game.physics.arcade.overlap(gameplay.player, gameplay.pickups, function (player, pickup) {
    pickup.onCollected(gameplay.game, player);

    this.itemsCollected++;
    this.jpegsText.text = this.itemsCollected + '/' + this.itemsOnMap;
    this.updateScore(10);

    player.animations.play('get_wifi');
  }, undefined, gameplay);
};

function spawnMonsters(gameplay) {
  gameplay.map.objects.monsters.forEach(function (spawnData) {
    spawnEntity(gameplay, spawnData);
  }, gameplay);
};

function updateMonsters(gameplay) {
  gameplay.game.physics.arcade.collide(gameplay.player, gameplay.monsters, function (player, monster) {
    if (monster.onCollision && player.isDead === false) {
      player.animations.play('fall_down');

      // add a little "ya died" dialog
      this.game.time.events.add(1000, function () {
        var v = this.game.add.sprite(this.map.widthInPixels / 2, this.game.height / 2, 'coloured_squares', 0);
        v.anchor.set(0.5);
        v.tint = 0x000000;
        var t = this.game.add.tween(v);
        t.to( {width: 200, height: 64}, 500, Phaser.Easing.Cubic.InOut);
        t.onComplete.add(function () {
          var text = this.game.add.bitmapText(this.map.widthInPixels / 2, this.game.height / 2, 'font', ['aww dang!', 'aww beans!', 'aww peas!', 'bummer!', 'not grood!'][~~(Math.random() * 5)] + '\nit didn\'t go too well!\n\n\npress r to go again', 8)
          text.anchor.set(0.5);
          text.align = 'center';
        }, this);
        t.start();
      }, this);
    }
  }, function (player, monster) {  if (monster.pushedFrom) {
      monster.pushedFrom(gameplay.player.body.velocity);
      return false;
    }

    return true;
  }, gameplay);

  gameplay.game.physics.arcade.collide(gameplay.monsters, gameplay.foreground);
};

function spawnMisc(gameplay) {
  gameplay.map.objects.misc.forEach(function (spawnData) {
    spawnEntity(gameplay, spawnData);
  }, gameplay);
};
