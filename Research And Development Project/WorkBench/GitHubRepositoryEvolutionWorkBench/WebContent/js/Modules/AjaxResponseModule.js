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
				  } else {
					  //get contribution index
					  index = index + 1;
					  name = projectNames[index];
					  darwin.githubModule.send(darwin.projectManagerModule.getBaseRequestUrl(index) + darwin.projectManagerModule.getcurrRequestPage(), callback, index, action);
				  }
			  } else {
				  
				  if(action == "commit"){
					  darwin.Mediator.setCommitJson(index,response)
					  darwin.Mediator.updateCommitProgress(response.length);
				  }
				  if(action == "star"){
					  darwin.Mediator.setStarJson(index,response)
					  darwin.Mediator.updateStarProgress(response.length);
				  }
				  //watcher call does no return all 100 that i expect, so numbers are slightly off
				  if(action == "watcher"){
					  darwin.Mediator.setWatcherJson(index,response)
					  darwin.Mediator.updateWatcherProgress(response.length);
				  }
				  if(action == "fork"){
					  darwin.Mediator.setForkJson(index,response)
				  }		
				  if(action == "tags"){
					  darwin.Mediator.setTagsJson(index,response)
				  }	
				  if(action == "comments"){
					  darwin.Mediator.setCommentJson(index,response)
				  }		
				  if(action == "Issues"){
				 
					  darwin.Mediator.setIssuesJson(index,response)
					  
					  //find out how many are actual issues
					  var issuesCount = darwin.Mediator.issuesCount(response);
					  
					  darwin.Mediator.updateIssuesProgress(issuesCount);
				  }	
				  if(action == "tagSupplement"){
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
				  if(action == "extraInfo"){
					  
					  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
					  //decode from base 64
					  var decodedString = Base64.decode(response.content);

					  //store read me
					  darwin.dataManager.setReadMe(decodedString, index);
					  
					  index++;

					  //if index less then num projects send next project to 'send'
					  if(index < darwin.projectManagerModule.getNumProjects()){
						  
						  projectNames = darwin.projectManagerModule.getProjectNames();
				    	  project = projectNames[index];

						  darwin.githubModule.send("https://api.github.com/repos" + project + "/readme?type=extra", darwin.AjaxResponseModule.handleSuccess, index, "extraInfo");
				        
					  }
				  }
				 
				  //Only when json is less then 100 is true callback made. 
				  if(response.length == 0){    						
					  
					  //reset counter for next projects json
					  darwin.Mediator.resetcurrRequestPage(0);
					  
					  if(action == "commit"){ //maybe wipe json here? after the callback?
						  //gets the commits and passes in the index (how many commits selected)
						  callback(darwin.Mediator.getIndexCommitJson(index), index, action);  
						  darwin.Mediator.setNumCommitProjectSelected();
					  }
					  if(action == "star"){
						  callback(darwin.Mediator.getIndexStarJson(index), index, action);
						  darwin.Mediator.setNumStarProjectSelected();
					  }
					  if(action == "watcher"){
						  callback(darwin.Mediator.getIndexWatcherJson(index), index, action);
						  darwin.Mediator.setNumWatcherProjectSelected();
					  }
					  if(action == "fork"){
						  callback(darwin.Mediator.getIndexForkJson(index), index, action);
						  darwin.Mediator.setNumForkProjectSelected();
					  }
					  if(action == "tags"){
						  darwin.Mediator.supplementTagData(callback, action, index);
					  }  	
					  if(action == "comments"){
						  var page = darwin.dataManager.getIndexIssueComments(index,false);

						  if(page == "XX"  || page == undefined){
							  callback(darwin.Mediator.getIndexCommentJson(index), index, action);

						  } else{
							  darwin.Mediator.makeGithubRequestSingleUrl("https://api.github.com/repos"+project+"/issues" + "/" + darwin.dataManager.getIndexIssueComments(index) + "/comments?type=comment", callback, index, action);
						  }
						  
					  } 
					  if(action == "Issues"){
						  //get normal issues based on created at date
						  callback(darwin.Mediator.getIndexIssuesJson(index), index, action);
						  
						  //get issues based on closed at date
						  callback(darwin.Mediator.getIndexIssuesJson(index), index, "closedAt");
						  
						  if(darwin.projectManagerModule.getIsAuto() != true){
						  
							  //kick start the get issue comments process
							  projects = darwin.projectManagerModule.getProjectNames();
							  project = projects[index];
							  darwin.Mediator.prepareIssueComment(index, "https://api.github.com/repos"+project+"/issues", project);
						  }
						  
						  darwin.Mediator.setNumIssuesProjectSelected();					  
					  }  				  					  
					  
				  } else { //else poll for next set of 100
					  if(action != "tagSupplement" && action != "comments"){
						  //update counter
						  darwin.Mediator.setcurrRequestPage(1);
					  
					  	//repeat request but with different page number
					  	darwin.Mediator.makeGithubRequestSingleUrl(darwin.Mediator.getAllBaseRequestUrl(index) + darwin.Mediator.getcurrRequestPage(), callback, index, action);
					  }
					  if(action == "comments"){
						  var page = darwin.dataManager.getIndexIssueComments(index, false);

						  if(page == "XX" || page == undefined){
							  callback(darwin.Mediator.getIndexCommentJson(index), index, action);

						  } else{
							  darwin.Mediator.makeGithubRequestSingleUrl("https://api.github.com/repos"+project+"/issues" + "/" + darwin.dataManager.getIndexIssueComments(index) + "/comments?type=comment", callback, index, action);
						  }
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