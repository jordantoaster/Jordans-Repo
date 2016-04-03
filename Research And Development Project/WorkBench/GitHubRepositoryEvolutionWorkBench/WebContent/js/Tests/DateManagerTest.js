/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the date manager
 */
QUnit.module('date manager');

module('date manager', {
    setup: function(){
        date1 = new Date();
        date1.setDate(11); //date starts at 0 in js
        date1.setFullYear(2015);
        date1.setMonth(11);
        
        date2 = new Date();
        date2.setDate(07); //date starts at 0 in js
        date2.setFullYear(2011);
        date2.setMonth(06);
    	
    }
})

QUnit.test( "date manager", function( assert ) {
  assert.equal(darwin.dateManager.convertDateObjectToString(date1),"", "pass!");
  assert.equal(darwin.dateManager.convertDateObjectToString(date2),"", "pass!");
});
