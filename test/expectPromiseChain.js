'use strict';

module.exports = function (chai) {
  // Original
  const _expect = chai.expect;

  // Add .also to expect
  chai.expect = function (obj) {

    // This will not work for non Promise Object
    if (!obj.toString().match('[object Promise]'))
      return _expect(obj);

    let chains = [ _expect(obj) ];

    function addAlso(chain) {
      Object.defineProperty(chain, "also", { get: () => {
        chains.push(_expect(obj));  // Add to Chains
        return addAlso(chains[chains.length - 1]).to.eventually;
      }});

      chain.exec = function () {
        return Promise.all(chains)
      }
      
      return chain;
    }

    return addAlso(chains[0]);
  };
};
