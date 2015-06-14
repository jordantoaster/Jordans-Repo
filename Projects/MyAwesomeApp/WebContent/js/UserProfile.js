/**
 * handles JS for the user profile page
 */
$(document).ready(function() {

$('#fundsButton').click(function(e) {
    	
    //prevents the submit redirect firing
    e.preventDefault();
    
    var query = location.search;
    var res = query.replace('?id=', '');
    
	//creates an object containing the feilds details
	var obj = new Object();
	obj.amount = $("#fundsFeild").val();
	obj.user = res;
	
	//sends the object as a json string, retrieves a json object and performs actions based on input
    $.ajax({
    	type : 'post',
        url : 'http://localhost:8080/MyAwesomeApp/ProfileServlet',
        data : { 
            	loadProds: 1,
            	input: JSON.stringify(obj)
               },
        dataType: 'JSON',
        success : function(response) {
          	 $('#ajaxGetUserServletResponse').text(response["feedback"]);
          	 $("#ajaxGetUserServletResponse").css({"opacity":"1"});
        },
        error: function() {
            $('#ajaxGetUserServletResponse').text('An error occurred');
         }
    });
});
});
   