/**
 * TODO - use data Measure lines of code - add difference value each new whole sample to a total
 */

var darwin = darwin || {};

darwin.commitExtractorModule = (function() {
	
	var sampleIterator = 0;
	var commits = [];
	var dates = [];
	var totalCommits = 0;
	var firstDate = true;
	var localJson = [];
	var sampleRateCommit = 0;
		
    return {
    	// data comes in front to back, so < is used in place of > then reversed at the end
    	extract: function (json, index) {   
    		
    		for(sampleIndexCommit = 0; sampleIndexCommit < 4;sampleIndexCommit++){
    			
    			//get the current sample rate
    			sampleRateCommit = darwin.projectManagerModule.swapSampleRate(sampleIndexCommit);
    		
    			//to avoid pass by referecence and changing the original values during reverse we need to copy it to another object
    			localJson = darwin.Mediator.copyObject(json);
    			
    			localJson.reverse();
    			sampleIterator = 0;
    			commits = [];
    			dates = [];
    			totalCommits = 0;
    			firstDate = true;
    			var lastDateInSample = [];
    			    			    		
    			for(var j = 0;j<localJson.length;j++){
    				    				
        			totalCommits++;
    				
        			var date = darwin.ISO601toDateModule.convert(localJson[j].commit.committer.date);
    				    				
    				if(firstDate){
    					// get range
    					lastDateInSample = darwin.commitExtractorModule.getDateRange(date);
    					firstDate = false;
    					dates[sampleIterator] = lastDateInSample;
    					commits[sampleIterator] = 1;
    				}
    				   
    				//checks if a date is out of the sample range
    				outOfSample = darwin.commitExtractorModule.checkDateBeyondSample(date, lastDateInSample);
    				
    				if(outOfSample){
    					lastDateInSample = darwin.commitExtractorModule.addSamplesSkipped(date, lastDateInSample);
    	 					
    					sampleIterator++;
    					dates[sampleIterator] = lastDateInSample;
    					commits[sampleIterator]=1;  
    				} else {
    					commits[sampleIterator]++;
    				}

    			} //for   			
    			
    			//send to data manager class for storage
    			darwin.Mediator.setCommitDetails(index, commits, darwin.projectManagerModule.getProjectNames(), sampleIndexCommit);
    					
        		//send to mongo for storage
    			//darwin.Mediator.packagerCommits(dates, commits, darwin.projectManagerModule.getProjectNamesIndex(index));  	
    		
    		}
			
    		darwin.Mediator.drawCommitGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex());
    		
    		//enable clicking on another project
			darwin.Mediator.enableCommitButton();
			
        },
        resetVariables: function(){      	
        	sampleIterator = 0;
        	commits = [];
        	dates = [];
        	totalCommits = 0;
        	firstDate = true;
        	localJson = [];
        },
        getDateRange : function(inputDate){	
        	var dateRange = new Date(inputDate);
        	dateRange.setDate(dateRange.getDate()+(sampleRateCommit * 7)) //-1 accounts for including initial date in range
        	return dateRange;
        },

        //ADD check to see if when out of a sample
        checkDateBeyondSample : function(date, finalDate){
        	if(date > finalDate){
        		return true;
        	}
        	return false;
        },
        addSamplesSkipped : function(currDate, lastKnownDate){
        	
        	notFoundDate = true;
        	samplesMissed = 0;
        	
        	//loop until we find new date inside a range
        	while(notFoundDate){
        		
        		lastKnownDate = darwin.commitExtractorModule.getDateRange(lastKnownDate)
        		
        		notFoundDate = darwin.commitExtractorModule.checkDateBeyondSample(currDate, lastKnownDate);
              		
        		if(notFoundDate){
					sampleIterator++;
					dates[sampleIterator] = lastKnownDate;
					commits[sampleIterator] = 0;  	
        		} 
        	}
        	return lastKnownDate;

        }
    };
})();