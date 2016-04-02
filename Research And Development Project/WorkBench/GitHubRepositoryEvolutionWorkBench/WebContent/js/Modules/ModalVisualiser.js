/**
 * @author Jordan McDonald
 *
 * Description - draws the modal onto the screen based on arguments
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