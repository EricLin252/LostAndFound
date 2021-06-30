function vue_init(){
	var login_page = new Vue({
		el: "#login_page",
		data: {
			email: "",
			password: "",
			eye: false
		},
		methods: {
			login: function(){
				login(this.email, this.password);
			},
			forgot_pwd: function(){
				if(this.email != "") forgot_pwd(this.email);
				else window.alert("請先在email填入遊戲使用的信箱，再按忘記密碼，密碼重置連結會送至此信箱");
			},
			eye_switch: function(){
				this.eye = !this.eye;
			}
		},
		computed: {
			visible: function(){
				if(this.eye) return "text";
				else return "password";
			}
		}
	});

	var makeAccount_page = new Vue({
		el: "#makeAccount_page",
		data: {
			type: "student",
			account: "",
			email: "",
			password: "",
			check: "",
			eye: false
		},
		methods: {
			makeAccount: function(){
				if(this.check == this.password) makeAccount(this.type, this.account, this.email, this.password);
				else{
					window.alert("兩次密碼輸入不相同，請再次確認密碼是否正確喔！");
					this.password = "";
					this.check = "";
				}
			},
			eye_switch: function(){
				this.eye = !this.eye;
			}
		},
		computed: {
			placeholder_type: function(){
				switch(this.type){
				case "student":
					return "學號";
				case "teacher":
					return "員工代碼";
				case "other":
					return "自訂帳號(限英數字)";
				}
			},
			visible: function(){
				if(this.eye) return "text";
				else return "password";
			}
		}
	});

	var change_page_btn = new Vue({
		el: "#change_page",
		data: {
			isLogin: true,
			btn_text: "創建帳號",
			btn_style: "background-image: url('img/goRight_btn.png');",
			btn_class: "to_right",
			page_el: "#user_data"
		},
		methods: {
			change_page: function(){
				$(this.page_el).toggleClass("box_right");
				$(this.page_el).toggleClass("box_left");
				if(this.isLogin){
					this.btn_text = "登入";
					this.btn_style = "background-image: url('img/goLeft_btn.png');";
					this.btn_class = "to_left";
				}
				else{
					this.btn_text = "創建帳號";
					this.btn_style = "background-image: url('img/goRight_btn.png');";
					this.btn_class = "to_right";
				}
				this.isLogin = !this.isLogin;
			}
		}
	});

	$("#loading").hide();
}