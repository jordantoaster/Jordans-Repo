/**
 * 
 */

var darwin = darwin || {};

darwin.AjaxResponseModule = (function () {
    return {
    	handleSuccess: function (action, response, callback, index) {
    		
			  if(action == "contribution"){
				  darwin.Mediator.setContributionJson(index,response);
				  callback(darwin.jsonManagerModule.getAllContributionJson());
			  }
			  if(action == "commit"){
				  darwin.Mediator.setCommitJson(index,response)
				 
				  //Only when json is less then 100 is true callback made. 
				  if(response.length < 100){    						
					  
					  //reset counter for next projects json
					  darwin.Mediator.resetcurrRequestPage(0);
					  
					  callback(darwin.Mediator.getAllCommitJson(), index);
					  
				  } else { //else poll for next set of 100
					  
					  //update counter
					  darwin.Mediator.setcurrRequestPage(1);
					  
					  //repeat request but with different page number
					  darwin.Mediator.makeGithubRequestSingleUrl(darwin.Mediator.getAllBaseRequestUrl(index) + darwin.Mediator.getcurrRequestPage(), "GET", callback, index, action);
				  }
			  }
        }
    };
})();