var Cutscene = function () {
  this.index = 0;
  this.frames = [];
  this.nextState = 'Gameplay';
  this.currentImage = null;
  this.auxImage = null;
  this.cutsceneText = null;
  this.lines = ['i went to the castle for cat pics', 'i dream of cat pics', 'i got all the cat pics!', 'and like that, i am done for today'];
};
Cutscene.prototype.init = function (frames, nextState) {
  this.index = 0;
  this.frames = frames;
  this.nextState = nextState;
};
Cutscene.prototype.advanceFrame = function () {
  this.index = (this.index + 1);

  if (this.index === this.frames.length) {
    this.game.time.events.add(2000, function () {
      this.game.state.start(this.nextState);
    }, this);
    return;
  }

  this.currentImage.frame = this.frames[this.index];

  if (this.auxImage.data.tween) { this.auxImage.data.tween.stop(); }
  this.auxImage.destroy();
  this.auxImage = null;
  this.auxImage = this.game.add.sprite(0, 0, 'cutscenes', this.currentImage.frame + 1);

  this.cutsceneText.text = this.lines[~~(this.currentImage.frame / 2)];

  switch (this.frames[this.index]) {
    case 0:
      this.auxImage.position.set(320, 16);
      var t = this.game.add.tween(this.auxImage);
      t.to({x: 0}, 1600, Phaser.Easing.Linear.None);
      t.start();
      this.auxImage.data.tween = t;
    break;
    case 2:
      this.auxImage.anchor.set(0.55, 1);
      this.auxImage.position.set(this.game.width / 2, 16 + 128);
      var t = this.game.add.tween(this.auxImage.scale);
      t.to({x: [1.2, 1], y : [1.2, 1]}, 2200, Phaser.Easing.Cubic.InOut, false, 0, -1);
      t.start();
      this.auxImage.data.tween = t;
    break;
    case 4:
      this.auxImage.position.set(0, 16);
      var t = this.game.add.tween(this.auxImage);
      t.to({x: [(this.auxImage.x + Math.random() * 7 - 3), this.auxImage.x + Math.random() * 7 - 3, this.auxImage.x + Math.random() * 7 - 3], y: [(this.auxImage.y + Math.random() * 5 - 2), this.auxImage.y + Math.random() * 5 - 2, this.auxImage.y + Math.random() * 5 - 2]}, 300, Phaser.Easing.Linear.None, false, 0, -1);
      t.start();
      this.auxImage.data.tween = t;
    break;
    case 6:
      this.auxImage.anchor.set(0.55, 0.4);
      this.auxImage.position.set(this.game.width / 2, 16 + 79);
      var t = this.game.add.tween(this.auxImage.scale);
      t.to({x: 0, y: 0}, 2000, Phaser.Easing.Linear.None);
      t.start();
      this.auxImage.data.tween = t;

    break;
  }

  this.game.time.events.add(4000, function () {
    this.advanceFrame();
  }, this);
}
Cutscene.prototype.create = function () {
  this.game.input.keyboard.addKey(Phaser.KeyCode.ESC).onUp.add(function () {
    this.game.state.start(this.nextState);
  }, this);

  this.cutsceneText = this.game.add.bitmapText(this.game.width / 2, this.game.height * 0.75, 'font', 'the quick brown foxs gets lit', 8);
  this.cutsceneText.anchor.set(0.5);
  this.cutsceneText.align = 'center';

  this.currentImage = this.game.add.sprite(0, 16, 'cutscenes', this.frames[this.index]);
  this.auxImage = this.game.add.sprite(0, 16, 'cutscenes', this.frames[this.index]);
  this.index = -1;
  this.advanceFrame();

  var a = this.game.add.sprite(0, 0, 'coloured_squares', 0);
  a.tint = 0x000000;
  a.width = this.game.width;
  var b = this.game.add.sprite(0, this.game.height - 16, 'coloured_squares', 0);
  b.tint = 0x000000;
  b.width = this.game.width;

  var filter = new Phaser.Filter(this.game, null, fragSrc);
  this.game.world.filters = [ filter ];
};
Cutscene.prototype.update = function () {
  this.game.world.filters[0].update();
}