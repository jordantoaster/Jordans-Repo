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
    					 
    					  //Only when json is less then 100 is true callback made. 
    					  if(response.length < 100){    						
    						  
    						  //reset counter for next projects json
    						  darwin.projectManagerModule.resetcurrRequestPage(0);
    						  
        					  callback(darwin.jsonManagerModule.getAllCommitJson());
        					  
    					  } else { //else poll for next set of 100
    						  
    						  //update counter
    						  darwin.projectManagerModule.setcurrRequestPage(1);
    						  
    						  //repeat request but with different page number
    						  darwin.githubModule.send(darwin.projectManagerModule.getAllBaseRequestUrl(index) + darwin.projectManagerModule.getcurrRequestPage(), type, callback, index, action);
    					  }
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