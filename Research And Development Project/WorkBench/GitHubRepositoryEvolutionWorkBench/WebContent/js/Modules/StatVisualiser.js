/**
 * 
 */

var darwin = darwin || {};

darwin.statVisualiser = (function() {
    return {
    	drawMean : function(values, projectNames, metricType, collatedMean, standardDev){
    		
    		var height = 550;
    		var width = 0;
    		
    		if(metricType == "mean"){
    			width = 700;
    		}
    		if(metricType == "correlation"){
    			width = 1450;
    		}

    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    
    	    valuesPresent = [];
			valCounter = 0;
			
			//add column to represent time passing
    	    data.addColumn('string', 'Projects')
    	    data.addColumn('number', 'Value');	
    	    data.addColumn({type: 'string', role: 'annotation'});
			
			for(var i =0;i<values.length;i++){
				if(values[i] != ""){
					valuesPresent[valCounter] = values[i];
					valCounter++;
				}
			}
    	        	   	    
    	    //add data to each row, a a numeral for the y axis and string for x
	    	for(var j =0;j<valuesPresent.length;j++){
        	    data.addRow([projectNames[j],valuesPresent[j], projectNames[j]]);
	    	}
	    	
	    	//var view = new google.visualization.DataView(data);
	    	//data.setColumns([0, 1, 1, 2]);
    	    	
	    	//populate additional options
    	    var options = {
    	      title: "",
    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      legend: {position: 'none'},
    	      height: height,
    	      width: width,
			  curveType: 'function',
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };
    	        
    	    //show new side info
    	    $("#additionalMean").css({"visibility":"visible"});
    	    $("#collatedMean").text("collated mean on the system " + collatedMean);
    	    $("#meanSd").text("standard deviation of these means " + standardDev);

    	    new google.visualization.BarChart(document.getElementById('meanChart')).draw(data, options);

    	},
		writeCorrelations : function(correlation, projects){
		     $('#pearsonCorr').text('Pearons Correlation - for ' + projects[0] + ' and ' + projects[1] + ' is ' + correlation);

		}
    };
})();