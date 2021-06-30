var debug = 1;

firebase.auth().onAuthStateChanged((user) => {
	if(user){//登入成功
		loginUser = user;
		console.log(loginUser.uid);
		db.ref("/users/" + loginUser.uid).once("value")
		.then((d) => {
			if(d.exists()){
				db_type = d.child("type").val();
				db_account = d.child("account").val();
				db_email = loginUser.email;
				if(d.child("LostAndFound").exists()) db_data = d.child("LostAndFound").val();
				else db_data = {};
			}
			else{//發生例外：有創建帳號卻沒有資料庫
				db.ref("/users/" + loginUser.uid).set({
					type: "",
					account: ""
				})
				.then(() => {
					window.alert('您在創建帳號時資料可能有誤，系統會跳轉至個人資料頁面補填個人資料，造成您的不便，敬請見諒><');
				});
			}
			console.log("db_data: ", db_data);
			console.log("user: ", db_account);
			$(document).ready(function(){vue_init();});
		})
		.catch((err) => {
			window.alert('登入或是創建帳號時資料發生錯誤，請聯絡工作人員，或是使用 "登入發生問題"');
			firebase.auth().signOut();
			console.log(err.code + ": " + err.message);
		});
	}
	else{//跳轉至登入頁面
		jr("login_and_makeAccount.html");
	}
});

function logout(){
	firebase.auth().signOut()
	.catch((err) => {
		window.alert("出現問題，請聯絡遊戲工作人員，或是使用" + ' "關於遊戲" ' + "頁面的" + ' "登入或創帳發生問題嗎？" ');
		console.log(err.code + ": " + err.message);
	});
}

function change_information(new_account, new_email, new_password){
	if(!window.confirm("確定要修改嗎？")) return;

	if(new_account != ""){
		db.ref("/users/" + loginUser.uid + "/account").set(new_account)
		.then(() => {
			window.alert("帳號更改成功！");
			account = new_account;
		})
		.catch(() => {
			window.alert('出現問題，請聯絡遊戲工作人員，或是使用 "關於遊戲" 頁面的 "登入或創帳發生問題嗎？"');
		});
	}

	if(new_email != ""){
		loginUser.updateEmail(new_email)
		.then(() => {
			window.alert("email更改成功！");
			email = new_email;
		})
		.catch((err) => {
			if(err.code == "auth/email-already-in-use") window.alert("email已經被使用過了，請改用其他email");
			else if(err.code == "auth/invalid-email") window.alert("email格式錯誤");
			else if(err.code == "auth/requires-recent-login"){
				window.alert("需要重新登入，請跳轉至登入頁面後重新登入後，再修改密碼。");
				logout();
			}
			else window.alert('出現問題，請聯絡遊戲工作人員，或是使用 "關於遊戲" 頁面的 "登入或創帳發生問題嗎？"');
			console.log(err.code + ": " + err.message);
		});
	}

	if(new_password != ""){
		loginUser.updatePassword(new_password)
		.then(() => {
			window.alert("密碼更改成功！");
		})
		.catch((err) => {
			if(err.code == "auth/weak-password") window.alert("密碼強度太弱了，建議換其他密碼喔！");
			else if(err.code == "auth/requires-recent-login"){
				window.alert("需要重新登入，請跳轉至登入頁面後重新登入後，再修改密碼。");
				logout();
			}
			else window.alert('出現問題，請聯絡遊戲工作人員，或是使用 "關於遊戲" 頁面的 "登入或創帳發生問題嗎？"');
			console.log(err.code + ": " + err.message);
		});
	}
}

function jr(dst){
	var FF = window.location.href.split(/[/\\]/);
	FF = FF[FF.length-1];
	FF = FF.split("\.")[0];
	if(FF != "") dst += "?" + FF;
	window.location = dst;
}