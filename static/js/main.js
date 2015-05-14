$(function() {

	// Grab the current URL fragment and sets it to the value
	// or undefined. This isn't used at the moment.
	var url = window.location.hash;
	var fragment = url.substring(url.indexOf('#')+1);
	if (fragment == '') fragment = undefined;

	// Do other stuff, now. Like load the page content.

});