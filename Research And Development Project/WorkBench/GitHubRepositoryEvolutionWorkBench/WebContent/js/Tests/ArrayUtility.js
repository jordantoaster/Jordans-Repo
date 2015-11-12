QUnit.module('Array Utility Test');

module('Array utility test', {
    setup: function(){
    	array1 = [1];
    	array2 = [3,34,23432];
    	array3 = [1,24,56,7,88,78,888,88,888,8];
    }
})

QUnit.test( "convert test", function( assert ) {
  assert.equal(darwin.arrayUtilityModule.getSmallestArray([array1]), 1);
  assert.equal(darwin.arrayUtilityModule.getSmallestArray([array1, array2]), 1);
  assert.equal(darwin.arrayUtilityModule.getSmallestArray([array3, array2]), 3);
  assert.equal(darwin.arrayUtilityModule.getSmallestArray([array1,array2,array3]), 1);
  assert.equal(darwin.arrayUtilityModule.getSmallestArray([array3]), 10);
});
