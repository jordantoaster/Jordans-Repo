
//Loads the navigation bar (consistent on every post splash web page)
$(document).ready(function(e) {
	$('#navbar').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/NavBar.html?2');
});


//Creates new namespace if not already defined
var darwin = darwin || {};

darwin.performAjaxRequestGitHub = function(url, type, callback){  
	$.ajax({
	  dataType: 'JSON',
	  type : type,
	  url : url,
	  beforeSend: function(req) {
	      req.setRequestHeader('Authorization', 'Basic ' + btoa('jordantoaster:jordan321'));
	  },
	  success : function(response) {
		  callback(response);
	  },
	  error: function() {
       	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the API, make sure the url is correct");
      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	  
     }
	 });
};

darwin.loadGraphLibrary = function() {
	//this stops chart library overriding page
	if(google) {
	    google.load('visualization', '1.0', {
	        packages: ['corechart'],
	        callback: function() {
	        	//No call back required for my app
	        }
	    })
	}
}

darwin.convertISO8601toDate = function(dtstr) {

	  // replace anything but numbers by spaces
	  dtstr = dtstr.replace(/\D/g," ");

	  // trim any hanging white space
	  dtstr = dtstr.replace(/\s+$/,"");

	  // split on space
	  var dtcomps = dtstr.split(" ");

	  // modify month between 1 based ISO 8601 and zero based Date
	 // dtcomps[1]--;
	  
	  date = [];
	  date[0] = dtcomps[2];
	  date[1] = dtcomps[1];
	  date[2] = dtcomps[0]
	  return date;
	
	  //var date = new Date(dtcomps[0],dtcomps[1],dtcomps[2],0,0,0,0);
	  //return date;

	  //var convdt = new
	//Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));

	  //return convdt.toUTCString();
}
