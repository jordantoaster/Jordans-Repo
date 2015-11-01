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

    		  // modify month between 1 based ISO 8601 and zero based Date
    		 // dtcomps[1]--;
    		  
    		  date = [];
    		  date[0] = dtcomps[2];
    		  date[1] = dtcomps[1];
    		  date[2] = dtcomps[0]
    		  return date;
    		
    		  //var date = new Date(dtcomps[0],dtcomps[1],dtcomps[2],0,0,0,0);
    		  //return date;

    		  //var convdt = new
    		//Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));

    		  //return convdt.toUTCString();
        }
    };
})();