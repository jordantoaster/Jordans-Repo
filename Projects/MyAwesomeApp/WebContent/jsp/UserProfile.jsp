<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Profile</title>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link href="http://localhost:8080/MyAwesomeApp/css/Dashboard.css" rel="stylesheet" type="text/css" />
  <link href="http://localhost:8080/MyAwesomeApp/css/Master.css" rel="stylesheet" type="text/css" />
  <link href="http://localhost:8080/MyAwesomeApp/css/UserProfile.css" rel="stylesheet" type="text/css" />    
  <script src="http://localhost:8080/MyAwesomeApp/js/Master.js"></script> 
</head>
<body>
<div id="navBar"></div>
     <div id="container">
      <form id="loginForm" method="post" name="loginForm">
       <div class="form-group">
        <label for="userNameFeild">Current User Name:</label>
        <input type="text" name="user" id="userNameFeild" class="form-control">
       </div>
       <div class="form-group">
        <label for="passwordFeild">Current Password:</label>
        <input type="password" id="passwordFeild" name="pwd" class="form-control">
       </div>
       <div class="form-group">
        <label for="changePasswordFeild">New Password:</label>
        <input type="password" id="changePasswordFeild" name="cpwd" class="form-control">
       </div>
      <div class="form-group">
        <label for="balanceFeild">Current Balance:</label>
        <input type="text" id="balanceFeild" name="bal" class="form-control">
       </div>
       <div class="form-group">
        <label for="bookListFeild">Current Books:</label>
        <input type="text" id="bookFeild" name="book" class="form-control">
       </div>
       <input type="submit" value="Change Details" id="changeButton" class="btn btn-default">
      </form>
     <div id="ajaxGetUserServletResponse"></div>
     </div> 
</body>
</html>