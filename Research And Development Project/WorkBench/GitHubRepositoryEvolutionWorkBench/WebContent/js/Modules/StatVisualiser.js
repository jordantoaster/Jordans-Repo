/**
 * 
 */

var darwin = darwin || {};

darwin.statVisualiser = (function() {
    return {
    	drawMean : function(values, projectNames, metricType, collatedMean, standardDev, means, medians, collatedMedian){
    		
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
    	    for(var i =0;i<projectNames.length;i++){
    	    	$("#dispersionData").append('<li class="inlineText" style="display:list-item">The mean for ' + projectNames[i] + ' and the chosen metric is <p style="color:#666699; font-weight:bold; font-size:1.1em;display:inline;">' + means[i] + '</p></li>');
    	    	$("#dispersionData").append('<li class="inlineText" style="display:list-item">The median for ' + projectNames[i] + ' and the chosen metric is <p style="color:#666699; font-weight:bold; font-size:1.1em;display:inline;">' + medians[i] + '</p></li>');
    	    }
    	    
	    	$("#dispersionData").append('<li class="inlineText" style="display:list-item">Overall mean additions per week for this metric (mean of means) <p style="color:#666699; font-weight:bold; font-size:1.1em;display:inline;">' + collatedMean + '</p></li>');
	    	//$("#dispersionData").append('<li class="inlineText" style="display:list-item">Standard deviation of these means is <p style="color:#666699; font-weight:bold; font-size:1.3em;">' + standardDev + '</p></li>');
	    	$("#dispersionData").append('<li class="inlineText" style="display:list-item">Overall median of the means for this metric <p style="color:#666699; font-weight:bold; font-size:1.1em; display:inline;">' + collatedMedian + '</p></li>');

    	    
    	    
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
    	    $("#growthAbsolute").text("Overall Growth " + absolute + "%");
    	    $("#growthTime").text("Average percentage growth over time " + overTime + "%");

    	    new google.visualization.LineChart(document.getElementById('growthChart')).draw(data, options);

    	},
		writeCorrelations : function(correlations, projects){
			
			 obj = JSON.parse(correlations);
			 var parsedData = [];
			    
			 var pearson = obj.pearson;
			 var spearman = obj.spearman;
			 var pearsonP = obj.pearsonP;
			 var spearmanP = obj.spearmanP;
			 var cross = obj.cross;
			 var allCorr = obj.allCorr.split(',');

	    	  for(var i=0; i<allCorr.length;i++){
	    		  allCorr[i] = allCorr[i].replace('[', '');
	    		  allCorr[i] = allCorr[i].replace(']', '');
	    		}
				
		     $('#pearsonCorr').text('Pearons Correlation - for ' + projects[0] + ' and ' + projects[1] + 'metrics is ' + pearson + ' and P-Value: ' + pearsonP);
		     $('#spearmanCorr').text('Spearman Correlation - for ' + projects[0] + ' and ' + projects[1] + 'metrics is ' + spearman  + ' and P-Value: ' + spearmanP); 
		     $('#crossCorr').text('Cross correlation for a - 2 lag is : ' + cross); 

			 $('#crossCorr').css('visibility', 'visible')
			 $('#pearsonCorr').css('visibility', 'visible')
			 $('#spearmanCorr').css('visibility','visible')
			 
			//create data element for the chart
	    	    var data = new google.visualization.DataTable();   
				
				//add column to represent time passing
	    	    data.addColumn('number', 'Correlations')
	    	    data.addColumn('number', 'Value');	
	    	        	   	    
	    	    //add data to each row, a a numeral for the y axis and string for x
		    	for(var j =0;j<allCorr.length;j++){
	        	    data.addRow([j,Number(allCorr[j])]);
		    	}
	    	    	
		    	//populate additional options
	    	    var options = {
	    	      title: "Pearson correlation in the system for these two metrics",
	    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
	    	      chartArea:{
	    	          left: 100, width: '95%'
	    	      },
	    	      legend: {position: 'none'},
	    	      height: '250px',
	    	      width: '100%',
				  curveType: 'function',
	    	      animation:{
	    	          duration: 800,
	    	          easing: 'out',
	    	          startup: true,
	    	        }
	    	    };
	    	        
	    	    new google.visualization.ScatterChart(document.getElementById('correlationChart')).draw(data, options);

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
		writeVariance : function(variance, projects){
			
			var variance = variance.split(',');
			var counter = 0;
    		
    		for(var i=0; i<variance.length;i++){
    			variance[i] = variance[i].replace('[', '');
    			variance[i] = variance[i].replace(']', '');
    		}

			 for(var i = 0; i<variance.length; i = i + 1){
			     $('#variance' + counter).text('variance - for ' + projects[i] + ' is ' + variance[i]); 
			     
				 $('#variance' + counter).css('visibility','visible')
				 
				 counter++;
			 }

		},		
		drawLaws : function(hp1, hp2, hp3, hp4, hp5, hp6, hp7){
			
			$('#law1').text("Law One & Six- " + hp1 + "% of commit/stars cross correlations have a +ve correlation");

			$('#law2').text("Law Two - " + hp2 + "% positive average growth rate");
			
			$('#law3').text("Law Three - " + "Num of issues, additions and deletions normally distributed - " + hp3[0] + "%," + hp3[1] + "%," + hp3[2] + "%");
			
			$('#law4').text("Law Four - " + hp4 + " = Median Variance");
			
			$('#law5').text("Law Five - " + hp5 + "% of LOC growth rate/Issues cross correlations have a +ve correlation");
			
			$('#law6').text("Law Seven - " + hp6 + "% of issues/LOC cross correlations have a -ve correlation");
			
			$('#law7').text("Law Eight - " + hp7 + "% of issues/issue comments cross correlations have a -ve correlation");
		
		}
		
    };
})();