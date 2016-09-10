//contain the logic of the app. Run in node console

// Need readline for interface questions
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

// Require game files
// ----------------------------------
// Selects random word
var gameJS = require('./game.js');
// Compares word to guessed
var wordJS = require('./word.js');
// Sets blank characters
var letterJS = require('./letter.js');

// Initialize variables
var wordBank = ['Robert Baratheon', 'Renly Baratheon', 'Ygritte', 'Oberyn Martell', 'Tywin Lannister', 'Khal Drogo', 'Joffrey Baratheon', 'Ned Stark', 'Rob Stark', 'Catelyn Stark'],
	wins = 0,
	losses = 0,
	numGuesses = 9,
	word = [],
	guess = [],
	guessedWrong = [];


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
		if (response === 'Y')
			resetGame();
		else
			rl.close();
	});
}
	
function round() {
	// Set blank letters
	if (numGuesses > 0) {
		console.log(guess.join(' '));
		console.log('Number of guesses left: ' + numGuesses);
		console.log('Letters guessed: ' + guessedWrong.join(' '));
		// Ask for letter
		console.log('---------------------------------\r\n\r\n\r\n');
		var question = 'Enter a letter: ';
		rl.question(question, function(response) {
			// Check if letter in word
			guessCheck = letterJS.checkIfInWord(word, guess, response);
			// If letter not in word
			if(!guessCheck) {
				// If letter not guessed before
				if(guessedWrong.indexOf(response) === -1) {
					guessedWrong.push(response);
					numGuesses--;
				}
			} else {
				guess = guessCheck;
			}
			var gameWin = wordJS.compare(word, guess);
			if (gameWin) {
				console.log(guess.join(' '));
				wins++;
				playAgain();
			} else {
				round();
			}
		});
	} else {
		console.log("You LOSE. GOOD DAY SIR.");
		console.log(word.join(' '));
		losses++;
		playAgain();
	}
}

resetGame();