/**
 * 
 */

var darwin = darwin || {};

darwin.githubModule = (function() {
    return {
    	send: function (url, type, callback) {
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
        }
    };
})();