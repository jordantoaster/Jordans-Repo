/**
 * @author Jordan McDonald
 *
 * Description - all communication to the api is handled here - callbacks and parameters make this totally generic
 */


var darwin = darwin || {};

darwin.githubModule = (function() {
	
	//used to stop new calls to send overriding the index of the last call when in success block
	var contributorIndex = 0;
	
    return {
    	send: function (url, callback, index, action) {		//token = e930c4107ce7bfa5dcf7c5396bcb10992b3aa534

    		$.ajax({
    			  dataType: 'JSON',
    			  type : "GET",
    			  cache: false,
    			  url : url + '&client_id=65c067c6618032a1cacd&client_secret=b7b408d098ec46b94cacd03fbdea357f58c6706e&?access_token=e930c4107ce7bfa5dcf7c5396bcb10992b3aa534&preventCache=' + new Date(),
    			  cache: false,
    			  headers : {
    				  Accept: "application/vnd.github.v3.star+json"
    			  },
    			  beforeSend: function(req) {
    			      //req.setRequestHeader('Authorization', 'Basic ' + btoa('jordantoaster:jordan321'));
    			  },
    			  success : function(response) {  
    				 
    				  
    				//sometimes despite a correct url github returns empty json on initial hit of url, repeat if contribution and empty
    				if(action == "contribution" && Object.keys(response).length == 0){
    					darwin.githubModule.send(url, callback, index, action); 
    				} else if (action == "user") {
    					callback(response, url, index);
    				} else {
    					setTimeout(function(){darwin.Mediator.performSuccessAction(action, response, callback, index)}, 80);   
    				}
    				
    			  },
    			  error: function() {  				  
    					$('#ajaxGetUserServletResponse').text("An error occured when connecting to the API, make sure the url is correct");
    					$("#ajaxGetUserServletResponse").css({"opacity":"1"});
    		     }
    		});
        },
    };
})();