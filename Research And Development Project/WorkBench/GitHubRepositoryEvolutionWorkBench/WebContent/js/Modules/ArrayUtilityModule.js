/**
 * @author Jordan McDonald
 *
 * Description - performs operations that relate to arrays only - getting smallest in a nested set, trimming etc
 */


var darwin = darwin || {};

darwin.arrayUtilityModule = (function() {
	
    return {
    	getSmallestArray: function (array) {
    		return array.reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity}).length;
        },
    	getSmallestGenericArray: function (array, sampleIndex) {
    		
    		var arraysToCompare = [];
    		
    		for(var i=0; i<array.length;i++){
    			if(array[i] != undefined)
    				arraysToCompare[i]  = array[i][sampleIndex];
    		}
    		
    		return darwin.arrayUtilityModule.getSmallestArray(arraysToCompare);
    	}, 
    	trimArray : function(array, difference){
    		return array.slice(0, array.length - difference);
    	}
    };
})();