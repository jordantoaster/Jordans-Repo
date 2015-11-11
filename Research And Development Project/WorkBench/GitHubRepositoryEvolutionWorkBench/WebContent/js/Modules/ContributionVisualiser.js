/**
 * 
 */

var darwin = darwin || {};

darwin.ContributionVisualiser = (function () {
    return {
    	draw: function (dates, values, xAxis, chartTitle) {
    		    	    
    	    var data = new google.visualization.DataTable();   
    	    data.addColumn('string', xAxis)
    	        	            	        	    
    	    for(var i=0;i<values.length;i++){
    	    	data.addColumn('number', '');	
    	    }
    	    
	    	for(var j =0;j<values[0].length-1;j++){
    	    	if(values.length == 2){
        	    	data.addRow(["a", values[0][j],values[1][j]]);
    	    	} else if(values.length == 3){
        	    	data.addRow(["a", values[0][j],values[1][j],values[2][j]]);
    	    	}else if(values.length == 4){
        	    	data.addRow(["a", values[0][j],values[1][j],values[2][j],values[3][j]]);
  	    		}else if(values.length == 5){
        	    	data.addRow(["a", values[0][j],values[1][j],values[2][j],values[3][j],values[4][j]]);
	    		}else {
        	    	data.addRow([dates[j].getMonth()+1  + "-" + dates[j].getFullYear(), values[0][j]]);
    	    	}
	    	}
    	    	
    	    var options = {
    	      title: chartTitle,
    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      legend: {position: 'top'},
    	      height: 550,
    	      width: 1450,
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };
    	        
    	    // Create and draw the visualization.
    	    if(darwin.currentContrubutionAction == "LOC"){
    	        new google.visualization.SteppedAreaChart(document.getElementById('contributorChart')).draw(data, options);
    	    } else {
    	    	new google.visualization.LineChart(document.getElementById('contributorChart')).draw(data, options);
    	    }
    	    
    	    darwin.Mediator.updateProgressBar();
        },
        populateSupplementaryStats: function(LOC, totalWeeks){
        	$('#contributorTotalWeeks').text('Total Amount Of Weeks on GitHub: ' + totalWeeks);
        	$('#contributorLOC').text('Total Lines Of Code On GitHub: ' + LOC);
        }
    };
})();