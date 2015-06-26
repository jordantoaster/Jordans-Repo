<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
<title>Dashboard</title>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> 
  <script src="http://localhost:8080/MyAwesomeApp/js/Master.js"></script> 
  <script src="http://localhost:8080/MyAwesomeApp/js/UserDashboard.js"></script> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link href="http://localhost:8080/MyAwesomeApp/css/Dashboard.css" rel="stylesheet" type="text/css" /> 
  <link href="http://localhost:8080/MyAwesomeApp/css/Master.css" rel="stylesheet" type="text/css" /> 
</head>
<body>
<div id="navBar"></div>
<div id="myBooksHeader"><p>My Books</p></div>
<div id="userBooks"></div>
<div id="galleryNav">
<button id="leftSlide" type="button" class="btn btn-default btn-lg" aria-label="Left Align">
  <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
</button>
<button id="rightSlide" type="button" class="btn btn-default btn-lg">
  <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
</button>
</div>
</body>
</html>