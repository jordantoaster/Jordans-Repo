<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Book Information</title>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> 
  <script src="http://localhost:8080/MyAwesomeApp/js/Master.js"></script> 
  <script src="http://localhost:8080/MyAwesomeApp/js/BookInformation.js"></script> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link href="http://localhost:8080/MyAwesomeApp/css/Master.css" rel="stylesheet" type="text/css" /> 
  <link href="http://localhost:8080/MyAwesomeApp/css/BookInformation.css" rel="stylesheet" type="text/css" /> 
</head>
<body>
  <div id="navBar"></div>
  <div id="containerImage">
	<div id="bookImage"></div>
  </div>
  <div id="containerDetails">
    <h2 class="headers">Book Name</h2>
    <p id="bookNameFeild" class="textbox"></p>
    <h2 class="headers">Book Price</h2>
    <p id="bookPriceFeild" class="textbox"></p>
    <h2 class="headers">Book Owner</h2>
    <p id="owner" class="textbox"></p>
    <h2 class="headers">For Sale</h2>
    <p id="forSale" class="textbox"></p>
  </div>
  <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert"></div>
</body>
</html>