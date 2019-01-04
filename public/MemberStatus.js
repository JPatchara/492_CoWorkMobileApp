window.onload = function() {
	callMemberStatus();
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
	function ProfileImg() {
		var userRef = firebase.database().ref('User');
		var userName = localStorage.getItem('Username');

		userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
			var UValue = snapshot.val();
			document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
		});
	}
}

function callMemberStatus() {
	var Uname = localStorage.getItem("Username");
	var userRef = firebase.database().ref("User");
	var count = 0;

	userRef.orderByChild("UserName").equalTo(Uname).on('value', function(snapshot) {
		var ukey;
	    snapshot.forEach(function (childSnapshot) {
			ukey = childSnapshot.key;
			return true;
	    });
		var friendRef = firebase.database().ref("User/"+ukey+"/friend");
		friendRef.on('child_added', function(snapshot) {
			var memberDiv = document.getElementById("memberOuter");
			var memberUL = document.createElement("ul");
			var memberLI = document.createElement("li");
			var memberName = document.createElement("a");
			var memberProfile = document.createElement("img");
			var memberStatus = document.createElement("img");
			var friName = snapshot.val();

			memberUL.style.listStyleType = 'none';
			memberUL.style.position = 'absolute';
			memberUL.style.margin = '0';
			memberUL.style.padding = '0';
			memberUL.style.top = 10*count+'vh';
			memberUL.style.left = '3vw';
			memberUL.style.right = '0';
			memberUL.style.width = '90vw';
			memberUL.style.height = '12vh';
			memberUL.style.zIdex = '1';
			memberUL.style.overflow = 'hidden';
			memberUL.style.borderTop = 'none';
			memberUL.style.borderLeft = 'none';
			memberUL.style.backgroundColor = 'transparent';
			memberLI.style.float = 'left';
			memberName.style.position = 'absolute';
			memberName.style.fontSize = '6vw';
			memberName.style.top = '37%';
			memberName.style.left = '26%';
			memberName.style.width = '48vw';
			memberName.style.textOverflow = 'ellipsis';
			memberName.innerHTML = friName;
			memberProfile.style.position = 'absolute';
			memberProfile.style.zIdex = '2';
			memberProfile.style.top = '20%';
			memberProfile.style.left = '5%';
			memberProfile.style.width = '14vw';
			memberProfile.style.height = '8vh';
			memberProfile.style.borderRadius = '50%';
			memberProfile.style.border = 'none';
			memberProfile.style.backgroundSize = 'cover';
			memberProfile.style.backgroundPosition = 'center center';
			memberStatus.style.position = 'absolute';
			memberStatus.style.top = '45%';
			memberStatus.style.left = '85%';
			memberStatus.style.width = '3.6vw';
			memberStatus.style.height = '2vh';
			userRef.orderByChild("UserName").equalTo(friName).on('child_added', function(snapshot) {
				console.log(snapshot.val());
				var profile = snapshot.val().ProfileImage;
				if(snapshot.val().Status == 'online') {
					var statusIcon = "/img/online.png";
				} else {
					var statusIcon = "/img/offline.png";
				}
				memberProfile.style.backgroundImage = profile;
				memberStatus.setAttribute('src',statusIcon);
			});

			memberLI.appendChild(memberStatus);
			memberLI.appendChild(memberProfile);
			memberLI.appendChild(memberName);
			memberUL.appendChild(memberLI);
			memberDiv.appendChild(memberUL);

			count += 1;
		});
	});
}