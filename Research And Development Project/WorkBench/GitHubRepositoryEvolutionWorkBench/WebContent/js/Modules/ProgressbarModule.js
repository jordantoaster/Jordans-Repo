/**
 * @author Jordan McDonald
 *
 * Description - manages the initial progress bar & the non stat api counts for metric amounts processed
 */

var darwin = darwin || {};

darwin.progressbarModule = (function() {
	var intervalSize = 50;
	var adjustedWidth = 0;
	var commitProgress =0;
	var starProgress =0;
	var watcherProgress=0;
	var forkProgress =0;
	var tagsProgress =0;
	var issuesProgress = 0;
	var collabProgress = 0;
	var bulkProgress = "contributions";
	
    return {
    	updateProgressBar: function () {
    		
    		adjustedWidth = $('.progress-bar').attr('aria-valuenow');
    		adjustedWidth = parseInt(adjustedWidth) + intervalSize;

    		//get width then increment by interval size
    		$('.progress-bar').css('width', adjustedWidth+'%').attr('aria-valuenow', adjustedWidth);    
    		
    		if(adjustedWidth == 100){
    			adjustedWidth = 0;
    		}
        },
        updateBulkProgress : function(stage){
        	bulkProgress = stage;
        	
        	//update jsp
            $('#bulkProgress').text("Current Stage : " + bulkProgress);

        },
        updateCommitProgress : function(value){
        	commitProgress = commitProgress + value;
            $('#commitProgress').text("Commits Processed : " + commitProgress);
        },
        updateCollabProgress : function(value){
        	collabProgress = collabProgress + value;
            $('#collabProgress').text("Collaborators Processed : " + collabProgress);
        },
        updateStarProgress : function(value){
        	starProgress = starProgress + value;
            $('#starProgress').text("stars Processed : " + starProgress);
        },
        updateWatcherProgress : function(value){
        	watcherProgress = watcherProgress + value;
            $('#WatcherProgress').text("Watchers Processed : " + watcherProgress);
        },
        updateForkProgress : function(value){
        	forkProgress = forkProgress + value;
            $('#ForkProgress').text("Forks Processed : " + forkProgress);
        },
        updateReleaseProgress : function(value){
        	tagsProgress = tagsProgress + value;
            $('#TagsProgress').text("Tags Processed : " + tagsProgress);
        },
        updateIssuesProgress : function(value){
        	issuesProgress = issuesProgress + value;
            $('#IssuesProgress').text("Issues Processed : " + issuesProgress);
        },
        reset : function(){
        	 commitProgress =0;
        	 starProgress =0;
        	 watcherProgress=0;
        	 forkProgress = 0;
        	 tagsProgress =0;
        	 issuesProgress =0;
        	 collabProgress =0;
        }
    };
})();