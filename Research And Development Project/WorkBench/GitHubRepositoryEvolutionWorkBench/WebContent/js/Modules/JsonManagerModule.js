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
	var commentArray = [];
	var mergedComments = [];
	var collabArray = [];
	
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
        getCommentJson : function (index){
        	return mergedComments[index];
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
        getIndexCommentJson : function (index){
        	return mergedComments[index];
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
        getAllCommentJson : function(){
        	return mergedComments;
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
        		if(json.length != 0)
        			commitArray.push.apply(commitArray, json);
        	}
        	if(json.length != 100){
        		darwin.jsonManagerModule.setMergedCommits(commitArray, index);
        	}
        },
        setCommentJson : function (index, json){ //concatenate one request with another
        	if(commentArray.length === 0){
        		commentArray = json
        	} else {
        		if(json.length != 0)
        			commentArray.push.apply(commentArray, json);
        	}
        	if(json.length != 100){
        		darwin.jsonManagerModule.setMergedComments(commentArray, index);
        	}
        },
        setStarJson : function (index, json){ //concatenate one request with another
        	if(starArray.length === 0){
        		starArray = json
        	} else {
        		if(json.length != 0)
        			starArray.push.apply(starArray, json);
        	}
        	if(json.length != 100){
        		darwin.jsonManagerModule.setMergedStars(starArray, index);
        	}
        },
        setWatcherJson : function (index, json){ //concatenate one request with another
        	if(watcherArray.length === 0){
        		watcherArray = json
        	} else {
        		if(json.length != 0)
        			watcherArray.push.apply(watcherArray, json);
        	}
        	if(json.length != 100){
        		darwin.jsonManagerModule.setMergedWatchers(watcherArray, index);
        	}
        },
        setForkJson : function (index, json){ //concatenate one request with another
        	if(forkArray.length === 0){
        		forkArray = json
        	} else {
        		if(json.length != 0)
        			forkArray.push.apply(forkArray, json);
        	}
        	if(json.length != 100){
        		darwin.jsonManagerModule.setMergedForks(forkArray, index);
        	}
        },
        setTagsJson : function (index, json){ //concatenate one request with another
        	if(TagsArray.length === 0){
        		TagsArray = json
        	} else {
        		if(json.length != 0)
        			TagsArray.push.apply(TagsArray, json);
        	}
        	if(json.length != 100){
        		darwin.jsonManagerModule.setMergedTags(TagsArray, index);
        	}
        },
        setIssuesJson : function (index, json){ //concatenate one request with another
        	if(issuesArray.length === 0){
        		issuesArray = json
        	} else {
        		if(json.length != 0)
        			issuesArray.push.apply(issuesArray, json);
        	}
        	//should i just keep updating this?
        	if(json.length != 100){
        		darwin.jsonManagerModule.setMergedIssues(issuesArray, index);
        	}
        },
        setMergedTags : function(TagsArray, index){
        	mergedTags[index] = TagsArray;
        },
        setMergedCommits : function(commitArray, index){
        	mergedCommits[index] = commitArray;
        },
        setMergedComments : function(commentArray, index){
        	mergedComments[index] = commentArray;
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
        resetCommentJson : function (){ //concatenate one request with another
        	commentArray = [];
        },
        resetStarJson : function (){ //concatenate one request with another
        	starArray = [];
        },
        resetForkJson : function (){ //concatenate one request with another
        	forkArray = [];
        },
        resetCollabJson : function (){ //concatenate one request with another
        	collabArray = [];
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
        	 commentArray = [];
        	 mergedComments = [];
        }
    };
})();