/**
 * @author Jordan McDonald
 *
 * Description - unit test for the contribution extractor
 */
QUnit.module('Contributor Extractor', {
   setup: function() {
	   
	   var data = [];
	   data[0] = [1142726400,3937,-2678],[1143331200,112,-7],[1143936000,34,-22];
	   additions = [];
	   additions[0] = 4083;
	   deletions = [];
	   deletions[0] = 2707;
	   
	   darwin.contributionExtractorModule.extract(data);
   },
   teardown: function() {
	   data = "";
   }
});

QUnit.test( "hello test", function( assert ) {
	assert.deepEqual(darwin.contributionExtractorModule.getAddition(),additions , "pass!");
	assert.deepEqual(darwin.contributionExtractorModule.getDeletion(), deletions, "pass!" );
	assert.deepEqual(darwin.contributionExtractorModule.getIterationCount([],[]), 0, "pass!" );
	assert.deepEqual(darwin.contributionExtractorModule.getIterationCount([2,1],[2,1]), 2, "pass!" );
	assert.deepEqual(darwin.contributionExtractorModule.getIterationCount([4,2,21,3,4],[2,2]), 2, "pass!" );
});

