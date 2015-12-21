runDesign(function(key, arr){

	var key = key || 0;
	var arr_staff = arr || [
		{
			tit : 'UI设计组（6人）',
			num : ['477', '502', '377', '370', '36', '542']
		},{
			tit : '市场设计组（4人）',
			num : ['237', '232', '230', '507']
		},{
			tit : '运营设计组（6人）',
			num : ['414', '449', '476', '509', '86', '47']
		},{
			tit : '品类一组（7人）',
			num : ['97', '99', '516', '240', '82', '339', '514']
		},{
			tit : '品类二组（7人）',
			num : ['291', '316', '344', '252', '61', '257', '175']
		},{
			tit : '品类三组（5人）',
			num : ['37', '506', '53', '321', '178']
		},{
			tit : '摄影组',
			num : ['188']
		},{
			tit : '制作组（6人）',
			num : ['205', '166', '399', '323', '560', '567']
		}
	];

	var count = 0;
	var new_tr = [];
	var totalArr = [];
	$('#catlistb tr').not("#nav").hide();
	for (var i = 0, len = arr_staff.length; i < len; i++) {
		for (var j = 0; j < arr_staff[i].num.length; j++) {
			$('#catlistb tr').filter(function () {
				if ($(this).find('td').eq(1).text() == arr_staff[i].num[j]) {
					if (key) {
						$(this).show();
					}else{
						new_tr.push($(this));
					}
				}
			})
		};
		if (!key) {
			$('#catlistb').append('<tr class="blank"><td colspan="8"><b>'+arr_staff[i].tit+'</b></td></tr>');
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

	var shortArr = totalArr.map(function (item) {
			return { num: item.find('td').eq(1).text(), timer: +item.find('td').last().text() }

	}).sort(function (a, b) {
		if (a.timer > b.timer) {
			return -1;
		}
		if (a.timer < b.timer) {
			return 1;
		}
		if (a.timer == b.timer) {
			return 0;
		}
	}).map(function (c) {
		return c.num;
	});
	$('#catlistb #nav').find('th').eq(0).text('公司').after('<th>部门</th>');
	$('#catlistb tr').not("#nav").not('.blank').not(':hidden').each(function () {
		count++;
		var index = shortArr.indexOf($(this).find('td').eq(1).text()) + 1;
		if (key) {
			$(this).find('td').eq(0).after('<td>' + count + '</td>');
		}else{
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
})