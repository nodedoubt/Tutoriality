var m = require('mithril');

var Notification = {};
module.exports = Notification;

var message = null;
var type = null;

Notification.set = function(newType, newMessage) {
	message = newMessage;
	type = newType;
	m.redraw();
}

Notification.isShown = function() {
	return message !== null;
}

Notification.getMessage = function() {
	return message;
}