mui.ready(function() {
	
	var self=
	//加载招聘信息
	$.ajax({
		url: "http://192.168.43.223:8080/nebula/jobseeker/recruit/",
		async: false, 
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
	
	$(".rec li").on("tap", function() {
		//mui.toast("点击了");
		var i = $(this).index(); //当前索引值
                alert(i);
	mui.openWindow('detail.html', 'detail.html', {index:i});
	});
});