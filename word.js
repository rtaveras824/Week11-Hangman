//check letters guessed versus word selected

//receive letter guessed
//see if already guessed
//use indexOf to see if in word

exports.compare = function(correct, guess) {
	if (correct.toString() === guess.toString()) {
		//you win
		//reset game
		console.log('You win!');
		return true;
	}
}