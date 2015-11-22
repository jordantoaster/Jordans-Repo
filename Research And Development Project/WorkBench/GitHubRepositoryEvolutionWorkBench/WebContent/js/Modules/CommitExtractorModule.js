/**
 * TODO - use data Measure lines of code - add difference value each new whole sample to a total
 */

var darwin = darwin || {};

darwin.commitExtractorModule = (function() {
	
	sampleIterator = 0;
	commits = [];
	dates = [];
	totalCommits = 0;
	firstDate = true;
	localJson = [];
	//two makes it biweekly
	sampleRate = 1;
		
    return {
    	// data comes in front to back, so < is used in place of > then reversed at the end
    	extract: function (json, index) {
    		
    		var iterationCount = darwin.Mediator.getSmallestArray(json);

    		//for(var i=0;i<json.length;i++){		//here if multiple projects commits in in array
    			
    			localJson = json[0];
				localJson.reverse();
    			sampleIterator = 0;
    			commits = [];
    			dates = [];
    			totalCommits = 0;
    			firstDate = true;
    			lastDateInSample = [];
    			    			    		
    			for(var j = 0;j<iterationCount;j++){
    				    				
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
    			darwin.Mediator.setCommitDetails(darwin.Mediator.getNumCommitProjectSelected(), commits, darwin.projectManagerModule.getProjectNames());
    			
        		//send to mongo for storage
    			//darwin.Mediator.packagerCommits(dates, commits, darwin.projectManagerModule.getProjectNamesIndex(index));
    			
    		//}   //for
    		
    		smallestSize = darwin.Mediator.getCommitDetails().reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity}).length;
    			
    		darwin.Mediator.drawCommitGraph(dates, darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", smallestSize);
    		
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
        	dateRange.setDate(dateRange.getDate()+(sampleRate * 7)) //-1 accounts for including initial date in range
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