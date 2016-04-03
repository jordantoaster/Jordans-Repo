/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the modal function
 */
QUnit.module('modal Test');

module('modal test', {
    setup: function(){

    }
})

QUnit.test( "modal test", function( assert ) {
	  darwin.modalVisualiser.drawModal("title", "body");
	  assert.notEqual($('#modalMain').text(), "", "pass!");
	  assert.notEqual($('#modalTitle').text(), "", "pass!");
	  $('#projectModal').modal('hide');
});
