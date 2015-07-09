/**
 * Consistently used JS code
 */

$(document).ready(function(){
    
     $('#navBar').load('http://localhost:8080/MyAwesomeApp/html/HeaderTemplate.html');
     
     $(document.body).on('click', '#profileLink' ,function(){
         //get uid     
         var paramsLink = getParams();
         var uidParam = paramsLink["id"][0]
         
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/UserProfile.jsp" + '?id=' + uidParam;
     });
     
     $(document.body).on('click', '#marketplaceLink' ,function(){
         //get uid     
         var paramsLink = getParams();
         var uidParam = paramsLink["id"][0]
         
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/Marketplace.jsp" + '?id=' +uidParam;
     });     
}); 

//great stack overflow solution
//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/21152762#21152762     
//I want this function to be always read to fire, to prevent reference errors, hence why outside ready function
function getParams(){
	var params = {};
    location.search.substr(1).split("&").forEach(function(item) {var k = item.split("=")[0], v = item.split("=")[1]; v = v && decodeURIComponent(v); (k in params) ? params[k].push(v) : params[k] = [v]})
    
    return params;
}
