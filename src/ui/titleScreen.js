var TitleScreen = function () {
};
TitleScreen.prototype.create = function () {
  var titleText = this.game.add.bitmapText(
    this.game.width * 0.5,
    this.game.height * 0.75,
    'font',
    'Get signal to download cat pics!\n\n\nPress R to start',
    8);
  titleText.align = 'center';
  titleText.anchor.set(0.5);
  titleText.visible = false;

  this.game.input.keyboard.addKey(Phaser.KeyCode.R).onUp.add(function (key) {
      this.game.state.start('Gameplay');
      SoundBank['select'].play();
  }, this);

  var a = this.game.add.sprite(0, 0, 'coloured_squares', 0);
  a.tint = 0x000000;
  a.width = this.game.width;
  var b = this.game.add.sprite(0, this.game.height - 16, 'coloured_squares', 0);
  b.tint = 0x000000;
  b.width = this.game.width;

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

    // add filter
    var filter = new Phaser.Filter(this.game, null, fragSrc);
    this.game.world.filters = [ filter ];
  }
};
TitleScreen.prototype.shutdown = function () {
  this.game.input.keyboard.onPressCallback = null;
};
TitleScreen.prototype.update = function () {
  this.game.world.filters[0].update();
};
