/**
 * 
 */

/**
 * 
 */

var darwin = darwin || {};

darwin.copyObjectModule = (function() {

	
    return {
    	copyObject: function (obj) {
    		
    		var copy = [];
    		
    		//to get by pass by reference copy all properties over
    		for(var idx =0;idx<obj.length;idx++){
    			copy[idx] = obj[idx];	
    		}
    		
    		return copy;

        }
    };
})();

