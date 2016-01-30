/*A global module*/

var darwin = darwin || {};

darwin.projectManagerModule = (function() {
	
	var projectId = "";
    var baseRequestUrl = [];
    var samplingRate = 6;
    var comparison = false;
    var numProjects = 0;
    var projectNames = [];
    var currRequestPage = 1;
    var commitSamplingRate = 6;
    var sampleIndex = 2;
    var currentProjectIndex = 0;
    var currentContribution = "difference";
    var starProjectsAdded = 0;
    var issuesProjectsAdded = 0;
    var commitProjectsAdded = 0;
    var spaceAjaxQueueAvaliable = true;
    var chartType = "LineChart";
    var watcherProjectsAdded =0;
    var forkProjectsAdded =0;
    var releaseProjectsAdded = 0;
    var supplementSize = 0;
    var tagSuppIndex = 0;
    var selectedTagProject = [];
    var meanType = "";
    var CorrelationTypeS2 = "";
    var CorrelationTypeS1 = "";
    var issuesType = "all";
		
    return {
    	getSelectedTagProject : function(index){
    		return selectedTagProject[index];
    	},
    	setSelectedTagProject : function(index, name){
    		selectedTagProject[index] = name;
    	},
    	getTagSuppIndex: function(){
    		return tagSuppIndex
    	},
    	setTagSuppIndex : function(){
    		tagSuppIndex = tagSuppIndex + 1;
    	},
    	resetTagSuppIndex : function(){
    		tagSuppIndex =0;
    	},
    	setSupplmentSize : function(val){
    		supplementSize = val;
    	},
    	getSupplementSize : function(){
    		return supplementSize;
    	},
    	loadProjectSelection: function (projects) {
    		for(var i=0;i<projects.length;i++){  			
    			$("#commitOptions").append('<button type="button" id="commitOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    			$("#starOptions").append('<button type="button" id="starOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    			$("#WatcherOptions").append('<button type="button" id="WatcherOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    			$("#ForkOptions").append('<button type="button" id="ForkOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    			$("#TagsOptions").append('<button type="button" id="TagsOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    			$("#IssuesOptions").append('<button type="button" id="IssuesOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    		}
        },
        setChartType : function(val){
        	chartType = val;
        }, 
        setIssuesType : function(val){
        	issuesType = val;
        }, 
        getChartType : function(){
        	return chartType;
        },
        getIssuesType : function(){
        	return issuesType;
        }, 
        setCurrentProjectIndex: function(index){
        	currentProjectIndex = index
        },
        getCurrentProjectIndex: function(){ 
        	return currentProjectIndex;
        }, 
        setNumProjects: function(){
        	numProjects = numProjects + 1;
        },
        decNumProjects : function(){
        	if(numProjects != 0)
        		numProjects = numProjects -1;
        },
        getNumProjects: function(){ 
        	return numProjects;
        }, 
        setSampleIndex: function(index){
        	sampleIndex = index;
        },
        getSampleIndex: function(){ 
        	return sampleIndex;
        }, 
        resetNumProjects : function(){
        	getNumProjects = 1;
        },
        setProjectNames: function(name){
        	projectNames.push(name);
        },
        getProjectNames: function(){ 
        	return projectNames;
        },  
        resetProjectNames : function(){
        	projectNames = [];
        },
        getProjectNamesIndex: function(i){ 
        	return projectNames[i];
        }, 
        setcurrRequestPage: function(val){
        	currRequestPage = currRequestPage + val;
        },
        resetcurrRequestPage: function(){
        	currRequestPage = 1;
        },
        getcurrRequestPage: function(){ 
        	return currRequestPage;
        },  
        setProjectId: function(id){
        	projectId = id;
        },
        getProjectId: function(){
        	return projectId;
        },  
        setComparison: function(comparisonIn){
        	comparison = comparisonIn;
        },
        getComparison: function(){
        	return comparison;
        }, 
        setSamplingRate: function(sample){
        	samplingRate = sample;
        },
        getSamplingRate: function(){
        	return samplingRate;
        },
        setCommitSamplingRate: function(sample){
        	commitSamplingRate = sample;
        },
        getCommitSamplingRate: function(){
        	return commitSamplingRate;
        },
        setBaseRequestUrl: function(index, url){
        	baseRequestUrl[index] = url;
        },
        getBaseRequestUrl: function(index){
        	return baseRequestUrl[index];
        },  
        getAllBaseRequestUrl: function(){
        	return baseRequestUrl;
        }, 
        resetBaseRequestUrl : function(){
        	baseRequestUrl = [];
        },
        resetVariables: function(){      	
    	    darwin.Mediator.resetVariables();
        },
        resetComponents: function() {
    		$('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);  
    		$('#commitChart').empty();
    		$('#starChart').empty();
    		$('#TagsChart').empty();
    		$('#ForkChart').empty();
    		$('#IssuesChart').empty();
    		$('#contributorChart').empty();
    		$('#projectOptions').empty();
    		$('#options').empty();  
    		$('#commitOptions').empty();
    		$('#starOptions').empty();
    		$('#ForkOptions').empty();
    		$('#WatcherOptions').empty();
    		$('#TagsOptions').empty();
        	$('#meanOptions').empty();
    		$('#IssuesOptions').empty();
        },
        disableTabs :  function(){
            $('#selectVisualiser').addClass('disabled');
            $('#selectStats').addClass('disabled');
            $('#selectPrediction').addClass('disabled');
        },
        enableTabs :  function(){
            $('#selectVisualiser').removeClass('disabled');
            $('#selectStats').removeClass('disabled');
            $('#selectPrediction').removeClass('disabled');
        },
        disableCommitButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#commitHeader").text('Please wait until the data is collected');
        },
        disableStarButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#starHeader").text('Please wait until the data is collected');
        },
        disableWatcherButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#watcherHeader").text('Please wait until the data is collected');
        },
        disableForkButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#ForkHeader").text('Please wait until the data is collected');
        },
        disableIssuesButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#IssuesHeader").text('Please wait until the data is collected');
        },
        disableTagsButton : function(){
        	$('.btn-group button').attr('disabled','disabled');   
        	$("#TagsHeader").text('Please wait until the data is collected');
        },
        enableButtons :  function(){
        	$('.btn-group button').removeAttr('disabled');
       	 	$("#commitHeader").text('You can now select another project');
        },
        getCurrentContributionMetric : function(){
        	return currentContribution;
        },
        setCurrentContributionMetric : function(metricName){
        	currentContribution = metricName;
        },
        getContributionMetricArray : function(metricName){
        	if(metricName == "difference")
        		return darwin.dataManager.getAllDifference();
        		
            if(metricName == "addition")
        		return darwin.dataManager.getAllAdditions();

            		
            if(metricName == "deletion")
        		return darwin.dataManager.getAllDeletions();

                		
            if(metricName == "LOC")
        		return darwin.dataManager.getAllLOCOverTime();

        },
		swapSampleRate : function(index) {
			if (index == 0)
				return 1;
			if (index == 1)
				return 6;
			if (index == 2)
				return 13;
			if (index == 3)
				return 26;
		},
		setStarProjectsAdded : function(){
			starProjectsAdded = starProjectsAdded +1;
		},
		getStarProjectsAdded : function(){
			return starProjectsAdded;
		},
		setIssuesProjectsAdded : function(){
			issuesProjectsAdded = issuesProjectsAdded +1;
		},
		getissuesProjectsAdded : function(){
			return issuesProjectsAdded;
		},
		resetStarProjectsAdded : function(){
			starProjectsAdded = 0;
		},
		setWatcherProjectsAdded : function(){
			watcherProjectsAdded = watcherProjectsAdded +1;
		},
		getWatcherProjectsAdded : function(){
			return watcherProjectsAdded;
		},
		getForkProjectsAdded : function(){
			return forkProjectsAdded;
		},
		setForkProjectsAdded : function(){
			forkProjectsAdded = forkProjectsAdded +1;
		},
		getTagsProjectsAdded : function(){
			return releaseProjectsAdded;
		},
		setTagsProjectsAdded : function(){
			releaseProjectsAdded = releaseProjectsAdded +1;
		},
		resetForkProjectsAdded : function(){
			forkProjectsAdded = 0;
		},
		resetWatcherProjectsAdded : function(){
			watcherProjectsAdded = 0;
		},
		setCommitProjectsAdded : function(){
			commitProjectsAdded = commitProjectsAdded +1;
		},
		getCommitProjectsAdded : function(){
			return commitProjectsAdded;
		},
		resetCommitProjectsAdded : function(){
			commitProjectsAdded = 0;
		},
        noCallBack : function(){
        	//do nothing
        },
        setMeanType : function(type){
        	meanType = type;
        },
        getMeanType : function(){
        	return meanType;
        },
        setCorrelationTypeS1 : function(type){
        	CorrelationTypeS1 = type;
        },
        getCorrelationTypeS1 : function(){
        	return CorrelationTypeS1;
        },
        setCorrelationTypeS2 : function(type){
        	CorrelationTypeS2 = type;
        },
        getCorrelationTypeS2 : function(){
        	return CorrelationTypeS2;
        },
        setupStatUi : function(metricType, ElementId, dataType){
        	
        	if(metricType == "mean"){
        		darwin.projectManagerModule.setMeanType(dataType);
        	}
        	if(metricType == "CorrelationS1"){
        		darwin.projectManagerModule.setCorrelationTypeS1(dataType);
        	}
        	if(metricType == "CorrelationS2"){
        		darwin.projectManagerModule.setCorrelationTypeS2(dataType);
        	}
        	
    		var numProjects = darwin.projectManagerModule.getNumProjects();
    		var projectNames = darwin.projectManagerModule.getProjectNames();
        	
        	//check boxes - find out who has the selected information and show
        	for(var i =0; i<numProjects;i++){
        		
        		if(dataType == "additions"){
        			$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        		}
        		if(dataType == "deletions"){
        			$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        		}
        		if(dataType == "LOC"){
        			$(ElementId).append('<div  class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        		}
        		if(dataType == "forks"){
        			forks = darwin.Mediator.getForksIndex(i);
        			if(forks != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">Forks</label></div>')
        			}
        		}
        		if(dataType == "tags"){
           			tags = darwin.Mediator.getTagsIndex(i);
        			if(tags != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">tags</label></div>')
        			}
        		}
        		if(dataType == "issues"){
           			issues = darwin.Mediator.getIssuesIndex(i);
        			if(issues != undefined){
        				$(ElementId).append('<div  class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">issues</label></div>')
        			}
        		}
        		if(dataType == "commits"){
           			commits = darwin.Mediator.getCommitsIndex(i);
        			if(commits != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">commits</label></div>')
        			}
        		}
        		if(dataType == "stars"){
          			stars = darwin.Mediator.getStarsIndex(i);
        			if(stars != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">stars</label></div>')
        			}
        		}
        		if(dataType == "watchers"){
        			
        		}	
        	}
        },
        resetMeanOptions : function(){
        	$('#meanOptions').empty();
        },
        resetCorrelationOptionsS1 : function(){
        	$('#correlationOptions1').empty();
        },
        resetCorrelationOptionsS2 : function(){
        	$('#correlationOptions2').empty();
        },
        getCheckedMeanData : function(dataType){
        	
        	numProjects = darwin.projectManagerModule.getNumProjects();
        	selectedMeanData = [];
        	selectedMeanProjectName = [];
        	dataCounter = 0;
        	
        	//finds out and records which checks have been chosen
			for(var i =0; i< numProjects;i++){
				if($('#checkmean'+i+'').is(':checked')) {	
										
		        	if(dataType == "additions"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getAdditionsIndex(i)[0]);
		        	}
		        	if(dataType == "deletions"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getDeletionsIndex(i)[0]);
		        	}
		        	if(dataType == "LOC"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getLOCIndex(i)[0]);
		        	}
		        	if(dataType == "forks"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getForksIndex(i)[0]);
		        	}
		        	if(dataType == "tags"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getTagsIndex(i)[0]);
		        	}
		        	if(dataType == "issues"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getIssuesIndex(i)[0]);
		        	}
		        	if(dataType == "commits"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getCommitsIndex(i)[0]);
		        	}
		        	if(dataType == "stars"){
		        		selectedMeanData = selectedMeanData.concat(darwin.Mediator.getStarsIndex(i)[0]);
		        	}
		        	if(dataType == "watchers"){
		        			
		        	}	
		        	
		        	selectedMeanData = selectedMeanData.concat("*");
		        	
		        	selectedMeanProjectName[dataCounter] = darwin.projectManagerModule.getProjectNamesIndex(i);
	        		dataCounter++;
				}				
			}
			
			darwin.serverModule.sendStat("stats","mean",selectedMeanProjectName, selectedMeanData, "POST", darwin.Mediator.drawGenericStat, dataType);	

        },
        getCheckedCorrelationsData : function(seriesA, seriesB){
        	
        	numProjects = darwin.projectManagerModule.getNumProjects();
        	selectedSeriesAData = [];
        	selectedSeriesBData = [];
        	selectedProjectName = [];
        	dataCounter = 0;
        	
        	//finds out and records which checks have been chosen
			for(var i =0; i< numProjects;i++){
				if($('#checkCorrelationS1'+i+'').is(':checked')) {	
										
		        	if(seriesA == "additions"){
		        		selectedSeriesAData = darwin.Mediator.getAdditionsIndex(i)[0];
		        	}
		        	if(seriesA == "deletions"){
		        		selectedSeriesAData = darwin.Mediator.getDeletionsIndex(i)[0];
		        	}
		        	if(seriesA == "LOC"){
		        		selectedSeriesAData = darwin.Mediator.getLOCIndex(i)[0];
		        	}
		        	if(seriesA == "forks"){
		        		selectedSeriesAData = darwin.Mediator.getForksIndex(i)[0];
		        	}
		        	if(seriesA == "tags"){
		        		selectedSeriesAData = darwin.Mediator.getTagsIndex(i)[0];
		        	}
		        	if(seriesA == "issues"){
		        		selectedSeriesAData = darwin.Mediator.getIssuesIndex(i)[0];
		        	}
		        	if(seriesA == "commits"){
		        		selectedSeriesAData = darwin.Mediator.getCommitsIndex(i)[0];
		        	}
		        	if(seriesA == "stars"){
		        		selectedSeriesAData = darwin.Mediator.getStarsIndex(i)[0];
		        	}
		        	if(seriesA == "watchers"){
		        			
		        	}	        	
		        	
		        	selectedProjectName[dataCounter] = darwin.projectManagerModule.getProjectNamesIndex(i);
	        		dataCounter++;
				}	
				if($('#checkCorrelationS2'+i+'').is(':checked')) {	
					
		        	if(seriesB == "additions"){
		        		selectedSeriesBData = darwin.Mediator.getAdditionsIndex(i)[0];
		        	}
		        	if(seriesB == "deletions"){
		        		selectedSeriesBData = darwin.Mediator.getDeletionsIndex(i)[0];
		        	}
		        	if(seriesB == "LOC"){
		        		selectedSeriesBData = darwin.Mediator.getLOCIndex(i)[0];
		        	}
		        	if(seriesB == "forks"){
		        		selectedSeriesBData = darwin.Mediator.getForksIndex(i)[0];
		        	}
		        	if(seriesB == "tags"){
		        		selectedSeriesBData = darwin.Mediator.getTagsIndex(i)[0];
		        	}
		        	if(seriesB == "issues"){
		        		selectedSeriesBData = darwin.Mediator.getIssuesIndex(i)[0];
		        	}
		        	if(seriesB == "commits"){
		        		selectedSeriesBData = darwin.Mediator.getCommitsIndex(i)[0];
		        	}
		        	if(seriesB == "stars"){
		        		selectedSeriesBData = darwin.Mediator.getStarsIndex(i)[0];
		        	}
		        	if(seriesB == "watchers"){
		        			
		        	}	
		        			        	
		        	selectedProjectName[dataCounter] = darwin.projectManagerModule.getProjectNamesIndex(i);
	        		dataCounter++;
				}
			}
			
			darwin.serverModule.sendStatCorr("stats","correlation",selectedProjectName, selectedSeriesAData, selectedSeriesBData, "POST", darwin.Mediator.drawCorrelation, seriesA, seriesB);	

        },
        resetAllProjectManager : function(){
        	 projectId = "";
             baseRequestUrl = [];
             samplingRate = 6;
             comparison = false;
             numProjects = 0;
             projectNames = [];
             currRequestPage = 1;
             commitSamplingRate = 6;
             commitExtractorType = false;
             sampleIndex = 2;
             currentProjectIndex = 0;
             currentContribution = "difference";
             starProjectsAdded = 0;
             commitProjectsAdded = 0;
             releaseProjectsAdded = 0;
             issuesProjectsAdded = 0;
             meanType = "";
        }
    };
})();