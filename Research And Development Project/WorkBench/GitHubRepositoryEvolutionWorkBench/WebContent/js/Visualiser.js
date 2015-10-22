/**
 * 
 */

//Creates new namespace if not already defined
var darwin = darwin || {};

darwin.renderContributionGraph = function() {
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

darwin.drawContributionGraph = function(){
    
    var data = new google.visualization.DataTable();   
    data.addColumn('string', 'Quarter')
    data.addColumn('number', 'Addition & deletion difference')
    
    
    for(var i =0; i<darwin.dates.length; i++){
       // console.log(dates[i][2])
    	data.addRow([darwin.dates[i].getMonth() + "-" + darwin.dates[i].getFullYear(), darwin.difference[i]])
    }
    	
    var options = {
      title: 'Quarter by quarter difference of additions and deletions'
    };
    
    // Create and draw the visualization.
    new google.visualization.LineChart(document.getElementById('contributorChart')).draw(data, options);
}