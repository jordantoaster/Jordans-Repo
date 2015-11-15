/**
 * 
 */

var darwin = darwin || {};

darwin.commitVisualiser = (function() {
	return {
		draw : function(dates, values, xAxis, title, iterateNum) {
			
			var data = new google.visualization.DataTable();			
			data.addColumn('string', xAxis)

    	    for(var i=0;i<values.length;i++){
    	    	data.addColumn('number', '');	
    	    }
		
	    	for(var j =0;j < iterateNum-1;j++){
    	    	if(values.length == 2){
        	    	data.addRow(["month" + j, values[0][j],values[1][j]]);
    	    	} else if(values.length == 3){
        	    	data.addRow(["month" + j, values[0][j],values[1][j],values[2][j]]);
    	    	}else if(values.length == 4){
        	    	data.addRow(["month" + j, values[0][j],values[1][j],values[2][j],values[3][j]]);
  	    		}else if(values.length == 5){
        	    	data.addRow(["month" + j, values[0][j],values[1][j],values[2][j],values[3][j],values[4][j]]);
	    		}else {
        	    	data.addRow(["month: " + j, values[0][j]]);
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

			// Create and draw the visualization.
			new google.visualization.AreaChart(document
					.getElementById('commitChart')).draw(data, options);
		}
	};
})();
