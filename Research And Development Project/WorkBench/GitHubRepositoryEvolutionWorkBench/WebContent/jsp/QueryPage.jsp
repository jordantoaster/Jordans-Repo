<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/QueryPage.js?v4"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Master.js?v5"></script>
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
      <li><a class="tabText" data-toggle="tab" href="#ContributorTab">Contributors</a></li>
    </ul>
      <div class="tab-content">
      <div id="urlInput" class="tab-pane fade in active">
	   <div class="input-group input-group-lg fields">
         <span class="input-group-addon glyphicon glyphicon-cog icon" id="basic-addon1"></span>
         <input type="text" class="form-control" id="userNameFeild" placeholder="GitHub repository URL" aria-describedby="basic-addon1">
       </div>  
       <button type="submit" id="submitButtonQuery" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Get Data</i> 
       </button>
       <p>Add cool explanatory text here</p> 
      </div>
    <div id="ContributorTab" class="tab-pane fade">
	  hi2
    </div>
    </div>
   </div>
  </body>
</html>