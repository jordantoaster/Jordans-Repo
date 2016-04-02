/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the json manager
 */

QUnit.module('json manager test');

QUnit.test( "convert to string", function( assert ) {
  darwin.jsonManagerModule.setCommitJson(0,[1])
  assert.deepEqual(darwin.jsonManagerModule.getAllCommitJson(), [[1]]);
  darwin.jsonManagerModule.setCommitJson(0,[2])
  assert.deepEqual(darwin.jsonManagerModule.getAllCommitJson(), [[1,2]]);
  darwin.jsonManagerModule.setCommitJson(0,[333])
  assert.deepEqual(darwin.jsonManagerModule.getAllCommitJson(), [[1,2,333]]);
});
