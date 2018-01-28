var WinScreen = function () {
};
WinScreen.prototype.init = function () {
};
WinScreen.prototype.create = function () {
  var titleText = this.game.add.bitmapText(
    this.game.width * 0.5,
    this.game.height * 0.5,
    'font',
    'You win!',
    16);
  titleText.align = 'center';
  titleText.anchor.x = 0.5;
};
WinScreen.prototype.update = function () {
 // this.game.input.keyboard.onPressCallback = function (key) {
 //   if (key == 'r') {
 //     this.game.state.start('TitleScreen');
 //   }
 // };
};
