/**
 * 
 */

responsePage = 1;
baseRequestUrl = ""
totalCommits = 0; //not in use
dates = []
commitsPerWeek = [];

$(document).ready(function(e) {
	$("#urlButton").on("click", function(e){
		e.preventDefault();
		baseRequestUrl = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/stats/code_frequency"
		getApiCommitData(baseRequestUrl,collectCommitData);
	});
});

function getApiCommitData(url, callback){
	performAjaxRequestGitHub(url, "GET", callback);
}


//THIS ONLY GETS 100 CONTRIBUTORS
function collectCommitData(json){	
	
	var weekCounter = 0;
	var firstRun = true;
	var date;
	var weeklyCommitCount;
	
	console.log(json.length)

	for(i =0; i < json.length;i++){		
				
		//iterates n amount of weeks (jquery is 499)
		for(j = 0; j<json[i].weeks.length; j++){
						
			//console.log(json[i].author.login);
			
			weeklyCommitCount = json[i].weeks[j].c;
				
			if(firstRun){
				date = new Date(json[i].weeks[j].w * 1000);
			    dates[weekCounter] = date;
				commitsPerWeek[weekCounter] = weeklyCommitCount;
			} else {
				commitsPerWeek[weekCounter] = commitsPerWeek[weekCounter] + weeklyCommitCount;
			}
					
			totalCommits = totalCommits + weeklyCommitCount;
			weekCounter++;
		}
		
		//ready to parse next set of weeks
		weekCounter = 0;
		firstRun = false;
	}
	
	visualiseData();
}

function visualiseData(commits, dates){
	
	$('#total').text(totalCommits);
	
	//this stops chart library overriding page
	if(google) {
	    google.load('visualization', '1.0', {
	        packages: ['corechart'],
	        callback: function() {
	        	drawChart();
	        }
	    } )
	}
}

function drawChart(){
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


//this method does not match the master data on github website WHY? (NOT IN USE CURRENTLY)
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
		getApiCommitData(url, parseJsonReponseForTotalCommits);
	}
}

