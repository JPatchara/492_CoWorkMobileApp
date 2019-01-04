function CallGroupList() {
	//var GName = document.getElementById('gName').value;
	var Ownername = localStorage.getItem("Username");
	var ThisGroup = localStorage.getItem("groupEntry");
	var groupRef = firebase.database().ref("Group");
	var memberRef = firebase.database().ref("Group/Member");
	var countList = 0;
	var gkey;

	//call group by owner (this user is owner)
	groupRef.orderByChild("Owner").equalTo(Ownername).on('child_added', function(snapshot) {
		var Group_name = snapshot.val().GroupName;
		var ownerCheck = (snapshot.val() !== null);

	    //create group tab from owner name
	    var gdiv_norm = document.getElementById("FileBlockOuter_normal");
	    var gdiv_favor = document.getElementById("FileBlockOuter_fovorite");
	    var Gbtn = document.createElement("input");
	    var Gbtn_fav = document.createElement("input");
	    var btnText = document.createElement("h3");
	    var btnText_fav = document.createElement("h3");
	    var goIcon = document.createElement("img");
	    var goIcon_fav = document.createElement("img");
	    Gbtn.style.position = 'absolute';
	    Gbtn.style.left = '0.5vw';
	    Gbtn.style.top = 5.5*countList+'vh';
	    Gbtn.style.height = '5vh';
	    Gbtn.style.width = '95vw';
	    Gbtn.style.borderTop = 'none';
	    Gbtn.style.borderLeft = 'none';
	    Gbtn.style.backgroundColor = '#ffffff';
	    Gbtn.style.overflow = 'hidden';
	    Gbtn.style.margin = '0';
	    Gbtn.style.padding = '0';
	    Gbtn.style.color = 'black';
	    Gbtn.value = "    "+Group_name;
	    Gbtn.style.fontSize = '4vw';
	    Gbtn.style.fontFamily = 'Sans-serif';
	    Gbtn.style.fontWeight = 'bold';
	    //btnText.innerHTML = Group_name;
	    goIcon.src = '/img/greaterthan.png';
	    goIcon.style.position = 'absolute';
	    goIcon.style.right = '2vw';
	    goIcon.style.top = '1.2vh';
	    goIcon.style.width = '3.2vw';
	    goIcon.style.height = '2.5vh';
	    Gbtn.onclick = function() { 
	    	localStorage.setItem("groupEntry", Group_name);
	    	localStorage.setItem("Page", '/group_page');
	    	localStorage.setItem("lastPage", '/main_page');
	    	location.href = '/group_page';
	    };
	    Gbtn.appendChild(btnText);
	    Gbtn.appendChild(goIcon);
	    
	    Gbtn_fav.style.position = 'absolute';
	    Gbtn_fav.style.left = '0.5vw';
	    Gbtn_fav.style.top = 5.5*countList+'vh';
	    Gbtn_fav.style.height = '5vh';
	    Gbtn_fav.style.width = '95vw';
	    Gbtn_fav.style.borderTop = 'none';
	    Gbtn_fav.style.borderLeft = 'none';
	    Gbtn_fav.style.backgroundColor = '#ffffff';
	    Gbtn_fav.style.overflow = 'hidden';
	    Gbtn_fav.style.margin = '0';
	    Gbtn_fav.style.padding = '0';
	    Gbtn_fav.style.color = 'black';
	    Gbtn_fav.value = "    "+Group_name;
	    Gbtn_fav.style.fontSize = '4vw';
	    Gbtn_fav.style.fontFamily = 'Sans-serif';
	    Gbtn_fav.style.fontWeight = 'bold';
	    goIcon_fav.src = '/img/greaterthan.png';
	    goIcon_fav.style.position = 'absolute';
	    goIcon_fav.style.right = '2vw';
	    goIcon_fav.style.top = '1.2vh';
	    goIcon_fav.style.width = '3.2vw';
	    goIcon_fav.style.height = '2.5vh';
	    Gbtn_fav.onclick = function() { 
	    	localStorage.setItem("groupEntry", Group_name); 
	    	localStorage.setItem("Page", '/group_page');
	    	localStorage.setItem("lastPage", '/main_page');
	    	location.href = '/group_page';
	    };
	    Gbtn_fav.appendChild(btnText_fav);
	    Gbtn_fav.appendChild(goIcon_fav);

	    gdiv_norm.appendChild(Gbtn);
	    gdiv_favor.appendChild(Gbtn_fav);

	    countList += 1;
	});

	//call group by member (this user is member)
	// memberRef.on('value', function(snapshot) {
	// 	var memberCheck = (snapshot.val() !== null);
	// 	var memberkey;

	// 	snapshot.forEach(function (childSnapshot) {
	// 		ownerkey = childSnapshot.key;
	// 		return true;
	// 	});

	// });
}

window.onload = function () {
	CallGroupList();
	ProfileImg();

	$("[data-toggle]").click(function() {
		var toggle_el = $(this).data("toggle");
		$(toggle_el).toggleClass("open-sidebar");
	});
	jQuery(function($) { $(".swipe-area").swipe({
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
	});}); 

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