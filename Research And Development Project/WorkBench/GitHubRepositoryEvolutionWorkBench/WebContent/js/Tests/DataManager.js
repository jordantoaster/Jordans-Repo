/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the data manager - monitor what is checked etc
 */
QUnit.module('data manager');

module('data manager', {
    setup: function(){
    	darwin.dataManager.setDeletions(0,[2,3,1],0);
    	darwin.dataManager.setAdditions(0,[2,3,1],0);
    }
})

QUnit.test( "data manager", function( assert ) {
  assert.deepEqual(darwin.dataManager.getAdditions(0),[[2,3,1]], "pass!");
  assert.deepEqual(darwin.dataManager.getDeletions(0), [[2,3,1]], "pass!");
  
  darwin.dataManager.resetAllDataManager();
	
  assert.equal(darwin.dataManager.getAdditions(0), undefined, "pass!");
  assert.equal(darwin.dataManager.getDeletions(0), undefined, "pass!");


});
