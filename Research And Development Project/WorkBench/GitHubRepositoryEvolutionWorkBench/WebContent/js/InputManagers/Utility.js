/**
 * @author Jordan McDonald
 *
 * Description - Handles utility interactions that can not be grouped coherently
 */

var darwin = darwin || {};

$(document).ready(function(e) {

	
    $('.nav-tabs a').click(function () {
        var href = $(this).attr('href');
        var elem = $('a[href="' + href + '"]').tab('show');
    });
	
    //initially disable tabs
	darwin.projectManagerModule.disableTabs();
	
	//add to project manager
	var numFeilds = 1;
	
	//load google graph library
	darwin.Mediator.loadGraphLibrary();
	
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		
		filledFeilds = [];
		counter =0;
		
	    for(i=0;i<5;i++){
	    	
	    	//get parsed url
	    	parsedUrl = darwin.Mediator.parseInputUrl($('#urlField' + i).val());
	    	
	    	if(parsedUrl != ""){
	    		
	    		//first check if there are any duplicates
	    		var duplicates = false;	
	    		for(var j=0; j<filledFeilds.length;j++){
	    			if(parsedUrl == darwin.Mediator.parseInputUrl($('#urlField' + filledFeilds[j]).val())){
	    				duplicates = true; break;
	    			}
	    		}
	    		
	    		//if no duplicates then its filled
	    		if(duplicates == false){
	    			filledFeilds[counter] = i;
	    			counter++;
	    		}
	    	}
	    }
		
	    //sends feilds to the mediator
	    if(filledFeilds.length > 0){
			darwin.Mediator.initialSetup(filledFeilds);
	    } else{
	    	$('#ajaxGetUserServletResponse').text("Make sure you add a URL!");
	    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 	  
	    	}
	
	});
	
	//kick starts the auto process
	$("#submitButtonAuto").on("click.darwin", function(e){
		e.preventDefault();
		
		darwin.projectManagerModule.setIsAuto(true);
		
		darwin.progressbarModule.updateBulkProgress("Contributions");

		//sets up app and gets contributions
		darwin.Mediator.initialSetupBulk();
		
	});
	
	//handle the information modal
	$("#info0").on("click.darwin", function(e){
		darwin.Mediator.prepareModal(0);
	});
	$(document.body).on('click.darwin', '#info1' ,function(){
		darwin.Mediator.prepareModal(1);
	});
	$(document.body).on('click.darwin', '#info2' ,function(){
		darwin.Mediator.prepareModal(2);
	});
	$(document.body).on('click.darwin', '#info3' ,function(){
		darwin.Mediator.prepareModal(3);
	});
	$(document.body).on('click.darwin', '#info4' ,function(){
		darwin.Mediator.prepareModal(4);
	});
	
	
	//add more more feilds as the plus button is clicked
	$(".icon").on("click.darwin", function(e){  
				
		if(numFeilds == 5){
			$("#additionalProject").remove();
		} else {
							
			var feild = '<div  style="margin-top: 0.75%;" class="input-group input-group-lg fields urlInputOne">' + 
			'<span class="input-group-addon glyphicon glyphicon-cog" id="basic-addon1"></span>' +
			'<input type="text" class="form-control" id="urlField' + numFeilds + '" placeholder="Extra GitHub repository URL" aria-describedby="basic-addon1"><span class="darwinIcon input-group-addon glyphicon glyphicon-open" id="info' + numFeilds + '" ></span>' +
			'</div>';
	    
			numFeilds++;
			
			$("#additionalProject").before(feild);
			
			if(numFeilds == 5){
				$("#additionalProject").remove();
			}
		}
	});
	
	//handle the shifting og ui view from different tab sections
	$("#selectInput").on("click.darwin", function(e){  
		$("#urlContainer").removeClass('hidden');
		$("#visualiserContainer").addClass('hidden');
		$("#lehmannContainer").addClass('hidden');
		$("#statContainer").addClass('hidden');
	});
	$("#selectVisualiser").on("click.darwin", function(e){  
		$("#visualiserContainer").removeClass('hidden');
		$("#urlContainer").addClass('hidden');
		$("#lehmannContainer").addClass('hidden');
		$("#statContainer").addClass('hidden');
	});
	$("#selectStats").on("click.darwin", function(e){  
		$("#statContainer").removeClass('hidden');
		$("#visualiserContainer").addClass('hidden');
		$("#lehmannContainer").addClass('hidden');
		$("#urlContainer").addClass('hidden');
	});
	$("#selectLehmann").on("click.darwin", function(e){  
		$("#urlContainer").addClass('hidden');
		$("#statContainer").addClass('hidden');
		$("#visualiserContainer").addClass('hidden');
		$("#lehmannContainer").removeClass('hidden');
	});
	
	//handles the system wide funtions
	$("#logout").on("click.darwin", function(e){  
		e.preventDefault();

		darwin.serverModule.sendGeneric("logout","", darwin.Mediator.handleLogout, "POST","","","");
	});
	$("#export").on("click.darwin", function(e){  
		e.preventDefault();

		darwin.serverModule.sendGeneric("export","", darwin.Mediator.handleExport, "POST","","","");
	});
	$("#clear").on("click.darwin", function(e){  
		e.preventDefault();

		darwin.serverModule.sendGeneric("clear","", darwin.Mediator.handleExport, "POST","","","");
	});
	
	/*remove this and draw components based on droop down not tab*/
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#CustomTab"){
			darwin.Mediator.clearComponents();
			darwin.Mediator.setupCustomComponentsDropDown("custom");
		}// activated tab
	})

	//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawSummary"){
			
			darwin.Mediator.makeServerRequestGeneric("laws", "", darwin.Mediator.handleLawData,"POST","","", "");
		}// activated tab
	})
});


