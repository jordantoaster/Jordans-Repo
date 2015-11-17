/**
 * 
 */

var darwin = darwin || {};

darwin.customTabModule = (function() {		

    return {
    	setupUi : function (){
    		
    		var numProjects = darwin.projectManagerModule.getNumProjects();
    		var projectNames = darwin.projectManagerModule.getProjectNames();
    		  
    		//generate project choice options
    		for(var i=0; i<numProjects;i++){
    			var option = '<li><a href="#" id="'+i+'">'+projectNames[i]+'</a></li>';
    			$("#projectOptions").append(option);
    		}
    		
        	//draw automatically generated stat check boxes
			$("#options").append('<div id="additions" class="checkbox"><label><input type="checkbox" value="">Additions</label></div>')
			$("#options").append('<div id="deletions" class="checkbox"><label><input type="checkbox" value="">Deletions</label></div>')
			$("#options").append('<div id="loc" class="checkbox"><label><input type="checkbox" value="">LOC</label></div>')

    		//find what manual details we have
    		
    		
    		//draw check boxes for manual stats
        }
    };
})();