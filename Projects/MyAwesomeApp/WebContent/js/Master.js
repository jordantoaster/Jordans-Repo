/**
 * Consistently used JS code
 */

$(document).ready(function(){
    
     $('#navBar').load('http://localhost:8080/MyAwesomeApp/html/HeaderTemplate.html');
     
     var paramsLink;
     var uidParam;
     
     $(document.body).on('click', '#profileLink' ,function(){
         //get uid     
         paramsLink = getParams();
         uidParam = paramsLink["id"][0]
         
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/UserProfile.jsp" + '?id=' + uidParam;
     });
     
     $(document.body).on('click', '#marketplaceLink' ,function(){
         //get uid     
         paramsLink = getParams();
         uidParam = paramsLink["id"][0]
         
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/Marketplace.jsp" + '?id=' +uidParam;
     });    
     
     $(document.body).on('click', '#logoutLink' ,function(){
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/Login.jsp";
     });
     
     //checks user has entered data then redirects with query strings
     $(document.body).on('click', '#submitSearch' ,function(e){
		 e.preventDefault();

         paramsLink = getParams();
         uidParam = paramsLink["id"][0]
    	 var searchData = $("#searchBox").val()
    	 
    	 if(searchData != undefined && searchData != ""){
    		 window.location = "http://localhost:8080/MyAwesomeApp/jsp/SearchResult.jsp" + '?id=' +uidParam+ '&sinput=' + searchData;
    	 } else {
             $('#ajaxGetUserServletResponse').text('Enter Some Data');
           	 $("#ajaxGetUserServletResponse").css({"opacity":"1"});
    	 }
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
