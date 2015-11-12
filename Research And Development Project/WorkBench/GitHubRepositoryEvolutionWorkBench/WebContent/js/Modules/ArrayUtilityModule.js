/**
 * 
 */

var darwin = darwin || {};

darwin.arrayUtilityModule = (function() {
	
    return {
    	getSmallestArray: function (json) {
    		return json.reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity}).length;
        }
    };
})();