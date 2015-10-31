/**
 * 
 */

var darwin = darwin || {};

darwin.loadGraphModule = (function () {
    return {
    	load: function () {
    		//this stops chart library overriding page
    		if(google) {
    		    google.load('visualization', '1.0', {
    		        packages: ['corechart'],
    		        callback: function() {
    		        	//No call back required for my app
    		        }
    		    })
    		}
        }
    };
})();
