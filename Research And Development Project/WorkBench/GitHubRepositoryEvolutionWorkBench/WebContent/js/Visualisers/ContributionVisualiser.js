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
          left: 50, width: '95%'
      },
      legend: {position: 'top'},
      height: 550,
      width: 1450
    };
        
    // Create and draw the visualization.
    new google.visualization.LineChart(document.getElementById('contributorChart')).draw(data, options);
}