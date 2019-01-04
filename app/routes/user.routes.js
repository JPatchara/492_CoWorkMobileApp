var user = require('../controllers/user.controller.js');

module.exports = function(app) {
	app.route('/signup_page').get(user.renderSignup);
	app.route('/main_page').get(user.renderMain);
	app.route('/calendar_page').get(user.renderCalendar);
	app.route('/member_page').get(user.renderMember);
	app.route('/group_page').get(user.renderGroup);
	app.route('/list_page').get(user.renderList);
	app.route('/chat_page').get(user.renderChat);
	app.route('/note_page').get(user.renderNote);
	app.route('/folder_page').get(user.renderFolder);
	app.route('/addlist_page').get(user.renderAddlist);
	app.route('/addnote_page').get(user.renderAddnote);
	app.route('/listdetail_page').get(user.renderListDT);
	app.route('/profile_page').get(user.renderProfile);
	app.route('/notedetail_page').get(user.renderNoteDT);
	app.route('/side_navigation_page').get(user.renderSideNav);
	app.route('/activity_page').get(user.renderActivity);
	app.route('/setting_page').get(user.renderSetting);
	app.route('/about_page').get(user.renderAbout);
	app.route('/help_page').get(user.renderHelp);
	app.route('/calendardetail_page').get(user.renderCalendarDT);
	app.route('/daydetail_page').get(user.renderDayDT);
	app.route('/login_page').get(user.renderLogin);
	app.route('/Cofunction').get(user.renderCF);
	app.route('/otherprofile_page').get(user.renderOTProfile);
	//app.post('/login', user.login);
};