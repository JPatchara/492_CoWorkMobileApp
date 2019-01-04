function showWorklistDetail() {
	var worklistRef = firebase.database().ref('Worklist');
	var worklistName = localStorage.getItem('worklistEntry');

	worklistRef.orderByChild('WorklistName').equalTo(worklistName).on('child_added', function(snapshot) {
		var wlname = snapshot.val().WorklistName;
		var wldct = snapshot.val().WorklistDescription;
		var day = snapshot.val().Date.Day;
		var month = snapshot.val().Date.Month;
		var year = snapshot.val().Date.Year;
		var stime = snapshot.val().StartTime;
		var etime = snapshot.val().EndTime;
		var PIC = snapshot.val().PersonInCharge;

		document.getElementById('wlname').innerHTML = wlname;
		document.getElementById('wldct').innerHTML = wldct;
		document.getElementById('dateValue').value = day+"/"+month+"/"+year;
		document.getElementById('stime').value = stime;
		document.getElementById('etime').value = etime;
		document.getElementById('pic').value = PIC;
	});
}

function OpenLocation(mapValue) {
    //var mapValue = document.getElementById('loc');
    //var locationText = mapValue.innerHTML;
    //console.log(mapValue.innerHTML);
    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode({ 'address': mapValue}, function(results, status) {  
        var mapLatitude = results[0].geometry.location.lat();
        var mapLongitude = results[0].geometry.location.lng();
        location.href = 'http://maps.google.com?q='+mapLatitude+','+mapLongitude;
    });
}

function showProfile(name) {
    var stage = localStorage.getItem("Page");
    if(stage == "/listdetail_page") {
        localStorage.setItem("Page","/group_page");
        location.href = "/otherprofile_page";
        //var name = document.getElementById("ps").innerHTML;
        console.log(name);
        localStorage.setItem("otherProfile",name);
    } else if(stage == "/listdetail_page") {
		localStorage.setItem("Page","/listdetail_page");
		location.href = "/otherprofile_page";
		//var name = document.getElementById("ps").innerHTML;
		console.log(name);
		localStorage.setItem("otherProfile",name);
	} else if(stage == "/chat_page") {
		localStorage.setItem("Page","/chat_page");
		location.href = "/otherprofile_page";
		//var name = document.getElementById("ps").innerHTML;
		console.log(name);
		localStorage.setItem("otherProfile",name);
	}
}

function showContent(fileDL) {
    var user = localStorage.getItem("Username");
    //var fileDL = document.getElementById("file").innerHTML;
    var FileStrRef = firebase.storage().ref('CoAppUserFile/'+user+"/");

    FileStrRef.child(fileDL).getDownloadURL().then(function(url) {
        var DataUrl = url;
        console.log(DataUrl);
        window.open(DataUrl);
    }).catch(function(error) {});
}

function showImage(imgName) {
    jQuery('#ImageArea').show(300);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('ImageArea').style.zIndex = 4;
    document.getElementById('showImg').style.zIndex = 5;
    //var imgName = document.getElementById("image").innerHTML;
    var Gname = localStorage.getItem("groupEntry");
    var FaIRef = firebase.database().ref("FileAndImage");

    FaIRef.orderByChild('GroupName').equalTo(Gname).once('value', function(snapshot) {
        var gkey;
        var gCheck = (snapshot.val() !== null);
        snapshot.forEach(function (childSnapshot) {
            gkey = childSnapshot.key;
            return true;
        });

        var ImageRef = firebase.database().ref('FileAndImage/'+gkey+"/Image/");

        ImageRef.on('child_added', function(snapshot) {
            var imglist = snapshot.val().imageUrl;
            if(snapshot.val().imageName == imgName) {
                document.getElementById("showImg").src = imglist;
            } else {}
        });
    });
}

function showNote(note){
    jQuery('#ImageArea').show(300);
    document.getElementById('modalBG').style.opacity = 0.9;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('ImageArea').style.zIndex = 4;
    document.getElementById('showImg').style.zIndex = 5;
    //var note = document.getElementById("note").innerHTML;
    var Gname = localStorage.getItem("groupEntry");
    var noteRef = firebase.database().ref("Note");

    noteRef.orderByChild('noteName').equalTo(note).once('child_added', function(snapshot) {
    	if(snapshot.val().GroupName == Gname) {
    		document.getElementById("showImg").src = snapshot.val().noteUrl;
    	}
    });
}

window.onload = function() {
	showWorklistDetail();
}