/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#submitButtonUser", function () {
		darwin.Mediator.prepareUserClick($("#userFeild").val());	
	});
});