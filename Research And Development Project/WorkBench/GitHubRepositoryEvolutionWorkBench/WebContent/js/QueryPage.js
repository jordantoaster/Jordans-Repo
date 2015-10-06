/**
 * 
 */


responsePage = 1;
baseRequestUrl = ""
totalCommits = 0;
commitIterator = 0;
dates = []
monthCounter = 0;
firstDate = true;
commitsPerMonth = [];

$(document).ready(function(e) {
	$("#urlButton").on("click", function(e){
		e.preventDefault();
		baseRequestUrl = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/contributors?per_page=100&page="+responsePage;
		getApiCommitData(baseRequestUrl,parseJsonReponseForTotalCommits);
	});
});

function getApiCommitData(url, callback){
	performAjaxRequestGitHub(url, callback);
}

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

function collectCommitData(json){	
	for(i =0; i < json.length;i++){
		
		//this gets the date
		date = json[0].commit.author.date
		
		//increment each time month and year havnt changed
		if(firstDate){
			dates[monthCounter] = date;
			firstDate = false;
			commitsPerMonth[monthCounter] = 0;
		}
		
		if(date.getMonth > dates[monthCounter].getMonth || date.getYear > dates[monthCounter].getYear){
			monthCounter++;
			dates[monthCounter] = date;
			commitsPerMonth[monthCounter] = 0;
		} else {
			commitsPerMonth[monthCounter]++;
		}
		
		//else add new date index
		commitIterator++;
		
	}
	
	
	if(commitIterator <= totalCommits){
		responsePage = responsePage + 1;
		url = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/commits?per_page=100&page="+responsePage;
	
		getApiCommitData(url,collectCommitData);
	} else {
		//display data
		console.log("q");
	}
}
