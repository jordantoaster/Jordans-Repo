/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the parse url module
 */
QUnit.module('Parse Test');

QUnit.test( "hello test", function( assert ) {
  assert.equal(darwin.ParseUrlInputModule.parse("https://github.com/jquery/jquery"), "/jquery/jquery", "pass!");
  assert.equal(darwin.ParseUrlInputModule.parse("https://github.com/ruby/ruby"), "/ruby/ruby", "pass!" );
  assert.equal(darwin.ParseUrlInputModule.parse("https://github.com/ruby/rub"), "/ruby/rub", "pass!");
  assert.equal(darwin.ParseUrlInputModule.parse("https://github.com/twbs/bootstrap"), "/twbs/bootstrap", "pass!");
});
