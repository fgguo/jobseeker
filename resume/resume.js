function clickItem(json) {
	let type = json.type;
	let callback;
	if(type == "picker") {
		callback = function() {
			let obj = $(this);
			let picker = new mui.PopPicker();//初始化滚动条
			let value = obj.find(".value").data("value"); //控件原有值
			picker.setData(json.data);//初始化，显示json.data的值
			picker.pickers[0].setSelectedValue(value)
			picker.show(function(items) {
				let element = obj.find(".value");
				element.html(items[0].value + "<i class='iconfont icon-enter'></i>");//
				element.data("value", items[0].value)
				picker.dispose();
			});
		}
	} else if(type == "prompt") {
		callback = function() {
			let obj = $(this);
			mui.prompt(json.message, json.placeholder, json.title, json.btn, function(result) {
				if(result.index == 1) {
					let element = obj.find(".value");
					let regExp = new RegExp(json.pattern);
					if(regExp.test(result.value)) {
						element.html(result.value + json.unit + "<i class='iconfont icon-enter'></i>");
					} else {
						mui.toast("填写错误");
					}
				}

			}, 'div');
		}

	} else if(type == "datePicker") {
		callback = function() {
			let obj = $(this);
			let dtPicker = new mui.DtPicker({
				type: "date",
				beginDate: new Date(1900, 01, 01),//设置开始日期  
    			endDate: new Date(2017, 12, 31),//设置结束日期 
			});
			dtPicker.show(function(items) {
				let element = obj.find(".value");
				let year = items.y.value;
				let month = items.m.value;
				let date = items.d.value;
				let temp = year + "-" + month + "-" + date;
				element.html(temp + "<i class='iconfont icon-enter'></i>");
				dtPicker.dispose();
			});
		}
	}
	$(json.el).on("tap", callback);

	if(type == "editor") {
		/*let obj = $(json.el);//获取<a>标签节点
		let element = obj.find(".value");//获取<a>标签中class='value'的节点
		mui.toast(element.data("value"));*/
		var editor = new Eleditor({
			el: json.el,
			toolbars: [
				"editText",
				"deleteThis",
				"cancel"
			]
		});
		$(json.el).data("editor",editor);//向div块中添加信息
		

	}

}
mui.ready(function() {
	
			$.ajax({
				type: "post",
				async: false, 
				url: "http://192.168.43.223:8080/nebula/jobseeker/resume",
				success: function(json) {
				let ul = $("body");
				let	sex=json.result.sex;
				let	birthday=json.result.birthday;
				let	height=json.result.height;
				let	weight=json.result.weight;
				let	marriage=json.result.marriage;
				let	ancestral_home=json.result.ancestral_home;
				let	tel=json.result.tel;
				let	email=json.result.email;
				let	education=json.result.education;
				
				let li = `
				<div class="mui-content">
			<div class="resume">
				<div class="header-extra"></div>
				<div class="userinfo">
					<dl>
						<dt>
							<a name="photo">
								<h4>头像</h4>
								<img src="../img/user.jpg" class="photo"/>
							</a>
						</dt>
						<dt>
							<a name="name">
								<span class="label">姓名</span>
								<span class="value">赵萌萌<i class="iconfont icon-enter"></i></span>
							</a>
						</dt>
						<dt>
							<a href="">
								<span class="label">会员等级</span>
								<span class="value">普通会员<i class="iconfont icon-enter"></i></span>
							</a>
						</dt>
					</dl>
				</div>
				<div id="info" class="card">
					<dl>
						<dt>基本资料</dt>
						<dd>
							<a id="sex">
								<span class="label">性别</span>
								<span class="value" data-value="女">${sex}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a id="birthday">
								<span class="label">生日</span>
								<span class="value">${birthday}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a id="height">
								<span class="label">身高</span>
								<span class="value">${height}cm<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a id="weight">
								<span class="label">体重</span>
								<span class="value">${weight}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a id="marriage">
								<span class="label">婚姻状况</span>
								<span class="value" data-value="未婚">${marriage}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a id="ancestral_home">
								<span class="label">籍贯</span>
								<span class="value">${ancestral_home}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a name="education">
								<span class="label">学历</span>
								<span class="value" data-value="本科">${education}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a id="tel">
								<span class="label">电话</span>
								<span class="value"${tel}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
						<dd>
							<a id="email">
								<span class="label">邮箱</span>
								<span class="value">${email}<i class="iconfont icon-enter"></i></span>
							</a>
						</dd>
					</dl>
				</div>
		
			</div>

		</div>
				`;
				ul.append(li);
			
		},
		error: function() {
			mui.toast("执行错误");
		}
			});
	let array = [
		{
			el: "#sex",
			type: "picker",
			data: [{
				value: '男',
				text: '男'
			}, {
				value: '女',
				text: '女'
			}]
		}, {
			el: "#birthday",
			type: "datePicker"
		},
		{
			el: "#height",
			message: "请输入您的身高",
			placeholder: "",
			title: "身高",
			btn: ["取消", "确认"],
			unit: "cm",
			pattern: "^[12][0-9]{2}$",
			type: "prompt"
		},
		{
			el: "#weight",
			message: "请输入您的体重",
			placeholder: "",
			title: "体重",
			btn: ["取消", "确认"],
			unit: "kg",
			pattern: "^[1]?[0-9]{1,2}$",
			type: "prompt"
		},

		{
			el: "#marriage",
			data: [{
				value: '未婚',
				text: '未婚'
			}, {
				value: '已婚',
				text: '已婚'
			}],
			type: "picker"
		},
		{
			el: "#ancestral_home",
			message: "输入您的籍贯",
			placeholder: "",
			title: "籍贯",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[\u4e00-\u9fa5]{2,4}$",
			type: "prompt"
		},
		{
			el: "#info [name='education']",
			data: [{
				value: '无',
				text: '无'
			}, {
				value: '中专',
				text: '中专'
			}, {
				value: '大专',
				text: '大专'
			}, {
				value: '本科',
				text: '本科'
			}, {
				value: '研究生',
				text: '研究生'
			}, {
				value: '博士',
				text: '博士'
			}],
			type: "picker"
		},
		{
			el: "#tel",
			message: "输入您的电话",
			placeholder: "",
			title: "电话",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[1][0-9]{10}$",
			type: "prompt"
		},
		{
			el: "#email",
			message: "输入您的邮箱",
			placeholder: "",
			title: "邮箱",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$",
			type: "prompt"
		}, {
			el: "#job_demand [name='place']",
			message: "输入您理想的工作地点",
			placeholder: "",
			title: "工作地点",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[\u4e00-\u9fa5]{2,4}$",
			type: "prompt"
		}, {
			el: "#job_demand [name='salary']",
			message: "输入您理想的薪资",
			placeholder: "",
			title: "薪资",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[0-9]{1,10}$",
			type: "prompt"
		}, {
			el: "#job_demand [name='job']",
			message: "输入您理想的岗位",
			placeholder: "",
			title: "岗位",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[\u4e00-\u9fa5]{2,20}$",
			type: "prompt"
		}, {
			el: "#job_demand [name='hiredate']",
			type: "datePicker"
		}
	];
	$(".operate").on("tap", function() {//修改操作
		if($(this).text() == "修改") {
			$(this).text("保存");//改为“保存”
			//检查修改操作
			for(let one of array) {
				clickItem(one);
			}
			
		} else {//保存操作
			$(this).text("修改");
			//要在这里通过ajax将数据更新到数据库
			for(let one of array) {
				if(one.type == "editor") {//销毁文本编辑操作
					let editor=$(one.el).data("editor");
					editor.destory();
					$(one.el).removeData("editor");//删除之前
				} else {
					$(one.el).unbind("tap");//解除点击事件
				}
			}
			var name = $(".userinfo [name='name']").find(".value").text();
			var sex = $("#info [id='sex']").find(".value").text();//.val();
			var birthday = $("#info [id='birthday']").find(".value").text();
			var height = $("#info [id='height']").find(".value").text();
			var weight = $("#info [id='weight']").find(".value").text();
			var marriage = $("#info [id='marriage']").find(".value").text();
			var ancestral_home = $("#info [id='ancestral_home']").find(".value").text();
			var tel = $("#info [id='tel']").find(".value").text();
			var email = $("#info [id='email']").find(".value").text();
			var education = $("#info [name='education']").find(".value").text();
           
			
			//向后台传数据
			$.ajax({
				type: "post",
				async: false, 
				url: "http://192.168.43.223:8080/nebula/jobseeker/update",
				data: {
					name:name ,
					sex:sex,
					birthday:birthday,
					height:height,
					weight:weight,
					marriage:marriage,
					ancestral_home:ancestral_home,
					tel:tel,
					email:email,
					education:education
				},
				success: function(json) {
						if(json.result){
							mui.toast("修改成功！");
				}
						else{
							mui.toast("修改失败！");
						}
						
		},
		error: function() {
			mui.toast("执行错误");
		}
			});
		}
	});
	
});

//					$(one.el).removeAttr("Eleditor-Inited");

