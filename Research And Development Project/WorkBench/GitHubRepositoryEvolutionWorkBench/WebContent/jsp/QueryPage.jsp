<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/QueryPage.js?v1"></script>
    <script src="http://localhost:8080/GitHubRepositoryEvolutionWorkBench/js/Master.js?v1"></script>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Main Application</title>
  </head>
  <body>
    <p>${message}</p>
    <form name="QueryApi">
      <input id="urlName" type="text" name="urlName">
      <input id="urlOwner" type="text" name="urlOwner">
   	  <input id="urlButton" type="submit" class="btn btn-default">
    </form>
    </body>
  </html>