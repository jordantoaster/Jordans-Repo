/**
 * 
 */

var darwin = darwin || {};

darwin.genericVisualiser = (function() {
	return {
		draw : function(values, xAxis, title, sampleIndex, action, chartType, projectNames) {
			
			//get smallest array iterate Num Here
			//based on smallest sample index for each project			
			iterateNum =  darwin.arrayUtilityModule.getSmallestGenericArray(values, sampleIndex);
			valuesPresent = [];
			valCounter = 0;
			
			for(var i =0;i<values.length;i++){
				if(values[i] != undefined){
					valuesPresent[valCounter] = values[i];
					valCounter++;
				}
			}
			
			var data = new google.visualization.DataTable();			
			data.addColumn('string', xAxis)

    	    for(var i=0;i<valuesPresent.length;i++){
    	    	data.addColumn('number', projectNames[i]);	
    	    }
		
	    	for(var j =0;j < iterateNum;j++){
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

			var options = {
				title : title,
	    	      hAxis: { slantedText:true, slantedTextAngle:45 , title:'sample', textStyle: {fontSize: 11}}, 
	    	      vAxis: {
	    	          title: 'amount',
	    	          textStyle: {fontSize: 11}
	    	        },
				chartArea : {
					left : 100,
					width : '85%'
				},
	    	    legend: {textStyle: {fontSize: 11}}, 
				height : 600,
				width : 1450,
				animation : {
					duration : 800,
					easing : 'out',
					startup : true,
				}
			};
			
			if(action == "commit"){
				darwin.genericVisualiser.drawChart("commitChart", chartType, data, options);
			}    
			if(action == "star"){
				darwin.genericVisualiser.drawChart("starChart", chartType, data, options);
			}
			if(action == "fork"){
				darwin.genericVisualiser.drawChart("ForkChart", chartType, data, options);
			}
			if(action == "tags"){
				darwin.genericVisualiser.drawChart("TagsChart", chartType, data, options);
			}
			if(action == "Issues"){
				darwin.genericVisualiser.drawChart("IssuesChart", chartType, data, options);
			}
		},
		drawChart : function(id, chartType, data, options){
    	    // Create and draw the visualization - change depending on type of chart
    	    if(chartType == "LineChart"){
    	        new google.visualization.LineChart(document.getElementById(id)).draw(data, options);
    	    } else if (chartType == "SteppedAreaChart") {
    	    	new google.visualization.SteppedAreaChart(document.getElementById(id)).draw(data, options);
    	    } else if (chartType == "ScatterChart") {
    	    	new google.visualization.ScatterChart(document.getElementById(id)).draw(data, options);
    	    }
		},

	};
})();
