<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login Or Register</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Master.js"></script>
<script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/SplashPage.js?v2"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/SplashPage.css?v2">
<link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/Master.css?v2">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
<body>

  	<img class="darwinLogo" src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/images/darwin.png">

  <div id="tabContainer">
  <ul class="nav nav-tabs tabListCustom">
    <li class="active"><a class="tabText" data-toggle="tab" href="#login">Login</a></li>
    <li><a class="tabText" data-toggle="tab" href="#register">Register</a></li>
  </ul>
  <div class="tab-content">
    <div id="login" class="tab-pane fade in active">
    <form id="loginForm" name="loginForm" method="post">
      <p class="formHeader">Username   <span class="glyphicon glyphicon-user icon" aria-hidden="true"></span></p> 
      <input type="text" name="username" class="fields" id="passwordFeild">
      <p class="formHeader">Password</p>
      <input type="password" name="password" class="fields" id="userNameFeild">
      <input type="submit" value="Click To Login" class="submitButton" id="submitButtonLog" class="btn btn-default">
    </form>
  </div>
  <div id="register" class="tab-pane fade">
   <form id="loginForm" name="registerForm" method="post">
    <p class="formHeader">Username   <span class="glyphicon glyphicon-user icon" aria-hidden="true"></span></p> 
    <input type="text" name="username" class="fields" id="userNameFeildReg">
    <p class="formHeader">Password</p>
    <input type="password" name="password" class="fields" id="passwordFeildReg">
    <p class="formHeader">Confirm Password</p>
    <input type="password" name="password" class="fields" id="passwordFeildConfirmReg">
    <input type="submit" value="Click To Register" class="submitButton" id="submitButtonReg" class="btn btn-default">
   </form>
  </div>
  </div>
 </div>
 <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert"></div>   
</body>
</html>