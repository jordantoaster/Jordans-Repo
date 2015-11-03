/*A global module*/

var darwin = darwin || {};

darwin.projectManagerModule = (function() {
	
	projectId = "";
    baseRequestUrl = "";
    baseRequestUrlTwo = "";
    samplingRate = 13;
    comparison = false;
		
    return {
    	
        setProjectId: function(id){
        	projectId = id;
        },
        getProjectId: function(){
        	return projectId;
        },  
        setComparison: function(comparisonIn){
        	comparison = comparisonIn;
        },
        getComparison: function(){
        	return comparison;
        }, 
        setSamplingRate: function(sample){
        	samplingRate = sample;
        },
        getSamplingRate: function(){
        	return samplingRate;
        },
        setBaseRequestUrl: function(url){
        	baseRequestUrl = url;
        },
        getBaseRequestUrl: function(){
        	return baseRequestUrl;
        },        
        setBaseRequestUrlTwo: function(url){
        	baseRequestUrlTwo = url;
        },
        getBaseRequestUrlTwo: function(){
        	return baseRequestUrlTwo;
        },
        resetVariables: function(){      	
    	    darwin.Mediator.resetContributionVariables();      	
        },
        resetComponents: function() {
    		$('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);    
        }
    };
})();