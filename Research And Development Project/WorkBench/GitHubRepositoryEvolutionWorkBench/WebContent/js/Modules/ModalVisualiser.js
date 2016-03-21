/**
 * 
 */

var darwin = darwin || {};

darwin.modalVisualiser = (function() {
    return {
		
		drawModal : function(title, body){
			
			$('#modalTitle').text("Information for - " + title);
			$('#modalMain').text(body);
			
			
    		$('#projectModal').modal('show');
		}
		
    };
})();