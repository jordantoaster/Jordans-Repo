/**
 * 
 */

var darwin = darwin || {};

darwin.jsonManagerModule = (function() {
	
	var contributionArray = [];
	var mergedCommits = [];
	var mergedStars = [];
	var mergedWatchers = [];
	var commitArray = []; //each inner array represents a project
	var starArray = [];
	var watcherArray = [];
	var forkArray = [];
	var mergedForks = [];
	var TagsArray = [];
	var mergedTags = [];
	var tagSupplement = [];
	var mergedTagSupplement = [];
	var issuesArray = [];
	var mergedIssues = [];
	
    return {
    	getMergedSupplementTag: function (index) {
    		return mergedTagSupplement[index];
        },        
    	getSupplementTag: function() {
    		return tagSupplement;
        },   
        setSupplementTag : function (json, index){ //concatenate one request with another
        	if(tagSupplement.length === 0){
        		tagSupplement = [json]
        	} else {
        		tagSupplement.push.apply(tagSupplement, [json]);
        	}
        	if(json.length == 0){ //OR if(darwin.Mediator.getSupplementTag(index).length == darwin.Mediator.targetSupplementSize())
        		darwin.jsonManagerModule.setMergedCommits(tagSupplement, index);
        	}
        },
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
        	return mergedStars[0];
        },
        getIndexStarJson : function (index){
        	return mergedStars[index];
        },
        getIndexForkJson : function (index){
        	return mergedForks[index];
        },
        getIndexWatcherJson : function (index){
        	return mergedWatchers[index];
        },
        getForkJson : function (){
        	return mergedForks[0];
        },
        getTagsJson : function (index){
        	return mergedTags[index];
        },
        getWatcherJson : function (){
        	return mergedWatchers[0];
        },
        getAllCommitJson : function (){
        	return mergedCommits;
        },
        getAllIssuesJson : function(){
        	return mergedIssues;
        },
        getIndexIssues : function(index){
        	return mergedIssues[index];
        },
        setCommitJson : function (index, json){ //concatenate one request with another
        	if(commitArray.length === 0){
        		commitArray = json
        	} else {
            	commitArray.push.apply(commitArray, json);
        	}
        	if(json.length == 100){
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
        setWatcherJson : function (index, json){ //concatenate one request with another
        	if(watcherArray.length === 0){
        		watcherArray = json
        	} else {
        		watcherArray.push.apply(watcherArray, json);
        	}
        	if(json.length < 100){
        		darwin.jsonManagerModule.setMergedWatchers(watcherArray, index);
        	}
        },
        setForkJson : function (index, json){ //concatenate one request with another
        	if(forkArray.length === 0){
        		forkArray = json
        	} else {
        		forkArray.push.apply(forkArray, json);
        	}
        	if(json.length < 100){
        		darwin.jsonManagerModule.setMergedForks(forkArray, index);
        	}
        },
        setTagsJson : function (index, json){ //concatenate one request with another
        	if(TagsArray.length === 0){
        		TagsArray = json
        	} else {
        		TagsArray.push.apply(TagsArray, json);
        	}
        	if(json.length < 100){
        		darwin.jsonManagerModule.setMergedTags(TagsArray, index);
        	}
        },
        setIssuesJson : function (index, json){ //concatenate one request with another
        	if(issuesArray.length === 0){
        		issuesArray = json
        	} else {
        		issuesArray.push.apply(issuesArray, json);
        	}
        	//should i just keep updating this?
        	//if(json.length < 100){
        		darwin.jsonManagerModule.setMergedIssues(issuesArray, index);
        	//}
        },
        setMergedTags : function(TagsArray, index){
        	mergedTags[index] = TagsArray;
        },
        setMergedCommits : function(commitArray, index){
        	mergedCommits[index] = commitArray;
        },
        setMergedStars : function(starArray, index){
        	mergedStars[index] = starArray;
        },
        setMergedWatchers : function(watcherArray, index){
        	mergedWatchers[index] = watcherArray;
        },
        setMergedForks : function(forkArray, index){
        	mergedForks[index] = forkArray;
        },
        setMergedIssues : function(issuesArray, index){
        	mergedIssues[index] =  issuesArray;
        },
        resetCommitJson : function (){ //concatenate one request with another
        	commitArray = [];
        },
        resetStarJson : function (){ //concatenate one request with another
        	starArray = [];
        },
        resetForkJson : function (){ //concatenate one request with another
        	forkArray = [];
        },
        resetIssuesJson : function (){ //concatenate one request with another
        	issuesArray = [];
        },
        resetWatcherJson : function (){ //concatenate one request with another
        	watcherArray = [];
        },
        resetTagsJson : function (){ //concatenate one request with another
        	TagsArray = [];
        	tagSupplement = [];
        },
        resetAllData : function(){
        	 contributionArray = [];
        	 mergedCommits = [];
        	 mergedStars = [];
        	 mergedWatchers = [];
        	 commitArray = [];
        	 starArray = [];
        	 watcherArray = [];
        	 mergedForks = [];
        	 forkArray = [];
        	 TagsArray = [];
        	 issuesArray = [];
        	 mergedIssues = [];
        }
    };
})();