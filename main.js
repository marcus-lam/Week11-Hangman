var prompt = require('prompt');
var Game = require('./game.js');
var Word = require('./word.js');
var lettersGuessed = '';

prompt.start();

game = {
	lettersGuessed: '',
	currentHint: null,
	currentWord: null,
	guessesRemaining: 10,
	startGame: function() {
		console.log('\nWelcome to Hangman - Lyrics Edition! You\'ll be guessing the missing lyrics from *your* favorite song of all time. GLHF!\n');
		this.resetGuesses();
		var randomizer = Math.floor(Math.random() * Game.wordBank.length);
		this.currentHint = Game.hintBank[randomizer];
		this.currentWord = new Word(Game.wordBank[randomizer]);
		this.keepPrompting();
	},
	resetGuesses: function() {
		this.guessesRemaining = 10;
	},
	keepPrompting: function() {
		console.log('~~~~~~~~~~~~~~~~~~~~\nHINT: ' + this.currentHint + '\n~~~~~~~~~~~~~~~~~~~~');
		var gameRef = this;
		prompt.get(['Guess_A_Letter'], function(err, result) {
			var upperGuess = result.Guess_A_Letter.toUpperCase();
			lettersGuessed += upperGuess;
			console.log('The letter you guessed is: ' + upperGuess);
			var guessChecker = gameRef.currentWord.guess(upperGuess);
			if (guessChecker === false) {
				console.log('Bad guess!');
				gameRef.guessesRemaining--;
			} else {
				console.log('Good guess!');
				if (gameRef.currentWord.bingo()) {
					console.log('====================\nCongrats, you won!' + '\nThe answer was: ' + gameRef.currentWord.word + '\n====================');
					return;
				}
			}
			console.log('********************\nGuesses remaining: ' + gameRef.guessesRemaining + '\n' + gameRef.currentWord.render() + '\nLetters already guessed: ' + lettersGuessed + '\n********************\n');
			if ((gameRef.guessesRemaining > 0) && (gameRef.currentWord.bingo() === false)) {
				gameRef.keepPrompting();
			} else if (gameRef.guessesRemaining === 0) {
				console.log('====================\nGame over...' + '\nThe answer was: ' + gameRef.currentWord.word + '\n====================');
			} else {
				console.log(gameRef.currentWord.render());
			}
		});
	}
};

game.startGame();