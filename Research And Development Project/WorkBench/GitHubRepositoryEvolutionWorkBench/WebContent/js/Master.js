/**
 * KEEP AN EYE ON DARWIN NAME SPACE CAUSING AN UNDEFINED< JUST ADD darwin. to access a function
 */

$(document).ready(function(e) {
	$('#navbar').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/NavBar.html');
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
       	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the API");
      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	  
     }
	 });
};

darwin.performAjaxRequestServer = function(action, callback, type, input){  
	$.ajax({
	  type : type,
	  url : 'http://localhost:8080/GitHubRepositoryEvolutionWorkBench/Service',
      data : { 
      	action: action,
      	input: input,
      },
	  success : function(response) {
		  callback(response);
	  },
	  error: function() {
	       	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the Server");
	      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
	  }
	 });
};


	
	// This is called with the results from from FB.getLoginStatus().
	function statusChangeCallback(response) {
		
	  console.log('statusChangeCallback');
	  console.log(response);
	  
	  // The response object is returned with a status field that lets the app know the current login status of the person.
	  // Full docs on the response object can be found in the documentation for FB.getLoginStatus().
	  if (response.status === 'connected') {
	    // Logged into your app and Facebook.
		//window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp";
	    //testAPI();
	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your app.
	    document.getElementById('status').innerHTML = 'Please log ' +
	      'into this app.';
	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this app or not.
	    document.getElementById('status').innerHTML = 'Please log ' +
	      'into Facebook.';
	  }
	}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	function checkLoginState() {
	  FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	  });
	}

	window.fbAsyncInit = function() {
	FB.init({
	  appId      : '119913561700364',
	  cookie     : true,  // enable cookies to allow the server to access 
	                      // the session
	  xfbml      : true,  // parse social plugins on this page
	  version    : 'v2.2' // use version 2.2
	});

	// Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to the callback you provide.  They can be:
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into your app or not.
	// These three cases are handled in the callback function.
	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});

	};

	// Load the SDK asynchronously
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	function testAPI() {
	  console.log('Welcome!  Fetching your information.... ');
	  FB.api('/me', function(response) {
	    console.log('Successful login for: ' + response.name);
	    document.getElementById('status').innerHTML =
	      'Thanks for logging in, ' + response.name + '!';
	  });
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
