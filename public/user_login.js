var provider = new firebase.auth.FacebookAuthProvider();

function facebookSignin() {
   firebase.auth().signInWithPopup(provider)
   
   .then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
		console.log(token)
		console.log(user)
		console.log("You are logged in");
		window.location.href = '/main_page';
   }).catch(function(error) {
		console.log(error.code);
		console.log(error.message);
   });
}

function saveOnclick() {
	var username = document.getElementById('userName');
	checkIfUserExists(username);
}

function LoggedIn() {
	var username = document.getElementById('userName');
	localStorage.setItem("Page", '/main_page');
	loginChecking(username);
}

function loginChecking(username) {
	var userRef = new firebase.database().ref("User/");
	var username = document.getElementById('userName');
	var password = document.getElementById('password');

	userRef.orderByChild("UserName").once('value').then(function(dataSnapshot) {
		console.log(dataSnapshot.val());
	});

	userRef.orderByChild("UserName").equalTo(username.value).once('value', function(snapshot) {
		console.log(snapshot.val());
		var userCheck = (snapshot.val() !== null);
		var ukey;

	    snapshot.forEach(function (childSnapshot) {
	      ukey = childSnapshot.key;
	      return true;
	    });
	    if (ukey) {
			console.log("Found user: " + username.value);
	    } else {
			console.log("User not found.");
	    }
		console.log("username key : "+ ukey);

		userRef.orderByChild("Password").equalTo(password.value).once('value', function(snapshot) {
			var passwordCheck = (snapshot.val() !== null);
			var pkey;

		    snapshot.forEach(function (childSnapshot) {
				pkey = childSnapshot.key;
				return true;
			});
			if (pkey) {
				console.log("Found password: " + password.value);
			} else {
				console.log("Password not found.");
			}
			console.log("password key : "+ pkey);

			//login data checking
			if((userCheck == true) && (ukey == pkey)) {
				console.log("You are logged in");
				
				localStorage.setItem("Username", username.value);
				window.location.href = '/main_page';
			} else if(userCheck == false && (ukey != pkey)){
				alert('Please check your username and password.');
				console.log("You connot logged in");
			}
    	});
    });
}

function insertData(username,fname,lname,email,password) {
	var firebaseRef = firebase.database().ref("User");
	firebaseRef.push({
		UserName: username,
		FirstName: fname,
		LastName: lname,
		Password: password,
		Email: email
	});
	console.log("insert data success!");
}

function userExistsCallback(username,exists) {
	if (exists) {
		alert('user ' + username + ' exists!');
	} else {
		alert('user ' + username + ' does not exist!');
	}
}

function checkIfUserExists(username) {
	var usersRef = new firebase.database().ref("User/");
	var fname = document.getElementById('firstName');
	var lname = document.getElementById('lastName');
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	
	usersRef.orderByChild("UserName").equalTo(username.value).once('value', function(snapshot) {
		var exists = (snapshot.val() !== null);
		userExistsCallback(username, exists);
		ValidateEmail(email);

		// var key;
	 //    snapshot.forEach(function (childSnapshot) {
	 //      key = childSnapshot.key;
	 //      return true; // Cancel further enumeration.
	 //    });
	 //    if (key) {
	 //      console.log("Found user: " + key);
	 //    } else {
	 //      console.log("User not found.");
	 //    }
		// console.log(snapshot.key);

		if(exists || ValidateEmail(email) == false || ValidatePasswordLenght(password) == false) {
			console.log("insert data not success!!!");
		} else if(exists == false && ValidateEmail(email) == true && ValidatePasswordLenght(password) == true){
			insertData(username.value,fname.value,lname.value,email.value,password.value);
		}
    });
}

function ValidateEmail(email)
{
	var email = document.getElementById('email');
	var x = email.value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid e-mail address");
        return false;
    } else { return true;}
}

function ValidateLang()
{
	$(":input").not("#email").keypress(function(event){
        var ew = event.which;
        if(ew == 32)
            return true;
        if(48 <= ew && ew <= 57)
            return true;
        if(65 <= ew && ew <= 90)
            return true;
        if(97 <= ew && ew <= 122)
            return true;
        return false;
    });
}

function ValidatePasswordLenght(password)
{
	var password = document.getElementById('password');
    if(password.value.length < 8) {
        return false;
	} else { return true;}
}

window.onload = function() {
	var firebaseRef = firebase.database().ref("User");
	ValidateLang();
	firebaseRef.once('value').then(function(dataSnapshot) {
		//console.log(dataSnapshot.val());
	});
}