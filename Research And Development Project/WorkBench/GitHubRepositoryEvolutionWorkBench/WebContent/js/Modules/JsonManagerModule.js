/**
 * 
 */

var darwin = darwin || {};

darwin.jsonManagerModule = (function() {
	
	var contributionArray = [];
	
    return {
        getContributionJson : function (index){
        	return contributionArray[index];
        },
        getAllContributionJson : function (){
        	return contributionArray;
        },
        setContributionJson : function (index, json){
        	contributionArray[index] = json;
        }
    };
})();