/**
 * 
 */

var darwin = darwin || {};

darwin.progressbarModule = (function() {
	var intervalSize = 50;
	var adjustedWidth = 0;
	var commitProgress =0;
	var starProgress =0;
	var watcherProgress=0;
	
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
        updateCommitProgress : function(value){
        	commitProgress = commitProgress + value;
            $('#commitProgress').text("Commits Processed : " + commitProgress);
        },
        updateStarProgress : function(value){
        	starProgress = starProgress + value;
            $('#starProgress').text("stars Processed : " + starProgress);
        },
        updateWatcherProgress : function(value){
        	watcherProgress = watcherProgress + value;
            $('#WatcherProgress').text("Watchers Processed : " + watcherProgress);
        },
        reset : function(){
        	 commitProgress =0;
        	 starProgress =0;
        	 watcherProgress=0;
        }
    };
})();