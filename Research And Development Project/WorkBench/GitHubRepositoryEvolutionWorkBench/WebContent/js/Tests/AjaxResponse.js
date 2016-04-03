/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the ajax response function
 */
QUnit.module('Ajax response Test');

var testData;

module('Ajax response', {
    setup: function(){
    	darwin.Mediator.resetVariables();
    	testData = []; testData[0] = "name:git, size:8, date: today";
    	darwin.AjaxResponseModule.handleSuccess("commit", testData, darwin.Mediator.emptyCallback, 0, true);
    }
})

QUnit.test( "ajax response test", function( assert ) {
	  assert.equal(darwin.jsonManagerModule.getCommitJson(0),testData, "pass!");
	  assert.equal(darwin.AjaxResponseModule.getSizeOfArray([2,3,4,5]),4, "pass!");
	  assert.equal(darwin.AjaxResponseModule.getSizeOfArray([2,3,4,5,5,243,324,4453,1,31,1,1]),12, "pass!");
	  assert.equal(darwin.AjaxResponseModule.getSizeOfArray([]),0, "pass!");
});
