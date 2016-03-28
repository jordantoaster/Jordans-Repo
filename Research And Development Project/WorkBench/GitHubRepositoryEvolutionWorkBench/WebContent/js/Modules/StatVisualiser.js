/**
 * 
 */

var darwin = darwin || {};

darwin.statVisualiser = (function() {
    return {
    	drawMean : function(values, projectNames, metricType, collatedMean, standardDev, means, medians, collatedMedian){

    	        
    	    //show new side info
    	    for(var i =0;i<projectNames.length;i++){
        		$("#dispersionTable").append("<tr><td>" + projectNames[i] + "</td><td>" + means[i] + "</td><td>" + medians[i] + "</td><td>" + collatedMean + "</td><td>" + collatedMedian + "</td><td>" + standardDev + "</td></tr>");
    	     }   	    
    
    	},
    	drawGrowth : function(growthRate, projectNames, metricType, absolute, overTime){ 
      		
    		var values =[];
    		for(var i=0; i<growthRate.length;i++){	
    			values[i] = growthRate[i].replace('[', '');
    			values[i] = values[i].replace(']', '');
    			values[i] = values[i].replace(' ', '');
        		values[i] = values[i].split(",");
        		
        		for(var k=0;k<values[i].length;k++){
        			
        			values[i][k] = values[i][k].replace(' ', '');
        			
        			if(values[i][k] ==""){
        				values[i][k] = "0.0";
        			}
        		}
    		}

    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
			
			//add column to represent time passing
    	    data.addColumn('string', 'Projects')
    	    
    	    //add a new column for each input project
    	    for(var i=0;i<values.length;i++){
    	    	data.addColumn('number', projectNames[i]);	
    	    }
	    	
			// gets the shortest array in the set of json project data
    	    iterationCount =  darwin.arrayUtilityModule.getSmallestArray(values);
	    	
	    	for(var j =1;j<iterationCount;j++){
    	    	if(values.length == 2){
        	    	data.addRow(["" + j,  parseInt(values[0][j]), parseInt(values[1][j])]);
    	    	} else if(values.length == 3){
        	    	data.addRow(["" + j,  parseInt(values[0][j]), parseInt(values[1][j]), parseInt(values[2][j])]);
    	    	}else if(values.length == 4){
        	    	data.addRow(["" + j,  parseInt(values[0][j]), parseInt(values[1][j]), parseInt(values[2][j]), parseInt(values[3][j])]);
  	    		}else if(values.length == 5){
        	    	data.addRow(["" + j,  parseInt(values[0][j]), parseInt(values[1][j]), parseInt(values[2][j]), parseInt(values[3][j]), parseInt(values[4][j])]);
	    		}else {
        	    	data.addRow(["" + j, parseInt(values[0][j])]);
    	    	}
	    	}
    	    	
	    	//populate additional options
    	    var options = {
    	      title: "",
    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
    	      chartArea:{
    	          left: 50, width: '95%', top:10, height:'95%'
    	      },
    	      legend: {position: 'none'},
    	      height: '100%',
    	      width: '100%',
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
		writeNormality : function(normality, projects, type, all){
			
			var normality = normality.split(',');
			var all = all.split(',');
			var counter = 0;
    		
    		for(var i=0; i<normality.length;i++){
    			normality[i] = normality[i].replace('[', '');
    			normality[i] = normality[i].replace(']', '');
    		}
    		
    		for(var i=0; i<all.length;i++){
    			all[i] = all[i].replace('[', '');
    			all[i] = all[i].replace(']', '');
    		}

    	    //show new side info
    	    for(var i =0;i<projectNames.length;i++){
        		$("#normalityTable").append("<tr><td>" + projectNames[i] + "</td><td>" + normality[i+1] + "</td><td>" + normality[i+2] + "</td></tr>");
    	     }   	
			 
				//create data element for the chart
	    	    var data = new google.visualization.DataTable();   
				
				//add column to represent time passing
	    	    data.addColumn('number', 'Normality')
	    	    data.addColumn('number', 'Value');	
	    	        	   	    
	    	    //add data to each row, a a numeral for the y axis and string for x
		    	for(var j =0;j<all.length;j++){
	        	    data.addRow([j,Number(all[j])]);
		    	}
	    	    	
		    	//populate additional options
	    	    var options = {
	    	      title: "All  Shapiro wilks for this metric",
	    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
	    	      chartArea:{
	    	          left: 100, width: '90%'
	    	      },
	    	      legend: {position: 'none'},
	    	      height: '50%',
	    	      width: '100%',
				  curveType: 'function',
	    	      animation:{
	    	          duration: 800,
	    	          easing: 'out',
	    	          startup: true,
	    	        }
	    	    };
	    	        
	    	    new google.visualization.ScatterChart(document.getElementById('normalityChart')).draw(data, options);			 

		},		
		writeVariance : function(variance, projects,type, allVar){
			
			var variance = variance.split(',');
			var allVar = allVar.split(',');

			var counter = 0;
    		
    		for(var i=0; i<variance.length;i++){
    			variance[i] = variance[i].replace('[', '');
    			variance[i] = variance[i].replace(']', '');
    		}
    		
    		for(var i=0; i<allVar.length;i++){
    			allVar[i] = allVar[i].replace('[', '');
    			allVar[i] = allVar[i].replace(']', '');
    		}

    	    //show new side info
    	    for(var i =0;i<projectNames.length;i++){
        		$("#varianceTable").append("<tr><td>" + projectNames[i] + "</td><td>" + variance[i] + "</td></tr>");
    	     }  
			 
				//create data element for the chart
	    	    var data = new google.visualization.DataTable();   
				
				//add column to represent time passing
	    	    data.addColumn('number', 'Variance')
	    	    data.addColumn('number', 'Value');	
	    	        	   	    
	    	    //add data to each row, a a numeral for the y axis and string for x
		    	for(var j =0;j<allVar.length;j++){
	        	    data.addRow([j,Number(allVar[j])]);
		    	}
	    	    	
		    	//populate additional options
	    	    var options = {
	    	      title: "All variance values for this metric",
	    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
	    	      chartArea:{
	    	          left: 100, width: '90%'
	    	      },
	    	      legend: {position: 'none'},
	    	      vAxis: {
	    	            logScale: true
	    	        },
	    	      height: '40%',
	    	      width: '95%',
				  curveType: 'function',
	    	      animation:{
	    	          duration: 800,
	    	          easing: 'out',
	    	          startup: true,
	    	        }
	    	    };
	    	        
	    	    new google.visualization.ScatterChart(document.getElementById('varianceChart')).draw(data, options);				 

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