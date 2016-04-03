/**
 * @author Jordan McDonald
*
* Description - unit tests for the server response function
*/
QUnit.module('server Test');

QUnit.test( "server response test", function( assert ) {
	assert.equal(darwin.serverModule.sendSplash("","","",""),undefined,"pass!");
});
