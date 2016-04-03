/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the copy object function
 */
QUnit.module('copy test');

module('copy test', {
    setup: function(){
    	array1 = [1];
    	array2 = [3,34,23432];
    	n1 = 1;
    	s1 = "1"
    }
})

QUnit.test( "copy test", function( assert ) {
  assert.deepEqual(darwin.copyObjectModule.copyObject(array1), array1, "pass!");
  assert.deepEqual(darwin.copyObjectModule.copyObject(array2), array2, "pass!");
});
