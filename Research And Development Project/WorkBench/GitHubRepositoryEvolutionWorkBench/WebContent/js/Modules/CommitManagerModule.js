var darwin = darwin || {};

darwin.commitManager = (function () {
	
	//represents a 3 month period, NOT USED 
	sampleRate = 3;
	
	firstAdd = true;
	projectsAdded = 0;
	
    return {
        getSampleRate : function(){
        	return sampleRate;
        },
        setSampleRate : function(val){
        	sampleRate = val;
        },
        getProjectsAdded : function(){
        	return projectsAdded;
        },
        setProjectsAdded : function(val){
            projectsAdded = val;
        },
        resetProjectsAdded : function(){
        	projectsAdded = 0;
        }
    };
})();
