function Logout() {
	navigator.onLine = false;
	var user = localStorage.getItem("Username");
	var userRef = firebase.database().ref("User");
	userRef.orderByChild("UserName").equalTo(user).on('value', function(snapshot) {
		snapshot.forEach(function (childSnapshot) {
			userkey = childSnapshot.key;
			return true;
	    });
	    var statusRef = firebase.database().ref("User/"+userkey);
		statusRef.update({
			Status: "offline"
		});
	});
	location.href = '/login_page';
}

function Exits() {
	navigator.onLine = false;
	var user = localStorage.getItem("Username");
	var userRef = firebase.database().ref("User");
	userRef.orderByChild("UserName").equalTo(user).on('value', function(snapshot) {
		snapshot.forEach(function (childSnapshot) {
			userkey = childSnapshot.key;
			return true;
	    });
	    var statusRef = firebase.database().ref("User/"+userkey);
		statusRef.update({
			Status: "offline"
		});
	});
	//navigator.app.exitApp();
}