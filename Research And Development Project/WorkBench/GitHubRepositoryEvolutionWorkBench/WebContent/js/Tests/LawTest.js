/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the contribution visualiser
 */
QUnit.module('l-visualiser Test');

module('l-visualiser test', {
    setup: function(){
    	darwin.lawVisualiser.drawLawOne([4,2,3,4,1,2,4,5,3]);
    	darwin.lawVisualiser.drawLawThree([4,2,3,4,1,2,4,5,3]);
    	darwin.lawVisualiser.drawLawFive([4,2,3,4,1,2,4,5,3]);
    	darwin.lawVisualiser.drawLawSix([4,2,3,4,1,2,4,5,3]);
    	darwin.lawVisualiser.drawLawSeven([4,2,3,4,1,2,4,5,3]);
    }
})

QUnit.test( "law test", function( assert ) {
	  assert.notEqual($('#blockOneTable').children().length, 0, "pass!");
	  assert.notEqual($('#blockThreeTable').children().length, 0, "pass!");
	  assert.notEqual($('#blockFiveTable').children().length, 0, "pass!");
	  assert.notEqual($('#blockSixTable').children().length, 0, "pass!");
	  assert.notEqual($('#blockSevenTable').children().length, 0, "pass!");
});
