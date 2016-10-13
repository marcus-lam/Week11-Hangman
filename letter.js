var Letter = function(input) {
	this.character = input;
	this.visible = false;
};

Letter.prototype.render = function() {
	return (this.visible) ? this.character : ' _ ';
};

module.exports = Letter;