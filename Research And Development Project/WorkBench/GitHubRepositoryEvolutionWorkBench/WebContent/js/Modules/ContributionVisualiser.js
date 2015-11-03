/**
 * 
 */

var darwin = darwin || {};

darwin.ContributionVisualiser = (function () {
    return {
    	draw: function (dates, values, xAxis, chartTitle, valuesTwo) {
    		
    		//darwin.currentContributionData = values;
    	    
    	    var data = new google.visualization.DataTable();   
    	    data.addColumn('string', xAxis)
    	    data.addColumn('number', '')
    	    
    	    if(darwin.projectManagerModule.getComparison()){
    	    	 data.addColumn('number', '');
    	    }
    	    
    	    
    	    for(var i =0; i<values.length; i++){
    	    	if(darwin.projectManagerModule.getComparison()){
        	    	data.addRow(["First n amount of years", values[i], valuesTwo[i]]);
    	    	} else {
        	    	data.addRow([dates[i].getMonth()+1  + "-" + dates[i].getFullYear(), values[i]]);
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