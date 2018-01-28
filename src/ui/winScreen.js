var WinScreen = function () {
  this.autoAdvanceTimer = 0;
};
WinScreen.prototype.create = function () {
  var titleText = this.game.add.bitmapText(
    this.game.width * 0.5,
    this.game.height * 0.5,
    'font',
    'You win kid!\n\nPress R to play again or something',
    8);
  titleText.align = 'center';
  titleText.anchor.x = 0.5;

  var filter = new Phaser.Filter(this.game, null, fragSrc);
  this.game.world.filters = [ filter ];

  var a = this.game.add.sprite(0, 0, 'coloured_squares', 0);
  a.tint = 0x000000;
  a.width = this.game.width;
  var b = this.game.add.sprite(0, this.game.height - 16, 'coloured_squares', 0);
  b.tint = 0x000000;
  b.width = this.game.width;
  
  this.game.input.keyboard.addKey(Phaser.KeyCode.R).onUp.add(function () {
      this.game.state.start('TitleScreen');
  }, this);
};
WinScreen.prototype.shutdown = function () {
};
WinScreen.prototype.update = function () {
  this.game.world.filters[0].update();
};
