var intervalCo = null;
var lat = "";
var long = "";
var map = "";

function timeSelect() {
    var minH = 0, maxH = 12;
    var minMS = 0, maxMS = 59;
    var selectStarTH = document.getElementById('sTimeHour');
    var selectStarTM = document.getElementById('sTimeMin');
    var selectStarTP = document.getElementById('sTimePath');
    var selectEndTH = document.getElementById('eTimeHour');
    var selectEndTM = document.getElementById('eTimeMin');
    var selectEndTP = document.getElementById('eTimePath');

    for (var i = minH; i<=maxH; i++){
        var optS = document.createElement('option');
        var optE = document.createElement('option');
        optS.value = i;
        optS.innerHTML = i;
        optE.value = i;
        optE.innerHTML = i;
        selectStarTH.appendChild(optS);
        selectEndTH.appendChild(optE);
    }
    for (var i = minMS; i<=maxMS; i++){
        var optSm = document.createElement('option');
        var optEm = document.createElement('option');
        optSm.value = i;
        optSm.innerHTML = i;
        optEm.value = i;
        optEm.innerHTML = i;
        selectStarTM.appendChild(optSm);
        selectEndTM.appendChild(optEm);
    }
    var optSp = document.createElement('option');
    var optEp = document.createElement('option');
    optSp.value = 'AM';
    optSp.innerHTML = 'AM';
    optEp.value = 'AM';
    optEp.innerHTML = 'AM';
    selectStarTP.appendChild(optSp);
    selectEndTP.appendChild(optEp);
    var optSp = document.createElement('option');
    var optEp = document.createElement('option');
    optSp.value = 'PM';
    optSp.innerHTML = 'PM';
    optEp.value = 'PM';
    optEp.innerHTML = 'PM';
    selectStarTP.appendChild(optSp);
    selectEndTP.appendChild(optEp);
}

function PICselect() {
    var firebaseRef = firebase.database().ref("User");
    var UserName = localStorage.getItem("Username");
    var selectPIC = document.getElementById('PIC');
    var optPIC = document.createElement('option');
    optPIC.value = UserName;
    optPIC.innerHTML = UserName;
    selectPIC.appendChild(optPIC);

    firebaseRef.orderByChild("UserName").equalTo(UserName).once('value', function(snapshot) {
        var userCheck = (snapshot.val() !== null);
        var userkey;
        
        snapshot.forEach(function (childSnapshot) {
            userkey = childSnapshot.key;
            return true;
        });

        var friRef = firebase.database().ref("User/"+userkey).child("friend");
        friRef.on('value', function(snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var frivalue = childSnapshot.val();
                console.log(frivalue);
                var optPIC = document.createElement('option');
                optPIC.value = frivalue;
                optPIC.innerHTML = frivalue;
                selectPIC.appendChild(optPIC);
            });
        });
    });
}

function AddworkList() {
    var worklistRef = firebase.database().ref("Worklist");
    var Gname = localStorage.getItem("groupEntry");
    // var wlName = document.getElementById('listname').value;
    var wlName = document.getElementById('TBoxs').innerHTML;
    //var wlDCT = document.getElementById('listdct').value;
    var wlDCT = document.getElementById('TBox').innerHTML;
    var wlSTime = document.getElementById('sTimeHour').value+":"+document.getElementById('sTimeMin').value+":"+document.getElementById('sTimePath').value;
    var wlETime = document.getElementById('eTimeHour').value+":"+document.getElementById('eTimeMin').value+":"+document.getElementById('eTimePath').value;
    var PIC = document.getElementById('PIC').value;
    //var date = document.getElementById('DateInput').value;
    var dates = new Date($('#DateInput').val());
    var day = dates.getDate();
    var month = dates.getMonth();
    var year = dates.getFullYear();
    //console.log(day+"/"+month+"/"+year);

    worklistRef.push({
        GroupName: Gname,
        Owner: PIC,
        WorklistName: wlName,
        WorklistDescription: wlDCT,
        Date: {
            Day: day,
            Month: month,
            Year: year
        },
        StartTime: wlSTime,
        EndTime: wlETime,
        PersonInCharge: PIC
    });

    location.href = '/list_page';

    // worklistRef.orderByChild("GroupName").equalTo(Gname).once('value', function(snapshot) {
    //     var wlistCheck = (snapshot.val() != null);
    //     var wlistKey;
    //     snapshot.forEach(function (childSnapshot) {
    //         wlistkey = childSnapshot.key;
    //         return true;
    //     });
    //     var listKeyRef = firebase.database().ref("Worklist/"+wlistKey).child("WorklistName");
    // });
}

function CoFunction() {
    var CoText = document.getElementById('TBox');
    var CoTextVal = CoText.innerHTML;
    if(CoTextVal.indexOf("@location") != -1) {
        callMaps();
    } else if(CoTextVal.indexOf("@person") != -1) {
        callTagPerson();
    } else if(CoTextVal.indexOf("@file") != -1) {
        callTagFile();
    } else if(CoTextVal.indexOf("@image") != -1) {
        callTagImage();
    } else if(CoTextVal.indexOf("@note") != -1) {
        callTagNote();
    } else {
        jQuery('#maps').hide();
        jQuery('#TagPerson').hide();
        jQuery('#TagFile').hide();
        jQuery('#TagImage').hide();
        jQuery('#TagNote').hide();
        jQuery('#ImageArea').hide();
        document.getElementById('modalBG').style.opacity = 0;
        document.getElementById('modalBG').style.zIndex = -1;
        document.getElementById('maps').style.zIndex = -1;
        document.getElementById('TagPerson').style.zIndex = -1;
    }
}

function CoFunctions() {
    var CoTexts = document.getElementById('TBoxs');
    var CoTextVals = CoTexts.innerHTML;
    if(CoTextVals.indexOf("@location") != -1) {
        callMaps();
    } else if(CoTextVals.indexOf("@person") != -1) {
        callTagPersons();
    } else if(CoTextVals.indexOf("@file") != -1) {
        callTagFiles();
    } else if(CoTextVals.indexOf("@image") != -1) {
        callTagImages();
    } else if(CoTextVals.indexOf("@note") != -1) {
        callTagNotes();
    } else {
        jQuery('#maps').hide();
        jQuery('#TagPerson').hide();
        jQuery('#TagFile').hide();
        jQuery('#TagImage').hide();
        jQuery('#TagNote').hide();
        jQuery('#ImageArea').hide();
        document.getElementById('modalBG').style.opacity = 0;
        document.getElementById('modalBG').style.zIndex = -1;
        document.getElementById('maps').style.zIndex = -1;
        document.getElementById('TagPerson').style.zIndex = -1;
    }
}

function callMaps() {    
    jQuery('#maps').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('maps').style.zIndex = 4;
    document.getElementById('searchMap').style.zIndex = 4;
    document.getElementById('p2').style.zIndex = 4;
    document.getElementById('map_canvas').style.zIndex = 4;
    document.getElementById('BTN').style.zIndex = 4;
}

function callTagPerson() {
    jQuery('#TagPerson').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagPerson').style.zIndex = 5;

    var personRef = firebase.database().ref("User");
    var User = localStorage.getItem("Username");
    var textValue = document.getElementById("TBox");
    var count = 0;
    personRef.orderByChild("UserName").equalTo(User).on('value', function(snapshot) {
        var userkey;

        snapshot.forEach(function (childSnapshot) {
            userkey = childSnapshot.key;
            return true;
        });
        var friRef = firebase.database().ref("User/"+userkey+"/friend")
        friRef.on('child_added', function(snapshot) {
            console.log(snapshot.val());
            var friName = snapshot.val();
            var friDiv = document.getElementById("psCoFileBlockOuter");
            var friBTN = document.createElement("input");
            var btnText = document.createElement("h3");
            friBTN.style.position = 'absolute';
            friBTN.style.left = '0.5vw';
            friBTN.style.top = 5.5*count+'vh';
            friBTN.style.height = '5vh';
            friBTN.style.width = '95vw';
            friBTN.style.borderTop = 'none';
            friBTN.style.borderLeft = 'none';
            friBTN.style.backgroundColor = '#ffffff';
            friBTN.style.overflow = 'hidden';
            friBTN.style.margin = '0';
            friBTN.style.padding = '0';
            friBTN.style.color = 'black';
            friBTN.value = "    "+friName;
            friBTN.style.fontSize = '4vw';
            friBTN.style.fontFamily = 'Sans-serif';
            friBTN.style.fontWeight = 'bold';
            friBTN.style.textOverflow = 'ellipsis';
            friBTN.onclick = function() { 
                var repWithlink = textValue.innerHTML.replace('@person', "<span id='ps' onclick='showProfile(this.innerHTML)'>" + friName + "</span>&#8203;");
                document.getElementById('modalBG').style.opacity = 0;
                document.getElementById('modalBG').style.zIndex = -1;
                jQuery('#TagPerson').hide(300);
                pasteHtmlAtCaret(repWithlink,textValue);      
            };
            friBTN.appendChild(btnText);
            friDiv.appendChild(friBTN);
            count += 1;
        });
    });
}

function callTagPersons() {
    jQuery('#TagPerson').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagPerson').style.zIndex = 5;

    var personRef = firebase.database().ref("User");
    var User = localStorage.getItem("Username");
    var textValues = document.getElementById("TBoxs");
    var count = 0;
    personRef.orderByChild("UserName").equalTo(User).on('value', function(snapshot) {
        var userkey;

        snapshot.forEach(function (childSnapshot) {
            userkey = childSnapshot.key;
            return true;
        });
        var friRef = firebase.database().ref("User/"+userkey+"/friend")
        friRef.on('child_added', function(snapshot) {
            console.log(snapshot.val());
            var friName = snapshot.val();
            var friDiv = document.getElementById("psCoFileBlockOuter");
            var friBTN = document.createElement("input");
            var btnText = document.createElement("h3");
            friBTN.style.position = 'absolute';
            friBTN.style.left = '0.5vw';
            friBTN.style.top = 5.5*count+'vh';
            friBTN.style.height = '5vh';
            friBTN.style.width = '95vw';
            friBTN.style.borderTop = 'none';
            friBTN.style.borderLeft = 'none';
            friBTN.style.backgroundColor = '#ffffff';
            friBTN.style.overflow = 'hidden';
            friBTN.style.margin = '0';
            friBTN.style.padding = '0';
            friBTN.style.color = 'black';
            friBTN.value = "    "+friName;
            friBTN.style.fontSize = '4vw';
            friBTN.style.fontFamily = 'Sans-serif';
            friBTN.style.fontWeight = 'bold';
            friBTN.style.textOverflow = 'ellipsis';
            friBTN.onclick = function() { 
                var repWithlinks = textValues.innerHTML.replace('@person', "<span id='ps' onclick='showProfile(this.innerHTML)'>" + friName + "</span>&#8203;");
                document.getElementById('modalBG').style.opacity = 0;
                document.getElementById('modalBG').style.zIndex = -1;
                jQuery('#TagPerson').hide(300);
                pasteHtmlAtCarets(repWithlinks,textValues);        
            };
            friBTN.appendChild(btnText);
            friDiv.appendChild(friBTN);
            count += 1;
        });
    });
}

function callTagFile() {
    jQuery('#TagFile').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagFile').style.zIndex = 5;

    var Ref = firebase.database().ref("FileAndImage");
    var Group = localStorage.getItem("groupEntry");
    var textValue = document.getElementById("TBox");
    var count = 0;
    Ref.orderByChild("GroupName").equalTo(Group).on('value', function(snapshot) {
        var groupkey;

        snapshot.forEach(function (childSnapshot) {
            groupkey = childSnapshot.key;
            return true;
        });
        var fileRef = firebase.database().ref("FileAndImage/"+groupkey+"/File")
        fileRef.on('child_added', function(snapshot) {
            console.log(snapshot.val().fileName);
            var fileName = snapshot.val().fileName;
            var fileDiv = document.getElementById("fCoFileBlockOuter");
            var fileBTN = document.createElement("input");
            var btnText = document.createElement("h3");
            fileBTN.style.position = 'absolute';
            fileBTN.style.left = '0.5vw';
            fileBTN.style.top = 5.5*count+'vh';
            fileBTN.style.height = '5vh';
            fileBTN.style.width = '80vw';
            fileBTN.style.borderTop = 'none';
            fileBTN.style.borderLeft = 'none';
            fileBTN.style.backgroundColor = '#ffffff';
            fileBTN.style.overflow = 'hidden';
            fileBTN.style.margin = '0';
            fileBTN.style.padding = '0';
            fileBTN.style.color = 'black';
            fileBTN.value = "    "+fileName;
            fileBTN.style.fontSize = '4vw';
            fileBTN.style.fontFamily = 'Sans-serif';
            fileBTN.style.fontWeight = 'bold';
            fileBTN.style.textOverflow = 'ellipsis';
            fileBTN.onclick = function() { 
                var repWithlink = textValue.innerHTML.replace('@file', "<span id='file' onclick='showContent(this.innerHTML)'>" + fileName + "</span>&#8203;");
                document.getElementById('modalBG').style.opacity = 0;
                document.getElementById('modalBG').style.zIndex = -1;
                jQuery('#TagFile').hide(300);
                pasteHtmlAtCaret(repWithlink,textValue);
            };
            fileBTN.appendChild(btnText);
            fileDiv.appendChild(fileBTN);
            count += 1;
        });
    });
}

function callTagFiles() {
    jQuery('#TagFile').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagFile').style.zIndex = 5;

    var Ref = firebase.database().ref("FileAndImage");
    var Group = localStorage.getItem("groupEntry");
    var textValues = document.getElementById("TBoxs");
    var count = 0;
    Ref.orderByChild("GroupName").equalTo(Group).on('value', function(snapshot) {
        var groupkey;

        snapshot.forEach(function (childSnapshot) {
            groupkey = childSnapshot.key;
            return true;
        });
        var fileRef = firebase.database().ref("FileAndImage/"+groupkey+"/File")
        fileRef.on('child_added', function(snapshot) {
            console.log(snapshot.val().fileName);
            var fileName = snapshot.val().fileName;
            var fileDiv = document.getElementById("fCoFileBlockOuter");
            var fileBTN = document.createElement("input");
            var btnText = document.createElement("h3");
            fileBTN.style.position = 'absolute';
            fileBTN.style.left = '0.5vw';
            fileBTN.style.top = 5.5*count+'vh';
            fileBTN.style.height = '5vh';
            fileBTN.style.width = '80vw';
            fileBTN.style.borderTop = 'none';
            fileBTN.style.borderLeft = 'none';
            fileBTN.style.backgroundColor = '#ffffff';
            fileBTN.style.overflow = 'hidden';
            fileBTN.style.margin = '0';
            fileBTN.style.padding = '0';
            fileBTN.style.color = 'black';
            fileBTN.value = "    "+fileName;
            fileBTN.style.fontSize = '4vw';
            fileBTN.style.fontFamily = 'Sans-serif';
            fileBTN.style.fontWeight = 'bold';
            fileBTN.style.textOverflow = 'ellipsis';
            fileBTN.onclick = function() {
                var repWithlinks = textValues.innerHTML.replace('@file', "<span id='file' onclick='showContent(this.innerHTML)'>" + fileName + "</span>&#8203;");
                document.getElementById('modalBG').style.opacity = 0;
                document.getElementById('modalBG').style.zIndex = -1;
                jQuery('#TagFile').hide(300);
                pasteHtmlAtCarets(repWithlinks,textValues);
            };
            fileBTN.appendChild(btnText);
            fileDiv.appendChild(fileBTN);
            count += 1;
        });
    });
}

function callTagImage() {
    jQuery('#TagImage').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagImage').style.zIndex = 5;

    var Gname = localStorage.getItem("groupEntry");
    var FaIRef = firebase.database().ref("FileAndImage");
    var textValue = document.getElementById("TBox");
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
            var imgName = snapshot.val().imageName;
            var imgmainDiv = document.getElementById("iCoFileBlockOuter");
            var imgDiv = document.createElement("div");
            var ImageBox = document.createElement("div");
            var Images = document.createElement("img");
            count += 1;
            imgDiv.style.position = 'relative';
            imgDiv.style.left = '-1vw';
            imgDiv.style.zIdex = '-1';
            imgDiv.style.width = count*50+"vw";
            ImageBox.style.float = 'left';
            ImageBox.style.width = '50vw';
            ImageBox.style.height = '25vh';
            ImageBox.style.top = '2vh';
            Images.style.position = 'absolute';
            Images.style.width = '48vw';
            Images.style.height = '24vh';
            Images.style.top = '2vh';
            Images.setAttribute('src',imglist);
            Images.onclick = function() { 
                var repWithlink = textValue.innerHTML.replace('@image', "<span id='image' onclick='showImage(this.innerHTML)'>" + imgName + "</span>&#8203;");
                document.getElementById('modalBG').style.opacity = 0;
                document.getElementById('modalBG').style.zIndex = -1;
                jQuery('#TagImage').hide(300);
                pasteHtmlAtCaret(repWithlink,textValue);
            };
            imgmainDiv.appendChild(imgDiv);
            imgDiv.appendChild(ImageBox);
            ImageBox.appendChild(Images);
            imgID += 1;
        });
    });
}

function callTagImages() {
    jQuery('#TagImage').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagImage').style.zIndex = 5;

    var Gname = localStorage.getItem("groupEntry");
    var FaIRef = firebase.database().ref("FileAndImage");
    var textValues = document.getElementById("TBoxs");
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
            var imgName = snapshot.val().imageName;
            var imgmainDiv = document.getElementById("iCoFileBlockOuter");
            var imgDiv = document.createElement("div");
            var ImageBox = document.createElement("div");
            var Images = document.createElement("img");
            count += 1;
            imgDiv.style.position = 'relative';
            imgDiv.style.left = '-1vw';
            imgDiv.style.zIdex = '-1';
            imgDiv.style.width = count*50+"vw";
            ImageBox.style.float = 'left';
            ImageBox.style.width = '50vw';
            ImageBox.style.height = '25vh';
            ImageBox.style.top = '2vh';
            Images.style.position = 'absolute';
            Images.style.width = '48vw';
            Images.style.height = '24vh';
            Images.style.top = '2vh';
            Images.setAttribute('src',imglist);
            Images.onclick = function() {
                var repWithlinks = textValues.innerHTML.replace('@image', "<span id='image' onclick='showImage(this.innerHTML)'>" + imgName + "</span>&#8203;");
                document.getElementById('modalBG').style.opacity = 0;
                document.getElementById('modalBG').style.zIndex = -1;
                jQuery('#TagImage').hide(300);
                pasteHtmlAtCarets(repWithlinks,textValues);
            };
            imgmainDiv.appendChild(imgDiv);
            imgDiv.appendChild(ImageBox);
            ImageBox.appendChild(Images);
            imgID += 1;
        });
    });
}

function callTagNote() {
    jQuery('#TagNote').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagNote').style.zIndex = 5;

    var Ref = firebase.database().ref("Note");
    var Group = localStorage.getItem("groupEntry");
    var textValue = document.getElementById("TBox");
    var count = 0;
    Ref.orderByChild("GroupName").equalTo(Group).on('child_added', function(snapshot) {     
        var noteName = snapshot.val().noteName;
        var noteDiv = document.getElementById("nCoFileBlockOuter");
        var noteBTN = document.createElement("input");
        var btnText = document.createElement("h3");
        noteBTN.style.position = 'absolute';
        noteBTN.style.left = '0.5vw';
        noteBTN.style.top = 5.5*count+'vh';
        noteBTN.style.height = '5vh';
        noteBTN.style.width = '80vw';
        noteBTN.style.borderTop = 'none';
        noteBTN.style.borderLeft = 'none';
        noteBTN.style.backgroundColor = '#ffffff';
        noteBTN.style.overflow = 'hidden';
        noteBTN.style.margin = '0';
        noteBTN.style.padding = '0';
        noteBTN.style.color = 'black';
        noteBTN.value = "    "+noteName;
        noteBTN.style.fontSize = '4vw';
        noteBTN.style.fontFamily = 'Sans-serif';
        noteBTN.style.fontWeight = 'bold';
        noteBTN.style.textOverflow = 'ellipsis';
        noteBTN.onclick = function() { 
            var repWithlink = textValue.innerHTML.replace('@note', "<span id='note' onclick='showNote(this.innerHTML)'>" + noteName + "</span>&#8203;");
            document.getElementById('modalBG').style.opacity = 0;
            document.getElementById('modalBG').style.zIndex = -1;
            jQuery('#TagNote').hide(300);
            pasteHtmlAtCaret(repWithlink,textValue);
        };
        noteBTN.appendChild(btnText);
        noteDiv.appendChild(noteBTN);
        count += 1;
        
    });
}

function callTagNotes() {
    jQuery('#TagNote').show(400);
    document.getElementById('modalBG').style.opacity = 0.6;
    document.getElementById('modalBG').style.zIndex = 3;
    document.getElementById('TagNote').style.zIndex = 5;

    var Ref = firebase.database().ref("Note");
    var Group = localStorage.getItem("groupEntry");
    var textValues = document.getElementById("TBoxs");
    var count = 0;
    Ref.orderByChild("GroupName").equalTo(Group).on('child_added', function(snapshot) {     
        var noteName = snapshot.val().noteName;
        var noteDiv = document.getElementById("nCoFileBlockOuter");
        var noteBTN = document.createElement("input");
        var btnText = document.createElement("h3");
        noteBTN.style.position = 'absolute';
        noteBTN.style.left = '0.5vw';
        noteBTN.style.top = 5.5*count+'vh';
        noteBTN.style.height = '5vh';
        noteBTN.style.width = '80vw';
        noteBTN.style.borderTop = 'none';
        noteBTN.style.borderLeft = 'none';
        noteBTN.style.backgroundColor = '#ffffff';
        noteBTN.style.overflow = 'hidden';
        noteBTN.style.margin = '0';
        noteBTN.style.padding = '0';
        noteBTN.style.color = 'black';
        noteBTN.value = "    "+noteName;
        noteBTN.style.fontSize = '4vw';
        noteBTN.style.fontFamily = 'Sans-serif';
        noteBTN.style.fontWeight = 'bold';
        noteBTN.style.textOverflow = 'ellipsis';
        noteBTN.onclick = function() {
            var repWithlinks = textValues.innerHTML.replace('@note', "<span id='note' onclick='showNote(this.innerHTML)'>" + noteName + "</span>&#8203;");
            document.getElementById('modalBG').style.opacity = 0;
            document.getElementById('modalBG').style.zIndex = -1;
            jQuery('#TagNote').hide(300);
            pasteHtmlAtCarets(repWithlinks,textValues);
        };
        noteBTN.appendChild(btnText);
        noteDiv.appendChild(noteBTN);
        count += 1;
        
    });
}

function AddLocationtoText() {
    jQuery('#maps').hide();
    var mapValue = document.getElementById('searchMap');
    var textValue = document.getElementById("TBox");
    var locationText = mapValue.value;
    var stage = localStorage.getItem("Page");
    //var refkey;
    var changeCheck = null

    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode({ 'address': mapValue.value}, function(results, status) {  
        var mapLatitude = results[0].geometry.location.lat();
        var mapLongitude = results[0].geometry.location.lng();
        if (status == google.maps.GeocoderStatus.OK) {
            var repWithlink = textValue.innerHTML.replace('@location', "<span id='loc' onclick='OpenLocation(this.innerHTML)'>" + locationText + "</span>&#8203;");
            document.getElementById('modalBG').style.opacity = 0;
            document.getElementById('modalBG').style.zIndex = -1;
            //document.getElementById("TBox").innerHTML = repWithlink;
            pasteHtmlAtCaret(repWithlink,textValue);
        } else {
            alert("Something got wrong " + status);
        }

        // if(stage == "/group_page"){
        //  refkey = localStorage.getItem("groupkey");
        //  var coRef = firebase.database().ref("Group/"+refkey+"/CoFunction/");
        //  coRef.on('value', function(snapshot) {  
        //      for(var i=0;i<snapshot.numChildren()+1;i++) {
        //          if(changeCheck == true) { console.log("stop"); break;}
        //          setTimeout( function() {
        //              var ID = "cf"+(snapshot.numChildren()+1);
        //              var idRef = firebase.database().ref("Group/"+refkey+"/CoFunction/"+ID)
        //              idRef.set({
        //                  Type: "location",
        //                  locationName: locationText,
        //                  lat: mapLatitude,
        //                  long: mapLongitude
        //              });
        //          }, 1000);
        //          changeCheck = true;
        //      }
        //  });
        // } else if(stage == "/chat_page"){
        //  var coRef = firebase.database().ref("ChatSystem");

        // } else if(stage == "/addlist_page"){
        //  var coRef = firebase.database().ref("Worklist");
        // }
    });
}

function AddLocationtoTexts() {
    jQuery('#maps').hide();
    var mapValue = document.getElementById('searchMap');
    var textValues = document.getElementById("TBoxs");
    var locationText = mapValue.value;
    var stage = localStorage.getItem("Page");
    //var refkey;
    var changeCheck = null

    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode({ 'address': mapValue.value}, function(results, status) {  
        var mapLatitude = results[0].geometry.location.lat();
        var mapLongitude = results[0].geometry.location.lng();
        if (status == google.maps.GeocoderStatus.OK) {
            var repWithlinks = textValue.innerHTML.replace('@location', "<span id='loc' onclick='OpenLocation(this.innerHTML)'>" + locationText + "</span>&#8203;");
            document.getElementById('modalBG').style.opacity = 0;
            document.getElementById('modalBG').style.zIndex = -1;
            pasteHtmlAtCarets(repWithlinks,textValues);
        } else {
            alert("Something got wrong " + status);
        }
    });
}

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
    if(stage == "/group_page") {
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

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(showPosition, positionFail);
});
function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    var currentPosition = new google.maps.LatLng(lat, long);
    var mapOptions = {
        center: currentPosition,
        zoom: 14,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
        },
    };
    map = new google.maps.Map(
        document.getElementById("map_canvas"), 
        mapOptions
    );
    var marker = new google.maps.Marker({
        position: currentPosition,
        map: map,
    });
    document.getElementById("p2").style.display = "none";
    searchMap();
}
function positionFail() {

}

function searchMap() {
    var input = document.getElementById('searchMap');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];  
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }   
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];    
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };   
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function panto() {
    var currentPosition = new google.maps.LatLng(lat, long);
    map.panTo(currentPosition);
}

function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange) //Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange(); //Create range
        range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
        range.collapse(false); //collapse range to the end point
        selection = window.getSelection(); //get the selection object
        selection.removeAllRanges(); //remove any selections already made
        selection.addRange(range); //make range you have just created the visible selection
    } else if (document.selection) //IE 8 and lower
    {
        range = document.body.createTextRange(); //Create range
        range.moveToElementText(contentEditableElement); //Select the entire contents of the element with range
        range.collapse(false); //collapse range to the end point
        range.select(); //Select range
    }
}

function elementContainsSelection(el) {
    var sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount > 0) {
            for (var i = 0; i < sel.rangeCount; ++i) {
                if (!isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
                    return false;
                }
            }
            return true;
        }
    } else if ((sel = document.selection) && sel.type != "Control") {
        return isOrContains(sel.createRange().parentElement(), el);
    }
    return false;
}

function isOrContains(node, container) {
    while (node) {
        if (node === container) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function pasteHtmlAtCaret(html, el) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (elementContainsSelection(el)) {
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.getElementById('TBox');
                el.innerHTML = html;
                var frag = document.createDocumentFragment(),
                    node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        } else {
            setEndOfContenteditable(el);
            pasteHtmlAtCaret(html, el);
        }
    }
}

function pasteHtmlAtCarets(html, el) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (elementContainsSelection(el)) {
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.getElementById('TBoxs');
                el.innerHTML = html;
                var frag = document.createDocumentFragment(),
                    node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        } else {
            setEndOfContenteditable(el);
            pasteHtmlAtCarets(html, el);
        }
    }
}

window.onload = function() {
    timeSelect();
    PICselect();

    CoFunction();
    CoFunctions();
    ProfileImg();

    function ProfileImg() {
        var userRef = firebase.database().ref('User');
        var userName = localStorage.getItem('Username');

        userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
            var UValue = snapshot.val();
            document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
        });
    }

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