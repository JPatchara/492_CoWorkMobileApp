function AddingGroup() {
	console.log("add group");
	var modal = document.getElementById('namingModal');
	var GName = document.getElementById('gName').value;
	var Ownername = localStorage.getItem("Username");
	var firebaseRef = firebase.database().ref("Group");
	var chatRef = firebase.database().ref("ChatSystem");
	var FAndIRef = firebase.database().ref("FileAndImage");

	firebaseRef.orderByChild("Owner").equalTo(Ownername).on('child_added', function(snapshot) {
		console.log(snapshot.val().GroupName);
	});

	firebaseRef.orderByChild("Owner").equalTo(Ownername).once('value', function(snapshot) {
		console.log(snapshot.val());

		var ownerCheck = (snapshot.val() !== null);
		var ownerkey;

	    snapshot.forEach(function (childSnapshot) {
			ownerkey = childSnapshot.key;
			console.log(ownerkey);
			return true;
	    });

		firebaseRef.orderByChild("GroupName").equalTo(GName).once('value', function(snapshot) {
			var groupCheck = (snapshot.val() !== null);
			var groupkey;

		    snapshot.forEach(function (childSnapshot) {
				groupkey = childSnapshot.key;
				return true;
		    });

		    if(ownerkey == groupkey) {
		    	alert("You already have this group.");
		    } else if((groupCheck == true) || (ownerkey != groupkey)) {
				firebaseRef.push({
					GroupName: GName,
					Owner: Ownername,
				});

				var createChat = chatRef.child(GName+'_chatroom');
				createChat.push({
					name: "chatroom",
					message: "Welcome to chat room."
				});

				FAndIRef.push({
					GroupName: GName
				});
		    }
	    });
	});
	modal.style.display = "none";
}

function NamingModal(){
    var modal = document.getElementById('namingModal');
    modal.style.display = "block";
}

function gotoAddFriend() {
	var modal = document.getElementById('addFriend');
	modal.style.display = "block";
}

function AddGroupFriend() {
	var modal = document.getElementById('addFriend');

	var friname = document.getElementById('friName').value;
	var Uname = localStorage.getItem("Username");
	var Gname = localStorage.getItem("groupEntry");
	var userRef = firebase.database().ref("User");
	var groupRef = firebase.database().ref("Group");
	console.log(Gname);
	//find user key from username 
	groupRef.orderByChild("GroupName").equalTo(Gname).once('value', function(snapshot) {
		console.log(Gname);
		console.log(snapshot.val());
		var groupCheck = (snapshot.val() !== null);
		var gkey;

	    snapshot.forEach(function (childSnapshot) {
			gkey = childSnapshot.key;
			return true;
	    });

		var memberRef = firebase.database().ref("Group/"+gkey).child("Member");

		userRef.orderByChild("UserName").equalTo(friname).once('value', function(snapshot) {
			console.log(snapshot.val());
			var friCheck = (snapshot.val() !== null);

			if(friCheck == true && (friname != Uname)) {
				memberRef.on('value', function(snapshot) {
					var memberCheck = (snapshot.val() !== null);

					var updatedMemberKey = {};
					var memberID = "member"+(snapshot.numChildren()+1);
					var addMember = null;

					for (var i=1; i<(snapshot.numChildren()+2);i++) {
						memberRef.child("member"+i).once('value', function(snapshot) {
							var existCheck = (snapshot.val() !== null);

							if(existCheck == false) {
								addMember = true;
							} else if(snapshot.val() == friname) {
								//alert("This group already have this friend.");
								addMember = false;
							}
						});

						if(addMember == true) {
							updatedMemberKey[memberID] = friname;
							memberRef.update(updatedMemberKey);
							alert("You can add this friend to this group.");
							break;
						} else if(addMember == false){
							alert("This group already have this friend.");
							break;
						}
					}
				});
			} else if(friCheck == false) {
				alert("Not have this user in system.");
			} else if(friname == Uname) {
				alert("You already live at inside group.");
			}
    	});   
    });

    modal.style.display = "none";
}

function EntryToGroup() {
	var GName = document.getElementsByTagName('input').value
	localStorage.setItem("groupEntry", Gname);
}

function editDCT() {
	var Gname = localStorage.getItem("groupEntry");

	if(document.getElementById("TBox").contentEditable == 'true') {
		document.getElementById("TBox").contentEditable = 'false';
		document.getElementById("editBTN").value = "Edit";

		var groupkey = localStorage.getItem("groupkey");
		var dctRef = firebase.database().ref('Group/'+groupkey+'/');
		var dct = document.getElementById("TBox").innerHTML;
		console.log("mydct="+dct);
		dctRef.update({
			Description: dct
		});
	} else if(document.getElementById("TBox").contentEditable == 'false') {
		document.getElementById("TBox").contentEditable = 'true'; 
		document.getElementById("editBTN").value = "Save";
	}
}