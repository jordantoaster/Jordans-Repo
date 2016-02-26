<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/QueryPage.css?v4">
    <link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/Master.css?v2">
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/QueryPage.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/GitHubCommunication.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/DateManager.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/StatVisualiser.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/loadGraphModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/AjaxResponseModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ISO601toDateModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/JsonManagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ServerCommunication.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ProgressbarModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CustomTabModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ArrayUtilityModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ProjectManagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/DataManagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ParseUrlInputModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Mediator/Mediator.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/Utility.js?v5"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/ContributionsInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/TagsInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/WatcherInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/ForkInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/StarsInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/IssuesInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/CustomInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/CommitInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/CorrelationInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/GrowthInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/MeanInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/NormalityInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ContributionVisualiser.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/GenericVisualiserModule.js?v5"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CustomVisualiserModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ContributionExtractor.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CopyObjectModule.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/GenericExtractorModule.js?v8"></script>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Main Application</title>
  </head>
  <body>
  <div id="selectionHolder">
     <button type="submit" id="selectInput" class="btn btn-primary button">
       	   <i class="icon-user icon-white">Add URL(s)</i> 
     </button> 
     <button type="submit" id="selectVisualiser" class="btn btn-primary button">
       	   <i class="icon-user icon-white">Visualiser</i> 
     </button> 
     <button type="submit" id="selectStats" class="btn btn-primary button">
       	   <i class="icon-user icon-white">Statistics</i> 
     </button> 
     <button type="submit" id="selectPrediction" class="btn btn-primary button">
       	   <i class="icon-user icon-white">Predictor</i> 
     </button> 
  </div>
  <div id="urlContainer">
    <ul class="nav nav-tabs tabListCustom">
      <li class="active"><a class="tabText" data-toggle="tab" href="#urlInput">Input Repository</a></li>
    </ul>
      <div class="tab-content">
      <div id="urlInput" class="tab-pane fade in active">
	   <div class="input-group input-group-lg fields urlInputOne">
         <span class="input-group-addon glyphicon glyphicon-cog" id="basic-addon1"></span>
         <input type="text" class="form-control" id="urlField0" placeholder="GitHub repository URL" aria-describedby="basic-addon1">
       </div>  
       <div id="additionalProject"><span class="input-group-addon glyphicon glyphicon-plus icon" id="basic-addon1"></span></div>
       <button type="submit" id="submitButtonQuery" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Get Data</i> 
       </button>   
 		<div class="progress">
  			<div class="progress-bar progress-bar-striped active" role="progressbar"
			 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  			</div>
		</div>
		<div class="input-group input-group-lg fields urlInputOne">
         <span class="input-group-addon glyphicon glyphicon-cog" id="basic-addon1"></span>
         <input type="text" class="form-control" id="bulkUrl" placeholder="Add comman seperated URL here" aria-describedby="basic-addon1">
       </div>
       <button type="submit" id="submitButtonAuto" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Automate Data retrieval</i> 
       </button>    
	 </div>
     </div>
  </div>
   <div id="visualiserContainer" class="hidden">
    <ul class="nav nav-tabs tabListCustom">
      <li class="active"><a class="tabText" data-toggle="tab" href="#ContributorTab">Contributors</a></li>
      <li><a class="tabText" data-toggle="tab" href="#CommitTab">Commits</a></li>
      <li><a class="tabText" data-toggle="tab" href="#StarTab">Stars</a></li>
      <li><a class="tabText" data-toggle="tab" href="#TagsTab">Tags</a></li>
      <li><a class="tabText" data-toggle="tab" href="#ForkTab">Forks</a></li>
      <li><a class="tabText" data-toggle="tab" href="#IssuesTab">Issues</a></li> 
      <li><a class="tabText" data-toggle="tab" href="#WatcherTab">Watchers</a></li>
      <li><a class="tabText" data-toggle="tab" href="#CustomTab">Custom</a></li> 
    </ul>
      <div class="tab-content">  
   	  <div id="ContributorTab" class="tab-pane fade in active customTab">
    	<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Metric
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="changeValues1Contributions">Addition/Deletion Diff</a></li>
    	  <li><a href="#" id="changeValues2Contributions">Additions</a></li>
    	  <li><a href="#" id="changeValues3Contributions">Deletions</a></li>
    	  <li><a href="#" id="changeValues4Contributions">LOC Over Time</a></li>
  		</ul>
		</div>
		<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Sample Size
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Contributions">1 Weeks</a></li>
  		  <li><a href="#" id="sampleRate2Contributions">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Contributions">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Contributions">26 Weeks</a></li>
  		</ul>
		</div>
		<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Contribution"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Contribution">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Contribution">Scatter Chart</a></li>
  		</ul>
		</div>
		<p id="contributorTotalWeeks" class="contributorExtra"></p>
		<p id="contributorLOC" class="contributorExtra"></p>
		<div style="width: 50% !important; margin: 0 auto; height: 2%; margin-top: 1%;">
			<p class="inlineText" style="margin-bottom: 1%; margin: 0 auto;" id="contribRange">Sample Range</p>
 			<div id="slider"></div>
 		</div>
    	<div id="contributorChart"></div> 
    </div> 
     <div id="CommitTab" class="tab-pane fade customTab">
      <p class="inlineText" id="commitHeader">Select a project(s) commits: </p>
      <div class="btn-group" id="commitOptions" role="group" aria-label="..."></div>
      <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Sampling Rate
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Commits">1 Week</a></li>
    	  <li><a href="#" id="sampleRate2Commits">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Commits">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Commits">26 Weeks</a></li>
  		</ul>
	  </div>
	  <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Commits"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Commits">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Commits">Scatter Chart</a></li>
  		</ul>
		</div>
	  <p class="inlineText" id="commitProgress"></p>
      <div id="commitChart"></div>  
    </div>
    <div id="StarTab" class="tab-pane fade customTab">
      <p class="inlineText" id="commitHeader">Select a project(s) to get stars</p>
      <div class="btn-group" id="starOptions" role="group" aria-label="..."></div>
      <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Sampling Rate
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Stars">1 Week</a></li>
    	  <li><a href="#" id="sampleRate2Stars">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Stars">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Stars">26 Weeks</a></li>
  		</ul>
	  </div>
	  <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Stars"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Stars">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Stars">Scatter Chart</a></li>
  		</ul>
	  </div>
	  <p class="inlineText" id="starProgress"></p>
      <div id="starChart"></div>  
    </div>
    <div id="TagsTab" class="tab-pane fade customTab">
      <p class="inlineText" id="TagsHeader">Select a project(s) to get stars</p>
      <div class="btn-group" id="TagsOptions" role="group" aria-label="..."></div>
      <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Sampling Rate
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Tags">1 Week</a></li>
    	  <li><a href="#" id="sampleRate2Tags">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Tags">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Tags">26 Weeks</a></li>
  		</ul>
	  </div>
	  <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Tags"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Tags">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Tags">Scatter Chart</a></li>
  		</ul>
	  </div>
	  <p class="inlineText" id="TagsProgress"></p>
      <div id="TagsChart"></div>  
    </div>
    <div id="ForkTab" class="tab-pane fade customTab">
      <p class="inlineText" id="ForkHeader">Select a project(s) to get forks</p>
      <div class="btn-group" id="ForkOptions" role="group" aria-label="..."></div>
      <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Sampling Rate
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Fork">1 Week</a></li>
    	  <li><a href="#" id="sampleRate2Fork">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Fork">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Fork">26 Weeks</a></li>
  		</ul>
	  </div>
	  <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Fork"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Fork">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Fork">Scatter Chart</a></li>
  		</ul>
	  </div>
	  <p class="inlineText" id="ForkProgress"></p>
      <div id="ForkChart"></div>  
    </div>
      <div id="IssuesTab" class="tab-pane fade customTab">
      <p class="inlineText" id="IssuesHeader">Select a project(s) to get issues</p>
      <div class="btn-group" id="IssuesOptions" role="group" aria-label="..."></div>
      <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Sampling Rate
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Issues">1 Week</a></li>
    	  <li><a href="#" id="sampleRate2Issues">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Issues">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Issues">26 Weeks</a></li>
  		</ul>
	  </div>
	  <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Issues"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Issues">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Issues">Scatter Chart</a></li>
  		</ul>
	  </div>
	  	<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Issue Type
    		<span class="caret"></span>
  		    </button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="issueType1">Open</a></li>
  		  <li><a href="#" id="issueType2">Closed</a></li>
  		  <li><a href="#" id="issueType3">All</a></li>
  		  <li><a href="#" id="issueType4">Closed At</a></li>
  		  <li><a href="#" id="issueType5">Issue Comments</a></li>
  		</ul>
	  </div>
	  <p class="inlineText" id="IssuesProgress"></p>
      <div id="IssuesChart"></div>  
    </div>
    <div id="WatcherTab" class="tab-pane fade customTab">
      <p class="inlineText" id="watcherHeader">Select a project(s) to get stars</p>
      <div class="btn-group" id="WatcherOptions" role="group" aria-label="..."></div>
      <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Sampling Rate
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Watcher">1 Week</a></li>
    	  <li><a href="#" id="sampleRate2Watcher">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Watcher">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Watcher">26 Weeks</a></li>
  		</ul>
	  </div>
	  <div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Watcher"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Watcher">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Watcher">Scatter Chart</a></li>
  		</ul>
	  </div>
	  <p class="inlineText" id="watcherProgress"></p>
      <div id="watcherChart"></div>  
    </div>
    <div id="CustomTab" class="tab-pane fade customTab">
    	<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Chose Project
    		<span class="caret"></span>
  		</button>
  		<ul id="projectOptions" class="dropdown-menu" aria-labelledby="dropdownMenu1"></ul>
		</div>
		<div class="dropdown">
  		<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    		Change Sampling Rate
    	<span class="caret"></span>
  		</button>
		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="sampleRate1Custom">1 Week</a></li>
    	  <li><a href="#" id="sampleRate2Custom">6 Weeks</a></li>
    	  <li><a href="#" id="sampleRate3Custom">13 Weeks</a></li>
    	  <li><a href="#" id="sampleRate4Custom">26 Weeks</a></li>
  		</ul>
  		</div>
  		<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  		</button>
  		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  <li><a href="#" id="chartType1Custom"> Line Chart</a></li>
  		  <li><a href="#" id="chartType2Custom">Stepped Area Chart</a></li>
  		  <li><a href="#" id="chartType3Custom">Scatter Chart</a></li>
  		</ul>
		</div>
	    <div id="options">
	    	<p class="inlineText" style="display:block;">Options</p>
	    </div> 
       <div id="customChart"></div> 
       <button type="submit" id="submitButtonCustom" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Get Custom Graph</i> 
       </button>    
     </div>  
   </div>
   </div>
  <div id="statContainer" class="hidden">
    <ul class="nav nav-tabs tabListCustom">
      <li class="active"><a class="tabText" data-toggle="tab" href="#meanBlock">Mean</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#correlationBLock">Correlation</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#growthBlock">Growth Rate</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#normalBlock">Normality</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawsBlock">Laws</a></li>
    </ul>
      <div class="tab-content">
      	<div id="meanBlock" class="tab-pane fade in active">
			<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Metric Type
    		<span class="caret"></span>
  			</button>
  			<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  		<li><a href="#" id="MeanChoice1">Additions</a></li>
  		  		<li><a href="#" id="MeanChoice2">Deletions</a></li>
  		  		<li><a href="#" id="MeanChoice3">LOC</a></li>
  		  		<li><a href="#" id="MeanChoice4">Commits</a></li>
  		  		<li><a href="#" id="MeanChoice5">Stars</a></li>
  		  		<li><a href="#" id="MeanChoice6">Tags</a></li>
  		  		<li><a href="#" id="MeanChoice7">Forks</a></li>
  		  		<li><a href="#" id="MeanChoice8">Issues</a></li>
  		  		<li><a href="#" id="MeanChoice9">Watchers</a></li>
  			</ul>
			</div>
			<div id="meanOptions" class="options">>
	    	<p class="inlineText" style="display:block;">Options</p>
	    	</div> 
	    	 <button type="submit" style="display: inline !important; margin-top: 0px; margin-left:1%  !important; " id="submitButtonMean" class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get Mean Graph</i> 
      		 </button>  
      		 <div id="meanChart" class="statChart"></div> 
      		 <div id="additionalMean" class="additional">
      		 	<h1 >Side Data</h1>
      		 	<ul>
      		 		<li class="inlineText" style="display:list-item" id="collatedMean"></li>
      		 		<li class="inlineText" style="display:list-item" id="meanSd"></li>
      		 	</ul>
      		 </div>
      		     <div class="spacer" style="clear: both;"></div>
	 	</div>
	 	<div id="correlationBLock" class="tab-pane fade">
			<p class="inlineText">Series A</p>
			<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Metric Type
    		<span class="caret"></span>
  			</button>
  			<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  		<li><a href="#" id="CorrelationChoice1S1">Additions</a></li>
  		  		<li><a href="#" id="CorrelationChoice2S1">Deletions</a></li>
  		  		<li><a href="#" id="CorrelationChoice3S1">LOC</a></li>
  		  		<li><a href="#" id="CorrelationChoice4S1">Commits</a></li>
  		  		<li><a href="#" id="CorrelationChoice5S1">Stars</a></li>
  		  		<li><a href="#" id="CorrelationChoice6S1">Tags</a></li>
  		  		<li><a href="#" id="CorrelationChoice7S1">Forks</a></li>
  		  		<li><a href="#" id="CorrelationChoice8S1">Issues</a></li>
  		  		<li><a href="#" id="CorrelationChoice9S1">Watchers</a></li>
  			</ul>
			</div>
			<div id="correlationOptions1" class="options"></div>
			<br>
			<p class="inlineText">Series B</p>
			<div class="dropdown" style="display:inline;">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Metric Type
    		<span class="caret"></span>
  			</button>
  			<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  		<li><a href="#" id="CorrelationChoice1S2">Additions</a></li>
  		  		<li><a href="#" id="CorrelationChoice2S2">Deletions</a></li>
  		  		<li><a href="#" id="CorrelationChoice3S2">LOC</a></li>
  		  		<li><a href="#" id="CorrelationChoice4S2">Commits</a></li>
  		  		<li><a href="#" id="CorrelationChoice5S2">Stars</a></li>
  		  		<li><a href="#" id="CorrelationChoice6S2">Tags</a></li>
  		  		<li><a href="#" id="CorrelationChoice7S2">Forks</a></li>
  		  		<li><a href="#" id="CorrelationChoice8S2">Issues</a></li>
  		  		<li><a href="#" id="CorrelationChoice9S2">Watchers</a></li>
  			</ul>
			</div>
			<div id="correlationOptions2" class="options"></div>		
			<div id="correlationInfoBox">
			<h1>Correlation Data</h1>
			<ul>      			
				<li id="pearsonCorr" style="visibility: hidden" class="largeText"></li>
      			<li id="spearmanCorr" style="visibility: hidden" class="largeText"></li>
      		</ul>
      		</div>	
			<button type="submit" id="submitButtonCorrelation" class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get Correlation Information</i> 
      		</button>  		
	 	</div>
	 	<div id="growthBlock" class="tab-pane fade">
			<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Chart Type
    		<span class="caret"></span>
  			</button>
  			<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  		<li><a href="#" id="growthChoice1">Additions Acc</a></li>
  		  		<li><a href="#" id="growthChoice2">Deletions Acc</a></li>
  		  		<li><a href="#" id="growthChoice3">LOC Acc</a></li>
  		  		<li><a href="#" id="growthChoice4">Commits Acc</a></li>
  		  		<li><a href="#" id="growthChoice5">Stars Acc</a></li>
  		  		<li><a href="#" id="growthChoice6">Tags Acc</a></li>
  		  		<li><a href="#" id="growthChoice7">Forks Acc</a></li>
  		  		<li><a href="#" id="growthChoice8">Issues Acc</a></li>
  			</ul>
			</div>
			<div id="growthOptions" class="options">
	    	</div> 
	    	 <button type="submit" id="submitButtonGrowth" style="margin-left:1%  !important; margin-top:0.1% !important;"  class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get growth Graph</i> 
      		 </button>  
      		 <div id="growthChart" class="statChart"></div> 
      		 <div id="additionalgrowth" class="additional" style="width: 30%;">
      		 	<h1>Side Data</h1>
      		 	<p id="growthAbsolute"></p>
      		 	<p id="growthTime"></p>
      		 	<p id="growthSd"></p>
      		 </div>
      		     <div class="spacer" style="clear: both;"></div>
	 	</div>
	    <div id="normalBlock" class="tab-pane fade">
			<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Metric Type
    		<span class="caret"></span>
  			</button>
  			<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  		<li><a href="#" id="normalityChoice1">Additions</a></li>
  		  		<li><a href="#" id="normalityChoice2">Deletions</a></li>
  		  		<li><a href="#" id="normalityChoice3">LOC</a></li>
  		  		<li><a href="#" id="normalityChoice4">Commits</a></li>
  		  		<li><a href="#" id="normalityChoice5">Stars</a></li>
  		  		<li><a href="#" id="normalityChoice6">Tags</a></li>
  		  		<li><a href="#" id="normalityChoice7">Forks</a></li>
  		  		<li><a href="#" id="normalityChoice8">Issues</a></li>
  			</ul>
			</div>
			<div id="normalityOptions" class="options"></div>
			<div id="normalityInfoBox">
			<h1>Normality Data</h1>
			<ul>      			
				<li id="wilks0" style="visibility: hidden" class="largeText"></li>
				<li id="wilks1" style="visibility: hidden" class="largeText"></li>
				<li id="wilks2" style="visibility: hidden" class="largeText"></li>
				<li id="wilks3" style="visibility: hidden" class="largeText"></li>
				<li id="wilks4" style="visibility: hidden" class="largeText"></li>
      		</ul>
      		</div>	
			<button type="submit" id="submitButtonNormality" class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get Normality Information</i> 
      		</button>  		
	 	</div>
	 	<div id="lawsBlock" class="tab-pane fade">
			<p id="law1" class="largeText"></p> 
			<p id="law2" class="largeText"></p> 		
			<p id="law3" class="largeText"></p> 		
			<p id="law4" class="largeText"></p> 		
			<p id="law5" class="largeText"></p> 		
			<p id="law6" class="largeText"></p> 		
			<p id="law7" class="largeText"></p> 					
	 	</div>
     </div>
  </div>
    <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert"></div>   
  </body>
</html>