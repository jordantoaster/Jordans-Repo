/**
 * modular implementation of a facade in java script
 * acts as an API for the client, if changes are required to underyling architecture, the facade makes this simpler. 
 * loose coupling strategy
 */

var darwin = darwin || {};

darwin.Facade = (function () {
    return {
    	authenticate: function (action, callback, type, input) {
        	darwin.Mediator.authenticate(action, callback, type, input);
        }
    };
})();