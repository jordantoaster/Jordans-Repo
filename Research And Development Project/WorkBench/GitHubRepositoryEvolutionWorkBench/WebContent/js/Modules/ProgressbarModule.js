/**
 * 
 */

var darwin = darwin || {};

darwin.progressbarModule = (function() {
	var intervalSize = 50;
	var adjustedWidth = 0;
	
    return {
    	updateProgressBar: function () {
    		
    		adjustedWidth = $('.progress-bar').attr('aria-valuenow');
    		adjustedWidth = parseInt(adjustedWidth) + intervalSize;

    		//get width then increment by interval size
    		$('.progress-bar').css('width', adjustedWidth+'%').attr('aria-valuenow', adjustedWidth);    
    		
    		if(adjustedWidth == 100){
    			adjustedWidth = 0;
    		}
        },
        enableTabs : function (){
        	//TODO
        }
    };
})();