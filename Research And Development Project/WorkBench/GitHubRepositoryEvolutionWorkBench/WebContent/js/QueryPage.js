/**
 * 
 */
responsePage = 1;
baseRequestUrl = ""
total = 0;

$(document).ready(function(e) {
	$("#urlButton").on("click", function(e){
		e.preventDefault();
		baseRequestUrl = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/contributors?per_page=100&page="+responsePage;
		getApiCommitData(baseRequestUrl);
	});
});

function getApiCommitData(url){
	performAjaxRequestGitHub(url, parseJsonReponseForCommits);
}

function parseJsonReponseForCommits(json, url){
	for(i = 0; i < json.length; i++){
		total = total + json[i].contributions;
	}
	
	console.log(total);
	
	if(json.length < 100){
		//do something with the aggregated data
	} else {
		responsePage = responsePage + 1;
		url = "https://api.github.com/repos/"+$("#urlOwner").val()+'/'+$("#urlName").val()+"/contributors?per_page=100&page="+responsePage;
		getApiCommitData(url, parseJsonReponseForCommits);
	}
}
