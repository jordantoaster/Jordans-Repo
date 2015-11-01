/**
 * 
 */

var darwin = darwin || {};

darwin.ParseUrlInputModule = (function () {
    return {
    	parse: function (url) {
    		var el = document.createElement('a');
    		el.href = url;
    		return el.pathname;
        }
    };
})();