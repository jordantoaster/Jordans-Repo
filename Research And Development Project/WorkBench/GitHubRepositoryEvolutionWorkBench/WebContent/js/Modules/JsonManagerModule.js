/**
 * 
 */

var darwin = darwin || {};

darwin.jsonManagerModule = (function() {
	
	var contributionArray = [];
	var mergedCommits = [];
	var mergedStars = [];
	var commitArray = []; //each inner array represents a project
	var starArray = [];
	
    return {
        getContributionJson : function (index){
        	return contributionArray[index];
        },
        getAllContributionJson : function (){
        	return contributionArray;
        },
        setContributionJson : function (index, json){
        	contributionArray[index] = json;
        },
        getCommitJson : function (index){
        	return mergedCommits[index];
        },
        getStarJson : function (){
        	return mergedStars;
        },
        getAllCommitJson : function (){
        	return mergedCommits;
        },
        setCommitJson : function (index, json){ //concatenate one request with another
        	if(commitArray.length === 0){
        		commitArray = json
        	} else {
            	commitArray.push.apply(commitArray, json);
        	}
        	if(json.length < 100){
        		darwin.jsonManagerModule.setMergedCommits(commitArray, index);
        	}
        },
        setStarJson : function (index, json){ //concatenate one request with another
        	if(starArray.length === 0){
        		starArray = json
        	} else {
        		starArray.push.apply(starArray, json);
        	}
        	if(json.length < 100){
        		darwin.jsonManagerModule.setMergedStars(starArray, index);
        	}
        },
        setMergedCommits : function(commitArray, index){
        	mergedCommits[index] = commitArray;
        },
        setMergedStars : function(starArray, index){
        	mergedStars[index] = starArray;
        },
        resetCommitJson : function (){ //concatenate one request with another
        	commitArray = [];
        },
        resetStarJson : function (){ //concatenate one request with another
        	starArray = [];
        }
    };
})();