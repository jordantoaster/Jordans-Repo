/**
 * 
 */

var darwin = darwin || {};

darwin.customTabModule = (function() {
	
	currentIndex = 0;
	isAdditionsChecked = false;
	isDeletionsChecked = false;
	isLOCChecked = false;
	isCommitsChecked = false;
	
    return {
    	//This function is called each time a new project is selected
    	setupUiDropDown : function (){ 
    		
    		var numProjects = darwin.projectManagerModule.getNumProjects();
    		var projectNames = darwin.projectManagerModule.getProjectNames();
    		  
    		//generate project choice options
    		for(var i=0; i<numProjects;i++){
    			var option = '<li><a href="#" id="'+i+'">'+projectNames[i]+'</a></li>';
    			$("#projectOptions").append(option);
    		}
        },
        setupUiOptions : function(){
        	//draw automatically generated stat check boxes
			$("#options").append('<div id="additions" class="checkbox"><label><input type="checkbox" value="">Additions</label></div>')
			$("#options").append('<div id="deletions" class="checkbox"><label><input type="checkbox" value="">Deletions</label></div>')
			$("#options").append('<div id="loc" class="checkbox"><label><input type="checkbox" value="">LOC</label></div>')

    		//get all the commits
    		commits = darwin.Mediator.getCommitsIndex(currentIndex);

			//if index has commits then draw checkbox for it
			if(commits != undefined){
				$("#options").append('<div id="commits" class="checkbox"><label><input type="checkbox" value="">commits</label></div>')
			}
        },
        clearComponents : function(){
        	$("#projectOptions").empty();
        	$("#options").empty();
        },
        getCurrentIndex : function(){
        	return currentIndex;
        },
        setCurrentIndex : function(index){
        	currentIndex = index;
        },
        resetChecks : function(){
        	isAdditionsChecked = false;
        	isDeletionsChecked = false;
        	isLOCChecked = false;
        	isCommitsChecked = false;
        },
        setAdditionsChecked : function(bool){
        	isAdditionsChecked = false;
        },
        setDeletionsChecked : function(bool){
        	isDeletionsChecked = false;
        },
        setLOCChecked : function(bool){
        	isLOCChecked = false;
        },
        setCommitsChecked : function(bool){
        	isCommitsChecked = false;
        },
        getIsAdditionsChecked : function(){
        	return isAdditionsChecked;
        },
        getIsDeletionsChecked : function(){
        	return isDeletionsChecked;
        },
        getIsLOCChecked : function(){
        	return isLOCChecked;
        },
        getIsCommitsChecked : function(){
        	return isCommitsChecked;
        }
    };
})();