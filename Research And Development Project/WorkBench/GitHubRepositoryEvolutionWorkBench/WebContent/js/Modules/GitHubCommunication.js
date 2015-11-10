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
    			  beforeSend: function(req) {
    			      req.setRequestHeader('Authorization', 'Basic ' + btoa('jordantoaster:jordan321'));
    			  },
    			  success : function(response) {
    				  if(action == "contribution"){
    					  darwin.jsonManagerModule.setContributionJson(index,response)
    					  callback(darwin.jsonManagerModule.getAllContributionJson());
    				  }
    				  if(action == "commit"){
    					  darwin.jsonManagerModule.setCommitJson(index,response)
    					  callback(darwin.jsonManagerModule.getAllCommitJson());
    				  }
    			  },
    			  error: function() {
    		       	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the API, make sure the url is correct");
    		      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
    		     }
    		});
        }
    };
})();