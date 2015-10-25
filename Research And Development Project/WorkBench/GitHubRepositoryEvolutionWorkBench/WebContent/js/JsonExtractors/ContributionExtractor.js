/**
 * TODO - use data Measure lines of code - add difference value each new whole sample to a total
 */

//Creates new namespace if not already defined
var darwin = darwin || {};

/*Holds the dates that correlate to each array value*/
darwin.contributionDates = []

/*Tracks the total amount of samples, for adding data to correct array index - linked to a date change*/
darwin.contributionSampleCounter = 0;

/*When multible request are required this variable is incremented*/
darwin.responsePage = 0;

/*Arrays that hold the data which is used to render the chart*/
darwin.additions = [];
darwin.deletions = [];
darwin.difference = [];
darwin.LOCOverTime = [];

/*Increments each time data is added to arrays, determines if sampling rate has been bypassed*/
darwin.SamplingIterator = 0;
darwin.firstOperation = true;

/*Keeps track of the code frequency response, to ensure only one api call is required*/
darwin.currentJson;

/*Supplmentary metric, no purpose in the main loop structure*/
darwin.totalWeeks = 0;
darwin.LOC = 0;

/*This function is called each time the sampling rate changes*/
darwin.collectCodefrequencyData = function(json){
	
	/*Array is reset to account for changing sampling rates*/
	darwin.contributionDates = []
	
	darwin.currentJson = json;
	var currDiff = 0;

	/*Loops through each json element*/
	for(i =0; i < json.length;i++){
		
		/*Gets the current index's date*/
		var date = new Date(json[i][0]*1000);	
		
		/*calculate the difference between additions and deletions*/
		currDiff = json[i][1] + json[i][2];
		
		darwin.LOC = darwin.LOC + currDiff;
		
		/*Checks if the iterator (each increment represents a week) has surpassed the sampling rate - Change date*/
		/*boolean is required to ensure that the date can be initilised on the first pass of the processs*/
		if(darwin.samplingRate < darwin.SamplingIterator || darwin.firstOperation == true){
			
			/*Resets iterator to allow next sample set to be organised*/
			darwin.SamplingIterator = 0;		
			
			/*Counts the total number of whole samples - don't increment on first sample set - its already 0*/
			if(darwin.firstOperation == false){
				darwin.contributionSampleCounter++;	
			}
							
			/*Set the new date - signifies the start of a new sample period*/
			darwin.contributionDates[darwin.contributionSampleCounter] = date;
			
			/*Add addition, deletion and difference data to each relevant array*/
			darwin.additions[darwin.contributionSampleCounter] = json[i][1];
			darwin.deletions[darwin.contributionSampleCounter] = Math.abs(json[i][2]);
			darwin.difference[darwin.contributionSampleCounter] = currDiff; 
			/*Each new sample, set LOC to current total*/
			darwin.LOCOverTime[darwin.contributionSampleCounter] = darwin.LOC;
			
			/*increment iterator, monitors sample progress*/
			darwin.SamplingIterator++;	
			
			/*It is no longer the first op*/
			darwin.firstOperation = false;
			
			/*Basic counter for total weeks*/
			darwin.totalWeeks++;
			
		} else { /*If we are inside the same sampling, add to existing values - then increment sample iterator*/			
			/*Add to current values for this sampling period*/
			darwin.additions[darwin.contributionSampleCounter] = darwin.additions[darwin.contributionSampleCounter] + json[i][1];
			darwin.deletions[darwin.contributionSampleCounter] = darwin.deletions[darwin.contributionSampleCounter] + Math.abs(json[i][2]);
			darwin.difference[darwin.contributionSampleCounter] = darwin.difference[darwin.contributionSampleCounter] + currDiff;
			darwin.LOCOverTime[darwin.contributionSampleCounter] = darwin.LOC;
			/*increment iterator, monitors sample progress*/
			darwin.SamplingIterator++;
			
			/*Basic counter for total weeks*/
			darwin.totalWeeks++;
		}			
	}
	
	/*Depending on the current user input, data passed into the draw function varies*/
	if(darwin.currentAction == "difference"){
		darwin.drawContributionGraph(darwin.contributionDates, darwin.difference, 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions');
	}
	if(darwin.currentAction == "addition"){
		darwin.drawContributionGraph(darwin.contributionDates, darwin.additions, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions');
	}
	if(darwin.currentAction == "deletion"){
		darwin.drawContributionGraph(darwin.contributionDates, darwin.deletions, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions');
	}
	if(darwin.currentAction == "LOC"){
		darwin.drawContributionGraph(darwin.contributionDates, darwin.LOCOverTime, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'LOC Over Time');
	}
}

/*DURING RESAMPLING ALL VARIABLES ARE RESET*/
darwin.resetVariables = function(){
	
	/*RESAMPLING DATA CAUSES IT TO BE REPOPULATED*/
	if(darwin.currentAction == "difference"){
		darwin.difference = [];
	}
	if(darwin.currentAction == "addition"){
		darwin.additions = [];
	}
	if(darwin.currentAction == "deletion"){
		darwin.deletions = [];
	}
	if (darwin.currentAction == "LOC"){
		darwin.LOCOverTime = []
	}
	
	/*ALL SAMPLING VARIABLES ARE RESET, OR A NEW URL IS ENTERED, RESET ANYWAY*/
	darwin.totalWeeks = 0;
	darwin.contributionSampleCounter = 0;
	darwin.responsePage = 0;
	//represents the period each point in the graph represents
	darwin.samplingRate = 13;
	darwin.SamplingIterator = 0;
	darwin.firstOperation = true;
	darwin.LOC = 0;
}