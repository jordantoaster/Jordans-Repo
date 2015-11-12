QUnit.module('packager test');

module('ISO date conversion test', {
    setup: function(){
    	date1 = darwin.ISO601toDateModule.convert("2015-11-11T15:10:10Z");
    	date2 = darwin.ISO601toDateModule.convert("2011-06-07T03:13:37Z");
    	date3 = darwin.ISO601toDateModule.convert("2012-10-06T00:31:43Z");
    }
})

QUnit.test( "convert to string", function( assert ) {
  assert.deepEqual(darwin.packager.convertDateObjectToString(date1),["11","11","2015"]);
  assert.deepEqual(darwin.packager.convertDateObjectToString(date2),["07","06","2011"]);
  assert.deepEqual(darwin.packager.convertDateObjectToString(date3),["06","10","2012"]);
});
