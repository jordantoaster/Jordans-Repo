/**
 * handles JS for the user profile page
 */
$(document).ready(function() {
	  
	//extracts the uid from the url
    var query = location.search;
    var res = query.replace('?id=', '');
    
    disableFeilds();
    fetchUserData();
    
function disableFeilds(){
    $("#balanceFeild").prop('disabled', true);
}
    
//ajax used to retrieve the user details based on the param + uses a get call
function fetchUserData() {
    //load user details into the form	
    $.ajax({
       type : 'get',
       url : 'http://localhost:8080/MyAwesomeApp/ProfileServlet',
       dataType: 'JSON',
       data : {input : res} ,
            success : function(response) {
            	
            //parse json feedback
            if(response != ""){
            	response = JSON.parse(response);

            	//insert parsed data into form
            	$('#userNameFeild').val(response["uid"]);
            	$('#passwordFeild').val(response["password"]);
            	$('#balanceFeild').val(response["balance"]);
            }
                           
            },
            error: function() {
                $('#ajaxGetUserServletResponse').text('An error occurred');
             }
      });
}

//handles update funds event
$('#fundsButton').click(function(e) {
    	
    //prevents the submit redirect firing
    e.preventDefault();
    
	//creates an object containing the feilds details
	var obj = new Object();
	obj.amount = $("#fundsFeild").val();
	obj.user = res;
	obj.action = "updateFunds";
	
	sendToServer(obj, "post");
});

//handles update funds event
$('#changeButton').click(function(e) {
    	
    //prevents the submit redirect firing
    e.preventDefault();
    
	//creates an object containing the feilds details
	var obj = new Object();
	obj.uid = res;
	obj.password = $("#passwordFeild").val();
	obj.passwordValidate = $("#changePasswordFeild").val();
	obj.username = $("#userNameFeild").val();
	obj.action = "changeDetails";
	
	sendToServer(obj, "post");
});

function sendToServer(obj, httpType){
	//sends the object as a json string, retrieves a json object and performs actions based on input
    $.ajax({
    	type : httpType,
        url : 'http://localhost:8080/MyAwesomeApp/ProfileServlet',
        data : { 
            	loadProds: 1,
            	input: JSON.stringify(obj)
               },
        dataType: 'JSON',
        success : function(response) {
          	 $('#ajaxGetUserServletResponse').text(response["feedback"]);
          	 $("#ajaxGetUserServletResponse").css({"opacity":"1"});
          	 
          	 //update view
          	 fetchUserData();
        },
        error: function() {
            $('#ajaxGetUserServletResponse').text('An error occurred');
         }
    });
}

//end
});  