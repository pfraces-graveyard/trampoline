'use strict';

var expect = require('expect.js'),
    trampoline = require('./trampoline');

var partial = trampoline.partial;

describe('trampoline', function () {
  describe('#partial(fn, args...)', function () {
    it('should expose a function', function () {
      expect(partial).to.be.a('function');
    });
  });
});
