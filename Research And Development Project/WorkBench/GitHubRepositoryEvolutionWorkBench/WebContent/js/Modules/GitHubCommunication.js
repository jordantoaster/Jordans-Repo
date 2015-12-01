/**
 * 
 */

var darwin = darwin || {};

darwin.githubModule = (function() {
	
	//used to stop new calls to send overriding the index of the last call when in success block
	var contributorIndex = 0;
	
    return {
    	send: function (url, callback, index, action) {		
    		$.ajax({
    			  dataType: 'JSON',
    			  type : "GET",
    			  url : url,
    			  cache: false,
    			  headers : {
    				  Accept: "application/vnd.github.v3.star+json"
    			  },
    			  beforeSend: function(req) {
    			      req.setRequestHeader('Authorization', 'Basic ' + btoa('jordantoaster:jordan321'));
    			  },
    			  success : function(response) {  
    				  
    				  darwin.Mediator.performSuccessAction(action, response, callback, index);   				  
    			  },
    			  error: function() {
    		       	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the API, make sure the url is correct");
    		      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
    		     }
    		});
        }
    };
})();