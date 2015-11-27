/**
 * 
 */

var darwin = darwin || {};

darwin.customVisualiser = (function() {
	return {
		// commit data is indepedent from contributions, so it may come through bigger
		//iteration count restricts it well. 
		draw : function(values, xAxis, title, sampleIndex) {
			
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();  
    	    
    	    //add column to represent time passing
    	    data.addColumn('string', xAxis)
    	       
    	    //add a new column for each input project
    	    for(var i=0;i<values.length;i++){
    	    	data.addColumn('number', '');	
    	    }
    	    
    	    iterationCount =  darwin.arrayUtilityModule.getSmallestCommitArray(values, sampleIndex);
    	    
    	    //add data to each row, a a numeral for the y axis and string for x
	    	for(var j =0;j<iterationCount;j++){
    	    	if(values.length == 2){
        	    	data.addRow(["sample: " + j, values[0][sampleIndex][j],values[1][sampleIndex][j]]);
    	    	} else if(values.length == 3){
        	    	data.addRow(["sample: " + j, values[0][sampleIndex][j],values[1][sampleIndex][j],values[2][sampleIndex][j]]);
    	    	}else if(values.length == 4){
        	    	data.addRow(["sample: " + j, values[0][sampleIndex][j],values[1][sampleIndex][j],values[2][sampleIndex][j],values[3][sampleIndex][j]]);
  	    		}else if(values.length == 5){
        	    	data.addRow(["sample: " + j, values[0][sampleIndex][j],values[1][sampleIndex][j],values[2][sampleIndex][j],values[3][sampleIndex][j],values[4][sampleIndex][j]]);
	    		}else {
        	    	data.addRow(["sample: " + j,values[0][sampleIndex][j]]);
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
    		darwin.Mediator.setCurrentCustomSearch(true);

			console.log("done done done");
		}
	};
})();
