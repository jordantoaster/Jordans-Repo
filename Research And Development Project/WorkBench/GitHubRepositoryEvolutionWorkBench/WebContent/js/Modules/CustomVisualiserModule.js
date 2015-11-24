/**
 * 
 */

var darwin = darwin || {};

darwin.customVisualiser = (function() {
	return {
		draw : function(values, xAxis, title) {
			
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();  
    	    
    	    //add column to represent time passing
    	    data.addColumn('string', xAxis)
    	       
    	    //add a new column for each input project
    	    for(var i=0;i<values.length;i++){
    	    	data.addColumn('number', '');	
    	    }
    	    
    		var iterationCount = darwin.Mediator.getSmallestArray(values);
    	    
    	    //add data to each row, a a numeral for the y axis and string for x
	    	for(var j =0;j<iterationCount;j++){
    	    	if(values.length == 2){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j]]);
    	    	} else if(values.length == 3){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j],values[2][j]]);
    	    	}else if(values.length == 4){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j],values[2][j],values[3][j]]);
  	    		}else if(values.length == 5){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j],values[2][j],values[3][j],values[4][j]]);
	    		}else {
        	    	data.addRow(["sample: " + j,values[0][j]]);
    	    	}
	    	}
    	    	
	    	//populate additional options
    	    var options = {
    	      title: title,
    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      legend: {position: 'top'},
    	      height: 500,
    	      width: 1450,
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };
    	        
    	    new google.visualization.LineChart(document.getElementById('customChart')).draw(data, options);
    	        	
    		darwin.Mediator.resetCustomProcess();

			console.log("done done done");
		}
	};
})();
