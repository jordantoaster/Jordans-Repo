/**
 * @author Jordan McDonald
 *
 * Description - handles the ui redraw for each law - populating tables, graphs, lists etc.
 */

var darwin = darwin || {};

darwin.lawVisualiser = (function() {
    return {

    	drawLawOne : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockOneTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
    	
    	drawLawTwo : function(pos, neg){
    		
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    	
			//add column to represent time passing
    	    data.addColumn('string', 'Percentage')
    	    data.addColumn('number', 'Amount');	
    	        	   	    
    	    //add data to each row, a a numeral for the y axis and string for x
        	data.addRow(['number of positive growth',Math.round(pos)]);
        	data.addRow(['number of negative growth',Math.round(neg)]);
	    	    	
	    	//populate additional options
    	    var options = {
    	      title: '',
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      legend: {position: 'none'},
    	      height: '100%',
    	      width: '70%',
			  curveType: 'function',
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };

    	    new google.visualization.ColumnChart(document.getElementById('lawTwoChart')).draw(data, options);
    	},
    	
    	drawLawThree : function(additions, deletions, issues){    		
    		$("#blockThreeTable").append("<tr><td>" + additions + "</td><td>" + deletions + "</td><td>" + issues + "</td></tr>");
    	},
    	
    	drawLawFour : function(variance, sd){
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    	
			//add column to represent time passing
    	    data.addColumn('string', 'project')
    	    data.addColumn('number', 'percentage');	
    	        	   	    
    	       
    	    for(var i=0;i<variance.length;i++){
            	data.addRow([String(i),Math.round(variance[i])]);
    	    }
    	    	
	    	//populate additional options
    	    var options = {
    	      title: 'Variance of each projects growth rate LOC',
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      vAxis: {
    	          scaleType: 'log'
    	    },
    	      legend: {position: 'none'},
    	      height: '600px',
    	      width: '70%',
			  curveType: 'function',
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };

    	    new google.visualization.ScatterChart(document.getElementById('chartFourLeft')).draw(data, options);
    	    
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    	
			//add column to represent time passing
    	    data.addColumn('string', 'Percentage')
    	    data.addColumn('number', 'Amount');	
    	        	   	    
    	    for(var i=0;i<variance.length;i++){
            	data.addRow([String(i),Math.round(sd[i])]);
    	    }
	    	    	
	    	//populate additional options
    	    var options = {
    	      title: '% of growth rate values in one standard deviation for each project',
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      legend: {position: 'none'},
    	      height: '600px',
    	      width: '70%',
			  curveType: 'function',
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };

    	    new google.visualization.ScatterChart(document.getElementById('chartFourRight')).draw(data, options);
    	},
    	
    	drawLawFive : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockFiveTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
    	
    	drawLawSix : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockSixTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
    	
    	drawLawSeven : function(data){
    		
    		var lags = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    		

    		for (var i = 0; i < data.length; i += 1) {
    		    $("#blockSevenTable").append("<tr><td>" + lags[i] + "</td><td>" + data[i] + "</td></tr>");
    		}
    	},
		
    };
})();