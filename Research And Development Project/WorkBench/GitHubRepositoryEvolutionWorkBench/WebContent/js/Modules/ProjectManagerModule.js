/*A global module*/

var darwin = darwin || {};

darwin.projectManagerModule = (function() {
	
	projectId = "";
    baseRequestUrl = [];
    samplingRate = 13;
    comparison = false;
    numProjects = 1;
    currRequestPage = 1;
		
    return {
    	
        setNumProjects: function(){
        	numProjects = numProjects + 1;
        },
        getNumProjects: function(){ 
        	return numProjects;
        },  
        setcurrRequestPage: function(val){
        	currRequestPage = val;
        },
        getcurrRequestPage: function(){ 
        	return currRequestPage;
        },  
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
        setBaseRequestUrl: function(index, url){
        	baseRequestUrl[index] = url;
        },
        getBaseRequestUrl: function(index){
        	return baseRequestUrl[index];
        },  
        getAllBaseRequestUrl: function(){
        	return baseRequestUrl;
        }, 
        resetVariables: function(){      	
    	    darwin.Mediator.resetContributionVariables();      	
        },
        resetComponents: function() {
    		$('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);    
        },
        disableTabs :  function(){
            $('.nav li').not('.active').addClass('disabled');
            $('.nav li').not('.active').find('a').removeAttr("data-toggle");
        },
        enableTabs :  function(){
            $('.nav li.active').nextAll('li').removeClass('disabled');
            $('.nav li.active').nextAll('li').find('a').attr("data-toggle","tab")
        },
        noCallBack : function(){
        	//do nothing
        }
    };
})();