// module.exports = {
// 	'facebookAuth': {
// 		'clientID': '100260807181270',
// 		'clientSecret' : 'f751d041659211c518b11ba7f5f76873',
// 		'callbackURL' : 'http://localhost:4000/auth/facebook/callback'
// 	}
// }

window.fbAsyncInit = function() {
	FB.init({
		appId      : '100260807181270',
		xfbml      : true,
		version    : 'v2.8'
	});
	FB.AppEvents.logPageView();
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));