var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var jade = require('jade');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var cookieSession = require('express-session');
var firebase = require("firebase");
var passport = require("passport");
//var config = require('./config');

module.exports = function(){
	var app = express();
	
	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else{
		app.use(compression);
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(validator());

	app.set('views','./app/views');
	app.set('view engine','jade');
	
	require('../app/routes/user.routes')(app);
	
	//require('./passport')(passport);
	app.use(passport.initialize());
	app.use(passport.session());
	//app.use(flash());
	//require('../public/passport')(passport);
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' }));
	
	app.use(sass({
		src: './sass',
		dest: './public/css',
		outputStyle: 'compressed',
		prefix: '/css',
		debug: true,
		indentedSyntax: true
	}));

	app.use(express.static('./public'));
	//app.use('/static', express.static('./public'));

	return app;
}