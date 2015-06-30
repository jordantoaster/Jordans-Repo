<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Sell Books</title>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> 
  <script src="http://localhost:8080/MyAwesomeApp/js/Master.js"></script> 
  <script src="http://localhost:8080/MyAwesomeApp/js/Marketplace.js"></script> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link href="http://localhost:8080/MyAwesomeApp/css/Master.css" rel="stylesheet" type="text/css" /> 
  <link href="http://localhost:8080/MyAwesomeApp/css/Marketplace.css" rel="stylesheet" type="text/css" /> 
</head>
<body>
 <div id="navBar"></div>
</body>
 <div id="userBooksSell" class="containerBooks">
  <h2 id="sellHeader">Sell Books</h2>
  <select id="booksBoxSell" class="bookSelect" multiple="multiple"></select>
  <button id="sellButton" class="bookButton">Put On Sell List?</button>
 </div>
 <div id="userBooksBuy" class="containerBooks">
  <h2 id="BuyHeader">Buy Books</h2>
  <select id="booksBoxBuy" class="bookSelect" multiple="multiple"></select>
  <button id="buyButton" class="bookButton">Buy?</button>
 </div>
 <div id="ajaxGetUserServletResponse" class="alert alert-success" role="alert"></div>
</html>