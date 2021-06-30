function vue_init(){
	var FF = window.location.href.split(/[/\\]/);
	FF = FF[FF.length-1];
	FF = FF.split("\.")[0];
	var q_num = FF[1];

	if(q_num-1 != 0 && !db_data["q"+(q_num-1)]){
		window.alert("你尚未完成前面的關卡，請按照順序完成關卡喔！");
		window.location = "index.html";
		return;
	}

	var selection = new Vue({
		el: "#selection",
		data: {
			db_ans: "",
			have_text: false
		},
		methods: {
			answerSubmit: function(ans){
				db.ref("users/" + loginUser.uid + "/LostAndFound/q" + q_num).set({
					ans: ans,
					ref: FF
				})
				.then(() => {
					db_data["q" + q_num] = {ans: ans, ref: FF};
					this.set_ans();
					$("#finish_script").slideDown();
					$("#background").show();
					$("#map_btn").hide();
					$("#tip_btn").hide();
					$("#finish_close").click(function(){
						$("#finish_script").slideUp(function(){
							$("#background").hide();
							$("#map_btn").show();
							$("#tip_btn").show();
						});
					});
				})
				.catch((err) => {
					console.log(err.code + ": " + err.message);
					window.alert("你尚未完成前面的關卡，請按照順序完成關卡喔！");
					window.location = "index.html";
				});
			},
			textSubmit: function(){
				this.db_ans = this.db_ans.replace(/\s+/g,"");
				if(this.db_ans == "" || this.db_ans == " "){
					window.alert("你尚未完成回答喔！");
					this.db_ans = "";
					return;
				}

				db.ref("users/" + loginUser.uid + "/LostAndFound/q" + q_num).set({
					ans: this.db_ans,
					ref: FF
				})
				.then(() => {
					db_data["q" + q_num] = {ans: this.db_ans, ref: FF};
					this.set_ans();
					$("#finish_script").slideDown();
					$("#background").show();
					$("#map_btn").hide();
					$("#tip_btn").hide();
					$("#finish_close").click(function(){
						$("#finish_script").slideUp(function(){
							$("#background").hide();
							$("#map_btn").show();
							$("#tip_btn").show();
						});
					});
				})
				.catch((err) => {
					console.log(err.code + ": " + err.message);
					window.alert("你尚未完成前面的關卡，請按照順序完成關卡喔！");
					window.location = "index.html";
				});
			},
			have_ans: function(num){
				return (!this.db_ans || this.db_ans == num);
			},
			unable: function(num){
				return this.db_ans == num;
			},
			set_ans: function(){
				this.have_text = true;
				this.db_ans = db_data["q" + q_num]["ans"];
				$(".multiselect").css("background-color", "gray");
				$("#tip").html($("#finish_script span").html());
				$("#tip_btn").css({
					"background-image": "url(img/t" + q_num + ".png)",
					"background-color": "rgba(255, 255, 255, 0.7)",
					"border": "solid 2px rgb(174, 194, 229)"
				});
				$("#tip_btn span").text("已完成");
			}
		}
	});

	if(db_data["q" + q_num]) selection.set_ans();

	$("#tip_btn").toggle(
		function(){
			$(this).toggleClass("tip_btn_open");
			$(this).css("background-position", "center center");
			$("#tip").slideDown();
			$("#background").show();
			$("#tip_btn span").hide();
			$("#map_btn").hide();
		},
		function(){
			$(this).toggleClass("tip_btn_open");
			$(this).css("background-position", "");
			$("#tip").slideUp(function(){
				$("#background").hide();
				$("#tip_btn span").show();
				$("#map_btn").show();
			});
		}
	);

	$(".infor_btn span").css("font-size", $(".infor_btn").width()/5 + "px");

	$("#loading").hide();
}