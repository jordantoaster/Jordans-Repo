/**
 * 
 */

var darwin = darwin || {};

darwin.jsonManagerModule = (function() {
	
	var contributionArray = [];
	var commitArray = [[]]; //each inner array represents a project
	
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
        	if(commitArray[index].length === 0){
        		commitArray[index] = json
        	} else {
            	commitArray[index].push.apply(commitArray[index], json);
        	}
        },
        resetCommitJson : function (){ //concatenate one request with another
        	commitArray = [[]];
        }
    };
})();