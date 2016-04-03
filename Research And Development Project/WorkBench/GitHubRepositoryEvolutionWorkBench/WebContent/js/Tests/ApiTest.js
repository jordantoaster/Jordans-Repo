/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the api response function
 */
QUnit.module('api Test');

QUnit.test( "api response test", function( assert ) {
	  assert.equal(darwin.githubModule.send("fdfdsdfsfd", "","","", true),undefined, "pass!");
	  assert.equal(darwin.githubModule.send("https://api.github.com/repos/michael/github/isues?page=2", "","","", true),undefined, "pass!");
	  assert.equal(darwin.githubModule.send("https://api.github.com/repos/michael/github/issues?page=2", "","","", true),undefined, "pass!");
});
