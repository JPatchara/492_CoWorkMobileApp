function Callworklist() {
	var Gname = localStorage.getItem("groupEntry");
	var worklistRef = firebase.database().ref('Worklist');
	var countList = 0;

	worklistRef.orderByChild('GroupName').equalTo(Gname).on('child_added', function(snapshot) {
		var wlName = snapshot.val().WorklistName;
		console.log(wlName);

	    var listDiv = document.getElementById("FileBlockOuter");
	    var List = document.createElement("input");
	    var listText = document.createElement("h3");

	    List.style.position = 'absolute';
	    List.style.width = '96vw';
	    List.style.height = '5vh';
	    List.style.zIndex = '1';
	    List.style.left = '0vw';
	    List.style.top = 5.2*countList+'vh';
	    List.style.backgroundColor = '#ffffff';
	    List.style.color = 'black';
	    List.value = "    "+wlName;
	    List.style.fontSize = '4vw';
	    List.style.fontFamily = 'Sans-serif';
	    List.style.fontWeight = 'bold';
	    List.onclick = function() { 
	    	localStorage.setItem("worklistEntry", wlName); 
	    	localStorage.setItem("Page", '/listdetail_page'); 
	    	location.href = '/listdetail_page';
	    };
	    listDiv.appendChild(List);

	    countList += 1;
	});
}

window.onload = function() {
	Callworklist();

	function ProfileImg() {
		var userRef = firebase.database().ref('User');
		var userName = localStorage.getItem('Username');

		userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
			var UValue = snapshot.val();
			document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
		});
	}

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