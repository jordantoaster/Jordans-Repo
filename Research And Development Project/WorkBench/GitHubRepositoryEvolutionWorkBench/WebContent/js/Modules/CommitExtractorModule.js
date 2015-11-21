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
    			sampleIterator = 0;
    			commits = [];
    			dates = [];
    			totalCommits = 0;
    			firstDate = true;
    			lastDateInSample = [];
    			    			    		
    			for(var j = 0;j<iterationCount;j++){
    				
        			totalCommits++;
    				
    				date = darwin.ISO601toDateModule.convert(localJson[j].commit.committer.date);
    				
    				if(date[0] ==24 && date[1] ==  4){
    					console.log();
    				}
    				    				
    				if(firstDate){
    					firstDate = false;
    					dates[sampleIterator] = date;
    					commits[sampleIterator] = 1;
    					
    					// get range
    					//lastDateInRange = [(Number(date[0]) - (7 * sampleRate)).toString(), date[1], date[2]];
    					lastDateInSample = darwin.commitExtractorModule.getDateRange(date);
    				}
    				   
    				//checks if a date is out of the sample range
    				outOfSample = darwin.commitExtractorModule.checkDateBeyondSample(date, lastDateInSample);
    				
    				//if out of sample find out how many samples have been skipped, if any from last date to now
    				if(outOfSample){
    					numSamplesSkipped = darwin.commitExtractorModule.findNumSamplesSkipped(date, lastDateInSample);
    					
    					//if any are skipped loop and add zero to those samples in the array, -1 accounts for the natural sample change
    					for(var g =0; g<numSamplesSkipped-1; g++){
    						sampleIterator++;
        					dates[sampleIterator] = date;
        					commits[sampleIterator] = 0;  
    					}
    				}
    				
    				//continue samples that have values
    				if(outOfSample){			
    					lastDateInSample = darwin.commitExtractorModule.getDateRange(date);
    					sampleIterator++;
    					dates[sampleIterator] = date;
    					commits[sampleIterator] = 1;  
    				} else {
    					commits[sampleIterator]++;
    				}
    		
    			} //for
    			
    			//set to chronological order
    			dates.reverse();
    			commits.reverse();
    			
    			
    			//send to data manager class for storage
    			darwin.Mediator.setCommitDetails(darwin.Mediator.getNumCommitProjectSelected(), commits, darwin.projectManagerModule.getProjectNames());
    			
    		//}   //for
    		
    		smallestSize = darwin.Mediator.getCommitDetails().reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity}).length;
    			
    		darwin.Mediator.drawCommitGraph(dates, darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", smallestSize);
    		
    		//enable clicking on another project
			darwin.Mediator.enableCommitButton();
    		
    		//send to mongo for storage
			//darwin.Mediator.packagerCommits(dates, commits, darwin.projectManagerModule.getProjectNamesIndex(index));
    		
        },
        resetVariables: function(){      	
        	sampleIterator = 0;
        	commits = [];
        	dates = [];
        	totalCommits = 0;
        	firstDate = true;
        	localJson = [];
        },
        getDateRange : function(date){
        	
        	//get current day and month length and initialise output
        	monthLength = darwin.ISO601toDateModule.getMonthLength(date[1],date[2]);
        	
  		    //get next month length as well
  		    if(date[1] != 1){
          	  nextMonthLength = darwin.ISO601toDateModule.getMonthLength(date[1]-1,date[2]);
  		    } else {
          	  nextMonthLength = 31;
  		    }
        	
        	currDay = Number(date[0]);
        	currMonth = Number(date[1]);
        	currYear = Number(date[2]);
        	dateLimit = [[currDay],[currMonth],[currYear]];
        	
        	//iterates the total range each sample will be to find the last possible date
        	for(var i =0; i < ((sampleRate * 7) - 1);i++){
        		
        		
        		//if date range exceeds month or year move on to new year, day and month
        		if(dateLimit[0][0] == 1){       			
            		if(dateLimit[1][0] == 1){
            			dateLimit[2][0] = dateLimit[2] - 1;
            			dateLimit[1][0] = 12;
            			dateLimit[0][0] = nextMonthLength;
            		} else {
            			dateLimit[0][0] = nextMonthLength;
            			dateLimit[1][0] = dateLimit[1][0] -1;
            		}
        		}  	else {
            		//move onto next day
            		dateLimit[0][0] = dateLimit[0][0] -1;
        		}	
        	}
        	dateLimit[0].toString();
        	dateLimit[1].toString();
        	dateLimit[2].toString();
        	
        	return dateLimit;
        },

        //ADD check to see if when out of a sample
        checkDateBeyondSample : function(date, finalDate){
        	
        	result = false;
        	
        	//if day is less, month is less or equal and year is less or equal then it out of range
        	if(date[0] <= finalDate[0][0]){
        		if(date[1] == finalDate[1][0]){
        			if(date[2] == finalDate[2][0])
        				result= true;
        		}
        	}
        	
        	//if year is less then target, it is out of range
        	if(date[2] < finalDate[2][0]){
        		result= true;
        	}
        		
        	//if month is less then its out of range - no point comparing months without equal date
        	if(date[1] < finalDate[1][0] && date[2] == finalDate[2][0]){
        		result= true;
        	}
        	      	
        	//else its in the range
        	return result;
        },
        findNumSamplesSkipped : function(currDate, lastKnownDate){
        	
        	notFoundDate = true;
        	samplesMissed = 0;
        	
        	//loop until we find new date inside a range
        	while(notFoundDate){
        		
        		notFoundDate = darwin.commitExtractorModule.checkDateBeyondSample(currDate, lastKnownDate);
      
        		lastKnownDate = darwin.commitExtractorModule.getDateRange(lastKnownDate)
        		
        		if(notFoundDate){
        			samplesMissed++;
        		} else {
        			return samplesMissed;
        		}
        	}
			return samplesMissed;
        }
    };
})();