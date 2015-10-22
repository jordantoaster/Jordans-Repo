/**
 * File that contains the methods used to parse API JSON Strings for the darwin app
 */

//Creates new namespace if not already defined
var darwin = darwin || {};

darwin.dates = []
darwin.totalWeeks = 0;
darwin.totalSamples = 0;
darwin.responsePage = 0;
darwin.additions = [];
darwin.deletions = [];
darwin.difference = [];
//represents the period each point in the graph represents
darwin.SamplingRate = 13;
darwin.SamplingIterator = 0;
darwin.firstOperation = true;

//Gets data from the api, where specified
darwin.getApiCodeFrequency = function(url, callback) {
	darwin.performAjaxRequestGitHub(url, "GET", callback)
}

//collates the data in a usable form - CLEAN THIS UP A BIT, CODE IS VERY VARIABLE DEPENDENT, CLEAN UP IFS, SOME WASTED EVALUATIONS
darwin.collectCodefrequencyData = function(json){
	for(i =0; i < json.length;i++){
		
		//Gets the data in a useable form
		var date = new Date(json[i][0]*1000);		
		var currDiff = json[i][1] + json[i][2];
		
		//if we are in a new sampling period then use a new date set 
		//new sample period event occurs when the total weeks have surpasses the set sample size
		if(darwin.SamplingRate < darwin.SamplingIterator || darwin.firstOperation == true){
			
			//if its not the first operation, allow increment of the total sample variable
			if(darwin.firstOperation != true){
				darwin.totalSamples++;		
			} else {
				darwin.firstOperation = false;
			}
			
			//reset iterator
			darwin.SamplingIterator = 0;			

						
			//ensures that calculations have a value to work with - prevents 'Nan' errors
			darwin.difference[darwin.totalSamples] = 0;
			
			//get the additions/deletions from the response
			darwin.dates[darwin.totalSamples] = date;
			darwin.additions[darwin.totalSamples] = json[i][1];
			darwin.deletions[darwin.totalSamples] = json[i][2];
			darwin.difference[darwin.totalSamples] = darwin.difference[i] + currDiff; 
			darwin.SamplingIterator++;		
		} else { //we are in the same date range (so update only current index) - same sample
			darwin.difference[darwin.totalSamples] = 0;
			darwin.additions[darwin.totalSamples] = darwin.additions[darwin.totalSamples] + json[i][1];
			darwin.deletions[darwin.totalSamples] = darwin.deletions[darwin.totalSamples] + json[i][2];
			darwin.difference[darwin.totalSamples] = darwin.difference[darwin.totalSamples] + currDiff; 		
			darwin.SamplingIterator++;
		}
			
		darwin.totalWeeks++;
	}
	
	//vars are global to namespace so do they need to be passed in?
	darwin.renderContributionGraph(darwin.dates, darwin.additions, darwin.deletions, darwin.difference);
}