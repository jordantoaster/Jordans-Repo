<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
  <title>Login</title>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <script src="http://localhost:8080/MyAwesomeApp/js/Login.js"></script>
  <link href="http://localhost:8080/MyAwesomeApp/css/LoginScreen.css" rel="stylesheet" type="text/css" />
 </head>
 <body>
  <div id="tabContainer">
  <ul class="nav nav-tabs tabListCustom">
    <li class="active"><a class="tabText" data-toggle="tab" href="#login">Login</a></li>
    <li><a class="tabText" data-toggle="tab" href="#register">Register</a></li>
  </ul>
  <div class="tab-content">
    <div id="login" class="tab-pane fade in active">
     <div id="container">
      <form id="loginForm" method="post" name="loginForm">
       <div class="form-group">
        <label for="userNameFeild">User Name:</label>
        <input type="text" name="user" id="userNameFeild" class="form-control">
       </div>
       <div class="form-group">
        <label for="passwordFeild">Password:</label>
        <input type="password" id="passwordFeild" name="pwd" class="form-control">
       </div>
       <input type="submit" value="Login" id="submitButton" class="btn btn-default">
      </form>
     <div id="ajaxGetUserServletResponse"></div>
     </div>   
    </div>
    <div id="register" class="tab-pane fade">
      <p>Registration form</p>
    </div>
  </div>
  </div>
 </body>
</html>