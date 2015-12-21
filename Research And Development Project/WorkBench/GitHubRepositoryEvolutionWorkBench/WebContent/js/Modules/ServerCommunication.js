/**
 * 
 */

var darwin = darwin || {};

darwin.serverModule = (function() {
    return {
    	sendSplash: function (action, callback, type, input) {
    		$.ajax({
    			  type : type,
    			  url : 'http://localhost:8080/GitHubRepositoryEvolutionWorkBench/Service',
    			  data : { 
    			    	action: action,
    			    	input: input,
    			  },
    			  success : function(response) {
    			    	callback(response);
    			  },
    			  error: function() {
    			    	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the Server");
    			    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
    			  }
    		});
        },
    	sendContributions: function (action,callback,type,additions, deletions, difference, LOCOverTime, contributionDates, project) {
    		$.ajax({
    			  type : type,
    			  url : 'http://localhost:8080/GitHubRepositoryEvolutionWorkBench/Service',
    			  data : { 
    			    	action: action,
    			    	additions: additions,
    			    	deletions : deletions,
    			    	LOCOverTime :LOCOverTime,
    			    	contributionDates : contributionDates,
    			    	difference : difference,
    			    	project : project
    			  },
    			  success : function(response) {
    			    	callback(response);
    			  },
    			  error: function() {
    			    	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the Server");
    			    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
    			  }
    		});
        },
        sendGeneric : function(action,subAction,callback,type,data,datesAsString, project){
    		$.ajax({
  			  type : type,
  			  url : 'http://localhost:8080/GitHubRepositoryEvolutionWorkBench/Service',
  			  data : { 
  			    	action: action,
  			    	subAction : subAction,
  			    	data: data,
  			    	dates: datesAsString,
  			    	project : project
  			  },
  			  success : function(response) {
  			    	callback(response);
  			  },
  			  error: function() {
  			    	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the Server");
  			    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
  			  }
  		});
        },
        sendStat : function(action, subAction, projectNames, data, type, callback){
    	
    		$.ajax({
    			  type : type,
    			  url : 'http://localhost:8080/GitHubRepositoryEvolutionWorkBench/Service',
    			  data : { 
    				  	action:action,
    				  	subAction:subAction,
    				  	projectNames: projectNames,
    			    	data: data
    			  },
    			  success : function(response) {
    			    	callback(response);
    			  },
    			  error: function() {
    			    	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the Server");
    			    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
    			  }
    		});
        }
    };
})();