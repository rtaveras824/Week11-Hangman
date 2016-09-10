// whether or not a letter appears as '_' or itself

exports.setBlankLetters = function(correct) {
	var blank = [];
	for (var i = 0; i < correct.length; i++) {
		if (correct[i] === ' ')
			blank.push(' ');
		else
			blank.push('_');
	}
	return blank;
}

exports.checkIfInWord = function(correct, guess, input) {
	var index = correct.indexOf(input);
	if (index !== -1) {
		//To check if letter appears more than once
		while(index !== -1) {
			guess[index] = input;
			index = correct.indexOf(input, index + 1);
		}
		return guess;
	} else {
		return false;
	}
	
}