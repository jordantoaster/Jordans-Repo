<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
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
  <script src="http://localhost:8080/MyAwesomeApp/js/UserProfile.js"></script> 
</head>
<body>
<div id="navBar"></div>
     <div id="container" class="inline">
      <form id="loginForm" method="post" name="loginForm">
       <div class="form-group">
        <label for="userNameFeild">Current User Name:</label>
        <input type="text" name="user" id="userNameFeild" class="form-control">
       </div>
       <div class="form-group">
        <label for="passwordFeild">Current Password (change if required) :</label>
        <input type="text" id="passwordFeild" name="pwd" class="form-control">
       </div>
       <div class="form-group">
        <label for="changePasswordFeild">New Password:</label>
        <input type="password" id="changePasswordFeild" name="cpwd" class="form-control">
       </div>
      <div class="form-group">
        <label for="balanceFeild">Current Balance:</label>
        <input type="text" id="balanceFeild" name="bal" class="form-control">
       </div>
       <input type="submit" value="Change Details" id="button" class="btn btn-default">
      </form>
     </div> 
     <div id="addFundsBlock" class="inline">
       <form id="fundsForm" method="post" name="loginForm">
        <div class="form-group">
         <label for="fundsFeild">Add funds here!</label>
         <input type="text" name="funds" id="fundsFeild" class="form-control">
       </div>             
        <input type="submit" value="Add Funds" id="button" class="btn btn-default">       
       </form>     
     </div>
     <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert">
      </div> 
</body>
</html>