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
	
	//add vars
	
    return {
    	extract: function (json) {
    		
    		var iterationCount = json.reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity}).length;

    		//for(var i=0;i<json.length;i++){		//here if multiple projects commits in in array
    			
    			localJson = json[0];
    			sampleIterator = 0;
    			commits = [];
    			dates = [];
    			totalCommits = 0;
    			firstDate = true;
    			    			    		
    			for(var j = 0;j<iterationCount;j++){
    				
        			totalCommits++;
    				
    				date = darwin.ISO601toDateModule.convert(localJson[j].commit.committer.date);
    				    				
    				if(firstDate){
    					firstDate = false;
    					dates[sampleIterator] = date;
    					commits[sampleIterator] = 1;
    				}
    				
    				if(date[1] < dates[sampleIterator][1] || date[2] < dates[sampleIterator][2]){
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
    			darwin.Mediator.setCommitDetails(darwin.Mediator.getNumCommitProjectSelected(), commits);
    			
    		//}   //for
    		
    		smallestSize = darwin.Mediator.getCommitDetails().reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity}).length;
    			
    		darwin.Mediator.drawCommitGraph(dates, darwin.Mediator.getCommitDetails(), "Months", "Month On Month Commits", smallestSize);
    		
    		
    		//send to mongo for storage
    		
        },
        resetVariables: function(){      	
        	sampleIterator = 0;
        	commits = [];
        	dates = [];
        	totalCommits = 0;
        	firstDate = true;
        	localJson = [];
        }
    };
})();