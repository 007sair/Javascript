function Fn (name) {
	this.get = function(){
		console.log(name)
	}
}
var a = new Fn('long');

a.get();