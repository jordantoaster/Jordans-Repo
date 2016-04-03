/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the contribution visualiser
 */
QUnit.module('c-visualiser Test');

module('c-visualiser test', {
    setup: function(){
    	darwin.ContributionVisualiser.draw([[[3,2,1,1]],[[2,1]]], "", "", 0, "LineChart", ["name"]);
    }
})

QUnit.test( "graph test", function( assert ) {
	
	   stop(); // Pause the test 
	    //Add your wait
	    setTimeout(function() {
	       //Make assertion 
	       ok(true);
	       // After the assertion called, restart the test
	       start();
	    }, 1000);
	  assert.notEqual($('#contributorChart').children().length, 0, "pass!");
});
