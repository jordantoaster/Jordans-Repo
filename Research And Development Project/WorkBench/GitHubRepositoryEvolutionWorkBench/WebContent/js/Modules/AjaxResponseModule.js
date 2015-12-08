/**
 * 
 */

var darwin = darwin || {};

darwin.AjaxResponseModule = (function () {
    return {
    	handleSuccess: function (action, response, callback, index) {

			  if(action == "contribution" && response != []){
				  darwin.Mediator.setContributionJson(index,response);
				  
				  var contributions = darwin.jsonManagerModule.getAllContributionJson();
				  var size = darwin.AjaxResponseModule.getSizeOfArray(contributions);
				  
				  //only make call back when we have all the required json
				  if(size == darwin.projectManagerModule.getNumProjects()){
					  callback(darwin.jsonManagerModule.getAllContributionJson(), index);					
				  }
			  } else {
				  
				  if(action == "commit" && response.length != 0){
					  darwin.Mediator.setCommitJson(index,response)
					  darwin.Mediator.updateCommitProgress(response.length);
				  }
				  if(action == "star" && response.length != 0){
					  darwin.Mediator.setStarJson(index,response)
					  darwin.Mediator.updateStarProgress(response.length);
				  }
				  //watcher call does no return all 100 that i expect, so numbers are slightly off
				  if(action == "watcher" && response.length != 0){
					  darwin.Mediator.setWatcherJson(index,response)
					  darwin.Mediator.updateWatcherProgress(response.length);
				  }
				  if(action == "fork" && response.length != 0){
					  darwin.Mediator.setForkJson(index,response)
					  darwin.Mediator.updateForkProgress(response.length);
				  }		
				  if(action == "tags" && response.length != 0){
					  darwin.Mediator.setTagsJson(index,response)
				  }	
				  if(action == "tagSupplement" && response.length != 0){
					  darwin.Mediator.setSupplementTag(response, index);
					  darwin.Mediator.updateTagsProgress(1);
					  darwin.Mediator.setTagSuppIndex();
					  
					  if(darwin.Mediator.getSupplementTag(index).length == darwin.Mediator.targetSupplementSize()){
						  darwin.Mediator.resetTagSuppIndex();
						  callback(darwin.Mediator.getTagsJson(index), index, "tags", darwin.Mediator.sortSuppDataDates(index));
					  	  darwin.Mediator.setNumTagsProjectSelected();
					  } else {
						  darwin.Mediator.supplementTagData(callback, action, index);
					  }

				  }
				 
				  //Only when json is less then 100 is true callback made. 
				  if(response.length == 0){    						
					  
					  //reset counter for next projects json
					  darwin.Mediator.resetcurrRequestPage(0);
					  
					  if(action == "commit"){
						  //gets the commits and passes in the index (how many commits selected)
						  callback(darwin.Mediator.getIndexCommitJson(index), index, action);  
						  darwin.Mediator.setNumCommitProjectSelected();
					  }
					  if(action == "star"){
						  callback(darwin.Mediator.getIndexStarJson(index), index, action);
						  darwin.Mediator.setNumStarProjectSelected();
					  }
					  if(action == "watcher"){
						  callback(darwin.Mediator.getIndexWatcherJson(), index, action);
						  darwin.Mediator.setNumWatcherProjectSelected();
					  }
					  if(action == "fork"){
						  callback(darwin.Mediator.getIndexForkJson(index), index, action);
						  darwin.Mediator.setNumForkProjectSelected();
					  }
					  if(action == "tags"){
						  darwin.Mediator.supplementTagData(callback, action, index);
					  }  	
						  					  
					  
				  } else { //else poll for next set of 100
					  if(action != "tagSupplement"){
						  //update counter
						  darwin.Mediator.setcurrRequestPage(1);
					  
					  	//repeat request but with different page number
					  	darwin.Mediator.makeGithubRequestSingleUrl(darwin.Mediator.getAllBaseRequestUrl(index) + darwin.Mediator.getcurrRequestPage(), callback, index, action);
					  }
				  }
			  }
        },
        getSizeOfArray : function(array){
        	var size = 0;
        	
        	for(var i =0; i<array.length;i++){
        		if(array[i] != undefined)
        			size++;
        	}
        	return size;
        }
    };
})();