function ProfileImg() {
  var userRef = firebase.database().ref('User');
  var userName = localStorage.getItem('Username');

  userRef.orderByChild('UserName').equalTo(userName).on('child_added', function(snapshot) {
    var UValue = snapshot.val();
    document.getElementById('profileImg').style.backgroundImage = UValue.ProfileImage;
  });
}

window.onload = function(){
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