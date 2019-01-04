var firebase = require('firebase');
var firebaseRef = new firebase("https://coapp492.firebaseio.com");

var firebaseContent = {};

firebaseRef.on("value", function(snapshot) {
 	firebaseContent = snapshot.val();
}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});
