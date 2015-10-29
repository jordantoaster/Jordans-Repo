/**
 * 
 */

//Creates new namespace if not already defined
var darwin = darwin || {};

darwin.drawContributionGraph = function(dates, values, xAxis, chartTitle){
	
	console.log(darwin.currentJson);
	
	darwin.currentContributionData = values;
    
    var data = new google.visualization.DataTable();   
    data.addColumn('string', xAxis)
    data.addColumn('number', '')
    
    
    for(var i =0; i<darwin.contributionDates.length; i++){
    	data.addRow([dates[i].getMonth() + "-" + dates[i].getFullYear(), values[i]])
    }
    	
    var options = {
      title: chartTitle,
      hAxis: { slantedText:true, slantedTextAngle:45 }, 
      chartArea:{
          left: 100, width: '95%'
      },
      legend: {position: 'top'},
      height: 550,
      width: 1450,
      animation:{
          duration: 800,
          easing: 'out',
          startup: true,
        }
    };
        
    // Create and draw the visualization.
    if(darwin.currentAction == "LOC"){
        new google.visualization.SteppedAreaChart(document.getElementById('contributorChart')).draw(data, options);
    } else {
    	new google.visualization.LineChart(document.getElementById('contributorChart')).draw(data, options);
    }
    
    darwin.loadProgress = darwin.loadProgress + darwin.loadIntervalSize;
    darwin.updateProgressBar();
    darwin.populateSupplementaryStats();
}

darwin.populateSupplementaryStats = function(){
	$('#contributorTotalWeeks').text('Total Amount Of Weeks on GitHub: ' + darwin.totalWeeks);
	$('#contributorLOC').text('Total Lines Of Code On GitHub: ' + darwin.LOC);
}