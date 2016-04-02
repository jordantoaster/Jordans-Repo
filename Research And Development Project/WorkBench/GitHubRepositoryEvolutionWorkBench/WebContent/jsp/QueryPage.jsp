<!-- This page is the main application which enables data retrieval, partial visualisation and analysis - law feedback -->
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
    <link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/Master.css?v3">
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
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/UsersInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/GrowthInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/LawsInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/MeanInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/NormalityInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/VarianceInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ContributionVisualiser.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/LawVisualiser.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ModalVisualiser.js?v4"></script>
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
  <div style="top: 10px; right: 10px; position:absolute;"id="logout button">
     <button class="btn btn-default" id="logout" class="btn btn-primary button">
    	<i style="font-size: 1.5em" class="icon-user icon-white">Logout</i> <span style="margin-left: 5px;" class="glyphicon glyphicon-off" style="vertical-align:middle"></span>
  	 </button>
  	 <button class="btn btn-default" id="export" class="btn btn-primary button">
    	<i style="font-size: 1.5em" class="icon-user icon-white">Export DB</i> <span style="margin-left: 5px;" class="glyphicon glyphicon-download" style="vertical-align:middle"></span>
  	 </button>
  	 <button class="btn btn-default" id="clear" class="btn btn-primary button">
    	<i style="font-size: 1.5em" class="icon-user icon-white">Clear DB</i> <span style="margin-left: 5px;" class="glyphicon glyphicon-remove" style="vertical-align:middle"></span>
  	 </button>
  </div>
  <div id="selectionHolder">
     <button class="btn btn-default" id="selectInput" class="btn btn-primary button">
    	<i style="font-size: 1.5em" class="icon-user icon-white">Add URL(s)</i> <span style="margin-left: 5px;" class="glyphicon glyphicon-plus" style="vertical-align:middle"></span>
  	 </button>
  	 <button class="btn btn-default" id="selectVisualiser" class="btn btn-primary button">
    	<i style="font-size: 1.5em" class="icon-user icon-white">Visualiser</i> <span style="margin-left: 5px;" class="glyphicon glyphicon-film" style="vertical-align:middle"></span>
  	 </button>
  	 <button class="btn btn-default" id="selectStats" class="btn btn-primary button">
    	<i style="font-size: 1.5em" class="icon-user icon-white">Statistics</i> <span style="margin-left: 5px;" class="glyphicon glyphicon-signal" style="vertical-align:middle"></span>
  	 </button>
  	 <button class="btn btn-default" id="selectLehmann" class="btn btn-primary button">
    	<i style="font-size: 1.4em" class="icon-user icon-white">Lehmann's Laws</i> <span style="margin-left: 5px;" class="glyphicon glyphicon-stats" style="vertical-align:middle"></span>
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
         <input type="text" class="form-control" id="urlField0" placeholder="GitHub repository URL OR comma list" aria-describedby="basic-addon1">
         <span class="darwinIcon input-group-addon glyphicon glyphicon-open" id="info0"></span>
       </div>  
       <div id="additionalProject"><span class="input-group-addon glyphicon glyphicon-plus icon" id="basic-addon1"></span></div>
       <button type="submit" id="submitButtonQuery" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Get Data</i> 
       </button>   
       <button type="submit" id="submitButtonAuto" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Automate Data retrieval</i> 
       </button>  
       <p class="largeText" style="margin-left: 45%;" id="bulkProgress"></p> 
 		<div class="progress">
  			<div class="progress-bar progress-bar-striped active" role="progressbar"
			 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  			</div>
		</div> 
	 </div>
     </div>
     <!-- Modal -->
 	 <div class="modal fade" id="projectModal" role="dialog">
     <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title" id="modalTitle"></h4>
        </div>
        <div class="modal-body">
          <p id="modalMain"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>    
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
      <li><a class="tabText" data-toggle="tab" href="#UserTab">Users</a></li>  
    </ul>
      <div class="tab-content">
   	<div id="UserTab" class="tab-pane fade in customTab">
   		<h1>Enter a GitHub username</h1>
   		<div class="input-group input-group-lg fields urlInputOne">
         <input type="text" class="form-control" id="userFeild" placeholder="GitHub Username" aria-describedby="basic-addon1">
       </div>  
	  	<button type="submit" id="submitButtonUser" class="btn btn-primary submitButton">
  	     	<i class="icon-user icon-white">Pull Data</i> 
      	</button>  
      	<div id="userContent">
      	
      	</div>	
    </div>   
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
      <li class="active"><a class="tabText" data-toggle="tab" href="#meanBlock">Dispersion</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#correlationBLock">Correlation</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#growthBlock">Growth Rate</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#normalBlock">Normality</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#varianceBlock">Variance</a></li>
    </ul>
      <div class="tab-content">
      	<div id="meanBlock" class="tab-pane fade in active">
      	<div id="selectionMean">
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
			<div id="meanOptions" class="options">
	    	</div>
	    	</div> 
	    	<div>
  			<table class="table" id="dispersionTable" style="margin-top:2%;font-size: 2em;">
    		<thead>
     		 <tr>
       	 		<th>Project</th>
        		<th>Project Mean</th>
        		<th>Project Median</th>
        		<th>Overall Mean (full DB)</th>
        		<th>Overall Median(full DB)</th>	
        		<th>Overall Mean SD</th>	
      		</tr>
   		 	</thead>
  			</table>
	    	</div> 
      		 <button type="submit" style="display: inline !important;" id="submitButtonMean" class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get Dispersion Data</i> 
      		 </button> 
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
			<ol class="rectangle-list"> 
			    <li><a href=""  style="visibility: hidden" id="pearsonCorr"></a></li>
			    <li><a href=""  id="spearmanCorr" style="visibility: hidden" ></a></li>     			
			    <li><a href=""  id="crossCorr" style="visibility: hidden"></a></li>     			
      		</ol>
      		</div>	
      		<div id="correlationChart"></div>	
			<button type="submit" id="submitButtonCorrelation" class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get Correlation Information</i> 
      		</button>        		
      		<div id="correlationChart"></div>	
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

      		 <div id="growthChart" style="height:550px;margin-top:1%;"></div> 
      		 <button type="submit" id="submitButtonGrowth" class="btn btn-primary submitButton"><i class="icon-user icon-white">Get growth Graph</i> 
      		 </button>
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
			<table class="table" id="normalityTable" style="margin-top:2%; margin-bottom:2%;font-size: 2em;">
    		<thead>
     		 <tr>
       	 		<th>Project</th>
        		<th>Shapiro Wilks</th>
        		<th>P Value</th>
      		</tr>
   		 	</thead>
  			</table>
      		</div>	
      		<div id="normalityChart"></div>
			<button type="submit" id="submitButtonNormality" class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get Normality Information</i> 
      		</button>  		
	 	</div>
	 	<div id="varianceBlock" class="tab-pane fade">
			<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Change Metric Type
    		<span class="caret"></span>
  			</button>
  			<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
  		  		<li><a href="#" id="varianceChoice1">Additions</a></li>
  		  		<li><a href="#" id="varianceChoice2">Deletions</a></li>
  		  		<li><a href="#" id="varianceChoice3">LOC</a></li>
  		  		<li><a href="#" id="varianceChoice4">Commits</a></li>
  		  		<li><a href="#" id="varianceChoice5">Stars</a></li>
  		  		<li><a href="#" id="varianceChoice6">Tags</a></li>
  		  		<li><a href="#" id="varianceChoice7">Forks</a></li>
  		  		<li><a href="#" id="varianceChoice8">Issues</a></li>
  			</ul>
			</div>
			<div id="varianceOptions" class="options"></div>
			<div id="varianceInfoBox">
			<table class="table" id="varianceTable" style="margin-top:2%; margin-bottom:2%;font-size: 2em;">
    		<thead>
     		 <tr>
       	 		<th>Project</th>
        		<th>Variance</th>
      		</tr>
   		 	</thead>
  			</table>
      		</div>	
      		<div id="varianceChart"></div>
			<button type="submit" id="submitButtonVariance" class="btn btn-primary submitButton">
  	     		<i class="icon-user icon-white">Get Variance Information</i> 
      		</button>  		
	 	</div>
     </div>
  </div>
  <div id="lehmannContainer" class="hidden">
    <ul class="nav nav-tabs tabListCustom">
      <li class="active"><a class="tabText" data-toggle="tab" href="#lawSplash">Laws Background</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawOneBlock">Law One & Six</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawTwoBlock">Law Two</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawThreeBlock">Law Three</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawFourBlock">Law Four</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawFiveBlock">Law Five</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawSixBlock">Law Six</a></li>
      <li class=""><a class="tabText" data-toggle="tab" href="#lawSevenBlock">Law Seven</a></li>
<!--       <li class=""><a class="tabText" data-toggle="tab" href="#lawSummary">Laws Summary</a></li> -->
    </ul>
      <div class="tab-content">
         <div id="lawSplash" class="tab-pane fade in active">
            	<ol class="rectangle-list">
    				<li><a href="">(1974) "Continuing Change" - an E-type system must be continually adapted or it becomes progressively less satisfactory</a></li>
    				<li><a href="">(1974) "Increasing Complexity" - as an E-type system evolves, its complexity increases unless work is done to maintain or reduce it</a></li>
    				<li><a href="">(1974) "Self Regulation" - E-type system evolution processes are self-regulating with the distribution of product and process measures close to normal</a></li>
    				<li><a href="">(1978) "Conservation of Organisational Stability (invariant work rate)" - the average effective global activity rate in an evolving E-type system is invariant over the product's lifetime</a></li>
    				<li><a href="">(1978) "Conservation of Familiarity" - as an E-type system evolves, all associated with it, developers, sales personnel and users, for example, must maintain mastery of its content and behaviour to achieve satisfactory evolution. Excessive growth diminishes that mastery. Hence the average incremental growth remains invariant as the system evolves</a></li>
    				<li><a href="">(1991) "Continuing Growth" - the functional content of an E-type system must be continually increased to maintain user satisfaction over its lifetime</a></li>                       
    				<li><a href="">(1996) "Declining Quality" - the quality of an E-type system will appear to be declining unless it is rigorously maintained and adapted to operational environment changes</a></li>                       
    				<li><a href="">(1996) "Feedback System" (first stated 1974, formalised as law 1996) - E-type evolution processes constitute multi-level, multi-loop, multi-agent feedback systems and must be treated as such to achieve significant improvement over any reasonable base</a></li>                                              
				</ol>
         </div>     
      	<div id="lawOneBlock" class="tab-pane fade">
		<div class="container">
  		<h1 class="tableHeader">% of CC values of Commits and Stars with a +ve correlation</h1>
  		<table class="table" id="blockOneTable">
    	<thead>
     	 <tr>
       	 	<th>Lag</th>
        	<th>Cross Correlation (+ve)</th>
      	</tr>
   		 </thead>

  		</table>
		</div>
	 	</div>
	 	<div id="lawTwoBlock" class="tab-pane fade">
	 	  	<h1 class="tableHeader">% of projects showing a positive or negative growth rate</h1>
			<div id="lawTwoChart" style="height: 600px;"></div>
	 	</div>
	 	<div id="lawThreeBlock" class="tab-pane fade">
		<div class="container">
  		<h1 class="tableHeader">% projects normality p values for these metrics that are within 0.05 alpha threshold of significance</h1>
  		<table class="table" id="blockThreeTable">
    	<thead>
     	 <tr>
       	 	<th>Additions</th>
        	<th>Deletions</th>
        	<th>Issues</th>
      	</tr>
   		 </thead>
  		</table>
		</div>
	 	</div>
	 	<div id="lawFourBlock" style="overflow:hidden;height:600px;"class="tab-pane fade">
			<div id="left" style="float:left;width:50%;height:600px;">
				<div id="chartFourLeft" style="height:600px;"></div>
  			</div>

  			<div id="right" style="float:right;width:50%;height:600px">
				<div id="chartFourRight" style="height:600px;"></div>
 			</div>
	 	</div>
	 	<div id="lawFiveBlock" class="tab-pane fade">
			<div class="container">
  			<h1 class="tableHeader">% of CC values of Growth Rate and Issues with a +ve correlation</h1>
  			<table class="table" id="blockFiveTable">
    		<thead>
     		 <tr>
       	 		<th>Lag</th>
        		<th>Cross Correlation (+ve)</th>
      		</tr>
   		 	</thead>

  			</table>
			</div>
	 	</div>
		<div id="lawSixBlock" class="tab-pane fade">
			<div class="container">
  			<h1 class="tableHeader">% of CC values of Issues and LOC with a -ve correlation</h1>
  			<table class="table" id="blockSixTable">
    		<thead>
     		 <tr>
       	 		<th>Lag</th>
        		<th>Cross Correlation (-ve)</th>
      		</tr>
   		 	</thead>

  			</table>
			</div>
	 	</div>
	 	<div id="lawSevenBlock" class="tab-pane fade">
			<div class="container">
  			<h1 class="tableHeader">% of CC values of Issues and Issue Comments with a -ve correlation</h1>
  			<table class="table" id="blockSevenTable">
    		<thead>
     		 <tr>
       	 		<th>Lag</th>
        		<th>Cross Correlation (-ve)</th>
      		</tr>
   		 	</thead>

  			</table>
			</div>
	 	</div>
	 	<div id="lawSummary" class="tab-pane fade">
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
  </div>
    <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert"></div>   
  </body>
</html>