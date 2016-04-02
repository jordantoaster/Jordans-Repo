/**
 * @author Jordan McDonald
 *
 * Description - loads the google graph library
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

    		        }
    		    })
    		}
        }
    };
})();
