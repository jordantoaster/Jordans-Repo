/**
 * 
 */

var darwin = darwin || {};

darwin.packager = (function () {
    return {
    	contributions : function(additions, deletions, LOC){
    		
    		var splitKey = "#";
    		var requestData = additions.concat(splitKey).concat(deletions).concat(splitKey).concat(LOC);  		    		
    		  		
    		darwin.Mediator.makeServerRequest("store",darwin.Mediator.emptyCallback,"POST",requestData)	
    	},    	
    };
})();