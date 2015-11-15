/**
 * 
 */

var darwin = darwin || {};

darwin.packager = (function () {
    return {
    	contributions : function(additions, deletions, LOC, dates){
    		
    		var datesAsString = darwin.packager.convertDateObjectToString(dates);
    		var splitKey = "#";
    		var requestData = additions.concat(splitKey).concat(deletions).concat(splitKey).concat(LOC).concat(splitKey).concat(datesAsString).concat(splitKey).concat(darwin.projectManagerModule.getProjectId);  		    		
    		  		
    		darwin.Mediator.makeServerRequest("storeContributions",darwin.Mediator.emptyCallback,"POST",requestData)	
    	},    
    	commits : function(dates, commits, projectId){
    		
    		var datesAsString = darwin.packager.convertDateObjectToString(dates);
    		var splitKey = "#";
    		var requestData = commits.concat(splitKey).concat(datesAsString).concat(splitKey).concat(projectId);		    		

    		darwin.Mediator.makeServerRequest("storeCommits",darwin.Mediator.emptyCallback,"POST",requestData)	
    	},
    	convertDateObjectToString : function(dates){
    		var stringArray = [];
    		
    		for(i =0; i<dates.length;i++){
    			stringArray[i] = dates[i].toString();
    		}
    		return stringArray;
    	}
    };
})();