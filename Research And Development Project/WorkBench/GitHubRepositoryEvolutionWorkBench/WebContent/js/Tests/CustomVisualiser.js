/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the custom visualiser
 */
QUnit.module('cus-visualiser Test');

module('cus-visualiser test', {
    setup: function(){
    	darwin.customVisualiser.draw([[[3,2,1,1]],[[2,1]]], "", "", 0, "LineChart", ["name"]);
    }
})

QUnit.test( "graph test custom", function( assert ) {
	  assert.notEqual($('#customChart').children().length, 0, "pass!");
});
