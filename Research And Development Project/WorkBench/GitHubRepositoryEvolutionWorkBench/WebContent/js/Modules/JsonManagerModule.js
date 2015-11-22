/**
 * 
 */

var darwin = darwin || {};

darwin.jsonManagerModule = (function() {
	
	var contributionArray = [];
	var mergedCommits = [];
	var commitArray = []; //each inner array represents a project
	
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
        	return commitArray[index];
        },
        getAllCommitJson : function (){
        	return commitArray;
        },
        setCommitJson : function (index, json){ //concatenate one request with another
        	if(commitArray.length === 0){
        		commitArray = json
        	} else {
            	commitArray.push.apply(commitArray[index], json);
        	}
        	if(json.length < 100){
        		darwin.jsonManagerModule.setMergedCommits(commitArray, index);
        	}
        },
        setMergedCommits : function(commitArray, index){
        	mergedCommits[index] = commitArray;
        },
        getMergedCommits : function(){
        	return mergedCommits;
        },
        resetCommitJson : function (){ //concatenate one request with another
        	commitArray = [[]];
        }
    };
})();