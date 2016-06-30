/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-14 20:52:10
 * @version $Id$
 */



console.time('haha');

var arr = [];
var count = 0;

function aa(){
	while(count < 100000){
		arr.push(count);
		count++
	}
	return arr;
}

console.log(aa())

console.timeEnd('haha')