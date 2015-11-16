/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-11-09 13:17:42
 * @version $Id$
 */
var supports = (function() {
	var div = document.createElement('div'),
		vendors = 'Khtml O Moz Webkit'.split(' '),
		len = vendors.length;
	return function(prop) {
		if (prop in div.style) return true;
		if ('-ms-' + prop in div.style) return true;
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		while (len--) {
			if (vendors[len] + prop in div.style) {
				return true;
			}
		}
		return false;
	};
})();

if (supports('textShadow')) {
	document.documentElement.className += ' textShadow';
}



/** 
* 判断浏览器是否支持某一个CSS3属性 
* @param {String} 属性名称 
* @return {Boolean} true/false 
* @version 1.0 
* @author ydr.me 
* 2014年4月4日14:47:19 
*/
function supportCss3(style) {
	var prefix = ['webkit', 'Moz', 'ms', 'o'],
		i,
		humpString = [],
		htmlStyle = document.documentElement.style,
		_toHumb = function(string) {
			return string.replace(/-(\w)/g, function($0, $1) {
				return $1.toUpperCase();
			});
		};
	for (i in prefix){
		humpString.push(_toHumb(prefix[i] + '-' + style));
	}
	humpString.push(_toHumb(style));
	for (i in humpString){
		if (humpString[i] in htmlStyle) return true;
	}
	return false;
}

console.log(supportCss3('transform'))