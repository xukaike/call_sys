var $income_box = $('#income_box'), //表格盒区域
	$income_table = $('#income_table'); //统计表格
var _height = $income_box.height(), //翻页高度
	trLen = $income_table.find('tr').length, //总记录条数
	perPage = 20, //每页显示行数
	_left = 29; //页码移动距离
var countPage = Math.ceil(trLen / perPage); //总页数
var page = 1; //起始页
//分页区
var $pages_box = $('#pages_box');
var $select_pages = $('#select_pages');
var $inner_pages = $pages_box.find('.J_pages');
$pages_box.find('span').eq(0).text('共' + trLen + '条'); //条数
$pages_box.find('span').eq(1).text(page + '/' + countPage + '页'); //页数
var aPages = ['<a href="javascript:void(0);" class="current">1</a>'];
var optionPages = ['<option value="1" selected="selected">第1页</option>'];
for (var i = 2; i <= countPage; i++) {
	aPages.push('<a href="javascript:void(0);">' + i + '</a>');
	optionPages.push('<option value="' + i + '">第' + i + '页</option>');
}
$inner_pages.append(aPages.join(''));
$select_pages.append(optionPages.join(''));

if (countPage <= 5) { //总页数小于5页
	$pages_box.find('.pages').width(29 * countPage);
} else {
	$pages_box.find('.pages').width(145);
}
//点击某一页
$inner_pages.find('a').off().on('click', function(e) {
	if (!$income_table.is(":animated")) {
		$(this).addClass('current').siblings().removeClass('current');
		var index = $(this).index();
		page = index + 1;
		//表格移动
		$income_table.stop().animate({
			'top': -1 * (_height * index) + "px"
		}, 800);
		$select_pages.val(index + 1);
		$pages_box.find('span').eq(1).text(index + 1 + '/' + countPage + '页'); //页数
		if (countPage > 5) {
			if (page > 3 && page < countPage - 1) {
				$inner_pages.stop().animate({
					'left': -1 * (_left * (page - 3)) + "px"
				}, 800);
			}
			if (page == 1 || page == 2 || page == 3) {
				$inner_pages.stop().animate({
					'left': 0 + "px"
				}, 800);
			}
			if (page == countPage || page == countPage - 1 || page == countPage - 2) {
				$inner_pages.stop().animate({
					'left': -1 * (_left * (countPage - 5)) + "px"
				}, 800);
			}
		}
	}
});

//点击下拉页中的某一页
$select_pages.on('change', function(e) {
	if (!$income_table.is(":animated")) {
		var index = parseInt($(this).val());
		page = index;
		$inner_pages.find('a').eq(index - 1).addClass('current').siblings().removeClass('current');
		//表格移动
		$income_table.stop().animate({
			'top': -1 * (_height * (index - 1)) + "px"
		}, 800);
		$pages_box.find('span').eq(1).text(index + '/' + countPage + '页'); //页数
		if (countPage > 5) {
			if (page > 3 && page < countPage - 1) {
				$inner_pages.stop().animate({
					'left': -1 * (_left * (page - 3)) + "px"
				}, 800);
			}
			if (page == 1 || page == 2 || page == 3) {
				$inner_pages.stop().animate({
					'left': 0 + "px"
				}, 800);
			}
			if (page == countPage || page == countPage - 1 || page == countPage - 2) {
				$inner_pages.stop().animate({
					'left': -1 * (_left * (countPage - 5)) + "px"
				}, 800);
			}
		}

	}

});

//上一页
$pages_box.find('.prev').off().on('click', function(e) {
	if (!$income_table.is(":animated")) {
		if (page == 1) {
			$income_table.stop();
			$inner_pages.stop();
		} else {
			$income_table.animate({
				'top': "+=" + _height + "px"
			}, 800);
			if (countPage > 5) {
				if (page > 3 && page < countPage - 1) {
					$inner_pages.animate({
						'left': "+=" + _left + "px"
					}, 800);
				}
				if (page == 1 || page == 2 || page == 3) {
					$inner_pages.stop().animate({
						'left': 0 + "px"
					}, 800);
				}
				if (page == countPage || page == countPage - 1) {
					$inner_pages.stop().animate({
						'left': -1 * (_left * (countPage - 5)) + "px"
					}, 800);
				}
			}

			page--;
			$inner_pages.find('a').eq(page - 1).addClass('current').siblings().removeClass('current');
			$select_pages.val(page);
			$pages_box.find('span').eq(1).text(page + '/' + countPage + '页'); //页数

		}
	}

});
//下一页
$pages_box.find('.next').off().on('click', function(e) {
	if (!$income_table.is(":animated")) {
		if (page == countPage) {
			$income_table.stop();
			$inner_pages.stop();
		} else {
			$income_table.animate({
				'top': "-=" + _height + "px"
			}, 800);
			if (countPage > 5) {
				if (page >= 3 && page < countPage - 1) {
					$inner_pages.animate({
						'left': "-=" + _left + "px"
					}, 800);
				}
				if (page == 1 || page == 2) {
					$inner_pages.stop().animate({
						'left': 0 + "px"
					}, 800);
				}
				if (page == countPage || page == countPage - 1 || page == countPage - 2) {
					$inner_pages.stop().animate({
						'left': -1 * (_left * (countPage - 5)) + "px"
					}, 800);
				}
			}
			page++;
			$inner_pages.find('a').eq(page - 1).addClass('current').siblings().removeClass('current');
			$select_pages.val(page);
			$pages_box.find('span').eq(1).text(page + '/' + countPage + '页'); //页数
		}
	}

});
