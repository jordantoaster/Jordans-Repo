<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/QueryPage.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/GitHubCommunication.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/loadGraphModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/AjaxResponseModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ISO601toDateModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/PackagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/JsonManagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ServerCommunication.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ProgressbarModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CustomTabModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CommitManagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ArrayUtilityModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ProjectManagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/DataManagerModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ParseUrlInputModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Mediator/Mediator.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Utility/QueryPageUtility.js?v5"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/ContributionsInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/CustomInputManager.js?v6"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/InputManagers/CommitInputManager.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ContributionVisualiser.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CommitVisualiserModule.js?v5"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CustomVisualiserModule.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/ContributionExtractor.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CopyObjectModule.js?v7"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Modules/CommitExtractorModule.js?v8"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/QueryPage.css?v4">
    <link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/Master.css?v2">
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Main Application</title>
  </head>
  <body>
   <div id="navbar"></div>
   <div id="tabContainer">
    <ul class="nav nav-tabs tabListCustom">
      <li class="active"><a class="tabText" data-toggle="tab" href="#urlInput">Input Repository</a></li>
      <li><a class="tabText disabled" data-toggle="tab" href="#ContributorTab">Contributors</a></li>
      <li><a class="tabText disabled" data-toggle="tab" href="#CommitTab">Commits</a></li>
      <li><a class="tabText disabled" data-toggle="tab" href="#CustomTab">Custom</a></li>
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
       <p>Add cool explanatory text here</p>
 		<div class="progress">
  			<div class="progress-bar progress-bar-striped active" role="progressbar"
			 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  			</div>
		</div>        
      </div>   
   	 <div id="ContributorTab" class="tab-pane fade customTab">
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
		<p id="contributorTotalWeeks" class="contributorExtra"></p>
		<p id="contributorLOC" class="contributorExtra"></p>
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
      <div id="commitChart"></div>  
    </div>
    <div id="CustomTab" class="tab-pane fade customTab">
    	<div class="dropdown">
  			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    			Chose Project
    		<span class="caret"></span>
  		</button>
  		<ul id="projectOptions" class="dropdown-menu" aria-labelledby="dropdownMenu1"></ul>
		</div>
	    <div id="options">
	    	<p class="inlineText" style="display:block;">Options</p>
	    </div> 
     	
       <button type="submit" id="submitButtonCustom" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Get Custom Graph</i> 
       </button>   
       <div id="customChart"></div>  
     </div>  
   </div>
    <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert"></div>   
  </body>
</html>