/**
 * 
 */

var darwin = darwin || {};

darwin.ContributionVisualiser = (function () {
    return {
    	draw: function (values, xAxis, chartTitle, sampleIndex, chartType, projectNames) {
    		  
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    
    	    //add column to represent time passing
    	    data.addColumn('string', xAxis)
    	    
    	    valuesPresent = [];
			valCounter = 0;
			
			for(var i =0;i<values.length;i++){
				if(values[i] != undefined){
					valuesPresent[valCounter] = values[i];
					valCounter++;
				}
			}
    	       
    	    //add a new column for each input project
    	    for(var i=0;i<valuesPresent.length;i++){
        	   // data.addColumn('string', '')
    	    	data.addColumn('number', projectNames[i]);	
    	    }
    	        	   	    
    	    //add data to each row, a a numeral for the y axis and string for x
	    	for(var j =0;j<valuesPresent[0][sampleIndex].length-1;j++){
    	    	if(valuesPresent.length == 2){
        	    	data.addRow(["" + j, valuesPresent[0][sampleIndex][j],valuesPresent[1][sampleIndex][j]]);
    	    	} else if(valuesPresent.length == 3){
        	    	data.addRow(["" + j, valuesPresent[0][sampleIndex][j],valuesPresent[1][sampleIndex][j],valuesPresent[2][sampleIndex][j]]);
    	    	}else if(valuesPresent.length == 4){
        	    	data.addRow(["" + j, valuesPresent[0][sampleIndex][j],valuesPresent[1][sampleIndex][j],valuesPresent[2][sampleIndex][j],valuesPresent[3][sampleIndex][j]]);
  	    		}else if(valuesPresent.length == 5){
        	    	data.addRow(["" + j, valuesPresent[0][sampleIndex][j],valuesPresent[1][sampleIndex][j],valuesPresent[2][sampleIndex][j],valuesPresent[3][sampleIndex][j],valuesPresent[4][sampleIndex][j]]);
	    		}else {
        	    	data.addRow(["" + j, valuesPresent[0][sampleIndex][j]]);
    	    	}
	    	}
    	    	
	    	//populate additional options
    	    var options = {
    	      title: chartTitle,
    	      hAxis: { slantedText:true, slantedTextAngle:45 , title:'sample'}, 
    	      vAxis: {
    	          title: 'amount'
    	        },
    	      chartArea:{
    	          left: 100, width: '85%'
    	      },
    	      legend: {textStyle: {fontSize: 11}}, 
    	      height: 600,
    	      width: 1450,
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };

    	    // Create and draw the visualization - change depending on type of chart
    	    if(chartType == "LineChart"){
    	        new google.visualization.LineChart(document.getElementById('contributorChart')).draw(data, options);
    	    } else if (chartType == "SteppedAreaChart") {
    	    	new google.visualization.SteppedAreaChart(document.getElementById('contributorChart')).draw(data, options);
    	    } else if (chartType == "ScatterChart") {
    	    	new google.visualization.ScatterChart(document.getElementById('contributorChart')).draw(data, options);
    	    }
    	    
    	    //update ui
    	    darwin.Mediator.updateProgressBar();
        },
        populateSupplementaryStats: function(LOC, totalWeeks){
        	$('#contributorTotalWeeks').text('Total Amount Of Weeks on GitHub: ' + totalWeeks);
        	$('#contributorLOC').text('Total Lines Of Code On GitHub: ' + LOC);
        }
    };
})();