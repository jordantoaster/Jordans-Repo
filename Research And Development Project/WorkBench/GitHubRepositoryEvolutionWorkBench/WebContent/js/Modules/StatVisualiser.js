/**
 * 
 */

var darwin = darwin || {};

darwin.statVisualiser = (function() {
    return {
    	drawMean : function(values){
    		
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    
    	    valuesPresent = [];
			valCounter = 0;
			
			//add column to represent time passing
    	    data.addColumn('string', 'Projects')
    	    data.addColumn('number', '');	
			
			for(var i =0;i<values.length;i++){
				if(values[i] != ""){
					valuesPresent[valCounter] = values[i];
					valCounter++;
				}
			}
    	        	   	    
    	    //add data to each row, a a numeral for the y axis and string for x
	    	for(var j =0;j<valuesPresent.length;j++){
        	    data.addRow(['',valuesPresent[j]]);
	    	}
    	    	
	    	//populate additional options
    	    var options = {
    	      title: "",
    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      legend: {position: 'top'},
    	      height: 550,
    	      width: 1450,
			  curveType: 'function',
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };
    	        
    	    new google.visualization.BarChart(document.getElementById('meanChart')).draw(data, options);

    	}
    };
})();