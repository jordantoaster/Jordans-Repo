/**
 * Consistently used JS code
 */

$(document).ready(function(){
     $('#navBar').load('http://localhost:8080/MyAwesomeApp/html/HeaderTemplate.html');
     
     var qd = {};
     location.search.substr(1).split("&").forEach(function(item) {var k = item.split("=")[0], v = item.split("=")[1]; v = v && decodeURIComponent(v); (k in qd) ? qd[k].push(v) : qd[k] = [v]})

     //get uid
     var uid = qd["id"][0]
     
     $(document.body).on('click', '#profileLink' ,function(){
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/UserProfile.jsp" + '?id=' + uid;
     });
     
     $(document.body).on('click', '#marketplaceLink' ,function(){
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/Marketplace.jsp" + '?id=' +uid;
     });     
}); 
