<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login Or Register</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Master.js"></script>
<script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/SplashPage.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/SplashPage.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
<body>
<div id="tabContainer">
  <ul class="nav nav-tabs tabListCustom">
    <li class="active"><a class="tabText" data-toggle="tab" href="#login">Login</a></li>
    <li><a class="tabText" data-toggle="tab" href="#register">Register</a></li>
  </ul>
  <div class="tab-content">
    <div id="login" class="tab-pane fade in active">
    <form name="loginForm" method="post" action="Service">
       <input name="action" type="submit" value="login" class="submitButton" id="submitButtonLog" class="btn btn-default">
    </form>
  </div>
  <div id="register" class="tab-pane fade">
  </div>
  </div>
 </div>
</body>
</html>