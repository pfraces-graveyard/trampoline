'use strict';

var expect = require('expect.js'),
    trampoline = require('./trampoline');

/**
 * sum() helper
 * recursively sums its arguments
 */

var sum = function () {
  var args = [].slice.call(arguments);
  if (!args.length) { return 0; }
  return args.shift() + sum.apply(null, args);
};

describe('sum() helper', function () {
  it('should be a function', function () {
    expect(sum).to.be.a('function');
  });

  it('should return 0 with null arguments', function () {
    expect(sum()).to.be(0);
  });

  it('should return the argument if just one passed', function () {
    expect(sum(0)).to.be(0);
    expect(sum(1)).to.be(1);
    expect(sum(2)).to.be(2);
  });

  it('should sum any argument passed', function () {
    expect(sum(1, 2)).to.be(3);
    expect(sum(1, 2, 3)).to.be(6);
    expect(sum(1, 2, 3, 4)).to.be(10);
  });
});

describe('trampoline', function () {
  var partial = trampoline.partial,
      noop = function () {};

  describe('#partial(fn, args...)', function () {
    it('should be a function', function () {
      expect(partial).to.be.a('function');
    });

    it('should return a function', function () {
      expect(partial()).to.be.a('function');
    });

    it('should require a function as first argument', function () {
      expect(partial()).to.throwException(function (e) { 
        expect(e).to.be.a(TypeError);
      });
      
      expect(partial(noop)).to.not.throwException();
    });

    it('should do partial application of the rest of arguments', function () {
      expect(partial(sum, 1)(2)).to.be(3);
      expect(partial(sum, 1, 2)()).to.be(3);
      expect(partial(sum)(1, 2)).to.be(3);
      expect(partial(sum, 1, 2)(3)).to.be(6);
      expect(partial(sum, 1)(2, 3)).to.be(6);
      expect(partial(sum, 1, 2)(3, 4)).to.be(10);
      expect(partial(sum, 1, 2, 3, 4)(5)).to.be(15);
    });
  });
});
