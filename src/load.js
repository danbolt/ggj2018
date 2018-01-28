var Preload = function () {
  //
};
Preload.prototype.init = function() {
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.refresh();

  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;

  // enable crisp rendering
  this.game.stage.smoothed = false;
  this.game.renderer.renderSession.roundPixels = true;  
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL

  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

  this.game.input.gamepad.start();
};
Preload.prototype.preload = function() {

  // Font is Gamegirl Classic by freakyfonts
  // License is for noncommercial use
  // http://www.fontspace.com/freaky-fonts/gamegirl-classic
  // this.game.load.bitmapFont('font', 'asset/font/font.png', 'asset/font/font.json');

  // Font is Newsgeek by
  this.game.load.bitmapFont('font', 'asset/font/font.png', 'asset/font/font.json');
};
Preload.prototype.create = function() {

  var instructions = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 , 'font', 'loading...\n\nPlease wait!', 16);
  instructions.align = 'center';
  instructions.anchor.x = 0.5;

  this.game.input.gamepad.start();

  var filter = new Phaser.Filter(this.game, null, fragSrc);
  this.game.world.filters = [ filter ];

  this.game.state.start('Load', false);
};


var Load = function () {
	//
};
Load.prototype.preload = function() {
  this.game.load.audio('loop01', 'asset/bgm/loop01.mp3');
  this.game.load.audio('loop02', 'asset/bgm/loop02.mp3');

  soundEffectsToLoad.forEach(function (sname) {
    this.game.load.audio(sname, 'asset/sfx/' + sname + '.wav');
  }, this);

  this.game.load.spritesheet('coloured_squares', 'asset/img/16x16SquareSheet.png', 16, 16);
  this.game.load.spritesheet('player', 'asset/img/player.png', 16, 32);
  this.game.load.spritesheet('logo', 'asset/img/logo.png', 258, 88);

  this.game.load.image('coloured_squares_tiles', 'asset/img/16x16SquareSheet.png');

  var levels = [
    'sandbox',
    'slime_world',
    'push_maze',
    'gauntlet',
    'spiral',
    'cake_walk',
  ];

  var game = this.game;
  levels.forEach(function (levelName) {
    game.load.tilemap(levelName, 'asset/map/'+levelName+'.json', undefined, Phaser.Tilemap.TILED_JSON);
  });
};
Load.prototype.create = function() {
  //this.game.bgmMelody = this.game.add.audio('background_melody', 0.8, true);
  //this.game.bgmMelody.play();

	soundEffectsToLoad.forEach(function (sname) {
    SoundBank[sname] = this.game.add.audio(sname, 0.8, false);
  }, this);

 	this.game.state.start('TitleScreen');
};
