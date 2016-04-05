/**
 * @author Jordan McDonald
 *
 * Description - to bypass pass by reference in the JS language by copying objects this module becomes useful
 */

var darwin = darwin || {};

darwin.copyObjectModule = (function() {

    return {
    	copyObject: function (obj) {
    		
    		var copy = [];
    		
    		for(var idx =0;idx<obj.length;idx++){
    			copy[idx] = obj[idx];	
    		}
    		
    		return copy;

        }
    };
})();

