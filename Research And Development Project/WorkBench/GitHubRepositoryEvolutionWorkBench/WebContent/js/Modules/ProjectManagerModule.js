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
    var growthType = "";
    var normalityType = "";
    var isAuto = false;
    var issuesFlag = false;
    var issuesCounter = 0;
		
    return {
    	getIssuesFlag : function(){
    		return issuesFlag;
    	},
    	//needs to be ten issues in a row that are bad for this to happen - should be a big enough threshold
    	//some projects go 4 in a row etc with bad requests
    	setIssuesFlag : function(val){
    		
    		//if true then increment
    		if(val == true){
    			issuesCounter++;
    		}
    		
    		//if false passed in then reset
    		if(val == false){
    			issuesCounter == 0;
    		}    
    		
    		if(issuesCounter == 10){
        		issuesFlag = val;
    		}
    	},
    	getIsAuto : function(){
    		return isAuto;
    	},
    	setIsAuto : function(val){
    		isAuto = val;
    	},
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
        setNormalityType : function(type){
        	normalityType = type;
        },
        getNormalityType : function(){
        	return normalityType;
        },
        setGrowthType : function(type){
        	growthType = type;
        },
        getGrowthType : function(){
        	return growthType;
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
        	if(metricType == "growth"){
        		darwin.projectManagerModule.setGrowthType(dataType);
        	}
        	if(metricType == "normality"){
        		darwin.projectManagerModule.setNormalityType(dataType);
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
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        			}
        		}
        		if(dataType == "tags"){
           			tags = darwin.Mediator.getTagsIndex(i);
        			if(tags != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        			}
        		}
        		if(dataType == "issues"){
           			issues = darwin.Mediator.getIssuesIndex(i);
        			if(issues != undefined){
        				$(ElementId).append('<div  class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        			}
        		}
        		if(dataType == "commits"){
           			commits = darwin.Mediator.getCommitsIndex(i);
        			if(commits != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        			}
        		}
        		if(dataType == "stars"){
          			stars = darwin.Mediator.getStarsIndex(i);
        			if(stars != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">'+projectNames[i]+'</label></div>')
        			}
        		}
        		if(dataType == "forksAcc"){
        			forks = darwin.dataManager.getForksAccIndex(i);
        			if(forks != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">Forks</label></div>')
        			}
        		}
        		if(dataType == "tagsAcc"){
           			tags = darwin.dataManager.getTagsAccIndex(i);
        			if(tags != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">tags</label></div>')
        			}
        		}
        		if(dataType == "issuesAcc"){
           			issues = darwin.dataManager.getIssuesAccIndex(i);
        			if(issues != undefined){
        				$(ElementId).append('<div  class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">issues</label></div>')
        			}
        		}
        		if(dataType == "commitsAcc"){
           			commits = darwin.dataManager.getCommitsAccIndex(i);
        			if(commits != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">commits</label></div>')
        			}
        		}
        		if(dataType == "starsAcc"){
          			stars = darwin.dataManager.getStarsAccIndex(i);
        			if(stars != undefined){
        				$(ElementId).append('<div class="checkbox"><label><input id="check'+metricType+''+i+'" type="checkbox" value="">stars</label></div>')
        			}
        		}
        		if(dataType == "watchers"){
        			
        		}	
        	}
        },
        resetGrowthOptions : function(){
        	$('#growthOptions').empty();
        },
        resetMeanOptions : function(){
        	$('#meanOptions').empty();
        },
        resetNormalityOptions : function(){
        	$('#normalityOptions').empty();
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
        getCheckedNormalityData : function(dataType){
        	
        	numProjects = darwin.projectManagerModule.getNumProjects();
        	selectedNormalityData = [];
        	selectedNormalityProjectName = [];
        	dataCounter = 0;
        	
        	//finds out and records which checks have been chosen
			for(var i =0; i< numProjects;i++){
				if($('#checknormality'+i+'').is(':checked')) {	
										
		        	if(dataType == "additions"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getAdditionsIndex(i)[0]);
		        	}
		        	if(dataType == "deletions"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getDeletionsIndex(i)[0]);
		        	}
		        	if(dataType == "LOC"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getLOCIndex(i)[0]);
		        	}
		        	if(dataType == "forks"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getForksIndex(i)[0]);
		        	}
		        	if(dataType == "tags"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getTagsIndex(i)[0]);
		        	}
		        	if(dataType == "issues"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getIssuesIndex(i)[0]);
		        	}
		        	if(dataType == "commits"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getCommitsIndex(i)[0]);
		        	}
		        	if(dataType == "stars"){
		        		selectedNormalityData = selectedNormalityData.concat(darwin.Mediator.getStarsIndex(i)[0]);
		        	}
		        	if(dataType == "watchers"){
		        			
		        	}	
		        	
		        	selectedNormalityData = selectedNormalityData.concat("*");
		        	
		        	selectedNormalityProjectName[dataCounter] = darwin.projectManagerModule.getProjectNamesIndex(i);
	        		dataCounter++;
				}				
			}
			
			darwin.serverModule.sendStat("stats","normality",selectedNormalityProjectName, selectedNormalityData, "POST", darwin.Mediator.drawGenericStat, dataType);	

        },
        getCheckedGrowthData : function(dataType){
        	
        	numProjects = darwin.projectManagerModule.getNumProjects();
        	selectedGrowthData = [];
        	selectedGrowthProjectName = [];
        	dataCounter = 0;
        	
        	//finds out and records which checks have been chosen
			for(var i =0; i< numProjects;i++){
				if($('#checkgrowth'+i+'').is(':checked')) {	
										
		        	if(dataType == "additions"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getAdditionsAccIndex(i)[0]);
		        	}
		        	if(dataType == "deletions"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getDeletionsAccIndex(i)[0]);
		        	}
		        	if(dataType == "LOC"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getLOCIndex(i)[0]);
		        	}
		        	if(dataType == "forksAcc"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getForksAccIndex(i)[0]);
		        	}
		        	if(dataType == "tagsAcc"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getTagsAccIndex(i)[0]);
		        	}
		        	if(dataType == "issuesAcc"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getIssuesAccIndex(i)[0]);
		        	}
		        	if(dataType == "commitsAcc"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getCommitsAccIndex(i)[0]);
		        	}
		        	if(dataType == "starsAcc"){
		        		selectedGrowthData = selectedGrowthData.concat(darwin.dataManager.getStarsAccIndex(i)[0]);
		        	}
		        	if(dataType == "watchers"){
		        			
		        	}	
		        	
		        	selectedGrowthData = selectedGrowthData.concat("*");
		        	
		        	selectedGrowthProjectName[dataCounter] = darwin.projectManagerModule.getProjectNamesIndex(i);
	        		dataCounter++;
				}				
			}
			
			darwin.serverModule.sendStat("stats","growth",selectedGrowthProjectName, selectedGrowthData, "POST", darwin.Mediator.drawGenericStat, dataType);	

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
			
			if(selectedSeriesAData.length != selectedSeriesBData.length){ 
				
				if(selectedSeriesAData.length < selectedSeriesBData.length){
					
					var difference = selectedSeriesBData.length - selectedSeriesAData.length ;
					
					selectedSeriesBData = darwin.arrayUtilityModule.trimArray(selectedSeriesBData, difference);

				}
				if(selectedSeriesAData.length > selectedSeriesBData.length){
					var difference = selectedSeriesAData.length - selectedSeriesBData.length ;

					
					selectedSeriesAData = darwin.arrayUtilityModule.trimArray(selectedSeriesAData, difference);

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
             issuesCounter = 0;
        },
        handleAuto : function(autoAction, autoIndex){
        	
        	if(autoIndex != darwin.projectManagerModule.getNumProjects()-1){
        		
        		/*This block handles when a metric needs the next projects data*/
        		
        		//get project names
        		projectNames = darwin.projectManagerModule.getProjectNames();
        		
    			//get the next project name - as we are not at the project num limit
    			project = projectNames[index+1];
    			
    			//get next projects metric type
    			if(autoAction == "commit"){
        	    	darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+project+"/commits?per_page=100&page=", project);
    			}
    			
    			if(autoAction == "star"){
    				darwin.Mediator.prepareStarClick("https://api.github.com/repos"+project+"/stargazers?per_page=100&page=", project);	
    			}
    			
    			if(autoAction == "fork"){
        			darwin.Mediator.prepareForkClick("https://api.github.com/repos"+project+"/forks?per_page=100&page=", project);	
    			}

    			if(autoAction == "Issues"){
        			darwin.Mediator.prepareIssuesClick("https://api.github.com/repos"+project+"/issues/", project);	
    			}
    			
    			//if(autoAction == "watcher"){
        		//	darwin.Mediator.prepareWatcherClick("https://api.github.com/repos"+project+"/subscribers?per_page=100&page=", project);	
    			//}
    			
    			if(autoAction == "tags"){
            		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+project+"/tags?per_page=100&page=", project);
            		darwin.projectManagerModule.setSelectedTagProject(darwin.Mediator.getNumTagsProjectSelected(), project);
    			}
        	} else {
        		
        		/*This block handles when a previous metric has data for all projects - each end of action calls next action*/

        		//get project names
        		projectNames = darwin.projectManagerModule.getProjectNames();
        		
    			//get the first project for the new metric
    			project = projectNames[0];
    			
        		if(autoAction == "commit") {
    				darwin.Mediator.prepareStarClick("https://api.github.com/repos"+project+"/stargazers?per_page=100&page=", project);	
        		}
    			if(autoAction == "star"){
        			darwin.Mediator.prepareForkClick("https://api.github.com/repos"+project+"/forks?per_page=100&page=", project);	
    			}
    			
    			if(autoAction == "fork"){
        			darwin.Mediator.prepareIssuesClick("https://api.github.com/repos"+project+"/issues/", project);	
    			}

    			if(autoAction == "Issues"){
        			darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+project+"/tags?per_page=100&page=", project);	
    			}
    			
    			//if(autoAction == "watcher"){
            	//	darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+project+"/subscribers?per_page=100&page=", project);   			
            	//}
    			
    			if(autoAction == "tags"){
    				//now unlock tabs
        			darwin.projectManagerModule.enableTabs();
    			}
        	}
        	
        }
    };
})();