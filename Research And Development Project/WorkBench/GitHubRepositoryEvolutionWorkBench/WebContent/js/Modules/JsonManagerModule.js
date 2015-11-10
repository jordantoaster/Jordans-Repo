/**
 * 
 */

var darwin = darwin || {};

darwin.jsonManagerModule = (function() {
	
	var contributionArray = [];
	var commitArray = [];
	
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
        setCommitJson : function (index, json){
        	commitArray[index] = json;
        }
    };
})();