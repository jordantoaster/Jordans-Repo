/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the generic visualiser
 */
QUnit.module('g-visualiser Test');

module('g-visualiser test', {
    setup: function(){
    	darwin.genericVisualiser.draw([[[3,2,1,1]],[[2,1]]], "", "", 0,"commit", "LineChart", ["name"]);
    }
})

QUnit.test( "graph test - generic", function( assert ) {
	
	   stop(); // Pause the test 
	    //Add your wait
	    setTimeout(function() {
	       //Make assertion 
	       ok(true);
	       // After the assertion called, restart the test
	       start();
	    }, 100);
	  assert.notEqual($('#commitChart').children().length, 0, "pass!");
});
