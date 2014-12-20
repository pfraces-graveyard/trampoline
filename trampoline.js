'use strict';

var partial = function () {
  var argv = [].slice.call(arguments),
      func = argv.shift();

  var partiallyApplied = function () {
    var args = [].slice.call(arguments);
    return func.apply(null, argv.concat(args));
  };
  
  return partiallyApplied;
};

module.exports = {
  partial: partial
};
