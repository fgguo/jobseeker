/**
 * 表单验证函数
 */
function validator(array) {
	for(let one of array) {
		let value = one.element.val();
		let regExp = new RegExp(one.pattern);
		let result = regExp.test(value);
		if(!result) {
			mui.toast(one.message);
			return false;
		}
	}
	return true;
}

mui.ready(function() {

	$(".navigator a").on("tap", function() {
		$(this).addClass("active");
		let login_pannel = $(".panel[name='login']");
		let registor_pannel = $(".panel[name='registor']");
		let login = $(".navigator a[name='login']");
		let registor = $(".navigator a[name='registor']");
		//显示密码登录
		if($(this).attr("name") == "login") {
			registor.removeClass("active");
			registor_pannel.hide();
			login_pannel.show();
		}
		//显示新用户注册
		else {
			login.removeClass("active");
			login_pannel.hide();
			registor_pannel.show();
		}
	});

	$(".panel[name='login']").show(); //初始显示登录面板

	/**
	 * 用户登陆
	 */
	$("#login-btn").on("tap", function() {
		let array = [{
				element: $(".panel[name='login'] [name='username']"),
				pattern: "^[a-zA-Z0-9]{3,50}$",
				message: "用户名错误"
			},
			{
				element: $(".panel[name='login'] [name='password']"),
				pattern: "^[a-zA-Z0-9\`~!@#$%^&*\(\)\_+=<>?/:;\'\",\.]{3,50}$",
				message: "密码错误"
			}
		];

		let bool = validator(array);

		if(bool) {
			let username = $(".panel[name='login'] [name='username']").val();
			let password = $(".panel[name='login'] [name='password']").val();

			$.ajax({
				type: "post",
				url: resource.nebula.host + "/jobseeker/login",
				data: {
					username: username,
					password: password
				},
				success: function(json) {
					if(json.result) {
						mui.openWindow('index.html', 'index.html', {}); //跳转到登陆界面
					} else {
						mui.toast("登录失败");
					}
				},
				error: function() {
					mui.toast("执行错误");
				}
			});
		}
	});

	/**
	 * 用户注册
	 */
	$("#registor-btn").on("tap", function() {
		let array = [{
				element: $(".panel[name='registor'] [name='username']"),
				pattern: "^[a-zA-Z0-9]{3,50}$",
				message: "用户名错误"
			},
			{
				element: $(".panel[name='registor'] [name='password']"),
				pattern: "^[a-zA-Z0-9\`~!@#$%^&*\(\)\_+=<>?/:;\'\",\.]{3,50}$",
				message: "密码错误"
			},
			{
				element: $(".panel[name='registor'] [name='confirm']"),
				pattern: "^[a-zA-Z0-9\`~!@#$%^&*\(\)\_+=<>?/:;\'\",\.]{3,50}$",
				message: "确认密码错误"
			}
		];

		var bool = validator(array);
		if(bool) {
			let username = $(".panel[name='registor'] [name='username']").val();
			let password = $(".panel[name='registor'] [name='password']").val();
			let confirm = $(".panel[name='registor'] [name='confirm']").val();
			if(password != confirm) {
				mui.toast("两次输入密码不一致");
				return;
			}
			$.ajax({
				url: resource.nebula.host + "/jobseeker/add",
				type: "post",
				dataType: "json",
				data: {
					username: username,
					password: password
				},
				success: function(json) {
					if(json.result) {
						mui.toast("注册成功");
						mui.openWindow('index.html', 'index.html', {}); //跳转到登陆界面
					} else {
						mui.toast("用户名被占用");
					}
				},
				error: function() {
					mui.toast("执行错误");
				}
			});
		}
	});

});