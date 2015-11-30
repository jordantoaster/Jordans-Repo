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
			  } else {
				  
				  if(action == "commit"){
					  darwin.Mediator.setCommitJson(index,response)
					  darwin.Mediator.updateCommitProgress(response.length);
				  }
				  if(action == "star"){
					  darwin.Mediator.setStarJson(index,response)
					  darwin.Mediator.updateStarProgress(response.length);
				  }
				 
				  //Only when json is less then 100 is true callback made. 
				  if(response.length < 100){    						
					  
					  //reset counter for next projects json
					  darwin.Mediator.resetcurrRequestPage(0);
					  
					  if(action == "commit"){
						  //gets the commits and passes in the index (how many commits selected)
						  callback(darwin.Mediator.getIndexCommitJson(index), darwin.Mediator.getNumCommitProjectSelected(), action);  
						  darwin.Mediator.setNumCommitProjectSelected();
					  }
					  if(action == "star"){
						  callback(darwin.Mediator.getStarJson(), darwin.Mediator.getNumStarProjectSelected(), action);
						  darwin.Mediator.setNumStarProjectSelected();
					  }
						  					  
					  
				  } else { //else poll for next set of 100
					  
					  //update counter
					  darwin.Mediator.setcurrRequestPage(1);
					  
					  //repeat request but with different page number
					  darwin.Mediator.makeGithubRequestSingleUrl(darwin.Mediator.getAllBaseRequestUrl(index) + darwin.Mediator.getcurrRequestPage(), callback, index, action);
				  }
			  }
        }
    };
})();