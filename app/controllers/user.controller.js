var firebase = require("firebase");

exports.openNav = function(req, res) {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

exports.closeNav = function(req, res) {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}

exports.renderLogin = function(req, res) {
	res.render('login_page',{});
};
exports.renderSignup = function(req, res) {
	res.render('signup_page',{});
};
exports.renderMain = function(req, res) {
	res.render('main_page',{});
};
exports.renderCalendar = function(req, res) {
	res.render('calendar_page',{});
};
exports.renderCalendarDT = function(req, res) {
	res.render('calendardetail_page',{});
};
exports.renderDayDT = function(req, res) {
	res.render('daydetail_page',{});
};
exports.renderMember = function(req, res) {
	res.render('member_page',{});
};
exports.renderGroup = function(req, res) {
	res.render('group_page',{});
};
exports.renderList = function(req, res) {
	res.render('list_page',{});
};
exports.renderChat = function(req, res) {
	res.render('chat_page',{});
};
exports.renderNote = function(req, res) {
	res.render('note_page',{});
};
exports.renderFolder = function(req, res) {
	res.render('folder_page',{});
};
exports.renderAddlist = function(req, res) {
	res.render('addlist_page',{});
};
exports.renderAddnote = function(req, res) {
	res.render('addnote_page',{});
};
exports.renderListDT = function(req, res) {
	res.render('listdetail_page',{});
};
exports.renderProfile = function(req, res) {
	res.render('profile_page',{});
};
exports.renderNoteDT = function(req, res) {
	res.render('notedetail_page',{});
};
exports.renderSideNav = function(req, res) {
	res.render('side_navigation_page',{});
};
exports.renderActivity = function(req, res) {
	res.render('activity_page',{});
};
exports.renderSetting = function(req, res) {
	res.render('setting_page',{});
};
exports.renderAbout = function(req, res) {
	res.render('about_page',{});
};
exports.renderHelp = function(req, res) {
	res.render('help_page',{});
};
exports.renderCF = function(req, res) {
	res.render('Cofunction',{});
};
exports.renderOTProfile = function(req, res) {
	res.render('otherprofile_page',{});
};