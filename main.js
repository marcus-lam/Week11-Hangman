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
			var upperGuess = result.Guess_A_Letter.toUpperCase().trim();
			if (upperGuess.length === 1) {
				if (lettersGuessed.includes(upperGuess) === false) {
					lettersGuessed += upperGuess;
					console.log('The letter you guessed is: ' + upperGuess);
					var guessChecker = gameRef.currentWord.guess(upperGuess);
				} else {
					var duplicate = true;
				}
			}
			if (upperGuess.length == 0 || upperGuess.length >= 2) {
				console.log('\n!!! ERROR(Invalid Input): Before pressing ENTER, please input ONLY ONE valid character. !!!\n');
			} else if (duplicate === true) {
				console.log('\n!!! ERROR(Duplicate Input): You have already guessed this character. Please try something else. !!!\n');
			} else if (guessChecker === false) {
				console.log('Bad guess!');
				gameRef.guessesRemaining--;
				logProgress();
			} else {
				console.log('Good guess!');
				logProgress();
				if (gameRef.currentWord.bingo()) {
					console.log('====================\nCongrats, you won!' + '\nThe answer was: ' + gameRef.currentWord.word + '\n====================');
					rick();
					return;
				}
			}
			if ((gameRef.guessesRemaining > 0) && (gameRef.currentWord.bingo() === false)) {
				gameRef.keepPrompting();
			} else {
				console.log('====================\nGame over...' + '\nThe answer was: ' + gameRef.currentWord.word + '\n====================');
				rick();
			}
			function logProgress() {
				console.log('********************\nGuesses remaining: ' + gameRef.guessesRemaining + '\n' + gameRef.currentWord.render() + '\nLetters already guessed: ' + lettersGuessed + '\n********************\n');
			};
		});
	}
};

function rick() {
	console.log("\n............................... .......,-~~'''''''~~--,,_" + '\n' + "..................................,-~''-,:::::::::::::::::::''-," + '\n' + ".............................,~''::::::::',::::::: :::::::::::::|'," + '\n' + ".............................|::::::,-~'''___''''~~--~''':}" + '\n' + ".............................'|:::::|: : : : : : : : : : : : : : :|" + '\n' + ".............................|:::::|: : :-~~---: : : -----: |" + '\n' + "............................(_''~-': : : :o: : :|: :o: : : :|" + '\n' + ".............................'''~-,|: : : : : : ~---': : : :,'--NEVA GAHN" + '\n' + ".................................|,: : : : : :-~~--: : ::/ ----- GIVE YOU UHP" + '\n' + "............................,-''\':\: :'~,,_: : : : : _,-'" + '\n' + "......................__,-';;;;;\:''-,: : : :'~---~''/|\n");
};

game.startGame();