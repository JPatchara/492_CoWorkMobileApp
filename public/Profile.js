function ShowProfile() {
	var userRef = firebase.database().ref('User');
	var userName = localStorage.getItem('Username');

	userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
		var UValue = snapshot.val();
		document.getElementById('nameArea').value = UValue.UserName;
		document.getElementById('emailArea').value = UValue.Email;
		document.getElementById('jobArea').value = UValue.JobPosition;
		document.getElementById('phonenumArea').value = UValue.PhoneNumber;
		document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
	});
}

function EditProfile() {
	document.getElementById("nameArea").readOnly = false;
	document.getElementById("emailArea").readOnly = false;
	document.getElementById("jobArea").readOnly = false;
	document.getElementById("phonenumArea").readOnly = false;
}

function SaveProfile() {
	var userRef = firebase.database().ref('User');
	var userName = localStorage.getItem('Username');
	var email = document.getElementById("emailArea").value;
	var jobPosition = document.getElementById("jobArea").value;
	var phonenum = document.getElementById("phonenumArea").value;

	userRef.orderByChild('UserName').equalTo(userName).once('value', function(snapshot) {
		var userkey;
	    snapshot.forEach(function (childSnapshot) {
			userkey = childSnapshot.key;
			return true;
	    });

	    var userKeyRef = firebase.database().ref('User/'+userkey);
	    userKeyRef.update({
	 		Email: email,
	    	JobPosition: jobPosition,
	    	PhoneNumber: phonenum
	    });
	});
	document.getElementById("nameArea").readOnly = true;
	document.getElementById("emailArea").readOnly = true;
	document.getElementById("jobArea").readOnly = true;
	document.getElementById("phonenumArea").readOnly = true;
}

function ShowProfileImg() {

}

window.onload = function() {
	ShowProfile();

	document.getElementById('clickPF').addEventListener('change', readURL, true);
	
	function readURL(){
	    var file = document.getElementById("clickPF").files[0];
	    var reader = new FileReader();
	    var userRef = firebase.database().ref('User');
		var userName = localStorage.getItem('Username');
		var pfImg = document.getElementById('profileImg').style.backgroundImage;

	    reader.onloadend = function(){
	        document.getElementById('profileImg').style.backgroundImage = "url(" + reader.result + ")"; 
	        //console.log(document.getElementById('profileImg').style.backgroundImage);    
			userRef.orderByChild('UserName').equalTo(userName).once('value', function(snapshot) {
				var userkey;
			    snapshot.forEach(function (childSnapshot) {
					userkey = childSnapshot.key;
					return true;
			    });

			    var userKeyRef = firebase.database().ref('User/'+userkey);
			    userKeyRef.update({
			    	ProfileImage: "url(" + reader.result + ")"
			    });
			});   
	    }
	    if(file){
	        reader.readAsDataURL(file);
	    }else{}
	}
}