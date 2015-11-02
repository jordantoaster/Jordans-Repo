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

	/*Keeps track of the code frequency response, to ensure only one api call is required*/
	var currentJson;

	/*Supplmentary metric, no purpose in the main loop structure*/
	var totalWeeks = 0;
	var LOC = 0;
	
    return {
    	extract: function (json) {
    		
    		/*Array is reset to account for changing sampling rates*/
    		contributionDates = [];
    		
    		darwin.currentJson = json;
    		var currDiff = 0;
    		
    		/*Loops through each json element*/
    		for(i =0; i < json.length;i++){
    			
				totalWeeks++;
    			
    			/*Gets the current index's date*/
    			var date = new Date(json[i][0]*1000);
    			
    			/*calculate the difference between additions and deletions*/
    			currDiff = json[i][1] + json[i][2];
    			
    			LOC = LOC + currDiff;
    			
    			/*Checks if the iterator (each increment represents a week) has surpassed the sampling rate - Change date*/
    			/*boolean is required to ensure that the date can be initilised on the first pass of the processs*/
    			if(darwin.samplingRate == SamplingIterator || firstOperation == true){
    				
    				/*Resets iterator to allow next sample set to be organised*/
    				SamplingIterator = 0;		
    				
    				/*Counts the total number of whole samples - don't increment on first sample set - its already 0*/
    				if(firstOperation == false){
    					contributionSampleCounter++;	
    				}
    								
    				/*Set the new date - signifies the start of a new sample period*/
    				contributionDates[contributionSampleCounter] = date;
    				
    				/*Add addition, deletion and difference data to each relevant array*/
    				additions[contributionSampleCounter] = json[i][1];
    				deletions[contributionSampleCounter] = Math.abs(json[i][2]);
    				difference[contributionSampleCounter] = currDiff; 
    				/*Each new sample, set LOC to current total*/
    				LOCOverTime[contributionSampleCounter] = LOC;
    				
    				/*increment iterator, monitors sample progress*/
    				SamplingIterator++;	
    				
    				/*It is no longer the first op*/
    				firstOperation = false;
    				    				
    			} else { /*If we are inside the same sampling, add to existing values - then increment sample iterator*/			
    				/*Add to current values for this sampling period*/
    				additions[contributionSampleCounter] = additions[contributionSampleCounter] + json[i][1];
    				deletions[contributionSampleCounter] = deletions[contributionSampleCounter] + Math.abs(json[i][2]);
    				difference[contributionSampleCounter] = difference[contributionSampleCounter] + currDiff;
    				LOCOverTime[contributionSampleCounter] = LOC;
    				/*increment iterator, monitors sample progress*/
    				SamplingIterator++;
    				
    				/*Basic counter for total weeks*/
    			}			
    		}
    		
    	    darwin.Mediator.updateProgressBar();
    	    
    		/*Depending on the current user input, data passed into the draw function varies*/
    		if(darwin.currentContrubutionAction == "difference"){
    			darwin.Mediator.drawContributionGraph(contributionDates, difference, 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions', LOC, totalWeeks);
    		}
    		if(darwin.currentContrubutionAction == "addition"){
    			darwin.Mediator.drawContributionGraph(contributionDates, additions, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions', LOC, totalWeeks);
    		}
    		if(darwin.currentContrubutionAction == "deletion"){
    			darwin.Mediator.drawContributionGraph(contributionDates, deletions, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions', LOC, totalWeeks);
    		}
    		if(darwin.currentContrubutionAction == "LOC"){
    			darwin.Mediator.drawContributionGraph(contributionDates, LOCOverTime, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'LOC Over Time', LOC, totalWeeks);
    		}
    		
    		/*Uncomment when sending data to the DB*/
    		//darwin.Mediator.packager(additions, deletions, LOCOverTime, contributionDates, "contributions");
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
        resetVariables: function(){
        	/*RESAMPLING DATA CAUSES IT TO BE REPOPULATED*/
        	if(darwin.currentAction == "difference"){
        		difference = [];
        	}
        	if(darwin.currentAction == "addition"){
        		additions = [];
        	}
        	if(darwin.currentAction == "deletion"){
        		deletions = [];
        	}
        	if (darwin.currentAction == "LOC"){
        		LOCOverTime = []
        	}
        	
        	/*ALL SAMPLING VARIABLES ARE RESET, OR A NEW URL IS ENTERED, RESET ANYWAY*/
        	totalWeeks = 0;
        	contributionSampleCounter = 0;
        	responsePage = 0;
        	//represents the period each point in the graph represents
        	samplingRate = 13;
        	SamplingIterator = 0;
        	firstOperation = true;
        	LOC = 0;
        }
    };
})();