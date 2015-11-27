/**
 * 
 */

var darwin = darwin || {};

darwin.dataManager = (function() {
	
	var deletions = [];
	var additions = [];
	var LOC = [];
	var difference = [];
	var commitList = [];
	var customDataList = [];
	var customNameList = [];
	var contributionDates = [];

    return {
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
    	setCommits: function (index, data) {
    		commitList[index] = data;
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
        }
    };
})(); 