/**
 * 
 */

var darwin = darwin || {};

darwin.customTabModule = (function() {
	
	var currentIndex = 0;
	var isAdditionsChecked = false;
	var isDeletionsChecked = false;
	var isLOCChecked = false;
	var isCommitsChecked = false;
	var stilOnCustom = true;
	
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
			$("#options").append('<div id="additionsCheck" class="checkbox"><label><input type="checkbox" value="">Additions</label></div>')
			$("#options").append('<div id="deletionsCheck" class="checkbox"><label><input type="checkbox" value="">Deletions</label></div>')
			$("#options").append('<div id="LOCCheck" class="checkbox"><label><input type="checkbox" value="">LOC</label></div>')

    		//get all the commits
    		commits = darwin.Mediator.getCommitsIndex(currentIndex);

			//if index has commits then draw checkbox for it
			if(commits != undefined){
				$("#options").append('<div id="commitsCheck" class="checkbox"><label><input type="checkbox" value="">commits</label></div>')
			}
        },
        clearComponents : function(){
        	$("#projectOptions").empty();
        	$("#options").empty();
        	$("#customChart").empty();
        },
        clearOptionsOnly : function(){
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
        	isAdditionsChecked = bool;
        },
        setDeletionsChecked : function(bool){
        	isDeletionsChecked = bool;
        },
        setLOCChecked : function(bool){
        	isLOCChecked = bool;
        },
        setCommitsChecked : function(bool){
        	isCommitsChecked = bool;
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
        },
        getIsOnCustom : function(){
        	return stilOnCustom;
        },
        setIsOnCustom : function(val){
        	stilOnCustom = val;
        },
        removeChecks : function(){
            $('input').not('#additionsCheck').prop('checked', false)
            darwin.customTabModule.setAdditionsChecked(false);
            $('input').not('#deletionsCheck').prop('checked', false)
            darwin.customTabModule.setDeletionsChecked(false);
            $('input').not('#LOCCheck').prop('checked', false);
            darwin.customTabModule.setLOCChecked(false);            
            $('input').not('#commitsCheck').prop('checked', false);
            darwin.customTabModule.setCommitsChecked(false);
        },
        resetCustomTabData : function(){
        	currentIndex = 0;
        	isAdditionsChecked = false;
        	isDeletionsChecked = false;
        	isLOCChecked = false;
        	isCommitsChecked = false;
        	stilOnCustom = true;
        }
    };
})();