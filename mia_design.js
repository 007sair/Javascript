function runDesign(key){
	var key = key || 0;
	var arr_gh = [
		['477', '502', '377', '370', '36', '542'],
		['237', '232', '230', '507'],
		['414', '449', '476', '509', '86', '47'],
		['97', '99', '516', '240', '82', '339', '514'],
		['291', '316', '344', '252', '61', '257', '175'],
		['37', '506', '53', '321', '178'],
		['188'],
		['205', '166', '399', '323', '560', '567']
	];
	var arr_title = [
		'UI设计组（6人）',
		'市场设计组（4人）',
		'运营设计组（6人）',
		'品类一组（7人）',
		'品类二组（7人）',
		'品类三组（5人）',
		'摄影组',
		'制作组（6人）'
	];
	var count = 0;
	var new_tr = [];
	var totalArr = [];
	$('#catlistb tr').not("#nav").hide();
	for (var i = 0, len = arr_gh.length; i < len; i++) {
		for (var j = 0; j < arr_gh[i].length; j++) {
			$('#catlistb tr').filter(function () {
				if ($(this).find('td').eq(1).text() == arr_gh[i][j]) {
					if (key) {
						$(this).show();
					}else{
						new_tr.push($(this));
					}
				}
			})
		};
		if (!key) {
			$('#catlistb').append('<tr class="blank"><td colspan="8"><b>'+arr_title[i]+'</b></td></tr>');
		};
		new_tr.sort(function (a, b) {
			return +a.find('td').last().text() < +b.find('td').last().text();
		}).forEach(function (item) {
			item.show();
			$('#catlistb').append(item[0]);
		});
		totalArr = totalArr.concat(new_tr);
		new_tr = [];
	};

	if (key){
		$('#catlistb tr').not("#nav").not('.blank').not(':hidden').each(function () {
			count++;
			$(this).find('td').eq(0).text(count);
		});

	}else{
		var shortArr = totalArr.map(function (item) {
			return { num: item.find('td').eq(1).text(), timer: +item.find('td').last().text() }

		}).sort(function (a, b) {
			if (a.timer > b.timer) {
				return -1;
			}
			if (a.timer < b.timer) {
				return 1;
			}
			if (a.timer = b.timer) {
				return 0;
			}
		}).map(function (c) {
			return c.num;
		});
		$('#catlistb #nav').find('th').eq(0).after('<th>加班</th>');
		$('#catlistb tr').not("#nav").not('.blank').not(':hidden').each(function () {
			count++;
			// $(this).find('td').eq(0).text(count);
			var index = shortArr.indexOf($(this).find('td').eq(1).text()) + 1;
			$(this).find('td').eq(0).after('<td>' + index + '</td>')
		});
		$('#catlistb').css('overflow', 'hidden').find('th').each(function(index, el) {
			$(this).removeAttr('width');	
		});
	}
}

var miatimer = 1;
