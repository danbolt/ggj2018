var WinScreen = function () {
};
WinScreen.prototype.init = function () {
};
WinScreen.prototype.update = function () {
  this.game.input.keyboard.onPressCallback = function (key) {
    if (key == 'r') {
      this.game.state.start('TitleScreen');
    }
  };
};
