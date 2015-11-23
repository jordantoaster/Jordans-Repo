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

    return {
    	getAdditions: function (index) {
    		return additions[index];
        },
    	setAdditions: function (index, data) {
    		additions[index] = data;
        },
    	getAllAdditions: function () {
    		return additions;
        },
    	getDeletions: function (index) {
    		return deletions[index];
        },
    	setDeletions: function (index, data) {
    		deletions[index] = data;
        },
    	getAllDeletions: function () {
    		return deletions;
        },
    	getDifference: function (index) {
    		return difference[index];
        },
    	setDifference: function (index, data) {
    		difference[index] = data;
        },
    	getAllDifference: function () {
    		return difference;
        },
    	getLOCOverTime: function (index) {
    		return LOC[index];
        },
    	setLOCOverTime: function (index, data) {
    		LOC[index] = data;
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