/**
 * 
 */

var darwin = darwin || {};

darwin.statVisualiser = (function() {
    return {
    	drawMean : function(values, projectNames, metricType, collatedMean, standardDev){
    		
    		var height = 550;
    		var width = 700;

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
    	    $("#collatedMean").text("Collated mean on the system " + collatedMean);
    	    $("#meanSd").text("Standard deviation of these means " + standardDev);

    	    new google.visualization.BarChart(document.getElementById('meanChart')).draw(data, options);

    	},
    	drawGrowth : function(growthRate, projectNames, metricType, absolute, overTime){
    		
    		var height = 550;
    		var width = 1000
    		
    		//split string into array, remove spaces, remove braces
    		var values= growthRate.split(",");
    		
    		for(var i=0; i<values.length;i++){
    			values[i] = values[i].replace('[', '');
    			values[i] = values[i].replace(']', '');
    			values[i] = values[i].replace(' ', '');
    			values[i] = parseFloat(values[i]);
    		}

    	
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    
    	    valuesPresent = [];
			valCounter = 0;
			
			//add column to represent time passing
    	    data.addColumn('string', 'Projects')
    	    data.addColumn('number', 'Value');	
    	        	   	    
    	    //add data to each row, a a numeral for the y axis and string for x
	    	for(var j =0;j<values.length;j++){
        	    data.addRow([projectNames[j],values[j]]);
	    	}
    	    	
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
    	    $("#additionalgrowth").css({"visibility":"visible"});
    	    $("#growthAbsolute").text("Overall Growth " + absolute);
    	    $("#growthTime").text("average percentage growth over time " + overTime);

    	    new google.visualization.LineChart(document.getElementById('growthChart')).draw(data, options);

    	},
		writeCorrelations : function(correlations, projects){
			
			 obj = JSON.parse(correlations);
			 var parsedData = [];
			    
			 var pearson = obj.pearson;
			 var spearman = obj.spearman;
			 var pearsonP = obj.pearsonP;
			 var spearmanP = obj.spearmanP;
				
		     $('#pearsonCorr').text('Pearons Correlation - for ' + projects[0] + ' and ' + projects[1] + ' is ' + pearson + ' and P-Value: ' + pearsonP);
		     $('#spearmanCorr').text('Spearman Correlation - for ' + projects[0] + ' and ' + projects[1] + ' is ' + spearman  + ' and P-Value: ' + spearmanP); 
		     
			 $('#pearsonCorr').css('visibility', 'visible')
			 $('#spearmanCorr').css('visibility','visible')

		},
		writeNormality : function(normality, projects){
			
			var normality = normality.split(',');
			var counter = 0;
    		
    		for(var i=0; i<normality.length;i++){
    			normality[i] = normality[i].replace('[', '');
    			normality[i] = normality[i].replace(']', '');
    		}

			 for(var i = 0; i<normality.length; i = i +3){
			     $('#wilks' + counter).text('Wilks Normality - for ' + normality[i] + ' is ' + normality[i+1]  + ' and P-Value: ' + normality[i+2]); 
			     
				 $('#wilks' + counter).css('visibility','visible')
				 
				 counter++;
			 }

		},
		
		drawLaws : function(hp1, hp2, hp3, hp4, hp5, hp6){

			$('#law2').text(hp2 + "% positive average growth rate");
			
			$('#law3').text("Num of issues, additions and deletions normally distributed - " + hp3[0] + "%," + hp3[1] + "%," + hp3[2] + "%");
		
		}
		
    };
})();