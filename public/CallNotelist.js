function CallNoteList() {
  var Ownername = localStorage.getItem("Username");
  var ThisGroup = localStorage.getItem("groupEntry");
  var noteRef = firebase.database().ref("Note");
  var countList = 0;

  noteRef.orderByChild("GroupName").equalTo(ThisGroup).on('child_added', function(snapshot) {
    console.log(snapshot.val().GroupName);
    var noteName = snapshot.val().noteName;

    var noteDiv = document.getElementById("FileBlockOuter");
    var noteBTN = document.createElement("input");
    var btnText = document.createElement("h3");
    var goIcon = document.createElement("img");
    noteBTN.style.position = 'absolute';
    noteBTN.style.left = '0.5vw';
    noteBTN.style.top = 5.5*countList+'vh';
    noteBTN.style.height = '5vh';
    noteBTN.style.width = '95vw';
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
    goIcon.src = '/img/greaterthan.png';
    goIcon.style.position = 'absolute';
    goIcon.style.right = '2vw';
    goIcon.style.top = '1.2vh';
    goIcon.style.width = '3.2vw';
    goIcon.style.height = '2.5vh';
    noteBTN.onclick = function() { 
      localStorage.setItem("note", noteName);
      //localStorage.setItem("Page", '/notedetail_page');
      location.href = '/notedetail_page';
    };
    noteBTN.appendChild(btnText);
    noteBTN.appendChild(goIcon);
    noteDiv.appendChild(noteBTN);

    countList += 1;
  });
}

window.onload = function() {
  CallNoteList();
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

function ProfileImg() {
  var userRef = firebase.database().ref('User');
  var userName = localStorage.getItem('Username');

  userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
  var UValue = snapshot.val();
  document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
  });
}