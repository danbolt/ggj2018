var TitleScreen = function () {
};
TitleScreen.prototype.create = function () {
  var titleText = this.game.add.bitmapText(
    this.game.width * 0.5,
    this.game.height * 0.5,
    'font',
    'Press R to start',
    8);
  titleText.align = 'center';
  titleText.anchor.x = 0.5;
};
TitleScreen.prototype.shutdown = function () {
  this.game.input.keyboard.onPressCallback = null;
};
TitleScreen.prototype.update = function () {
  this.game.input.keyboard.onPressCallback = function (key) {
    if (key == 'r') {
      this.game.state.start('Gameplay');
      SoundBank['select'].play();
    }
  };
};
