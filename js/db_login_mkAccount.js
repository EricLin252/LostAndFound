var state = "";

firebase.auth().onAuthStateChanged((user) => {
	if(user && state == "") re();
	else $(document).ready(function(){vue_init();});
});

function login(email, password){
	state = "login";
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((user) => {
		loginUser = user;
		re();
	})
	.catch((err) => {
		if(err.code == "auth/invalid-email") window.alert("email格式錯誤");
		else if(err.code == "auth/user-not-found") window.alert("你還沒創建帳號喔！");
		else if(err.code == "auth/wrong-password") window.alert("密碼錯誤");
		else window.alert('登入或是創建帳號時資料發生錯誤，請聯絡工作人員，或是使用 "登入發生問題"');
		console.log(err.code + ": " + err.message);
		state = "";
	});
}

function makeAccount(type, account, email, password){
	state = "makeAccount";
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(() => {
		loginUser = null;
		while(loginUser == null) loginUser = firebase.auth().currentUser;
		db.ref("/users/" + loginUser.uid).set({
			account: account,
			type: type
		})
		.then(() => {
			window.alert("恭喜你完成帳號創建，獲得指南針~\n所有個人資訊、登出、或是更改帳密，都可以在指南針裡找到喔！");
			re();
		});
	})
	.catch((err) => {
		console.log(err.code + ": " + err.message);
		if(err.code == "auth/email-already-in-use") window.alert("email已經被使用過了，請改用其他email");
		else if(err.code == "auth/invalid-email") window.alert("email格式錯誤");
		else if(err.code == "auth/weak-password") window.alert("密碼強度太弱了，建議換其他密碼喔！");
		else window.alert('創建帳號時資料發生錯誤，請聯絡工作人員，或是使用 "創帳發生問題"');
		state = "";
	});
}

function forgot_pwd(email){
	var result = true;
	if(email == "") window.alert("請先在email欄位填入遊戲使用的信箱，再按忘記密碼，密碼重置連結會送至此信箱");
	else{
		firebase.auth().sendPasswordResetEmail(email)
		.then(() => {
			window.alert("密碼重置連結已送至你的信箱，請至信箱更改新密碼");
		})
		.catch((err) => {
			if(err.code == "auth/invalid-email") window.alert("email格式錯誤");
			else if(err.code == "auth/user-not-found") window.alert("無此信箱紀錄");
			else window.alert('登入或是創建帳號時資料發生錯誤，請聯絡工作人員，或是使用 "登入發生問題"');
			console.log(err.code + ": " + err.message);
			result = false;
		});
	}
	
	return result;
}

function re(){
	var dst = window.location.href.split("?");
	if(dst.length == 1) dst = "index";
	else dst = dst[1];
	window.location = dst + ".html";
}