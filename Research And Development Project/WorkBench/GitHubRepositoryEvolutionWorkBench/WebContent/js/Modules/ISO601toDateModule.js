/**
 * 
 */

var darwin = darwin || {};

darwin.ISO601toDateModule = (function () {
    return {
    	convert: function (dtstr) {

    		  // replace anything but numbers by spaces
    		  dtstr = dtstr.replace(/\D/g," ");

    		  // trim any hanging white space
    		  dtstr = dtstr.replace(/\s+$/,"");

    		  // split on space
    		  var dtcomps = dtstr.split(" ");
    		  
    		  date = [];
    		  date[0] = dtcomps[2];
    		  date[1] = dtcomps[1];
    		  date[2] = dtcomps[0]
    		  return date;
        }
    };
})();