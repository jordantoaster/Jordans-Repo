/**
 * 
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
    				  
    				  //if successful ensure flag is false (needs to be ten in a row to count as complete issues)
    				if(action == "comments"){
    				      darwin.projectManagerModule.setIssuesFlag(false);
    				}
    				  
    				//sometimes despite a correct url github returns empty json on initial hit of url, repeat if contribution and empty
    				if(action == "contribution" && Object.keys(response).length == 0){
    					darwin.githubModule.send(url, callback, index, action); 
    				} else {
        				darwin.Mediator.performSuccessAction(action, response, callback, index);   
    				}
    				
    			  },
    			  error: function() {
    				  
    				if(action != "comments"){
    					$('#ajaxGetUserServletResponse').text("An error occured when connecting to the API, make sure the url is correct");
    					$("#ajaxGetUserServletResponse").css({"opacity":"1"});
    				} else {
    					     					
    					//moves onto next request if one is missing
    					if(darwin.projectManagerModule.getIssuesFlag() == false){
    					        darwin.projectManagerModule.setIssuesFlag(true);
    					 
    					        //move onto next issue
    					        darwin.dataManager.setIndexIssueComment();
    					         					
    					         //make the next call
    					         darwin.Mediator.makeGithubRequestSingleUrl("https://api.github.com/repos"+project+"/issues" + "/" + darwin.dataManager.getIndexIssueComments(index) + "/comments?type=comment", callback, index, action);
    					 
    					 } else {
    					     	//if ten unsuccessful calls then move on with normal process.
    					        darwin.projectManagerModule.setIssuesFlag(false);
    					        darwin.Mediator.performSuccessAction(action, [], callback, index);   
    					    }
    					     					
    				}
    		     }
    		});
        },
    };
})();