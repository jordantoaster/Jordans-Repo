<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
  <title>Login</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <script src="http://localhost:8080/MyAwesomeApp/js/Login.js"></script>
  <link href="http://localhost:8080/MyAwesomeApp/css/LoginScreen.css" rel="stylesheet" type="text/css" />
 </head>
 <body>
  <div id="container">
  <form id="loginForm" method="post" name="loginForm">
   Username: <input type="text" name="user" id="userNameFeild">
   <br>
   Password: <input type="password" id="passwordFeild" name="pwd">
   <br>
   <input type="submit" value="Login" id="submitButton">
  </form>
  <div id="ajaxGetUserServletResponse"></div>
  </div>
  <br>
 </body>
</html>