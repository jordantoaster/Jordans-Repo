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
	var isStarsChecked = false;
	var isTagsChecked = false;
	var isForksChecked = false;
	var isIssuesChecked = false;
	
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
			stars = darwin.Mediator.getStarsIndex(currentIndex);
			forks = darwin.Mediator.getForksIndex(currentIndex);
			tags = darwin.Mediator.getTagsIndex(currentIndex);
			issues = darwin.Mediator.getIssuesIndex(currentIndex);

			//if index has commits then draw checkbox for it
			if(commits != undefined){
				$("#options").append('<div id="commitsCheck" class="checkbox"><label><input type="checkbox" value="">Commits</label></div>')
			}
			if(stars != undefined){
				$("#options").append('<div id="starsCheck" class="checkbox"><label><input type="checkbox" value="">Stars</label></div>')
			}
			if(tags != undefined){
				$("#options").append('<div id="tagsCheck" class="checkbox"><label><input type="checkbox" value="">Tags</label></div>')
			}
			if(forks != undefined){
				$("#options").append('<div id="forksCheck" class="checkbox"><label><input type="checkbox" value="">Forks</label></div>')
			}
			if(issues != undefined){
				$("#options").append('<div id="issuesCheck" class="checkbox"><label><input type="checkbox" value="">Issues</label></div>')
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
        	isStarsChecked = false;
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
        setStarsChecked : function(bool){
        	isStarsChecked = bool;
        },
        setTagsChecked : function(bool){
        	isTagsChecked = bool;
        },
        setForksChecked : function(bool){
        	isForksChecked = bool;
        },
        setIssuesChecked : function(bool){
        	isIssuesChecked = bool;
        },
        getIsIssuesChecked : function(){
        	return isIssuesChecked;
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
        getIsStarsChecked : function(){
        	return isStarsChecked;
        },
        getIsForksChecked : function(){
        	return isForksChecked;
        },
        getIsTagsChecked : function(){
        	return isTagsChecked;
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
            $('input').not('#starsCheck').prop('checked', false);
            darwin.customTabModule.setStarsChecked(false);
            $('input').not('#issuessCheck').prop('checked', false);
            darwin.customTabModule.setIssuesChecked(false);
        },
        resetCustomTabData : function(){
        	currentIndex = 0;
        	isAdditionsChecked = false;
        	isDeletionsChecked = false;
        	isLOCChecked = false;
        	isCommitsChecked = false;
        	stilOnCustom = true;
        	isStarsChecked = false;
        	isTagsChecked = false;
        	isForksChecked = false;
        }
    };
})();