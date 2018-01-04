/**
 * 表单验证函数
 */
function validator(array) {
	for(var one in array) {
		var value = array[one].element;
		var regExp = new RegExp(array[one].pattern);
		var result = regExp.test(value);
		if(!result) {
			mui.toast(array[one].message);
			return false;
		}
	}
	return true;
}
mui.ready(function() {

	$(".navigator a").on("tap", function() {
		$(this).addClass("active");
		var login_pannel = $(".panel[name='login']");
		var registor_pannel = $(".panel[name='registor']");
		var login = $(".navigator a[name='login']");
		var registor = $(".navigator a[name='registor']");
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
		var array = [{
				element: $(".panel[name='login'] [name='username']").val(),
				pattern: "^[a-zA-Z0-9]{3,50}$",
				message: "用户名错误"
			},
			{
				element: $(".panel[name='login'] [name='password']").val(),
				pattern: "^[a-zA-Z0-9\`~!@#$%^&*\(\)\_+=<>?/:;\'\",\.]{3,50}$",
				message: "密码错误"
			}
		];

	    var bool = validator(array);
		if(bool) {
			var username = $(".panel[name='login'] [name='username']").val();
			var password = $(".panel[name='login'] [name='password']").val();

			$.ajax({
				type: "post",
				url: "http://192.168.43.223:8080/nebula/jobseeker/login",
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
		var array = [{
				element: $(".panel[name='registor'] [name='username']").val(),
				pattern: "^[a-zA-Z0-9]{3,50}$",
				message: "用户名错误"
			},
			{
				element: $(".panel[name='registor'] [name='password']").val(),
				pattern: "^[a-zA-Z0-9\`~!@#$%^&*\(\)\_+=<>?/:;\'\",\.]{3,50}$",
				message: "密码错误"
			},
			{
				element: $(".panel[name='registor'] [name='confirm']").val(),
				pattern: "^[a-zA-Z0-9\`~!@#$%^&*\(\)\_+=<>?/:;\'\",\.]{3,50}$",
				message: "确认密码错误"
			}
		];

		var  bool = validator(array);
		mui.toast(bool);
		if(bool) {
			var  username = $(".panel[name='registor'] [name='username']").val();
			var  password = $(".panel[name='registor'] [name='password']").val();
			var confirm = $(".panel[name='registor'] [name='confirm']").val();
			if(password != confirm) {
				mui.toast("两次输入密码不一致");
				return;
			}
			$.ajax({
				url: "http://192.168.43.223:8080/nebula/jobseeker/register",
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