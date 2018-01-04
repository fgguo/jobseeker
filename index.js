mui.ready(function() {
	//加载用户信息
	$.ajax({
		url: "http://192.168.43.223:8080/nebula/jobseeker/searchInfo",
		type: "post",
		dataType: "json",
		success: function(json) {
			let username = json.result.username;
			let tel = json.result.tel;
			let email = json.result.email;
			let exp = json.result.exp;
			let type = json.result.type;
			$("#username").text(username);
			$(".type").text(type);
			$(".percent").css("width", exp % 1000 / 1000 * 100 + "%");
			$(".level").text("LV" + Math.floor(exp / 1000));
		},
		error: function() {
			mui.toast("执行错误");
		}
	});

	//加载最新的5条招聘信息
	$.ajax({
		url: "http://192.168.43.223:8080/nebula/jobseeker/recruit",
		type: "post",
		dataType: "json",
		data: {
			start: 0,
			length: 5
		},
		success: function(json) {
			let ul = $(".recruit ul");
			for(let one of json.result) {
				let id = one.id;
				let job = one.job;
				let salary = one.salary;
				let city = one.city;
				let education = one.education;
				let experience = one.experience;
				let name = one.name;
				let welfare = one.welfare;
				let type = one.type;
				let create_time = one.create_time;
				let li = `
					<li>
						<a>
							<div class="letter">${type.charAt(0)}</div>
							<div class="info">
								<h4>${job}</h4>
								<div>
									<span class="company">${name}</span>
									<span class="salary">${salary}</span>
								</div>
								<div>
									<i class="iconfont icon-coordinates_fill"></i>
									<span class="city">${city}</span>
									<i class="iconfont icon-people_fill"></i>
									<span class="education">${education}</span>
									<i class="iconfont icon-transaction_fill"></i>
									<span class="welfare">${welfare}</span>
								</div>
							</div>
						</a>
					</li>
				`;
				ul.append(li);
			}

		},
		error: function() {
			mui.toast("执行错误");
		}
	});
	
	//跳转页面
	$("#resume").click(function(){
		mui.openWindow('resume/resume.html', 'resume.html', {}); //跳转到简历
	});
	$("#recruit").click(function(){
		mui.openWindow('resume/recruit.html', 'recruit.html', {}); //跳转到招聘
	});
});