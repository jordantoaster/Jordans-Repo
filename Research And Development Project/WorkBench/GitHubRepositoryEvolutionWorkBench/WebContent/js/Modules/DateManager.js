/**
 * @author Jordan McDonald
 *
 * Description - handles date related logic - in this case converting a date object to a string
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