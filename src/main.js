var main = function () {
	console.log('hello, jam! 😊');

	var game = new Phaser.Game(320, 240);
	game.state.add('Gameplay', Gameplay, false);
	game.state.add('Load', Load, false);
	game.state.add('Preload', Preload, false);
	game.state.add('TitleScreen', TitleScreen, false);
	game.state.add('WinScreen', WinScreen, false);
  game.state.add('Cutscene', Cutscene, false);

	game.state.start('Preload');
};