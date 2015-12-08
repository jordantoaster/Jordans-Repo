/**
 * 
 */

var darwin = darwin || {};

darwin.Mediator = (function () {
	
    return {
    	makeServerRequest: function (action, callback, type, input) {
    		darwin.serverModule.send(action, callback, type, input);
        },
		authenticateUpdateView: function (response) {
			json = JSON.parse(response);

			if(json.outcome == "true" && json.action == "login"){
				window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp";
			} else {
		     	$('#ajaxGetUserServletResponse').text(json.message);
		      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});
			}
		},
		updateProgressBar: function () {
			darwin.progressbarModule.updateProgressBar();
		},
		makeGithubRequest: function (url, callback, action, projectIndex) {
				
			//if not a stat api dataset then perform one manual call
			if(action == "commit"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, index, action);
			}
			else if(action == "star"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, 0, action);
			}
			else if(action == "watcher"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, 0, action);
			}
			else if(action == "fork"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, 0, action);
			}
			else if(action == "tags"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			} else {
				//if a stat api then loop each url, only send true callback on final url
				for(i=0;i<url.length;i++){
									
					//only perform actually call back when all request data collected
					if(i==(url.length-1)){
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), callback, i, action);
					} else {
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), callback, i, action);					
					}	
				}
			}
		},
		githubParseContributionData: function (response) {
			darwin.contributionExtractorModule.extract(response);
		},
		githubParseGenericData: function (response, index, action, supplement) {
			darwin.genericExtractorModule.extract(response, index, action, supplement);
		},
		githubParseStarData: function (response, index) {
			darwin.starExtractorModule.extract(response, index);
		},
		drawContributionGraph: function (values, xAxis, chartTitle, LOC, totalLines, sampleIndex, chartType) {	
			
			darwin.ContributionVisualiser.draw(values, xAxis, chartTitle, sampleIndex, chartType);	
			
			if(values.length == 1){
				darwin.ContributionVisualiser.populateSupplementaryStats(LOC,totalLines);
			}
		},
		drawGenericGraph: function (values, xAxis, chartTitle, sampleIndex, action, chartType) {			
			darwin.genericVisualiser.draw(values, xAxis, chartTitle, sampleIndex, action, chartType);	
		},
		loadGraphLibrary: function(){
			darwin.loadGraphModule.load();
		},
		resetVariables: function(){
			darwin.projectManagerModule.resetProjectNames();
			darwin.projectManagerModule.resetNumProjects();
			darwin.dataManager.resetAllDataManager();
			darwin.projectManagerModule.resetCommitProjectsAdded();
			darwin.projectManagerModule.resetStarProjectsAdded();
			darwin.projectManagerModule.setSampleIndex(0);
			darwin.jsonManagerModule.resetAllData();
			darwin.contributionExtractorModule.resetVariables();
			darwin.projectManagerModule.resetAllProjectManager();
			darwin.customTabModule.resetCustomTabData();
			darwin.progressbarModule.reset();
		},
		resampleCommits : function(currentJson){
			//pass in commits one at a time
			for(var i =0; i<currentJson.length;i++){
				darwin.genericExtractorModule.extract(currentJson[i],i);
			}
		},
		parseInputUrl : function(url){
			return darwin.ParseUrlInputModule.parse(url);
		},
		packager : function(seriesA, SeriesB, seriesC, seriesD ,dataType){
			if(dataType == "contributions"){
				darwin.packager.contributions(seriesA, SeriesB, seriesC,seriesD);
			}
		},
		packagerGeneric : function(dates, commits,projectname, action){
			darwin.packager.generic(dates, commits,projectname, action);
		},
		emptyCallback : function(){
			
		},
		setContributionDetails: function(index, additions, deletions, difference, LOCOverTime, sampleIndex, contributionDates){
			darwin.dataManager.setAdditions(index, additions, sampleIndex);
			darwin.dataManager.setDeletions(index, deletions, sampleIndex);
			darwin.dataManager.setDifference(index, difference, sampleIndex);
			darwin.dataManager.setLOCOverTime(index, LOCOverTime, sampleIndex);	
			darwin.dataManager.setContributionDates(index, contributionDates, sampleIndex);
		},
		setCommitDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setCommits(index, commits, projectNames, sampleIndex);
		},
		setStarDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setStars(index, commits, projectNames, sampleIndex);
		},
		setForkDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setForks(index, commits, projectNames, sampleIndex);
		},
		setTagsDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setTags(index, commits, projectNames, sampleIndex);
		},
		getCommitDetails : function(){
			return darwin.dataManager.getCommits();
		},
		getStarDetails : function(){
			return darwin.dataManager.getStars();
		},
		getForkDetails : function(){
			return darwin.dataManager.getForks();
		},
		getTagsDetails : function(){
			return darwin.dataManager.getTags();
		},
		setNumCommitProjectSelected : function(){
			darwin.projectManagerModule.setCommitProjectsAdded(darwin.Mediator.getNumCommitProjectSelected + 1);
		},
		getNumCommitProjectSelected : function(){
			return darwin.projectManagerModule.getCommitProjectsAdded();
		},
		getNumStarProjectSelected : function(){
			return darwin.projectManagerModule.getStarProjectsAdded();
		},
		setNumStarProjectSelected : function(){
			darwin.projectManagerModule.setStarProjectsAdded();
		},
		getNumWatcherProjectSelected : function(){
			return darwin.projectManagerModule.getWatcherProjectsAdded();
		},
		getNumForkProjectSelected : function(){
			return darwin.projectManagerModule.getForkProjectsAdded();
		},
		getNumTagsProjectSelected : function(){
			return darwin.projectManagerModule.getTagsProjectsAdded();
		},
		setNumWatcherProjectSelected : function(){
			darwin.projectManagerModule.setWatcherProjectsAdded();
		},
		setNumForkProjectSelected : function(){
			darwin.projectManagerModule.setForkProjectsAdded();
		},
		setNumTagsProjectSelected : function(){
			darwin.projectManagerModule.setTagsProjectsAdded();
		},
		getSmallestArray : function(json){
			return darwin.arrayUtilityModule.getSmallestArray(json);
		},
		performSuccessAction : function(action, response, callback, index){
			darwin.AjaxResponseModule.handleSuccess(action, response, callback, index);
		},
		setContributionJson : function(index, response){
			darwin.jsonManagerModule.setContributionJson(index,response)
		},
		setCommitJson : function(index, response){
			darwin.jsonManagerModule.setCommitJson(index,response)
		},
		setStarJson : function(index, response){
			darwin.jsonManagerModule.setStarJson(index,response)
		},
		setWatcherJson : function(index, response){
			darwin.jsonManagerModule.setWatcherJson(index,response)
		},
		resetcurrRequestPage : function(index){
			darwin.projectManagerModule.resetcurrRequestPage(index);
		},
		getAllCommitJson : function(){
			return darwin.jsonManagerModule.getAllCommitJson()
		},
		getIndexCommitJson : function(index){
			return darwin.jsonManagerModule.getCommitJson(index)
		},
		getStarJson : function(){
			return darwin.jsonManagerModule.getStarJson()
		},
		getWatcherJson : function(){
			return darwin.jsonManagerModule.getWatcherJson()
		},
		getForkJson : function(){
			return darwin.jsonManagerModule.getForkJson()
		},
		getTagsJson : function(){
			return darwin.jsonManagerModule.getTagsJson()
		},
		setForkJson : function(index, response){
			darwin.jsonManagerModule.setForkJson(index,response)
		},
		setTagsJson : function(index, response){
			darwin.jsonManagerModule.setTagsJson(index,response)
		},
		getTagsJson : function(index){
			return 	darwin.jsonManagerModule.getTagsJson(index);
		},
		setcurrRequestPage : function(val){
			darwin.projectManagerModule.setcurrRequestPage(val);
		},
		getcurrRequestPage : function(){
			return darwin.projectManagerModule.getcurrRequestPage();
		},
		getAllBaseRequestUrl : function(index){
			return darwin.projectManagerModule.getAllBaseRequestUrl(index)
		},
		makeGithubRequestSingleUrl : function(url, callback, index, action){
			  darwin.githubModule.send(url, callback, index, action);
		},
		prepareCommitClick : function(url, projectName){
			darwin.jsonManagerModule.resetCommitJson(url);
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.Mediator.disableCommitButton();
			
			index = darwin.Mediator.getProjNameIndex(projectName);
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "commit", index);		
		},
		prepareStarClick : function(url){
			darwin.jsonManagerModule.resetStarJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableStarButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "star");		
		},
		prepareWatcherClick : function(url){
			darwin.jsonManagerModule.resetWatcherJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableWatcherButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "watcher");		
		},
		prepareForkClick : function(url){
			darwin.jsonManagerModule.resetForkJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableForkButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "fork");		
		},
		prepareTagsClick : function(url, projectName){
			darwin.jsonManagerModule.resetTagsJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableTagsButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "tags", index);		
		},
		getProjNameIndex : function(name){
			var names = darwin.projectManagerModule.getProjectNames();
			var index = 0;
			
			for(var i =0;i<names.length;i++){
				if(names[i] == name){
					break;
				} else {
					index++;
				}
			}
			return index
		},
		getTagDate : function(sha, index){
			var projectList = darwin.projectManagerModule.getProjectNames();
			var project = projectList[index];
			var commit = darwin.githubModule.send("https://api.github.com/repos"+project+"/commits/"+sha+"", darwin.projectManagerModule.noCallBack, index, "tagCommit")			
		
			return darwin.ISO601toDateModule.convert(commit.commit.committer.date);		
		},
		disableCommitButton : function(){
			darwin.projectManagerModule.disableCommitButton();
		},
		enableButtons : function(){
			darwin.projectManagerModule.enableButtons();
		},
		setupCustomComponentsOptions : function(){
			darwin.customTabModule.setupUiOptions();
		},
		setupCustomComponentsDropDown : function(){
			darwin.customTabModule.setupUiDropDown();
		},
		clearComponents : function(){
			darwin.customTabModule.clearComponents();
		},
		clearOptionsOnly : function(){
			darwin.customTabModule.clearOptionsOnly();
		},
		getCommitsIndex : function(index){
			return darwin.dataManager.getCommitsIndex(index);
		},
		getStarsIndex : function(index){
			return darwin.dataManager.getStarsIndex(index);
		},
		getForksIndex  : function(index){
			return darwin.dataManager.getForksIndex(index);
		},
		getTagsIndex : function(index){
			return darwin.dataManager.getTagsIndex(index);
		},
		addToCustomList : function(array, name){
			darwin.dataManager.addToCustomList(array);
			darwin.dataManager.addToCustomNameList(name);
		},
		drawCustomGraph: function (values, xAxis, chartTitle, sampleIndex, chartType) {			
			darwin.customVisualiser.draw(values, xAxis, chartTitle, sampleIndex, chartType);	
		},
		resetCustomProcess : function(){
			darwin.dataManager.clearCustomNameList();
			darwin.customTabModule.removeChecks();
		},
		resetCustomList: function(){
			darwin.dataManager.clearCustomList();
		},
		setCurrentCustomSearch : function(val){
			darwin.customTabModule.setIsOnCustom(val);
		},
		getCurrentCustomSearch : function(){
			return darwin.customTabModule.getIsOnCustom();
		},
		copyObject : function(obj){
			return darwin.copyObjectModule.copyObject(obj);
		},
		updateCommitProgress : function(val){
			darwin.progressbarModule.updateCommitProgress(val);
		},
		updateStarProgress : function(val){
			darwin.progressbarModule.updateStarProgress(val);
		},
		updateWatcherProgress : function(val){
			darwin.progressbarModule.updateWatcherProgress(val);
		},
		updateForkProgress : function(val){
			darwin.progressbarModule.updateForkProgress(val);
		},
		updateTagsProgress : function(val){
			darwin.progressbarModule.updateReleaseProgress(val);
		},
		getChartType : function(){
			return darwin.projectManagerModule.getChartType();
		},
		setChartType : function(val){
			darwin.projectManagerModule.setChartType(val);
		},
		supplementTagData : function(callback, action, index){
			tagData = darwin.Mediator.getTagsJson(index);
			darwin.projectManagerModule.setSupplmentSize(tagData.length); 
			darwin.Mediator.makeGithubRequestSingleUrl("https://api.github.com/repos"+darwin.projectManagerModule.getProjectNamesIndex(index)+"/commits/"+tagData[darwin.Mediator.getTagSuppIndex()].commit.sha+"", callback, index, "tagSupplement");
		},
		setSupplementTag : function(value, index){
			darwin.jsonManagerModule.setSupplementTag(value, index);
		},
		getTagSuppIndex : function(){
			return darwin.projectManagerModule.getTagSuppIndex();
		},
		setTagSuppIndex : function(){
			darwin.projectManagerModule.setTagSuppIndex();
		},
		resetTagSuppIndex : function(){
			darwin.projectManagerModule.resetTagSuppIndex();
		},
		getSupplementTag : function(){
			return darwin.jsonManagerModule.getSupplementTag();
		}, 
		targetSupplementSize : function(){
			return darwin.projectManagerModule.getSupplementSize();
		},
		sortSuppDataDates : function(index){
			
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
			
			var data = darwin.Mediator.getSupplementTag(index);
			var dateArray = [];
			
			for(var i=0;i<data.length;i++){
				dateArray[i] = darwin.ISO601toDateModule.convert(data[i].commit.committer.date);
			}
			
			dateArray.sortBy(function(o){ return o.date });
			
			return dateArray;
			
		}
    };
})();