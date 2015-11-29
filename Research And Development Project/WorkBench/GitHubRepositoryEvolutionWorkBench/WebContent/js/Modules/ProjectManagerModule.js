/*A global module*/

var darwin = darwin || {};

darwin.projectManagerModule = (function() {
	
	projectId = "";
    baseRequestUrl = [];
    samplingRate = 6;
    comparison = false;
    numProjects = 1;
    projectNames = [];
    currRequestPage = 1;
    commitSamplingRate = 6;
    commitExtractorType = false;
    sampleIndex = 2;
    currentProjectIndex = 0;
    currentContribution = "difference";
    starProjectsAdded = 0;
		
    return {
    	loadCommitSelection: function (projects) {
    		for(var i=0;i<projects.length;i++){  			
    			$("#commitOptions").append('<button type="button" id="commitOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    			$("#starOptions").append('<button type="button" id="starOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    		}
        },
        setCurrentProjectIndex: function(index){
        	currentProjectIndex = index
        },
        getCurrentProjectIndex: function(){ 
        	return currentProjectIndex;
        }, 
        setNumProjects: function(){
        	numProjects = numProjects + 1;
        },
        getNumProjects: function(){ 
        	return numProjects;
        }, 
        setSampleIndex: function(index){
        	sampleIndex = index;
        },
        getSampleIndex: function(){ 
        	return sampleIndex;
        }, 
        resetNumProjects : function(){
        	getNumProjects = 1;
        },
        setProjectNames: function(name){
        	projectNames.push(name);
        },
        getProjectNames: function(){ 
        	return projectNames;
        },  
        resetProjectNames : function(){
        	projectNames = [];
        },
        getProjectNamesIndex: function(i){ 
        	return projectNames[i];
        }, 
        setcurrRequestPage: function(val){
        	currRequestPage = currRequestPage + val;
        },
        resetcurrRequestPage: function(){
        	currRequestPage = 0;
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
        setCommitSamplingRate: function(sample){
        	commitSamplingRate = sample;
        },
        getCommitSamplingRate: function(){
        	return commitSamplingRate;
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
        resetBaseRequestUrl : function(){
        	baseRequestUrl = [];
        },
        resetVariables: function(){      	
    	    darwin.Mediator.resetContributionVariables();
    	    darwin.Mediator.resetCommitVariables();
        },
        resetComponents: function() {
    		$('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);  
    		$('#commitChart').empty();
    		$('#projectOptions').empty();
    		$('#options').empty();  
    		$('#commitOptions').empty();
    		$('#starOptions').empty();
        },
        disableTabs :  function(){
            $('.nav li').not('.active').addClass('disabled');
            $('.nav li').not('.active').find('a').removeAttr("data-toggle");
        },
        enableTabs :  function(){
            $('.nav li.active').nextAll('li').removeClass('disabled');
            $('.nav li.active').nextAll('li').find('a').attr("data-toggle","tab")
        },
        disableCommitButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#commitHeader").text('Please wait until the data is collected');
        },
        disableStarButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#starHeader").text('Please wait until the data is collected');
        },
        enableCommitButton :  function(){
        	$('.btn-group button').removeAttr('disabled');
       	 	$("#commitHeader").text('You can now select another project');
        },
        setCommitExtractorType : function(type){
        	commitExtractorType = type;
        },
        getCommitExtractorType : function(){
        	return commitExtractorType;
        },
        getCurrentContributionMetric : function(){
        	return currentContribution;
        },
        setCurrentContributionMetric : function(metricName){
        	currentContribution = metricName;
        },
        getContributionMetricArray : function(metricName){
        	if(metricName == "difference")
        		return darwin.dataManager.getAllDifference();
        		
            if(metricName == "addition")
        		return darwin.dataManager.getAllAdditions();

            		
            if(metricName == "deletion")
        		return darwin.dataManager.getAllDeletions();

                		
            if(metricName == "LOC")
        		return darwin.dataManager.getAllLOCOverTime();

        },
		swapSampleRate : function(index) {
			if (index == 0)
				return 1;
			if (index == 1)
				return 6;
			if (index == 2)
				return 13;
			if (index == 3)
				return 26;
		},
		setStarProjectsAdded : function(){
			starProjectsAdded = starProjectsAdded +1;
		},
		getStarProjectsAdded : function(){
			return starProjectsAdded;
		},
		resetStarProjectsAdded : function(){
			starProjectsAdded = 0;
		},
        noCallBack : function(){
        	//do nothing
        }
    };
})();