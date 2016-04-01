/**
 * 
 */

var darwin = darwin || {};

darwin.ParseUrlInputModule = (function () {
    return {
    	parse: function (url) {
    		if(url != "" && url != undefined){
    			var el = document.createElement('a');
    			el.href = url;
    			return el.pathname;
    		} else {
    			return "";
    		}
        }
    };
})();