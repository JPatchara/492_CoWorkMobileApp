function showNote() {
	var noteRef = firebase.database().ref("Note");
	var noteContent = document.getElementById("NoteImg");
	var Gname = localStorage.getItem("groupEntry");
	var Nname = localStorage.getItem("note");
	console.log(Nname);

	noteRef.orderByChild("noteName").equalTo(Nname).on('value', function(snapshot) {
		console.log(snapshot.val());
		var notekey;

	    snapshot.forEach(function (childSnapshot) {
			noteRef.child(childSnapshot.key).once('value', function(keySnapshot) {
				nkey = keySnapshot.key;
				console.log(nkey);

				if(childSnapshot.val().GroupName == Gname)
				{
					// localStorage.setItem("groupkey",gkey)
					// var groupkey = localStorage.getItem("groupkey");
					var nRef = firebase.database().ref("Note/"+nkey);

					nRef.on('value', function(Urlsnapshot){
						console.log(Urlsnapshot.val().noteUrl);
						if(Urlsnapshot.val().noteUrl != null) {
							document.getElementById("notename").innerHTML = Nname;
							noteContent.src = Urlsnapshot.val().noteUrl;
						}
					});
				} else {
					
				}
				return true;
			});
	    });
	});
}

function ProfileImg() {
	var userRef = firebase.database().ref('User');
	var userName = localStorage.getItem('Username');

	userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
		var UValue = snapshot.val();
		document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
	});
}

window.onload = function() {
	showNote();
	ProfileImg();

	$("[data-toggle]").click(function() {
		var toggle_el = $(this).data("toggle");
		$(toggle_el).toggleClass("open-sidebar");
	});
	$(".swipe-area").swipe({
		swipeStatus:function(event, phase, direction, distance, duration, fingers)
		{
			if (phase=="move" && direction =="right") {
				$(".container").addClass("open-sidebar");
				return false;
			}
			if (phase=="move" && direction =="left") {
				$(".container").removeClass("open-sidebar");
				return false;
			}
		}
	});

	var Uname = localStorage.getItem('Username');
	document.getElementById('Username').innerHTML = Uname;

}