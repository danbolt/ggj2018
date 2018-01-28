var TitleScreen = function () {
};
TitleScreen.prototype.create = function () {
  var titleText = this.game.add.bitmapText(
    this.game.width * 0.5,
    this.game.height * 0.75,
    'font',
    'Press R to start',
    8);
  titleText.align = 'center';
  titleText.anchor.x = 0.5;
  titleText.visible = false;

  this.game.input.keyboard.addKey(Phaser.KeyCode.R).onUp.add(function (key) {
      this.game.state.start('Gameplay');
      SoundBank['select'].play();
  }, this);

  for (var i = 0; i < 2; i++) {
    var img = this.game.add.sprite(i === 0 ? -200 : (this.game.width + 200), 84, 'logo', i);
    img.anchor.set(0.5);

    var t = this.game.add.tween(img);
    t.to({ x: this.game.width / 2 }, 800, Phaser.Easing.Cubic.InOut, false, 200);
    t.onComplete.add(function () {
      this.game.stage.backgroundColor = 0xFFFFFF;
      this.game.time.events.add(100, function () {
        this.game.stage.backgroundColor = 0x000000;
      }, this);

      this.game.time.events.add(200, function () {
        titleText.visible = true;
      }, this);
    }, this);
    t.start();
  }
};
TitleScreen.prototype.shutdown = function () {
  this.game.input.keyboard.onPressCallback = null;
};
TitleScreen.prototype.update = function () {
};
