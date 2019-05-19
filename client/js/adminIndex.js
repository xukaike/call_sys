// 页面加载时获取数据
$(document).ready(function () {
	// 页面加载发送get请求，使用vue框架将数据动态绑定到html网页中
	// 这边做的是userTable中分页的处理
	var aBtn = document.getElementsByClassName("nums");
	var pre = document.getElementsByClassName("pre");
	var next = document.getElementsByClassName("next");
	var nowPage = 0; //定义当前页，默认值为0；
	var url = "http://120.77.249.23:8080/get_info";
	var data = {
		page: nowPage + 1
	}
	$.post(url, data, function (data) {
		var userTable = new Vue({
			el: '#userTable',
			data: {
				users: data
			},

			// 已完成模板已经渲染或el对应html渲染后
			mounted: function () {
				for (var i = aBtn.length; i--;) {
					aBtn[i].tab = i;
					aBtn[i].onclick = function () {
						aBtn[nowPage].className = "nums";
						nowPage = this.tab; //被点击后，保存当前页的序号 
						var data = {
							page: nowPage + 1
						}
						$.post(url, data, function (data) {
							userTable.users = data;
						})
						aBtn[nowPage].className = "nums active";
						// 根据nowPage来改变上一页、下一页按钮的状态
						pre[0].className = "pre";
						next[0].className = "next";
						if (nowPage == 0) {
							pre[0].className = "pre disabled";
							next[0].className = "next";
						} else if (nowPage == 7) {
							pre[0].className = "pre";
							next[0].className = "next disabled";
						}
					}
				}

				// 下一页点击事件
				next[0].onclick = function () {
					aBtn[nowPage].className = "nums";
					pre[0].className = "pre";
					next[0].className = "next";
					if (nowPage > 6) {
						next[0].className = "next disabled";
					} else {
						nowPage++;
						var data = {
							page: nowPage + 1
						}
						$.post(url, data, function (data) {
							userTable.users = data;
						})
					}
					if (nowPage == 7) {
						next[0].className = "next disabled";
					}
					aBtn[nowPage].className = "nums active";
				}

				// 上一页点击事件
				pre[0].onclick = function () {
					aBtn[nowPage].className = "nums";
					pre[0].className = "pre";
					next[0].className = "next";
					if (nowPage < 1) {
						pre[0].className = "pre disabled";
					} else {
						nowPage--;
						var data = {
							page: nowPage + 1
						}
						$.post(url, data, function (data) {
							userTable.users = data;
						})
					}
					if (nowPage == 0) {
						pre[0].className = "pre disabled";
					}
					aBtn[nowPage].className = "nums active";
				}
			}
		})
	})
});

// orderTable中分页的处理函数
function orderPageShow() {
	var aBtn = document.getElementsByClassName("nums-sec");
	var pre = document.getElementsByClassName("pre-sec");
	var next = document.getElementsByClassName("next-sec");
	//当前页，默认值为0；
	var orderPage = 0; 
	var url = "http://120.77.249.23:8080/get_order";
	var data = {
		page: orderPage + 1
	}
	$.post(url, data, function (data) {
		var orderTable = new Vue({
			el: '#orderTable',
			data: {
				orders: data
			},

			// 已完成模板已经渲染或el对应html渲染后
			mounted: function () {
				for (var i = aBtn.length; i--;) {
					aBtn[i].tab = i;
					aBtn[i].onclick = function () {
						aBtn[orderPage].className = "nums-sec";
						orderPage = this.tab; //被点击后，保存当前页的序号 
						var data = {
							page: orderPage + 1
						}
						$.post(url, data, function (data) {
							orderTable.orders = data;
						})
						aBtn[orderPage].className = "nums-sec active";
						// 根据orderPage来改变上一页、下一页按钮的状态
						pre[0].className = "pre-sec";
						next[0].className = "next-sec";
						if (orderPage == 0) {
							pre[0].className = "pre-sec disabled";
							next[0].className = "next-sec";
						} else if (orderPage == 7) {
							pre[0].className = "pre-sec";
							next[0].className = "next-sec disabled";
						}
					}
				}

				// 下一页点击函数
				next[0].onclick = function () {
					aBtn[orderPage].className = "nums-sec";
					pre[0].className = "pre-sec";
					next[0].className = "next-sec";
					if (orderPage > 6) {
						next[0].className = "next-sec disabled";
					} else {
						orderPage++;
						var data = {
							page: orderPage + 1
						}
						$.post(url, data, function (data) {
							orderTable.orders = data;
						})
					}
					if (orderPage == 7) {
						next[0].className = "next-sec disabled";
					}
					aBtn[orderPage].className = "nums-sec active";
				}

				// 上一页点击函数
				pre[0].onclick = function () {
					aBtn[orderPage].className = "nums-sec";
					pre[0].className = "pre-sec";
					next[0].className = "next-sec";
					if (orderPage < 1) {
						pre[0].className = "pre-sec disabled";
					} else {
						orderPage--;
						var data = {
							page: orderPage + 1
						}
						$.post(url, data, function (data) {
							orderTable.orders = data;
						})
					}
					if (orderPage == 0) {
						pre[0].className = "pre-sec disabled";
					}
					aBtn[orderPage].className = "nums-sec active";
				}
			}
		})
	})
}

window.onload = function() {
	orderPageShow();
}

// new Vue({
// 	el: '#orderTable',
// 	data: {
// 		orders: data["订单"]
// 	}
// })

// window.onload = function () {
// 	var aBtn = document.getElementsByClassName("nums");
// 	var pre = document.getElementsByClassName("pre");
// 	var next = document.getElementsByClassName("next");
// 	var nowPage = 0; //定义当前页，默认值为0；
// 	// 根据点击的按钮判断要显示的页数内容
// 	for (var i = aBtn.length; i--;) {
// 		aBtn[i].tab = i;
// 		aBtn[i].onclick = function () {
// 			console.log(111);
// 			nowPage = this.tab; //被点击后，保存当前页的序号 
// 			aBtn[nowPage].className = "nums";

// 			// 根据nowPage来改变上一页、下一页按钮的状态
// 			pre[0].className = "pre";
// 			next[0].className = "next";
// 			if (nowPage == 0) {
// 				pre[0].className = "pre disabled";
// 				next[0].className = "next";
// 			} else if (nowPage == 7) {
// 				pre[0].className = "pre";
// 				next[0].className = "next disabled";
// 			}
// 		}
// 	}
// }

// 将异步改为同步
// $.ajaxSetup({
// 	async: false
// });

// window.onload = function() {
// 	var userTable = document.getElementById("userTable");
// 	console.log(userTable);
// }

// window.onload = function() {
// 	// 获取页数按钮、上一页、下一页按钮
// 	var aBtn = document.getElementsByClassName("nums");
// 	var pre = document.getElementsByClassName("pre");
// 	var next = document.getElementsByClassName("next");
// 	var nowPage = 0; //定义当前页，默认值为0；

// 	// 加载全部数据并保存到一个every数组中
// 	var allData = document.getElementById("table");
// 	var every = [];
// 	for (var i = 0; i < allData.rows.length; i++) {
// 		var tmp = allData.rows[i].innerHTML;
// 		every.push('<tr>' + tmp + '</tr>')
// 	}

// 	// 根据数据量判断页数
// 	var length = parseInt(allData.rows.length / 5);
// 	var remainder = allData.rows.length % 5;
// 	if (remainder > 0) {
// 		length += 1;
// 	}

// 	// 第一次调用，初始化第一页表单数据
// 	tableControl(nowPage,every,length);

// 	// 根据点击的按钮判断要显示的页数内容
// 	for (var i = aBtn.length; i--;) {
// 		aBtn[i].tab = i;
// 		aBtn[i].onclick = function() {
// 			aBtn[nowPage].className = "nums";
// 			nowPage = this.tab; //被点击后，保存当前页的序号 
// 			tableControl(nowPage,every,length);

// 			// 根据nowPage来改变上一页、下一页按钮的状态
// 			pre[0].className = "pre";
// 			next[0].className = "next";
// 			if (nowPage == 0){
// 				pre[0].className = "pre disabled";
// 				next[0].className = "next";
// 			}else if (nowPage == 7){
// 				pre[0].className = "pre";
// 				next[0].className = "next disabled";
// 			}
// 		}
// 	}

// 	// 下一页按钮
// 	next[0].onclick = function() {
// 		aBtn[nowPage].className = "nums";
// 		pre[0].className = "pre";
// 		next[0].className = "next";
// 		if (nowPage > 6) {
// 			next[0].className = "next disabled";
// 		}else {
// 			nowPage++;
// 			tableControl(nowPage,every,length);
// 		}
// 		if (nowPage == 7) {
// 			next[0].className = "next disabled";
// 		}
// 		aBtn[nowPage].className = "nums active";
// 	}

// 	// 上一页按钮
// 	pre[0].onclick = function() {
// 		aBtn[nowPage].className = "nums";
// 		pre[0].className = "pre";
// 		next[0].className = "next";
// 		if (nowPage < 1) {
// 			pre[0].className = "pre disabled";
// 		}else {
// 			nowPage--;
// 			tableControl(nowPage,every,length);
// 		}
// 		if (nowPage == 0) {
// 			pre[0].className = "pre disabled";
// 		}
// 		aBtn[nowPage].className = "nums active";
// 	}
// }

// // 初始化的table表格显示控制
// function tableControl(nowPage,every,length) {
// 	var allData = document.getElementById("table");
// 	// 如果数据量没有那么多
// 	if(length-1 < nowPage){
// 		var noMore = '<h4 style = "margin-left:10px">没有更多数据了</h4>';
// 		allData.innerHTML = noMore;
// 		return;
// 	}

// 	// 定义一个空字符串，用于存放即将显示页面的数据
// 	var currentArr = "";
// 	// 提取every数组中的数据并替换原有数据
// 	for(var i = 0; i < 5; i++){
// 		if(every[5*nowPage + i] == undefined){
// 			break;
// 		}
// 		currentArr += every[5*nowPage + i];
// 	}
// 	allData.innerHTML = currentArr;
// }











