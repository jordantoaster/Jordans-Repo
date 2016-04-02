/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the ISO date converter
 */

QUnit.module('ISO date conversion test');

module('ISO date conversion test', {
    setup: function(){
        date1 = new Date();
        date1.setDate(11); //date starts at 0 in js
        date1.setFullYear(2015);
        date1.setMonth(11);
        date1Array = [date1.getDate().toString(), date1.getMonth().toString(), date1.getFullYear().toString()];
        
        date2 = new Date();
        date2.setDate(07); //date starts at 0 in js
        date2.setFullYear(2011);
        date2.setMonth(06);
        date2Array = ["0" + date2.getDate().toString(), "0" + date2.getMonth().toString(), date2.getFullYear().toString()];
        
        //0 accounts for get date trimming 0 when my module does not
        
        date3 = new Date();
        date3.setDate(06); //date starts at 0 in js
        date3.setFullYear(2012);
        date3.setMonth(10);
        date3Array = ["0" + date3.getDate().toString(), date3.getMonth().toString(), date3.getFullYear().toString()];
    }
})

QUnit.test( "convert test", function( assert ) {
  assert.deepEqual(darwin.ISO601toDateModule.convert("2015-11-11T15:10:10Z"), date1Array);
  assert.deepEqual(darwin.ISO601toDateModule.convert("2011-06-07T03:13:37Z"), date2Array);
  assert.deepEqual(darwin.ISO601toDateModule.convert("2012-10-06T00:31:43Z"), date3Array);
});
