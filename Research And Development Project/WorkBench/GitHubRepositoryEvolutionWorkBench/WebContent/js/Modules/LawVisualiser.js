
var darwin = darwin || {};

darwin.lawVisualiser = (function() {
    return {

    	drawLawOne : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockOneTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
    	
    	drawLawFive : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockFiveTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
    	
    	drawLawSix : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockSixTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
    	
    	drawLawSeven : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockSevenTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
		
    };
})();