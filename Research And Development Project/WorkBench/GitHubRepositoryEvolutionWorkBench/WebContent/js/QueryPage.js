/**
 * 
 */

//Creates new namespace if not already defined
var darwin = darwin || {};


responsePage = 1;
baseRequestUrl = ""
totalCommits = 0; //not in use
commitIterator = 0; // only used for my own debugging
dates = []
monthCounter = 0;
firstDate = true;
commitsPerMonth = [];

$(document).ready(function(e) {
	
	//disableTabs();
	
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		
		//make api request process
		
		//baseRequestUrl = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/commits?per_page=100&page="+responsePage;
		//darwin.getApiCommitData(baseRequestUrl,collectCommitData);
	});
});

//TODO
darwin.disableTabs = function(){

}

darwin.getApiCommitData = function(url, callback){
	darwin.performAjaxRequestGitHub(url, "GET", callback);
}

darwin.collectCommitData = function(json){	
	
	for(i =0; i < json.length;i++){
		
		//this gets the date
		//date = new date();
		//date = Date.parse(json[0].commit.author.date);
		
		var date = darwin.convertISO8601toDate(json[i].commit.committer.date);
		
		//increment each time month and year havnt changed
		if(firstDate){
			dates[monthCounter] = date;
			firstDate = false;
			commitsPerMonth[monthCounter] = 0;
		}
		
		console.log(date[1] + "  " + date[2])
				
		if(date[1] < dates[monthCounter][1] || date[2] < dates[monthCounter][2]){
			monthCounter++;
			dates[monthCounter] = date;
			commitsPerMonth[monthCounter] = 0;
		} else {
			commitsPerMonth[monthCounter]++;
		}
		
		//else add new date index
		commitIterator++;
		
	}
	
	
	if(json.length == 100){
		responsePage = responsePage + 1;
		url = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/commits?per_page=100&page="+responsePage;
	
		darwin.getApiCommitData(url,collectCommitData);
	} else {
		dates.reverse();
		commitsPerMonth.reverse();
		darwin.visualiseData();
	}
}

darwin.visualiseData = function(commits, dates){
	
	$('#total').text(commitIterator);
	
	//this stops chart library overriding page
	if(google) {
	    google.load('visualization', '1.0', {
	        packages: ['corechart'],
	        callback: function() {
	        	darwin.drawChart();
	        }
	    } )
	}
}

darwin.drawChart = function(){
    // Create and populate the data table.
    /*var data = google.visualization.arrayToDataTable([
      ['Flavour', 'Percent'],
      ['Apple', 17.36],
      ['Strawberry Rhubarb', 15.62],
      ['Pumpkin', 13.63],
      ['Cherry', 11.25],
      ['Blueberry', 7.53],
      ['Lemon Meringue', 6.45],
      ['Chocolate', 3.97],
      ['Chess', 1.46],
      ['Other', 7.09]
    ]);*/
    
    var data = new google.visualization.DataTable();
    
    data.addColumn('string', 'Month')
    data.addColumn('number', 'Commits')
    
    
    for(var i =0; i<dates.length; i++){
       // console.log(dates[i][2])
    	data.addRow([dates[i][0] + "-" + dates[i][1] + "-" + dates[i][2], commitsPerMonth[i]])
    }
    
    
    
   // data.addRow([dates[0][0] + "-" + dates[0][1] + "-" + dates[0][2], commitsPerMonth[0]]);
    //data.addRow([dates[1][0] + "-" + dates[1][1] + "-" + dates[1][2], commitsPerMonth[1]]);

	
    var options = {
      title: 'Month By Month Commits Over Time'
    };
     // Create and draw the visualization.
    new google.visualization.LineChart(
      document.getElementById('container')).draw(data, options);
}


//this method does not match the master data on github website WHY? (NOT IN USE CURRENTLY) remove into parse file if needed
function parseJsonReponseForTotalCommits(json, url){
	for(i = 0; i < json.length; i++){
		totalCommits = totalCommits + json[i].contributions;
	}
	
	console.log(totalCommits);
	
	if(json.length < 100){
		responsePage = 1;
		url = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/commits?per_page=100&page="+responsePage;
		getApiCommitData(url,collectCommitData);
	} else {
		responsePage = responsePage + 1;
		url = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/contributors?per_page=100&page="+responsePage;
		getApiCommitData(url, darwin.parseJsonReponseForTotalCommits);
	}
}

