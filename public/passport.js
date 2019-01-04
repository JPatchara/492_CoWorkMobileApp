var configAuth = require('../public/fbAuthen');
var passport = require("passport");
var FacebookStrategy = require("passport-facebook");

module.exports = function(){

	passport.use(new FacebookStrategy({
			clientID: configAuth.facebookAuth.clientID,
			clientSecret: configAuth.facebookAuth.clientSecret,
			callbackURL: configAuth.facebookAuth.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function(){
				User.findone({'facebook.id': profile.id}, function(err,user){
					if(err){
						return done(err);
					}
					if(user){
						return done(null, user);
					}
					else {
						var newUser = new User();
						newUser.facebook.id = profile.id;
						newUser.facebook.token = accessToken;
						newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
						newUser.facebook.email = profile.emails[0].value;

						newUser.save(function(err){
							if(err){
								throw err;
							}
							return done(null, user);
						})
					}
				})
			});
		}
	));
}