var fs = require('fs');

exports.checkForLoadFile = function() {
	if(fs.existsSync('Game')) {
		//load save file and return
		var data = fs.readFileSync('Game/load.txt', 'UTF-8');
		return data.split(', ');
	} else {
		return false;
	}
}

exports.makeGameDir = function() {
	fs.mkdir('Game', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("Game folder created.");
		}
	});
}

exports.writeLoadFile = function(wins, losses) {
	var string = wins + ', ' + losses;
	fs.writeFileSync('Game/load.txt', string);
	console.log('Game stats saved.');
}