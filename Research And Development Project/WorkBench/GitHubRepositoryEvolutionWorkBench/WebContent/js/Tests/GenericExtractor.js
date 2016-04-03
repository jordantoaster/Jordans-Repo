/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the generic extractor
 */
QUnit.module('generic test');

module('generic test', {
    setup: function(){
        date1 = new Date();
        date1.setDate(8); //date starts at 0 in js
        date1.setFullYear(2015);
        date1.setMonth(8);
        
        date2 = new Date();
        date2.setDate(11); //date starts at 0 in js
        date2.setFullYear(2015);
        date2.setMonth(9);
        
        date3 = new Date();
        date3.setDate(9); //date starts at 0 in js
        date3.setFullYear(2015);
        date3.setMonth(8);
    }
})

QUnit.test( "copy test", function( assert ) {
	assert.equal(darwin.genericExtractorModule.checkDateBeyondSample(date1, date2),false,"pass!");	
	assert.equal(darwin.genericExtractorModule.checkDateBeyondSample(date1, date2),false,"pass!");
	assert.equal(darwin.genericExtractorModule.checkDateBeyondSample(date2, date1),true,"pass!");
	assert.equal(darwin.genericExtractorModule.checkDateBeyondSample(date1, date3),false,"pass!");
	assert.equal(darwin.genericExtractorModule.checkDateBeyondSample(date2, date3),true,"pass!");
});
