/**
 * 
 */

var darwin = darwin || {};

darwin.progressbarModule = (function() {
	var intervalSize = 50;
	darwin.loadProgress = 0;
	
    return {
    	updateProgressBar: function () {
    		$('.progress-bar').css('width', darwin.loadProgress+'%').attr('aria-valuenow', darwin.loadProgress);    
    		
    		if(darwin.loadProgress == 100){
    			//do something - visual - unblock tabs
    		}
        }
    };
})();