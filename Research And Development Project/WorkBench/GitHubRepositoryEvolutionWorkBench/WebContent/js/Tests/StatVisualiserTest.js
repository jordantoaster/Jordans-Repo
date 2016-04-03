/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the stat visualiser
 */
QUnit.module('s-visualiser Test');

module('s-visualiser test', {
    setup: function(){
    	darwin.statVisualiser.drawMean([20,12,43,12], ["","","",""], "", 12, 1, [2,3,1,3], [3,5,3,2], 3);
    }
})

QUnit.test( "stat graph test", function( assert ) {
	
	  assert.notEqual($('#dispersionTable').children().length, 0, "pass!");
	  assert.equal($('#growthChart').children().length, 0, "pass!");

});
