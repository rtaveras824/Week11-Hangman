//contain the logic of the app. Run in node console

// Need readline for interface questions
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

// Require game files
// ----------------------------------
// Load wins and losses from file
var loadJS = require('./load.js');
// Selects random word
var gameJS = require('./game.js');
// Compares word to guessed
var wordJS = require('./word.js');
// Sets blank characters
var letterJS = require('./letter.js');

// Initialize variables
var wordBank = ['Robert Baratheon', 'Renly Baratheon', 'Ygritte', 'Oberyn Martell', 'Tywin Lannister', 'Khal Drogo', 'Joffrey Baratheon', 'Ned Stark', 'Rob Stark', 'Catelyn Stark'],
	wins = loadJS.checkForLoadFile()[0] || 0,
	losses = loadJS.checkForLoadFile()[1] || 0,
	numGuesses = 9,
	word = [],
	guess = [],
	guessedWrong = [];

console.log('Wins:', wins, 'Losses:', losses);

function resetGame() {
	numGuesses = 9;
	word = gameJS.pickRandomWord(wordBank);
	guess = letterJS.setBlankLetters(word);
	guessedWrong = [];
	round();
}

function playAgain() {
	var question = "Play again? Y/n ";
	rl.question(question, function(response) {
		var responseUppercase = response.toUpperCase();
		if (responseUppercase === 'Y' || responseUppercase === 'YES'){
			resetGame();
		} else {
			var doesFileExist = loadJS.checkForLoadFile();
			if(!doesFileExist)
				loadJS.makeGameDir();

			loadJS.writeLoadFile(wins, losses);
			rl.close();
		}
	});
}
	
function round() {
	// Set blank letters
	if (numGuesses > 0) {
		console.log('#########################################\r\n');
		console.log(guess.join(' ') + '\r\n');
		console.log('Number of guesses left: ' + numGuesses + '\r\n');
		console.log('Letters guessed: ' + guessedWrong.join(' ') + '\r\n');
		console.log('#########################################\r\n');
		// Ask for letter
		var question = 'Enter a letter: \r\n';
		rl.question(question, function(response) {
			console.log('\r\n\r\n');
			// Check if letter in word
			// regex to see if letters
			var isLetter = /[a-zA-Z]/.test(response);
			if (response.length === 1 && isLetter) {
				// convert to uppercase
				var uppercaseResponse = response.toUpperCase();
				guessCheck = letterJS.checkIfInWord(word, guess, uppercaseResponse);
				// If letter not in word
				if(!guessCheck) {
					// If letter not guessed before
					if(guessedWrong.indexOf(uppercaseResponse) === -1) {
						guessedWrong.push(uppercaseResponse);
						numGuesses--;
					}
				} else {
					guess = guessCheck;
				}

				// Check if guessed word matches correct word
				var gameWin = wordJS.compare(word, guess);
				if (gameWin) {
					wins++;
					console.log(guess.join(' '));
					console.log('You win!');
					console.log('Wins: ', wins, 'Losses: ', losses);
					playAgain();
				} else {
					round();
				}
			} else {
				//error message
				console.log('***************************************');
				console.log('Enter a single letter.');
				console.log('***************************************');
				console.log('\r\n\r\n')
				round();
			}
		});
	} else {
		// Game over, numGuesses = 0
		losses++;
		console.log(word.join(' '));
		console.log('YOU LOSE. GOOD DAY SIR.');
		console.log('Wins: ', wins, 'Losses: ', losses);
		playAgain();
	}
}

resetGame();