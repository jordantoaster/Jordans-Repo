var darwin = darwin || {};

darwin.commitManager = (function () {
	
	//represents a 3 month period, NOT USED 
	sampleRate = 3;
	
    return {
    	loadCommitSelection: function (projects) {
    		for(var i=0;i<projects.length;i++){
    			
    			$("#commitOptions").append('<button type="button" id="commitOption'+(i+1)+'" class="btn btn-default">'+projects[i]+'</button>');
    		}
        },
        getSampleRate : function(){
        	return sampleRate;
        },
        setSampleRate : function(val){
        	sampleRate = val;
        }
    };
})();
