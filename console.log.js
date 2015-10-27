define('console', function(require, exports) {
	exports.log = function(msg) {
		if (window.console && console.log) {
			console.log(msg);
		} else {
			alert(msg);
		}
	};
});


seajs.use('console', function(console) {
	// now you can stop worrying about whether or not `console` is provided.
	// use it freely!
	console.log('hello world!');

	// well, we need to enhance the `console` module a bit.
	// for methods like console.warn, and method calls like console.log(msg1, msg2, msg3);
});