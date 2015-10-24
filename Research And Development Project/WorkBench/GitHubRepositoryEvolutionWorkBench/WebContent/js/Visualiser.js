/**
 * 
 */

//Creates new namespace if not already defined
var darwin = darwin || {};

darwin.loadGraph = function() {
	//this stops chart library overriding page
	if(google) {
	    google.load('visualization', '1.0', {
	        packages: ['corechart'],
	        callback: function() {
	        	darwin.drawContributionGraph();
	        }
	    })
	}
}

darwin.drawContributionGraph = function(dates, values){
	
	darwin.currentContributionData = values;
    
    var data = new google.visualization.DataTable();   
    data.addColumn('string', 'Quarter')
    data.addColumn('number', 'Addition & deletion difference')
    
    
    for(var i =0; i<darwin.dates.length; i++){
       // console.log(dates[i][2])
    	data.addRow([dates[i].getMonth() + "-" + dates[i].getFullYear(), values[i]])
    }
    	
    var options = {
      title: 'Quarter by quarter difference of additions and deletions',
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