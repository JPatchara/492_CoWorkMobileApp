function listImg() {
	var Gname = localStorage.getItem("groupEntry");
	var FaIRef = firebase.database().ref("FileAndImage");
	var count = 0;
	var imgID = 1;

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
		    var imgmainDiv = document.getElementById("ImgBlockInner");
		    var imgDiv = document.createElement("div");
		    var ImageBox = document.createElement("div");
		    var Images = document.createElement("img");
			count += 1;
		    imgDiv.style.position = 'relative';
		    imgDiv.style.left = '-1vw';
		    imgDiv.style.zIdex = '-1';
		    imgDiv.style.width = count*40+"vw"; 
		    ImageBox.style.float = 'left';
		    ImageBox.style.width = '40vw';
		    ImageBox.style.height = '22vh';
		    Images.style.position = 'absolute';
		    Images.style.width = '38vw';
		    Images.style.height = '19.5vh';
		    Images.style.top = '1.5vh';
		    Images.setAttribute('src',imglist);
		    Images.setAttribute('id', 'pic')
		    Images.setAttribute('onclick', 'showImage(this.src)')
			// Images.onclick = function() { showImage() };
		    imgmainDiv.appendChild(imgDiv);
		    imgDiv.appendChild(ImageBox);
		    ImageBox.appendChild(Images);
		});
	});
}

function keepFilefromLocal() {
	var fileBTN = document.getElementById("selectFile");
	var userName = localStorage.getItem('Username');
	var file = fileBTN.files[0]; //get file
    var FaIRef = firebase.database().ref("FileAndImage");
	var Gname = localStorage.getItem('groupEntry');
	var ImgStrRef = firebase.storage().ref('CoAppUserFile/'+userName+"/");
	var detectType = "";
	var changeCheck = null

	//if(changeCheck == true) { break; }

	if(file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif' || file.type == 'image/bmp' || file.type == 'image/tiff'){
		var storageRef = firebase.storage().ref('CoAppUserImage/'+userName+"/"+file.name);
		detectType = "image";
	} else {
		var storageRef = firebase.storage().ref('CoAppUserFile/'+userName+"/"+file.name);
		detectType = "file";
	}
	console.log(file.name);
	storageRef.put(file);

	setTimeout( function() {
	storageRef.getDownloadURL().then(function(url) {
        var Data = url;
        console.log(url);

		FaIRef.orderByChild('GroupName').equalTo(Gname).once('value', function(snapshot) {
			var gkey;
			var gCheck = (snapshot.val() !== null);
		    snapshot.forEach(function (childSnapshot) {
				gkey = childSnapshot.key;
				return true;
		    });

		    if(detectType == "image") {
		    	var Ref = firebase.database().ref('FileAndImage/'+gkey+"/Image");
		    } else if(detectType = "file") {
		    	var Ref = firebase.database().ref('FileAndImage/'+gkey+"/File");
		    }

		    if(gCheck == true) {
			    Ref.on("value", function(snapshot) {
					var updatedKey = {};
					if(detectType == "image") {
						var ID = "img"+(snapshot.numChildren()+1);
						var ftype = "img";
					} else if(detectType = "file") {
						var ID = "file"+(snapshot.numChildren()+1);
						var ftype = "file";
					}
					var added = null;
					console.log(snapshot.numChildren());

					for (var i=1; i<(snapshot.numChildren()+2); i++) {
						if(changeCheck == true) { console.log("stop"); break; }
						//console.log(i);
						Ref.child(ftype+i).once('value', function(snapshot) {
							var existCheck = (snapshot.val() !== null);
							if(detectType == "image") {
								if(existCheck == false && snapshot.val()!=Data) {
									added = true;
									console.log(added);
								} else if(snapshot.val() == Data){
									added = false;
									console.log(added);
								}
							} else if(detectType = "file") {
								if(existCheck == false || snapshot.val().fileName != file.name) {
									added = true;
									console.log(added);
								} else if(snapshot.val().fileName == file.name){
									added = false;
									console.log(added);
								}
							}
							
						});

						if(added == true) {
							if(detectType == "image") {
								// updatedKey[ID] = Data;
								// Ref.update(updatedKey);
								setTimeout( function() {
									var Ref = firebase.database().ref('FileAndImage/'+gkey+"/Image/"+ID);
									Ref.set({
										imageUrl: Data,
										imageName: file.name
									});
								}, 1000);
							}
							else if(detectType == "file") {
								setTimeout( function() {
									var fRef = firebase.database().ref('FileAndImage/'+gkey+"/File/"+ID);
									fRef.set({
										fileUrl: Data,
										fileName: file.name
									});
								}, 1000);
							}
							changeCheck = true;
							console.log('can upload');
							break;
						} else if(added == false && i==snapshot.numChildren()) {
							break;
						}
					}
				});
			} 
		});
  	}).catch(function(error) {
    	console.error(error);
  	});
  	}, 1000);
}

function listFile() {
	var Gname = localStorage.getItem("groupEntry");
	var FaIRef = firebase.database().ref("FileAndImage");
	var fcount = 0;

	FaIRef.orderByChild('GroupName').equalTo(Gname).once('value', function(snapshot) {
		var gkey;
		var gCheck = (snapshot.val() !== null);
	    snapshot.forEach(function (childSnapshot) {
			gkey = childSnapshot.key;
			return true;
	    });

	    var FileRef = firebase.database().ref('FileAndImage/'+gkey+"/File");
	    var fileMainDiv = document.getElementById("FileBlockInner");
	    var fileDiv = document.createElement("div");

	    fileMainDiv.appendChild(fileDiv);

	    FileRef.on('child_added', function(snapshot) {
			var filelist = snapshot.val().fileName;
		    var fileBox = document.createElement("div");
		    var fileName = document.createElement("h3");
		    var fileImg = document.createElement("img");
		    fcount += 1;

			fileDiv.style.height = fcount*6+'vh';
		    fileBox.style.borderTop = 'none';
		    fileBox.style.borderLeft = 'none';
		    fileBox.style.borderRight = 'none';
		    fileBox.style.borderBottom = '0.2vh solid #000000';
		    fileBox.style.width = '91vw';
		    fileBox.style.height = '6vh';
		    fileBox.style.backgroundColor = '#ffffff';
		    fileBox.style.textOverflow = 'ellipsis';
		    fileName.style.position = 'relative';
		    fileName.style.width = '91vw';
		    fileName.style.height = '6vh';
		    fileName.style.display = 'table-cell';
		    fileName.style.verticalAlign = 'middle';
		    fileName.style.fontSize = '3.8vw';
		    fileName.style.left = '12vw';
		    fileName.style.bottom = '4vh';
		    fileName.style.color = '#000000';
		    fileName.style.fontFamily = 'Calibri';
		    fileName.style.textOverflow = 'ellipsis';
		    fileName.innerHTML = filelist;
		    fileImg.style.position = 'relative';
		    fileImg.style.top = '0.7vh';
		    fileImg.style.left = '1vw';
		    fileImg.style.width = '7.5vw';
		    fileImg.style.height = '4vh';
		    fileImg.setAttribute('src','/img/file-text.png');
		    fileBox.setAttribute('onclick', '')
		    fileName.setAttribute('onclick', 'showContent(this.innerHTML)')
		    //fileBox.onclick = function() { showContent(); };
		    fileDiv.appendChild(fileBox);
		    fileBox.appendChild(fileImg);
		    fileBox.appendChild(fileName);
		});
	});
}

function showContent(fileSrc) {
	var user = localStorage.getItem("Username");
	// var ec = document.getElementById('fdiv');
	// var fileDL = $(ec).closest("#fdiv",this).find("h3",this).text();
	//var fileDL = document.getElementsByTagName("h3").innerHTML;
	console.log(fileSrc)
	var FileStrRef = firebase.storage().ref('CoAppUserFile/'+user+"/");

	FileStrRef.child(fileSrc).getDownloadURL().then(function(url) {
		var DataUrl = url;
		console.log(DataUrl);
		window.open(DataUrl);
	}).catch(function(error) {});
}

function showImage(imgSrc) {
	jQuery('#ImageArea').show(300);
	document.getElementById('modalBG').style.opacity = 0.6;
	document.getElementById('modalBG').style.zIndex = 3;
	document.getElementById('ImageArea').style.zIndex = 4;
	document.getElementById('showImg').style.zIndex = 5;
	console.log(imgSrc);
	document.getElementById("showImg").src = imgSrc;
}

window.onload = function() {
	listImg();
	listFile();
	var slfile = document.getElementById('selectFile');
	slfile.onchange = function() {
		keepFilefromLocal();
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

	function ProfileImg() {
	  var userRef = firebase.database().ref('User');
	  var userName = localStorage.getItem('Username');

	  userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
	    var UValue = snapshot.val();
	    document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
	  });
	}
}