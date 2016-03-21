/**
 * 
 */

var darwin = darwin || {};

darwin.modalVisualiser = (function() {
    return {
		
		drawModal : function(title, body){
			
			$('#modalTitle').text("READ ME - " + title);
			$('#modalMain').text(body);
			
			
    		$('#projectModal').modal('show');
		}
		
    };
})();