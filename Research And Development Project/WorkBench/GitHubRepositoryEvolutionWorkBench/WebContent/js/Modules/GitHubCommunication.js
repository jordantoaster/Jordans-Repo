/**
 * 
 */

var darwin = darwin || {};

darwin.githubModule = (function() {
    return {
    	send: function (url, type, callback, index, action) {
    		$.ajax({
    			  dataType: 'JSON',
    			  type : type,
    			  url : url,
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