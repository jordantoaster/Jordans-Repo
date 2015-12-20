/**
 * 
 */

var darwin = darwin || {};

darwin.dateManager = (function() {
    return {
    	convertDateObjectToString : function(dates){
    		var stringArray = [];
    		
    		for(i =0; i<dates.length;i++){
    			stringArray[i] = dates[i].toString();
    		}
    		return stringArray;
    	},
    };
})();