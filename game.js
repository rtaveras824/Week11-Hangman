// randomly select word for player

exports.pickRandomWord = function(word) {
	var randomNumber = Math.floor(Math.random() * word.length);
	var wordAsArray = word[randomNumber].toUpperCase().split('');
	return wordAsArray;
}

// Not working for some reason
// module.exports = pickRandomWord;