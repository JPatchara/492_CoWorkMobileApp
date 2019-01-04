var login_page = require('../controllers/login_page.controller.js');

module.exports = function(app){
	app.get('/',login_page.render);
	//app.route('login_page').get(user.login);
	//app.post('/login', login_page.login);	
};