/**
 * TODO - use data Measure lines of code - add difference value each new whole sample to a total
 */

var darwin = darwin || {};

darwin.contributionExtractorModule = (function() {
	
	/*Holds the dates that correlate to each array value*/
	var contributionDates = [];

	/*Tracks the total amount of samples, for adding data to correct array index - linked to a date change*/
	var contributionSampleCounter = 0;

	/*When multible request are required this variable is incremented*/
	var responsePage = 0;

	/*Arrays that hold the data which is used to render the chart*/
	var additions = [];
	var deletions = [];
	var difference = [];
	var LOCOverTime = [];

	/*Increments each time data is added to arrays, determines if sampling rate has been bypassed*/
	var SamplingIterator = 0;
	var firstOperation = true;

	/*Supplmentary metric, no purpose in the main loop structure*/
	var totalWeeks = 0;
	var inputCount = 0;
	var jsonDuplicate = [];
	var currDiff = 0;
	var LOC = 0;
	
	var localJson = [];
	
    return {
    	extract: function (json) {
    		
    		//gets the shortest array in the set of json project data
    		var iterationCount = darwin.Mediator.getSmallestArray(json);
    		
    		for(var j=0;j<json.length;j++){	
    			
    			//to avoid pass by referecence and changing the original values during reverse we need to copy it to another object
    			localJson = darwin.Mediator.copyObject(json[j]);
    			contributionDates = [];
    			additions = [];
    			deletions = [];
    			difference = [];
    			LOCOverTime = [];
    			totalWeeks = 0;
    			LOC = 0;
    			currDiff = 0;
				firstOperation = true;
				SamplingIterator = 0;
				contributionSampleCounter = 0;
    			
    			for(var i =0; i < iterationCount-1;i++){
					totalWeeks++;
	    			
    				/*Gets the current index's date*/
    				var date = new Date(localJson[i][0]*1000);
    			
    				/*calculate the difference between additions and deletions*/
    				currDiff = localJson[i][1] + localJson[i][2];   			
    				LOC = LOC + currDiff;
    				
    				/*Checks if the iterator (each increment represents a week) has surpassed the sampling rate - Change date*/
    				/*boolean is required to ensure that the date can be initilised on the first pass of the processs*/
    				if(darwin.projectManagerModule.getSamplingRate() == SamplingIterator || firstOperation == true){
    				
    					/*Resets iterator to allow next sample set to be organised*/
    					SamplingIterator = 0;		
    				
    					/*Counts the total number of whole samples - don't increment on first sample set - its already 0*/
    					if(firstOperation == false){
    						contributionSampleCounter++;	
    					}
    					
    					/*Set the new date - signifies the start of a new sample period*/
    					contributionDates[contributionSampleCounter] = date;
    				
    					/*Add addition, deletion and difference data to each relevant array*/
    					additions[contributionSampleCounter] = localJson[i][1];
    					deletions[contributionSampleCounter] = Math.abs(localJson[i][2]);
    					difference[contributionSampleCounter] = currDiff; 
    					/*Each new sample, set LOC to current total*/
    					LOCOverTime[contributionSampleCounter] = LOC;
    					
    					/*increment iterator, monitors sample progress*/
    					SamplingIterator++;	
    				
    					/*It is no longer the first op*/
    					firstOperation = false;
    					
    				} else {
    					/*If we are inside the same sampling, add to existing values - then increment sample iterator*/			
    					/*Add to current values for this sampling period*/
    					additions[contributionSampleCounter] = additions[contributionSampleCounter] + localJson[i][1];
    					deletions[contributionSampleCounter] = deletions[contributionSampleCounter] + Math.abs(localJson[i][2]);
    					difference[contributionSampleCounter] = difference[contributionSampleCounter] + currDiff;
    					LOCOverTime[contributionSampleCounter] = LOC;
    					
    					SamplingIterator++;
    				}
    			}
				
				darwin.Mediator.setContributionDetails(j, additions, deletions, difference, LOCOverTime);
				
	    		/*Uncomment when sending data to the DB*/
	    		//darwin.Mediator.packager.contributions(additions, deletions, LOCOverTime, contributionDates, "contributions");
    		}
    		
    		darwin.Mediator.updateProgressBar();
    		
			/*Depending on the current user input, data passed into the draw function varies*/
			if(darwin.currentContrubutionAction == "difference"){
				darwin.Mediator.drawContributionGraph(contributionDates, darwin.dataManager.getAllDifference(), 'Sample Size: ' + darwin.projectManagerModule.getSamplingRate() + ' Weeks','Difference Of Additions And Deletions', LOC, totalWeeks);
			}
			if(darwin.currentContrubutionAction == "addition"){
				darwin.Mediator.drawContributionGraph(contributionDates, darwin.dataManager.getAllAdditions(), 'Sample Size: ' + darwin.projectManagerModule.getSamplingRate() + ' Weeks', 'Amount of Additions', LOC, totalWeeks);
			}
			if(darwin.currentContrubutionAction == "deletion"){
				darwin.Mediator.drawContributionGraph(contributionDates, darwin.dataManager.getAllDeletions(),'Sample Size: ' + darwin.projectManagerModule.getSamplingRate() + ' Weeks', 'Amount of Deletions', LOC, totalWeeks);
			}
			if(darwin.currentContrubutionAction == "LOC"){
				darwin.Mediator.drawContributionGraph(contributionDates, darwin.dataManager.getAllLOCOverTime(), 'Sample Size: ' + darwin.projectManagerModule.getSamplingRate() + ' Weeks', 'LOC Over Time', LOC, totalWeeks);
			}		
        },
        getAddition: function(){
        	return additions;
        },
        getDeletion: function(){
        	return deletions;
        },
        getDifference: function(){
        	return difference;
        },
        getLOC: function(){
        	return LOCOverTime;
        },
        getDates: function(){
        	return contributionDates;
        },
        getIterationCount : function(seriesA, seriesB){
    		//allows the program to navigate an equal time frame for each project
    		if(inputCount == 2){
    			if(seriesA.length > seriesB.length){
    				iterationNum = seriesB.length;
    			} else {
    				iterationNum = seriesA.length;
    			}
    		} else {
				iterationNum = seriesA.length;
    		}
    		
    		return iterationNum;
        },
        resetVariables: function(){
        	
        	/*RESAMPLING DATA CAUSES IT TO BE REPOPULATED*/
        	difference = [];
        	additions = [];
        	deletions = [];
        	LOCOverTime = []
        	differenceTwo = [];
        	additionsTwo = [];
        	deletionsTwo = [];
        	LOCOverTimeTwo = [];
        	
        	/*ALL SAMPLING VARIABLES ARE RESET, OR A NEW URL IS ENTERED, RESET ANYWAY*/
        	totalWeeks = 0;
        	contributionSampleCounter = 0;
        	responsePage = 0;
        	//represents the period each point in the graph represents
        	samplingRate = 13;
        	SamplingIterator = 0;
        	firstOperation = true;
        	LOC = 0;
        	LOCTwo = 0;
        	inputCount = 0;
        	jsonDuplicate = [];
        }
    };
})();