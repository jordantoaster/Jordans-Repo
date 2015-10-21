<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login Or Register</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Master.js"></script>
<script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/FacebookSDK.js"></script>
<script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/SplashPage.js?v2"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/SplashPage.css?v2">
<link rel="stylesheet" href="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/css/Master.css?v2">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
<body>
<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="100px" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>  <div id="status"></div>
  <img class="darwinLogo" src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/images/darwin3.png">
  <div id="tabContainer">
  <ul class="nav nav-tabs tabListCustom">
    <li class="active"><a class="tabText" data-toggle="tab" href="#login">Login</a></li>
    <li><a class="tabText" data-toggle="tab" href="#register">Register</a></li>
  </ul>
    <div class="tab-content">
    <div id="login" class="tab-pane fade in active">
       <div class="input-group input-group-lg fields">
         <span class="input-group-addon glyphicon glyphicon-user icon" id="basic-addon1"></span>
         <input type="text" class="form-control" id="userNameFeild" placeholder="Username" aria-describedby="basic-addon1">
       </div>
       <div class="input-group input-group-lg fields">
         <span class="input-group-addon glyphicon glyphicon-rub icon" id="basic-addon1"></span>
         <input type="password" class="form-control" id="passwordFeild" placeholder="Password" aria-describedby="basic-addon1">
       </div>
       <button type="submit" id="submitButtonLog" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Login To Darwin</i> 
       </button>
       <fb:login-button id="FacebookLogin" scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>      
    </div>
  <div id="register" class="tab-pane fade">
       <div class="input-group input-group-lg fields">
         <span class="input-group-addon glyphicon glyphicon-user icon" id="basic-addon1"></span>
         <input type="text" class="form-control" id="userNameFeildReg" placeholder="Username" aria-describedby="basic-addon1">
       </div>
       <div class="input-group input-group-lg fields">
         <span class="input-group-addon glyphicon glyphicon-rub icon" id="basic-addon1"></span>
         <input type="text" class="form-control" id="passwordFeildReg" placeholder="Password" aria-describedby="basic-addon1">
       </div>
       <div class="input-group input-group-lg fields">
         <span class="input-group-addon glyphicon glyphicon-rub icon" id="basic-addon1"></span>
         <input type="text" class="form-control" id="passwordFeildConfirmReg" placeholder="Password" aria-describedby="basic-addon1">
       </div>       
       <button type="submit" id="submitButtonReg" class="btn btn-primary submitButton">
  	     <i class="icon-user icon-white">Register To Darwin</i> 
       </button>
  </div>
  </div>
 </div>
 <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert"></div>   
</body>
</html>