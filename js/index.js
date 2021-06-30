function vue_init(){
	var map = new Vue({
		el: "#map",
		data: {
			now_state: 1,
			q1: {top: 75, left: 38, width: 2.5},
			q2: {top: 47, left: 72.5, width: 2.5},
			q3: {top: 38, left: 55.5, width: 2.5},
			q4: {top: 26, left: 38, width: 2.5},
			q5: {top: 38, left: 24, width: 2.5},
			q6: {top: 62, left: 69.6, width: 1.75},
			q7: {top: 61, left: 31.6, width: 1.75},
			q8: {top: 63, left: 69.6, width: 1.75}
		},
		methods: {
			switch_down: function(){
				if(this.now_state < 8) this.now_state ++;
			},
			switch_up: function(){
				if(this.now_state > 1) this.now_state --;
			},
			have_data: function(num){
				if(db_data["q" + num]) return true;
				return false;
			},
			unable_bg: function(num){
				if(!this.have_data(num)) return "background-image: none;";
				else return "";
			},
			focus_on: function(num){
				if(this.now_state < 0 && this.have_data(num)) return "select_rect selected";
				if(num == this.now_state) return "select_rect selected";
				else return "select_rect";
			},
			go_q: function(num){
				if(this.have_data(num) && (this.now_state == num || this.now_state < 0)) window.location = db_data["q" + num].ref + ".html";
			}
		},
		computed: {
			anchor: function(){
				if(this.now_state < 0) return "";
				var style = "width: " + (this["q" + this.now_state].width*100) + "%; ";
				var trans = "transform: translate(" + this["q" + this.now_state].left + "%, " + this["q" + this.now_state].top + "%); ";
				return style + "-webkit-" + trans + trans;
			}
		}
	});

	var user_infor = new Vue({
		el: "#user_infor",
		data: {
			new_account: "",
			new_email: "",
			new_password: "",
			account: db_account,
			email: db_email,
			type: db_type
		},
		methods: {
			logout: function(){
				logout();
			},
			change_information: function(){
				change_information(this.new_account, this.new_email, this.new_password);
				this.new_account = "";
				this.new_email = "";
				this.new_password = "";
				this.account = db_account;
				this.email = db_email;
				this.type = db_type;
			}
		},
		computed: {
			type_text: function(){
				switch(this.type){
				case "student":
					return "學號";
				case "teacher":
					return "教職員編號";
				case "other":
					return "帳號";
				default:
					return "";
				}
			}
		}
	});

	var prev = new Vue({
		el: "#prev",
		methods: {
			switch_up: function(){
				map.switch_up();
			}
		},
		computed: {
			have_data: function(){
				return map.have_data(map.now_state-1);
			}
		}
	});

	var next = new Vue({
		el: "#next",
		methods: {
			switch_down: function(){
				map.switch_down();
			}
		},
		computed: {
			have_data: function(){
				if(map.now_state == 8) return false;
				return map.have_data(map.now_state);
			}
		}
	});

	var footer = new Vue({
		el: "#footer",
		computed:{
			finish: function(){
				return map.have_data(8);
			}
		}
	});

	$("#user_infor_btn").toggle(
		function(){
			$(this).toggleClass("user_infor_open");
			$("#user_infor").slideDown();
			$("#background").show();
			$("#user_infor_btn span").hide();
			$("#game_infor_btn").hide();
		},
		function(){
			$(this).toggleClass("user_infor_open");
			$("#user_infor").slideUp(function(){
				$("#background").hide();
				$("#user_infor_btn span").show();
				$("#game_infor_btn").show();
			});
		}
	);

	$("#game_infor_btn").toggle(
		function(){
			$(this).toggleClass("game_infor_open");
			$("#game_infor").slideDown();
			$("#background").show();
			$("#game_infor_btn span").hide();
			$("#user_infor_btn").hide();
		},
		function(){
			$(this).toggleClass("game_infor_open");
			$("#game_infor").slideUp(function(){
				$("#background").hide();
				$("#game_infor_btn span").show();
				$("#user_infor_btn").show();
			});
		}
	);

	$("#magnifier").toggle(
		function(){
			map.now_state *= -1;
			$(this).css("background-image", "url(img/mag_minus.png)");
			$("body").toggleClass("centered");
		},
		function(){
			map.now_state *= -1;
			$(this).css("background-image", "url(img/mag_plus.png)");
			$("body").toggleClass("centered");
		}
	);

	$(".infor_btn span").css("font-size", $(".infor_btn").width()/5 + "px");

	var i = 1;
	for(i; i < 8 && db_data["q"+i]; i++);
	map.now_state = -i;

	var body_ratio = $("body").height()/$("body").width();
	var x_shift = 50, y_shift = 50;
	for(i = 1; i <= 8; i++){
		map["q"+i].left -= x_shift/map["q"+i].width;
		map["q"+i].top -= y_shift/map["q"+i].width*body_ratio;
		map["q"+i].left *= -1;
		map["q"+i].top *= -1;
	}

	$("#loading").hide();
}