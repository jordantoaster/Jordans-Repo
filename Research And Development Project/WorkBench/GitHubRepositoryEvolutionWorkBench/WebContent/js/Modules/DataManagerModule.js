/**
 * 
 */

var darwin = darwin || {};

darwin.dataManager = (function() {
	
	var deletions = [];
	var additions = [];
	var deletionsAcc = [];
	var additionsAcc = [];
	var starsAcc = [];
	var issuesAcc = [];
	var commitsAcc = [];
	var forksAcc = [];
	var tagsAcc = [];
	var LOC = [];
	var difference = [];
	var commitList = [];
	var starList = [];
	var customDataList = [];
	var customNameList = [];
	var contributionDates = [];
	var forkList = [];
	var TagsList =[];
	var tagSupplement = [];
	var IssuesList = [];
	var closedIssues = [];
	var openIssues = [];
	var closedAtIssues =[];
	var issueComments = [];
	var issueNumbers = [];
	var contribSliderStart;
	var contribSliderEnd;
	var commentIndex = 0;

    return {
    	setIssueNumbers : function(index, numbers){
    		issueNumbers[index] = numbers;
    	},
    	getIssueNumbers : function(){
    		return issueNumbers;
    	},
    	setIndexIssueComment : function(){
    		commentIndex++;
    	},
    	getIndexIssueComments : function(index, bool){
    		if(bool == false){
    			return issueNumbers[index][commentIndex];
    		}
  		
    		if(commentIndex >= issueNumbers[index].length){
    			return "XX";
    		} else{
            	commentIndex++;
        		return issueNumbers[index][commentIndex-1];
    		}
    	},
    	resetCommentIndex : function(){
    		commentIndex = 0;
    	},
    	getCommentIndex : function(){
    		return commentIndex;
    	},
    	setIssueComments : function(index, data, projectNames, sampleIndex){
    		if(issueComments[index] === undefined)
    			issueComments[index] = [];
    		
    		issueComments[index][sampleIndex]  = data;
    	},
    	getIssueComments : function(){
    		return closedAtIssues;
    	},
    	setContribSlider : function(start, end){
    		contribSliderStart = start;
    		contribSliderEnd = end;
    	},
    	getContribSlider : function(){
    		var slider = [];
    		slider[0] = contribSliderStart;
    		slider[1] = contribSliderEnd;
    		return slider;
    	},
    	getContributionDates: function (index) {
    		return contributionDates[index];
        },
    	setContributionDates: function (index, data, sampleIndex) {
    		if(contributionDates[index] === undefined)
    			contributionDates[index] = [];
    		
    		contributionDates[index][sampleIndex]  = data;
        },
    	getAllContributionDates: function () {
    		return contributionDates;
        },
    	getAdditions: function (index) {
    		return additions[index];
        },
    	setAdditions: function (index, data, sampleIndex) {
    		if(additions[index] === undefined)
    			additions[index] = [];
    		
    		additions[index][sampleIndex]  = data;
        },
    	getAllAdditions: function () {
    		return additions;
        },
    	getDeletions: function (index) {
    		return deletions[index];
        },
    	setDeletions: function (index, data, sampleIndex) {
    		if(deletions[index] === undefined)
    			deletions[index] = [];
    		
    		deletions[index][sampleIndex]  = data;
        },
    	getAllDeletions: function () {
    		return deletions;
        },
    	getDifference: function (index) {
    		return difference[index];
        },
    	setDifference: function (index, data, sampleIndex) {
    		if(difference[index] === undefined) 		
    			difference[index] = [];
    			
    		difference[index][sampleIndex]  = data;
        },
    	getAllDifference: function () {
    		return difference;
        },
    	getLOCOverTime: function (index) {
    		return LOC[index];
        },
    	setLOCOverTime: function (index, data, sampleIndex) {
    		
    		if(LOC[index] === undefined)
    			LOC[index] = [];
    		
    		LOC[index][sampleIndex] = data;
        },
    	getAllLOCOverTime: function () {
    		return LOC;
        },
        setAdditionsAcc : function(index, data, sampleIndex){
    		if(additionsAcc[index] === undefined)
    			additionsAcc[index] = [];
    		
    		additionsAcc[index][sampleIndex]  = data;
        },
        getAdditionsAccIndex : function(index){
        	return additionsAcc[index];
        },
        getAllAdditionsAcc: function(){
        	return additionsAcc;
        }, 
        setDeletionsAcc : function(index, data, sampleIndex){
    		if(deletionsAcc[index] === undefined)
    			deletionsAcc[index] = [];
    		
    		deletionsAcc[index][sampleIndex]  = data;
        },
        getDeletionsAccIndex : function(index){
        	return deletionsAcc[index];
        },
        getAllDeletionsAcc: function(){
        	return deletionsAcc;
        },
        setCommitsAcc : function(index, data, sampleIndex){
    		if(commitsAcc[index] === undefined)
    			commitsAcc[index] = [];
    		
    		commitsAcc[index][sampleIndex]  = data;
        },
        getCommitsAccIndex : function(index){
        	return commitsAcc[index];
        },
        getAllCommitsAcc: function(){
        	return commitsAcc;
        }, 
        setStarsAcc : function(index, data, sampleIndex){
    		if(starsAcc[index] === undefined)
    			starsAcc[index] = [];
    		
    		starsAcc[index][sampleIndex]  = data;
        },
        getStarsAccIndex : function(index){
        	return starsAcc[index];
        },
        getAllStarsAcc: function(){
        	return starsAcc;
        }, 
        setTagsAcc : function(index, data, sampleIndex){
    		if(tagsAcc[index] === undefined)
    			tagsAcc[index] = [];
    		
    		tagsAcc[index][sampleIndex]  = data;
        },
        getTagsAccIndex : function(index){
        	return tagsAcc[index];
        },
        getAllTagsAcc: function(){
        	return tagsAcc;
        }, 
        setIssuesAcc : function(index, data, sampleIndex){
    		if(issuesAcc[index] === undefined)
    			issuesAcc[index] = [];
    		
    		issuesAcc[index][sampleIndex]  = data;
        },
        getIssuesAccIndex : function(index){
        	return issuesAcc[index];
        },
        getAllIssuesAcc: function(){
        	return issuesAcc;
        }, 
        setForksAcc : function(index, data, sampleIndex){
    		if(forksAcc[index] === undefined)
    			forksAcc[index] = [];
    		
    		forksAcc[index][sampleIndex]  = data;
        },
        getForksAccIndex : function(index){
        	return forksAcc[index];
        },
        getAllForksAcc: function(){
        	return forksAcc;
        }, 
    	setCommits: function (index, data, projectNames, SampleIndexCommits) {
    		if(commitList[index] === undefined)
    			commitList[index] = [];

    		commitList[index][SampleIndexCommits]  = data;
        },
    	getCommits: function () {
    		return commitList;
        },
    	getCommitsIndex: function (index) {
    		return commitList[index];
        },
        resetCommitsList : function(){
        	commitList = [];
        },
    	setStars: function (index, data, projectNames, SampleIndex) {
    		if(starList[index] === undefined)
    			starList[index] = [];

    		starList[index][SampleIndex]  = data;
        },
    	getStars: function () {
    		return starList;
        },
    	getStarsIndex: function (index) {
    		return starList[index];
        },
        resetStarsList : function(){
        	starList = [];
        },
    	setForks: function (index, data, projectNames, SampleIndex) {
    		if(forkList[index] === undefined)
    			forkList[index] = [];

    		forkList[index][SampleIndex]  = data;
        },
    	getForks: function () {
    		return forkList;
        },
    	getForksIndex: function (index) {
    		return forkList[index];
        },
        resetForksList : function(){
        	forkList = [];
        },
    	setTags: function (index, data, projectNames, SampleIndex) {
    		if(TagsList[index] === undefined)
    			TagsList[index] = [];

    		TagsList[index][SampleIndex]  = data;
        },
    	getTags: function () {
    		return TagsList;
        },
    	getTagsIndex: function (index) {
    		return TagsList[index];
        },
        resetTagsList : function(){
        	TagsList = [];
        },
    	setIssues: function (index, data, projectNames, SampleIndex,open, closed) {
    		if(IssuesList[index] === undefined)
    			IssuesList[index] = []; 
    			
    		if(closedIssues[index] === undefined)
    			closedIssues[index] = []; 
    			
    		if(openIssues[index] === undefined)
    			openIssues[index] = []; 

    		IssuesList[index][SampleIndex]  = data;
    		closedIssues[index][SampleIndex]  = closed;
    		openIssues[index][SampleIndex]  = open;
        },
    	setClosedAtIssues: function (index, data, projectNames, SampleIndex) {
    		if(closedAtIssues[index] === undefined)
    			closedAtIssues[index] = [];

    		closedAtIssues[index][SampleIndex] = data;

        },
    	getClosedAtIssues: function () {
    		return closedAtIssues;
        },
    	getIssues: function () {
    		var issueType = darwin.projectManagerModule.getIssuesType();
    		if(issueType == "all"){
        		return IssuesList;
    		}
    		if(issueType == "open"){
    			return openIssues;
    		}
    		if(issueType == "closed"){
    			return closedIssues;
    		}
    		if(issueType == "closedAt"){
    			return closedAtIssues;
    		}
    		if(issueType == "comments"){
    			return issueComments;
    		}
        },
    	getIssuesIndex: function (index) {
    		return IssuesList[index];
        },
    	getClosedIssues: function () {
    		return closedIssues;
        },
    	getClosedIssuesIndex: function (index) {
    		return closedIssues[index];
        },
    	getOpenIssues: function () {
    		return openIssues;
        },
    	getOpenIssuesIndex: function (index) {
    		return openIssues[index];
        },
        resetTagsList : function(){
        	IssuesList = [];
        },
        addToCustomList : function(array){
        	customDataList.push(array);
        },
        clearCustomList : function(){
        	customDataList = [];
        },
        addToCustomNameList : function(name){
        	customNameList.push(name);
        },
        clearCustomNameList : function(){
        	customNameList = [];
        },
        getCustomList : function(){
        	return customDataList;
        },
        getCustomNameList : function(){
        	return customNameList;
        },
        resetAllDataManager : function(){
        	 deletions = [];
        	 additions = [];
        	 deletionsAcc = [];
        	 additionsAcc = [];
        	 starsAcc = [];
        	 issuesAcc = [];
        	 commitsAcc = [];
        	 forksAcc = [];
        	 tagsAcc = [];
        	 LOC = [];     	 
        	 difference = [];
        	 commitList = [];
        	 starList = [];
        	 customDataList = [];
        	 customNameList = [];
        	 contributionDates = [];
        	 forkList = [];
        	 TagsList =[];
        	 tagSupplement = [];
        	 IssuesList = [];
        	 closedIssues = [];
        	 openIssues = [];
        	 closedAtIssues =[];
        	// issueComments = [];
        	// issueNumbers = [];
        	 contribSliderStart;
        	 contribSliderEnd;
        	 commentIndex = 0;
        }
    };
})(); 