/**
 * 
 */

var darwin = darwin || {};

darwin.genericVisualiser = (function() {
	return {
		draw : function(values, xAxis, title, sampleIndex, action) {
			
			//get smallest array iterate Num Here
			//based on smallest sample index for each project			
			iterateNum =  darwin.arrayUtilityModule.getSmallestGenericArray(values, sampleIndex);
			
			var data = new google.visualization.DataTable();			
			data.addColumn('string', xAxis)

    	    for(var i=0;i<values.length;i++){
    	    	data.addColumn('number', '');	
    	    }
		
	    	for(var j =0;j < iterateNum;j++){
    	    	if(values.length == 2){
        	    	data.addRow(["sample" + j, values[0][sampleIndex][j],values[1][sampleIndex][j]]);
    	    	} else if(values.length == 3){
        	    	data.addRow(["sample" + j, values[0][sampleIndex][j],values[1][sampleIndex][j],values[2][sampleIndex][j]]);
    	    	}else if(values.length == 4){
        	    	data.addRow(["sample" + j, values[0][sampleIndex][j],values[1][sampleIndex][j],values[2][sampleIndex][j],values[3][sampleIndex][j]]);
  	    		}else if(values.length == 5){
        	    	data.addRow(["sample" + j, values[0][sampleIndex][j],values[1][sampleIndex][j],values[2][sampleIndex][j],values[3][sampleIndex][j],values[4][sampleIndex][j]]);
	    		}else {
        	    	data.addRow(["sample: " + j, values[0][sampleIndex][j]]);
    	    	}
	    	}

			var options = {
				title : title,
				hAxis : {
					slantedText : true,
					slantedTextAngle : 45
				},
				chartArea : {
					left : 100,
					width : '95%'
				},
				legend : {
					position : 'top'
				},
				height : 550,
				width : 1450,
				animation : {
					duration : 800,
					easing : 'out',
					startup : true,
				}
			};
			
			if(action == "commit"){
				// Create and draw the visualization.
				new google.visualization.AreaChart(document
						.getElementById('commitChart')).draw(data, options);
			}    
			if(action == "star"){
				// Create and draw the visualization.
				new google.visualization.AreaChart(document
						.getElementById('starChart')).draw(data, options);
			}
		}
	};
})();
