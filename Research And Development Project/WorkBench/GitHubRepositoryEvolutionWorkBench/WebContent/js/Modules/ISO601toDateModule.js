/**
 * @author Jordan McDonald
 *
 * Description - utility date functions
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
    		  
    		  //date = [];
    		  //date[0] = dtcomps[2];
    		  //date[1] = dtcomps[1];
    		  //date[2] = dtcomps[0]
    		 // date[3] = darwin.ISO601toDateModule.getMonthLength(date[1],date[2])

    		  var date = new Date(dtcomps[0],dtcomps[1]-1,dtcomps[2],0,0,0,0);	
    		  
    		  return date;
        },
        //lookup that gets the number of days in the month
        getMonthLength : function(numMonth, year){
        	if(numMonth == 1 || numMonth == 3  ||  numMonth == 5  || numMonth == 7  || numMonth == 8   || numMonth == 10  || numMonth == 12){
        		return 31;
        	} else if (numMonth == 4 || numMonth == 6  ||  numMonth == 9  || numMonth == 11 ){
        		return 30;
        	} else {
        		  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
        			  return 29;
        		  } else {
        			  return 28;
        		  }
        	}
        }
    };
})();