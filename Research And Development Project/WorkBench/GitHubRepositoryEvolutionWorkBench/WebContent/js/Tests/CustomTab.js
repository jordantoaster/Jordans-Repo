/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the custom tab process- monitor what is checked etc
 */
QUnit.module('custom tab');

module('custom tab', {
    setup: function(){
    	darwin.customTabModule.setAdditionsChecked(true);
    	darwin.customTabModule.setDeletionsChecked(true);
    	darwin.customTabModule.resetCustomTabData();
    }
})

QUnit.test( "custom tab", function( assert ) {
  assert.equal(darwin.customTabModule.getIsAdditionsChecked(), false, "pass!");
  assert.equal(darwin.customTabModule.getIsDeletionsChecked(), false, "pass!");
});
