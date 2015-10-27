(function() {
	var Units = window.Units = {};
	var u = navigator.userAgent;
	Units.isIOS = function() {
		return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	};
	Units.isMobileIOS = function() {
		return /iPhone|iPad|iPod/i.test(u);
	};
	Units.isApp = function() {
		return !!u.match(/miyabaobei/);
	};
	Units.isTel = function(t) {
		var tel = $.trim(t);
		var reg = /^1\d{10}$/;
		return reg.test(tel);
	};
	Units.isQQ = function() {
		var ua = u.toLowerCase();
		if (ua.match(/qq\//i) == "qq/") {
			return true;
		} else {
			return false;
		}
	};
	Units.isWechat = function() {
		var ua = u.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	};
	Units.isZipcode = function(zipcode) {
		var reg = /^[0-9]{6}$/; //只允许为6位数字

		return reg.test(zipcode);
	};
	Units.trim = function(text) {
		if (typeof(text) == "string") {
			return text.replace(/^\s*|\s*$/g, "");
		} else {
			return text;
		}
	};
	Units.isIdcard = function(idCard) {
		idCard = Units.trim(idCard); //去掉字符串头尾空格                     
		if (idCard.length == 15) {
			return Units.isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证    
		} else if (idCard.length == 18) {
			var a_idCard = idCard.split(""); // 得到身份证数组   
			if (Units.isValidityBrithBy18IdCard(idCard) && Units.isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		var reg = /^[1-9][0-9]{5}$/; //只允许为6位数字

		return reg.test(zipcode);
	};

	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
	var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
	/**
	 * 判断身份证号码为18位时最后的验证位是否正确
	 * @param a_idCard 身份证号码数组
	 * @return
	 */
	Units.isTrueValidateCodeBy18IdCard = function(a_idCard) {
		var sum = 0;
		if (a_idCard[17].toLowerCase() == 'x') {
			a_idCard[17] = 10;
		}
		for (var i = 0; i < 17; i++) {
			sum += Wi[i] * a_idCard[i]; // 加权求和   
		}
		valCodePosition = sum % 11; // 得到验证码所位置   
		if (a_idCard[17] == ValideCode[valCodePosition]) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * 验证18位数身份证号码中的生日是否是有效生日
	 * @param idCard 18位书身份证字符串
	 * @return
	 */
	Units.isValidityBrithBy18IdCard = function(idCard18) {
		var year = idCard18.substring(6, 10);
		var month = idCard18.substring(10, 12);
		var day = idCard18.substring(12, 14);
		var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day), 13, 0, 0);
		// 这里用getFullYear()获取年份，避免千年虫问题   
		if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
			return false;
		} else {
			return true;
		}
	};

	/**
	 * 验证15位数身份证号码中的生日是否是有效生日
	 * @param idCard15 15位书身份证字符串
	 * @return
	 */
	Units.isValidityBrithBy15IdCard = function(idCard15) {
		var year = idCard15.substring(6, 8);
		var month = idCard15.substring(8, 10);
		var day = idCard15.substring(10, 12);
		var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
		// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
		if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
			return false;
		} else {
			return true;
		}
	}
})();