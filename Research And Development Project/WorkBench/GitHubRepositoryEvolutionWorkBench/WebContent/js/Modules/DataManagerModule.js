/**
 * 
 */

var darwin = darwin || {};

darwin.dataManager = (function() {
	
	deletions = [];
	additions = [];
	LOC = [];
	difference = [];
	commitList = [];

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
        }
    };
})(); 