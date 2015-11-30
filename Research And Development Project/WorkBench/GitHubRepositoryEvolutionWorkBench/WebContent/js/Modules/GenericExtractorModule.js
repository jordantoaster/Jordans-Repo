/**
 * TODO - use data Measure lines of code - add difference value each new whole sample to a total
 */

var darwin = darwin || {};

darwin.genericExtractorModule = (function() {
	
	var sampleIterator = 0;
	var data = [];
	var dates = [];
	var total= 0;
	var firstDate = true;
	var localJson = [];
	var sampleRate = 0;
		
    return {
    	// data comes in front to back, so < is used in place of > then reversed at the end
    	extract: function (json, index, action) {   
    		    		
    		for(sampleIndex = 0; sampleIndex < 4;sampleIndex++){
    		
    			
    			//get the current sample rate
    			sampleRate = darwin.projectManagerModule.swapSampleRate(sampleIndex);
    		
    			//to avoid pass by referecence and changing the original values during reverse we need to copy it to another object
    			localJson = darwin.Mediator.copyObject(json);
    			
    			if(action == "commit"){
        			localJson.reverse();
    			}    
    			
    			sampleIterator = 0;
    			data = [];
    			dates = [];
    			total = 0;
    			firstDate = true;
    			var lastDateInSample = [];
    			    			    		
    			for(var j = 0;j<localJson.length;j++){
    				    				
        			total++;
        			
        			if(action == "commit"){
            			var date = darwin.ISO601toDateModule.convert(localJson[j].commit.committer.date);
        			}    
        			if(action == "star"){
            			var date = darwin.ISO601toDateModule.convert(localJson[j].starred_at);
        			}
        			
    				if(firstDate){
    					// get range
    					lastDateInSample = darwin.genericExtractorModule.getDateRange(date);
    					firstDate = false;
    					dates[sampleIterator] = lastDateInSample;
    					data[sampleIterator] = 1;
    				}
    				   
    				//checks if a date is out of the sample range
    				outOfSample = darwin.genericExtractorModule.checkDateBeyondSample(date, lastDateInSample);
    				
    				if(outOfSample){
    					lastDateInSample = darwin.genericExtractorModule.addSamplesSkipped(date, lastDateInSample);
    	 					
    					sampleIterator++;
    					dates[sampleIterator] = lastDateInSample;
    					data[sampleIterator]=1;  
    				} else {
    					data[sampleIterator]++;
    				}

    			} //for   			
    			
    			if(action == "commit"){
        			darwin.Mediator.setCommitDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex);
    			}    
    			if(action == "star"){
        			darwin.Mediator.setStarDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex);
    			}
    					
        		//send to mongo for storage
    			//darwin.Mediator.packagerCommits(dates, data, darwin.projectManagerModule.getProjectNamesIndex(index));  	
    		
    		}
    		
			if(action == "commit"){
	    		darwin.Mediator.drawGenericGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), action);
			}    
			if(action == "star"){
	    		darwin.Mediator.drawGenericGraph(darwin.Mediator.getStarDetails(), "weeks", "week On week Stars", darwin.projectManagerModule.getSampleIndex(), action);
			}
			    		
    		//enable clicking on another project
			darwin.Mediator.enableButtons();
			
        },
        resetVariables: function(){      	
        	sampleIterator = 0;
        	data = [];
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
        		
        		lastKnownDate = darwin.genericExtractorModule.getDateRange(lastKnownDate)
        		
        		notFoundDate = darwin.genericExtractorModule.checkDateBeyondSample(currDate, lastKnownDate);
              		
        		if(notFoundDate){
					sampleIterator++;
					dates[sampleIterator] = lastKnownDate;
					data[sampleIterator] = 0;  	
        		} 
        	}
        	return lastKnownDate;

        }
    };
})();