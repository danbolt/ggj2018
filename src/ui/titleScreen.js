var TitleScreen = function () {
};
TitleScreen.prototype.init = function () {
};
TitleScreen.prototype.update = function () {
  this.game.input.keyboard.onPressCallback = function (key) {
    if (key == 'r') {
      this.game.state.start('Gameplay');
    }
  };
};
