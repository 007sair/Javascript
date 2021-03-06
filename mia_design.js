runDesign(function(key, arr) {

	var key = key || 0;
	var arr_staff = arr || [{
			tit: 'UI设计组（6人）',
			num: ['477', '502', '377', '370', '36', '542'],
			group: 'nontech'
		}, {
			tit: '市场设计组（4人）',
			num: ['237', '232', '230', '507'],
			group: 'nontech'
		}, {
			tit: '运营设计组（6人）',
			num: ['414', '449', '476', '509', '86', '47'],
			group: 'nontech'
		}, {
			tit: '品类一组（7人）',
			num: ['97', '99', '516', '240', '82', '339', '514'],
			group: 'nontech'
		}, {
			tit: '品类二组（7人）',
			num: ['291', '316', '344', '252', '61', '257', '175'],
			group: 'nontech'
		}, {
			tit: '品类三组（5人）',
			num: ['37', '506', '53', '321', '178'],
			group: 'nontech'
		}, {
			tit: '摄影组',
			num: ['188'],
			group: 'nontech'
		}, {
			tit: '制作组（6人）',
			num: ['205', '166', '399', '323', '560', '567'],
			group: 'tech'
		}, {
			tit: 'leader',
			num: ['171'],
			group: 'other'
		}
	];

	var count = 0;
	var new_tr = [];
	var totalArr = [];


	var shejiArr = ['477', '502', '377', '370', '36', '542', '337', '232', '230', '507', '414', '449', '476', '509', '86', '47', '97', '99', '516', '240', '82', '339', '514', '291', '316', '344', '252', '61', '257', '175', '37', '506', '53', '321', '178', '188']
	var zhizhuoArr = ['205', '166', '399', '323', '560', '567'];
	var otherArr = ['171'];
	var techArr = [],
		nontechArr = [],
		others = [];
	arr_staff.forEach(function(item) {
		if (item.group == "tech") {
			techArr = techArr.concat(item.num);
		}
		if (item.group == "nontech") {
			nontechArr = nontechArr.concat(item.num);
		}
		if (item.group == "other") {
			others = others.concat(item.num);
		}

	});
	if (nontechArr.length) {
		shejiArr = nontechArr;
		zhizhuoArr = techArr;
		otherArr = others;
	}
	var zhizhuooverTime = 0;
	var shejioverTime = 0;
	var otherverTime = 0;
	var totalNum = $('#catlistb tr').not("#nav").not("#total_list").length;
	var totaloverTime = +$('#total_list').find('td').last().text();
	// 获取制作部的加班总时间
	$('#catlistb tr').not("#nav").not("#total_list").filter(function() {
		var overtime = +$(this).find('td').last().text();
		var user = $(this).find('td').eq(1).text();
		if (zhizhuoArr.indexOf(user) != -1) {
			zhizhuooverTime += overtime;
		}
	})
	//获取设计部的加班总时间
	$('#catlistb tr').not("#nav").not("#total_list").filter(function() {
		var overtime = +$(this).find('td').last().text();
		var user = $(this).find('td').eq(1).text();
		if (shejiArr.indexOf(user) != -1) {
			shejioverTime += overtime;
		}
	})
	//摄影组的加班时间
	$('#catlistb tr').not("#nav").not("#total_list").filter(function() {
		var overtime = +$(this).find('td').last().text();
		var user = $(this).find('td').eq(1).text();
		if (otherArr.indexOf(user) != -1) {
			otherverTime += overtime;
		}
	})
	var avg = totaloverTime / totalNum;
	if (key == 2) {
		var bumen = +$('#department').val();
		if (bumen == 1) {
			//技术部;
			console.log("排除制作组的技术平均加班:" + (totaloverTime - zhizhuooverTime) / (totalNum - zhizhuoArr.length));
		}
		if (bumen == -1) {
			//非技术部;
			console.log("排除设计的非技术平均加班:" + (totaloverTime - shejioverTime) / (totalNum - shejiArr.length));
		}
		if (bumen == 0) {
			//设计总
			console.log("全设计的平均加班" + (shejioverTime + otherverTime + zhizhuooverTime) / (shejiArr.length + otherArr.length + zhizhuoArr.length));
		}



	} else {
		$('#catlistb tr').not("#nav").hide();
		for (var i = 0, len = arr_staff.length; i < len; i++) {
			for (var j = 0; j < arr_staff[i].num.length; j++) {
				$('#catlistb tr').filter(function() {
					if ($(this).find('td').eq(1).text() == arr_staff[i].num[j]) {
						if (key) {
							$(this).show();
						} else {
							new_tr.push($(this));
						}
					}
				})
			};
			if (!key) {
				$('#catlistb').append('<tr class="blank"><td colspan="8"><b>' + arr_staff[i].tit + '</b></td></tr>');
			};
			new_tr.sort(function(a, b) {
				return +a.find('td').last().text() < +b.find('td').last().text();
			}).forEach(function(item) {
				item.show();
				$('#catlistb').append(item[0]);
			});
			totalArr = totalArr.concat(new_tr);
			new_tr = [];
		};

		var desArr = totalArr.map(function(item) {
			return {
				num: item.find('td').eq(1).text(),
				timer: +item.find('td').last().text()
			}

		});
		var shortArr = desArr.sort(function(a, b) {
			if (a.timer > b.timer) {
				return -1;
			}
			if (a.timer < b.timer) {
				return 1;
			}
			if (a.timer == b.timer) {
				return 0;
			}
		}).map(function(c) {
			return c.num;
		});


		$('#catlistb #nav').find('th').eq(0).text('公司').after('<th>部门</th>');
		$('#catlistb tr').not("#nav").not('.blank').not(':hidden').each(function() {
			count++;
			var index = shortArr.indexOf($(this).find('td').eq(1).text()) + 1;
			if (key) {
				$(this).find('td').eq(0).after('<td>' + count + '</td>');
			} else {
				$(this).find('td').eq(0).after('<td>' + index + '</td>');
			}
		});
		$('#catlistb').css('overflow', 'hidden').find('th').each(function(index, el) {
			$(this).removeAttr('width');
		});

		$('#catlistb').find('th').each(function(index, el) {
			if (index < 4) {
				$(this).css('width', '10%');
			};
		});

		var html = $('#catlistb').find('tr').eq(0).html();

		$('.container').find('table.tbClass1').eq(1).find('tr').eq(0).html(html);


	}


})