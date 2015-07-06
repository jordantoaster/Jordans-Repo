/**
 * Handles client side logic for the info page
 */

$(document).ready(function(){
	
	//extracts the book id and uid
    var query = location.search;
    var res = query.replace('?id=', '');
    
    //great stack overflow solution
    //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/21152762#21152762
    var qd = {};
    location.search.substr(1).split("&").forEach(function(item) {var k = item.split("=")[0], v = item.split("=")[1]; v = v && decodeURIComponent(v); (k in qd) ? qd[k].push(v) : qd[k] = [v]})

    //get uid
    var uid = qd["id"][0]
    	
    fetchBookInfo(qd);
    
    function fetchBookInfo(params){
    	$.ajax({
 	       type : 'get',
 	       url : 'http://localhost:8080/MyAwesomeApp/BookInformationServlet',
 	       dataType: 'JSON',
 	       data : {input : qd["bookid"][0]} ,
 	            success : function(response) {
 	            	
 	            //parse json feedback
 	            if(response != ""){
 	            	response = JSON.parse(response);
 	            	
 	            	//add image
            		str = response[0]["bookId"].replace(/\s+/g, '');
            		var img = $('<img id='+str+' class="books">'); 
            		img.attr('src', response[0]["bookImage"]);
            		img.appendTo('#bookImage');
            		
            		//add details
            	     $('#bookNameFeild').text(response[0]["bookName"])
            	     $('#bookPriceFeild').text(response[0]["bookPrice"])
            	     $('#owner').text(response[0]["username"])
            	     $('#forSale').text(response[0]["forSale"])
 	            	
 	            }
 	                           
 	            },
 	            error: function() {
 	                $('#ajaxGetUserServletResponse').text('An error occurred');
	          	    $("#ajaxGetUserServletResponse").css({"opacity":"1"});
 	             }
 	      });
    }

}); 