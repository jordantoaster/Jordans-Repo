/**
 * TODO - use data Measure lines of code - add difference value each new whole sample to a total
 */

var darwin = darwin || {};

darwin.genericExtractorModule = (function() {
	
	var sampleIterator = 0;
	var data = [];
	var dates = [];
	var totalStars= 0;
	var firstDate = true;
	var localJson = [];
	var sampleRate = 0;
	var genericAcc = [];
	var genericTotal = 0;
	
	//added stuff for open/closed issues
	var openIssues = [];
	var closedIssues = [];
	var closedAtDates = [];
	var issueComments = [];
		
    return {
    	
    	// data comes in front to back, so < is used in place of > then reversed at the end
    	extract: function (json, index, action, supplementData) {   
    		    		
    		for(sampleIndex = 0; sampleIndex < 4;sampleIndex++){
    		
    			
    			//get the current sample rate
    			sampleRate = darwin.projectManagerModule.swapSampleRate(sampleIndex);
    		
    			//to avoid pass by referecence and changing the original values during reverse we need to copy it to another object
    			localJson = darwin.Mediator.copyObject(json);
    			    			
    			
    			//commit json comes in back to front
    			if(action == "commit" || action == "fork" || action == "tags" || action == "Issues"){
        			localJson.reverse();
    			}    
    			if(action =="tags"){	
    				supplementDataLocal = darwin.Mediator.copyObject(supplementData);
    			}
    			
    			if(action == "Issues"){
    				localJson = darwin.Mediator.removePullRequests(localJson);
    			}
    			if(action == "closedAt"){
        			closedAtDates = [];
        			
    				localJson = darwin.Mediator.removePullRequests(localJson);

    				//get the closed at dates - order
        			localJson = darwin.genericExtractorModule.getClosedAtDates(localJson);
    			}

    			
    			sampleIterator = 0;
    			data = [];
    			genericAcc = [];
    			genericTotal = 0
    			openIssues = [];
    			closedIssues = [];
    			dates = [];
    			closedAt = [];
    			total = 0;
    			firstDate = true;
    			var lastDateInSample = [];
    			var closedDateIndex  =0;
    			    
    			//if there are multiple json input loop each
    			for(var j = 0;j<localJson.length-1;j++){
    				    				
        			totalStars++;
        			
        			//get the data required
        			if(action == "commit"){
            			var date = darwin.ISO601toDateModule.convert(localJson[j].commit.committer.date);
        			}    
        			if(action == "star"){
            			var date = darwin.ISO601toDateModule.convert(localJson[j].starred_at);
        			}
        			if(action == "fork"){
            			var date = darwin.ISO601toDateModule.convert(localJson[j].created_at);
        			}
          			if(action == "tags"){
          				var date = supplementData[j];
          			}
          			if(action == "Issues"){
          				var date = darwin.ISO601toDateModule.convert(localJson[j].created_at);         	       				       				
          			}
          			if(action == "closedAt"){
          				var date = localJson[j];         	       				       				
          			}
        			
        			
        			//if first date then intialise the structures
    				if(firstDate){
    					// get range
    					lastDateInSample = darwin.genericExtractorModule.getDateRange(date);
    					firstDate = false;
    					dates[sampleIterator] = lastDateInSample;
    					data[sampleIterator] = 1;
    					
    					//issues specefic
              			if(action == "Issues"){              				
              				if(localJson[j].state == "open"){
              					openIssues[sampleIterator]=1;
              					closedIssues[sampleIterator]=0;
              				} else {
              					openIssues[sampleIterator]=0;
              					closedIssues[sampleIterator]=1;
              				}
              			}
              			//end issues
              			
    				}
    				   
    				//checks if a date is out of the sample range
    				outOfSample = darwin.genericExtractorModule.checkDateBeyondSample(date, lastDateInSample);
    				
    				//if out of sample
    				if(outOfSample){
    					//find out how many samples skipped and get the last date in sample
    					lastDateInSample = darwin.genericExtractorModule.addSamplesSkipped(date, lastDateInSample);
    					
            			//set current data total
            			genericTotal = genericTotal + data[sampleIterator];
            			genericAcc[sampleIterator] = genericTotal;
    	 					
    					//store and move onto next sample
    					sampleIterator++;
    					dates[sampleIterator] = lastDateInSample;
    					data[sampleIterator]=1;  
    					
    					//issues specefic
              			if(action == "Issues"){              				
              				if(localJson[j].state == "open"){
              					openIssues[sampleIterator]=1;
              					closedIssues[sampleIterator]=0;
              				} else {
              					openIssues[sampleIterator]=0;
              					closedIssues[sampleIterator]=1;
              				}
              			}
              			//end issues
              			
    				} else {
    					//if in sample just keep incrementing
    					data[sampleIterator]++;
    					
    					//issues specefic
              			if(action == "Issues"){              				
              				if(localJson[j].state == "open"){
              					openIssues[sampleIterator]++;
              				}
              				if(localJson[j].state == "closed"){
              					closedIssues[sampleIterator]++;
              				}
              			}
              			//end issues
    				}

    			} //for   			
    			
    			//set Acc Data
    			darwin.Mediator.setGenericAcc(index, genericAcc, action, sampleIndex);
    			
    			//depending on action set different data
    			if(action == "commit"){
        			darwin.Mediator.setCommitDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex);
    			}    
    			if(action == "star"){
        			darwin.Mediator.setStarDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex);
    			}
      			if(action == "fork"){
        			darwin.Mediator.setForkDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex);
    			}
      			if(action == "tags"){
        			darwin.Mediator.setTagsDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex);
    			}
      			if(action == "Issues"){
      				darwin.Mediator.setIssuesDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex, openIssues, closedIssues);
    			}
      			if(action == "closedAt"){
      				darwin.Mediator.setClosedAtIssuesDetails(index, data, darwin.projectManagerModule.getProjectNames(), sampleIndex);
    			}
    					
        		//send to mongo for storage
    			//darwin.Mediator.packagerGeneric(dates, data, darwin.projectManagerModule.getProjectNamesIndex(index), action);  	
      			
      			if(sampleRate == 1){
      				var datesAsString = darwin.dateManager.convertDateObjectToString(dates);
      				
      				if(action != "Issues"){
      					darwin.Mediator.makeServerRequestGeneric("storeGeneric", action, darwin.Mediator.emptyCallback,"POST",data, datesAsString, darwin.projectManagerModule.getProjectNamesIndex(index))	      				
      				} else {
      					var mergedIssues = openIssues.concat(closedIssues);
      					
      					//send issues that are open/closed independently
      					darwin.Mediator.makeServerRequestGeneric("storeGeneric", action, darwin.Mediator.emptyCallback,"POST",mergedIssues, datesAsString, darwin.projectManagerModule.getProjectNamesIndex(index))	      				
      				}															
      			}
    		
    		}
    		
    		//depending on action draw graph with different data
			if(action == "commit"){
	    		darwin.Mediator.drawGenericGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), action, darwin.Mediator.getChartType());
			}    
			if(action == "star"){
	    		darwin.Mediator.drawGenericGraph(darwin.Mediator.getStarDetails(), "weeks", "week On week Stars", darwin.projectManagerModule.getSampleIndex(), action, darwin.Mediator.getChartType());
			}
			if(action == "fork"){
	    		darwin.Mediator.drawGenericGraph(darwin.Mediator.getForkDetails(), "weeks", "week On week Forks", darwin.projectManagerModule.getSampleIndex(), action, darwin.Mediator.getChartType());
			}
			if(action == "tags"){
	    		darwin.Mediator.drawGenericGraph(darwin.Mediator.getTagsDetails(), "weeks", "week On week Tags", darwin.projectManagerModule.getSampleIndex(), action, darwin.Mediator.getChartType());
			}
			if(action == "Issues" || "closedAt"){
	    		darwin.Mediator.drawGenericGraph(darwin.Mediator.getIssuesDetails(), "weeks", "week On week issues", darwin.projectManagerModule.getSampleIndex(), action, darwin.Mediator.getChartType());
			}
			    		
    		//enable clicking on another project
			darwin.Mediator.enableButtons();
			
			//only runs when auto getting data 
    	    if(darwin.projectManagerModule.getIsAuto() == true){
				darwin.projectManagerModule.handleAuto(action, index);
			}
			
        },
        resetVariables: function(){      	
        	sampleIterator = 0;
        	data = [];
        	dates = [];
        	totalCommits = 0;
        	firstDate = true;
        	localJson = [];
        	genericAcc = [];
        	genericTotal = 0
        	//added stuff for open/closed issues
        	var openIssues = [];
        	var closedIssues = [];
        },
        //based on an input date calculate the last date in the sample
        getDateRange : function(inputDate){	
        	var dateRange = new Date(inputDate);
        	dateRange.setDate(dateRange.getDate()+(sampleRate * 7));
        	return dateRange;
        },

        //ADD check to see if when out of a sample
        checkDateBeyondSample : function(date, finalDate){
        	if(date > finalDate){
        		return true;
        	}
        	return false;
        },
        //Find out how many samples have been skipped if any between two dates
        addSamplesSkipped : function(currDate, lastKnownDate){
        	
        	notFoundDate = true;
        	samplesMissed = 0;
        	
        	//loop until we find new date inside a range
        	while(notFoundDate){
        		
        		lastKnownDate = darwin.genericExtractorModule.getDateRange(lastKnownDate)
        		
        		notFoundDate = darwin.genericExtractorModule.checkDateBeyondSample(currDate, lastKnownDate);
              		
        		if(notFoundDate){
        			
        			//set current data total
        			genericTotal = genericTotal + data[sampleIterator];
        			genericAcc[sampleIterator] = genericTotal;
        			
        			
					sampleIterator++;
					dates[sampleIterator] = lastKnownDate;
					data[sampleIterator] = 0;  	
					
					//issue stuff
  					openIssues[sampleIterator]=0;
  					closedIssues[sampleIterator]=0;

        		} 
        	}
        	return lastKnownDate;

        },
        getClosedAtDates : function(json){
        	var counter = 0;
        	var closedAtDates = [];
        	for( var k =0;k<json.length;k++){
   				if(json[k].state == "closed"){
      				var closedDate = darwin.ISO601toDateModule.convert(json[k].closed_at);
      				closedAtDates[counter] = closedDate;
      				counter++;
  				}
        	}
        	
        	//performs the actual sort
			(function(){
				  if (typeof Object.defineProperty === 'function'){
				    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
				  }
				  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

				  function sb(f){
				    for (var i=this.length;i;){
				      var o = this[--i];
				      this[i] = [].concat(f.call(o,o,i),o);
				    }
				    this.sort(function(a,b){
				      for (var i=0,len=a.length;i<len;++i){
				        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
				      }
				      return 0;
				    });
				    for (var i=this.length;i;){
				      this[--i]=this[i][this[i].length-1];
				    }
				    return this;
				  }
				})();
			
			closedAtDates.sortBy(function(o){ return o.date });
        	
        	return closedAtDates;
        },
        
    };
})();