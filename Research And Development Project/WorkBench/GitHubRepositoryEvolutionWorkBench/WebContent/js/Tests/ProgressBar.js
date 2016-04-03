/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the progress function
 */
QUnit.module('progress test');

module('progress test', {
    setup: function(){

    	darwin.progressbarModule.updateCommitProgress(10);
    	darwin.progressbarModule.updateStarProgress(450);

    }
})

QUnit.test( "copy test", function( assert ) {
  assert.equal(darwin.progressbarModule.getStarProgress(), 450, "pass!");
  
  darwin.progressbarModule.reset();
  
  assert.equal(darwin.progressbarModule.getCommitProgress(), 0, "pass!");
  assert.equal(darwin.progressbarModule.getStarProgress(), 0, "pass!");
});
