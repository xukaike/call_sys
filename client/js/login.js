var code; //在全局 定义验证码   
function createCode() {
	code = "";
	var codeLength = 6; //验证码的长度   
	var checkCode = document.getElementById("checkCode");
	var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
		'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符      
	for (var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 36);
		code += selectChar[charIndex];
	}
	if (checkCode) {
		checkCode.className = "code";
		checkCode.value = code;
		checkCode.blur();
	}
}

// 判断窗口大小来控制底部版权的显示
var copyright = function () {
	if ($(window).height() == $(document).height()) {
		$(".copyright").addClass("navbar-fixed-bottom");
	}
	else {
		$(".copyright").removeClass("navbar-fixed-bottom");
	}
}

window.onload = function () {
	createCode();
	copyright();
}

// jq的ready函数
$(document).ready(function () {
	var url = "http://120.77.249.23:8080/login";
	$("#login").click(function () {
		var id = document.getElementById("stuID").value;
		var password = document.getElementById("password").value;
		var inputCode = document.getElementById("validCode").value;
		if (stuID == "" || password == "") {
			alert("请输入账号密码！");
		} else if (stuID != "" && password != "") {
			if (inputCode.length <= 0) {
				alert("请输入验证码！");
			} else if (inputCode.toUpperCase() != code) {
				alert("验证码输入错误！");
				createCode(); //刷新验证码   
			} else {
				var data = {
					id: id,
					password: password
				}
				$.post(url, data, function (data, status) {
					if (data != "error") {
						switch (data[0].position) {
							case "user":
								alert("登录成功！");
								window.location.href = "userIndex.html";
								break;
							case "opt":
								alert("登录成功！");
								window.location.href = "operIndex.html";
								break;
							case "admin":
								alert("登录成功！");
								window.location.href = "adminIndex.html";
								break;
						}
					} else {
						alert("账号或密码错误，请重新输入！");
						createCode(); //刷新验证码
					}
				})
			}
		}
	});
});

// function validate() {
// 	var id = document.getElementById("stuID").value;
// 	var password = document.getElementById("password").value;
// 	var url = "http://120.77.249.23:8080/login?id=" + id + "&password=" + password;
// 	var data = {
// 		// "number": "45345345",
// 		// "password": "34567891"
// 	}
// 	var number = "45345345"
// 	var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
// 	httpRequest.open('post', url, true); //第二步：打开连接
// 	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
// 	httpRequest.send(1);//发送请求 将情头体写在send中
// 	/**
// 	 * 获取数据后的处理程序
// 	 */
// 	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
// 		if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
// 			var json = httpRequest.responseText;//获取到服务端返回的数据
// 			console.log(JSON.parse(json));
// 		}
// 	};
// 	// console.log(form);
// 	console.log(url);
// }

// function validate() {
// 	var stuID = document.getElementById("stuID").value;
// 	var password = document.getElementById("password").value;
// 	var inputCode = document.getElementById("validCode").value;
// 	if (stuID == "" || password == "") {
// 		alert("请输入账号密码！");
// 	} else if (stuID == "user" && password == "123") {  //user端
// 		if (inputCode.length <= 0) {
// 			alert("请输入验证码！");
// 		} else if (inputCode.toUpperCase() != code) {
// 			alert("验证码输入错误！");
// 			createCode(); //刷新验证码   
// 		} else {
// 			alert("登录成功！");
// 			window.location.href = "userIndex.html";
// 		}
// 	} else if (stuID == "oper" && password == "123") {  //oper端
// 		if (inputCode.length <= 0) {
// 			alert("请输入验证码！");
// 		} else if (inputCode.toUpperCase() != code) {
// 			alert("验证码输入错误！");
// 			createCode(); //刷新验证码   
// 		} else {
// 			alert("登录成功！");
// 			window.location.href = "operIndex.html";
// 		}
// 	} else if (stuID == "admin" && password == "123") {  //admin端
// 		if (inputCode.length <= 0) {
// 			alert("请输入验证码！");
// 		} else if (inputCode.toUpperCase() != code) {
// 			alert("验证码输入错误！");
// 			createCode(); //刷新验证码   
// 		} else {
// 			alert("登录成功！");
// 			window.location.href = "adminIndex.html";
// 		}
// 	} else {
// 		if (inputCode.length <= 0) {
// 			alert("请输入验证码！");
// 		} else if (inputCode.toUpperCase() != code) {
// 			alert("验证码输入错误！");
// 			createCode(); //刷新验证码   
// 		} else {
// 			alert("账号或密码错误，请重新输入！");
// 		}
// 	}
// }