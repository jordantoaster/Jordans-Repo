/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the pm function
 */
QUnit.module('pm Test');

module('pm test', {
    setup: function(){
    	array1 = [1];
    	array2 = [3,34,23432];
    	array3 = [1,24,56,7,88,78,888,88,888,8];
    }
})

QUnit.test( "pm test", function( assert ) {
  assert.equal(darwin.projectManagerModule.swapSampleRate(0), 1);
  assert.equal(darwin.projectManagerModule.swapSampleRate(1), 6);
  assert.equal(darwin.projectManagerModule.swapSampleRate(2), 13);
  assert.equal(darwin.projectManagerModule.swapSampleRate(3), 26);
  
  darwin.projectManagerModule.setcurrRequestPage(5);
  assert.equal(darwin.projectManagerModule.getcurrRequestPage(0), 6);
  darwin.projectManagerModule.resetAllProjectManager();
  assert.equal(darwin.projectManagerModule.getcurrRequestPage(0), 1);

});
