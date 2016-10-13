var Letter = require('./letter.js');

var Word = function(word) {
	// The word the user needs to guess.
	this.word = word;
	// An array of Letter objects that contains the split word.
	this.lettersArray = word.split('').map(function(value) {
		return new Letter(value);
	});
};

// Returns true of false depending on if the word has been completely guessed or not.
Word.prototype.bingo = function() {
	return this.render() === this.word;
};

// Modifies any correctly guessed letter's 'visible' propery to true, then returns true or false depending on if a correct letter was guessed.
Word.prototype.guess = function(guess) {
	return this.lettersArray.map(function(l) {
		if (guess === l.character) {
			l.visible = true;
			return true;
		} else {
			return false;
		}
	}).some(function(value) {
		return value;
	});
};

// Takes the Letter objects and calls .render on each one. Afterwards, collects them into a new array and calls .join (on the array) to return a string.
Word.prototype.render = function() {
	return this.lettersArray.map(function(value){return value.render();}).join('');
};

module.exports = Word;