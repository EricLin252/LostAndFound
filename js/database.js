var firebaseConfig = {
	apiKey: "AIzaSyCDzwv3_e8alepAAkHmGbjT6f3VXEO1ruk",
	authDomain: "icebrickhunt.firebaseapp.com",
	databaseURL: "https://icebrickhunt.firebaseio.com",
	projectId: "icebrickhunt",
	storageBucket: "icebrickhunt.appspot.com",
	messagingSenderId: "859695415101",
	appId: "1:859695415101:web:3a492972a0e384d73d0f54"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var loginUser, db_email, db_type, db_account, db_data;

$(document).ready(function(){
	$("#loading_bg").css("background-image", "url(img/bg" + (Math.floor(Math.random()*14)+1) + ".jpg)");
});