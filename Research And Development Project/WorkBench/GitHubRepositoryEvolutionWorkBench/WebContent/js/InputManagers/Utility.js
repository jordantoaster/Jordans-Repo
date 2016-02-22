var darwin = darwin || {};

$(document).ready(function(e) {

	
    $('.nav-tabs a').click(function () {
        var href = $(this).attr('href');
        var elem = $('a[href="' + href + '"]').tab('show');
    });
		
	darwin.projectManagerModule.disableTabs();
	
	
	//add to project manager
	var numFeilds = 1;
	
	//load google graph library
	darwin.Mediator.loadGraphLibrary();
	
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		
		darwin.Mediator.initialSetup();
	
	});
	
	$("#submitButtonAuto").on("click.darwin", function(e){
		e.preventDefault();
		
		darwin.projectManagerModule.setIsAuto(true);

		//sets up app and gets contributions
		darwin.Mediator.initialSetup();
		
	});
	
	$(".icon").on("click.darwin", function(e){  
				
		if(numFeilds == 5){
			$("#additionalProject").remove();
		} else {
							
			var feild = '<div  style="margin-top: 0.75%;" class="input-group input-group-lg fields urlInputOne">' + 
			'<span class="input-group-addon glyphicon glyphicon-cog" id="basic-addon1"></span>' +
			'<input type="text" class="form-control" id="urlField' + numFeilds + '" placeholder="Extra GitHub repository URL" aria-describedby="basic-addon1">' +
			'</div>';
	    
			numFeilds++;
			
			$("#additionalProject").before(feild);
			
			if(numFeilds == 5){
				$("#additionalProject").remove();
			}
		}
	});
	
	$("#selectInput").on("click.darwin", function(e){  
		$("#urlContainer").removeClass('hidden');
		$("#visualiserContainer").addClass('hidden');
		$("#statContainer").addClass('hidden');
	});
	$("#selectVisualiser").on("click.darwin", function(e){  
		$("#visualiserContainer").removeClass('hidden');
		$("#urlContainer").addClass('hidden');
		$("#statContainer").addClass('hidden');
	});
	$("#selectStats").on("click.darwin", function(e){  
		$("#statContainer").removeClass('hidden');
		$("#visualiserContainer").addClass('hidden');
		$("#urlContainer").addClass('hidden');
	});
	$("#selectPrediction").on("click.darwin", function(e){  

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
		if($(this).attr('href') == "#lawsBlock"){
			
			darwin.Mediator.makeServerRequestGeneric("laws", "", darwin.Mediator.handleLawData,"POST","","", "");
		}// activated tab
	})
});


