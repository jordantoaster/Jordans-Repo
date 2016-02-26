/**
 * TODO - use data Measure lines of code - add difference value each new whole
 * sample to a total
 */

var darwin = darwin || {};

darwin.contributionExtractorModule = (function() {

	/* Holds the dates that correlate to each array value */
	var contributionDates = [];

	/*Tracks the total amount of samples, for adding data to correct array index - linked to a date change*/
	var contributionSampleCounter = 0;

	/* When multible request are required this variable is incremented */
	var responsePage = 0;

	/* Arrays that hold the data which is used to render the chart */
	var additions = [];
	var deletions = [];
	var difference = [];
	var LOCOverTime = [];
	
	var additionsAcc = [];
	var deletionsAcc = [];
	
	/*Increments each time data is added to arrays, determines if sampling rate has been bypassed*/
	var SamplingIterator = 0;
	var firstOperation = true;

	/* Supplmentary metric, no purpose in the main loop structure */
	var totalWeeks = 0;
	var inputCount = 0;
	var jsonDuplicate = [];
	var currDiff = 0;
	var LOC = 0;
	var numAdditions = 0;
	var numDeletions = 0;

	var localJson = [];
	

	return {
		extract : function(json, index) {

			for (var j = 0; j < json.length; j++) {

				// iterate to get all three sample rates
				for (var sampleIndex = 0; sampleIndex < 4; sampleIndex++) {

					var sampleRate = darwin.projectManagerModule.swapSampleRate(sampleIndex);

					// to avoid pass by referecence and changing the original values during reverse we need to copy it to another object
					localJson = darwin.Mediator.copyObject(json[j]);
					contributionDates = [];
					additions = [];
					deletions = [];
					difference = [];
					LOCOverTime = [];
					additionsAcc = [];
					deletionsAcc = [];
					totalWeeks = 0;
					LOC = 0;
					numAdditions = 0;
					numDeletions = 0;
					currDiff = 0;
					firstOperation = true;
					SamplingIterator = 0;
					contributionSampleCounter = 0;

					for (var i = 0; i < json[j].length - 1; i++) {
						totalWeeks++;

						/* Gets the current index's date */
						var date = new Date(localJson[i][0] * 1000);

						/*
						 * calculate the difference between additions and
						 * deletions
						 */
						currDiff = localJson[i][1] + localJson[i][2];
						LOC = LOC + currDiff;
						
						/**
						 * calculate the current total num of additions and deletiosn
						 */
						numAdditions = numAdditions + localJson[i][1];
						numDeletions = numDeletions + Math.abs(localJson[i][2]);
						

						/*
						 * Checks if the iterator (each increment represents a week) has surpassed the sampling rate - Change date
						 * boolean is required to ensure that the date can be initilised on the first pass of the processs
						 */
						if (sampleRate == SamplingIterator || firstOperation == true) {

							/*
							 * Resets iterator to allow next sample set to be organised
							 */
							SamplingIterator = 0;

							/*
							 * Counts the total number of whole samples - don't increment on first sample set - its already 0
							 */
							if (firstOperation == false) {
								contributionSampleCounter++;
							}

							/*
							 * Set the new date - signifies the start of a new sample period
							 */
							contributionDates[contributionSampleCounter] = date;

							/*
							 * Add addition, deletion and difference data to each relevant array
							 */
							additions[contributionSampleCounter] = localJson[i][1];
							deletions[contributionSampleCounter] = Math.abs(localJson[i][2]);
							difference[contributionSampleCounter] = currDiff;
							/* Each new sample, set LOC to current total */
							LOCOverTime[contributionSampleCounter] = LOC;
							
							/*update the total additions/deletions over time*/
							deletionsAcc[contributionSampleCounter] = numDeletions;
							additionsAcc[contributionSampleCounter] = numAdditions;

							/* increment iterator, monitors sample progress */
							SamplingIterator++;

							/* It is no longer the first op */
							firstOperation = false;

						} else {
							/*  If we are inside the same sampling, add to existing values - then increment sample iterator
								Add to current values for this sampling period */
							additions[contributionSampleCounter] = additions[contributionSampleCounter] + localJson[i][1];
							deletions[contributionSampleCounter] = deletions[contributionSampleCounter] + Math.abs(localJson[i][2]);
							difference[contributionSampleCounter] = difference[contributionSampleCounter] + currDiff;
							LOCOverTime[contributionSampleCounter] = LOC;

							SamplingIterator++;
						}
					}

					darwin.Mediator.setContributionDetails(j, additions, deletions, difference, LOCOverTime, sampleIndex, contributionDates, additionsAcc, deletionsAcc);
					
					//DB
	      			if(sampleRate == 1){
	      				var datesAsString = darwin.dateManager.convertDateObjectToString(contributionDates);
	      				darwin.Mediator.makeServerRequestContributions("storeContributions",darwin.Mediator.emptyCallback,"POST",additions, deletions, difference, LOCOverTime, datesAsString, darwin.projectManagerModule.getProjectNamesIndex(j))	
	      			}
	      		}
			}

			darwin.Mediator.updateProgressBar();
		
    	    if(darwin.projectManagerModule.getIsAuto() == false){
			//create Initial graph
    	    	darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllDifference(), 'Sample Size: '
				+ darwin.projectManagerModule.getSamplingRate()+ ' Weeks', 'Difference Of Additions And Deletions', LOC,
				totalWeeks, darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType(),  darwin.projectManagerModule.getProjectNames());
    	    }
			
			//kick off auto process if required - contribution data is completed at this point
    	    if(darwin.projectManagerModule.getIsAuto()){
    	    	
        		//get project names
        		projectNames = darwin.projectManagerModule.getProjectNames();
        		
    			//get the next project name - as we are not at the project num limit
    			project = projectNames[0];
    			
    	    	darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+project+"/commits?per_page=100&page=", project);
    	    }
		
		},
		getIterationCount : function(seriesA, seriesB) {
			// allows the program to navigate an equal time frame for each
			// project
			if (inputCount == 2) {
				if (seriesA.length > seriesB.length) {
					iterationNum = seriesB.length;
				} else {
					iterationNum = seriesA.length;
				}
			} else {
				iterationNum = seriesA.length;
			}

			return iterationNum;
		},
		resetVariables : function() {

			/* RESAMPLING DATA CAUSES IT TO BE REPOPULATED */
			difference = [];
			additions = [];
			deletions = [];
			LOCOverTime = []
			differenceTwo = [];
			additionsTwo = [];
			deletionsTwo = [];
			LOCOverTimeTwo = [];
			additionsAcc = [];
			deletionsAcc = [];

			/*
			 * ALL SAMPLING VARIABLES ARE RESET, OR A NEW URL IS ENTERED, RESET ANYWAY
			 */
			totalWeeks = 0;
			contributionSampleCounter = 0;
			responsePage = 0;
			SamplingIterator = 0;
			firstOperation = true;
			LOC = 0;
			LOCTwo = 0;
			inputCount = 0;
			jsonDuplicate = [];
			numAdditions = 0;
			numDeletions = 0;
		}
	};
})();