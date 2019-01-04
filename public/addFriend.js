function AddFriend() {
	var friname = document.getElementById('searchFriend');
	var Uname = localStorage.getItem("Username");
	//console.log(Uname);
	var firebaseRef = firebase.database().ref("User");

	//find user key from username 
	firebaseRef.orderByChild("UserName").equalTo(Uname).once('value', function(snapshot) {
		console.log(snapshot.val());
		var userCheck = (snapshot.val() !== null);
		var ukey;

	    snapshot.forEach(function (childSnapshot) {
	      ukey = childSnapshot.key;
	      return true;
	    });
	    console.log(ukey);

		var friendRef = firebase.database().ref("User/"+ukey).child("friend");

		firebaseRef.orderByChild("UserName").equalTo(friname.value).once('value', function(snapshot) {
			console.log(snapshot.val());
			var friCheck = (snapshot.val() !== null);

			if(friCheck == true && (friname.value != Uname)) {		
				// friendRef.set({
				// 	myfriend: friname.value
				// });		
				friendRef.on("value", function(snapshot) {
					//console.log("Already have "+snapshot.numChildren()+" friend.");
					var updatedFriKey = {};
					var friID = "Friend"+(snapshot.numChildren()+1);
					var addFri = null;

					for (var i=1; i<(snapshot.numChildren()+2);i++) {
						friendRef.child("Friend"+i).once('value', function(snapshot) {
							//console.log(snapshot.val());
							var existCheck = (snapshot.val() !== null);
							//console.log(existCheck);
							if(existCheck == false) {
								addFri = true;
							} else if(snapshot.val() == friname.value) {
								alert("You already be friend.");
								addFri = false;
							}
						});
						if(addFri == true) {
							updatedFriKey[friID] = friname.value;
							friendRef.update(updatedFriKey);
							alert("You can add this friend.");
							break;
						} else if(addFri == false){
							break;
						}
					}
				});
			} else if(friCheck == false) {
				alert("Not have this user in system.");
			} else if(friname.value == Uname) {
				alert("You can't be your friend.");
			}
    	});   
    });
}