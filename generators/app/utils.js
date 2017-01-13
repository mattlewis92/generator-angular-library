'use strict';

module.exports = {
  noConfig: function (name, configs) {
    return function () {
      return new Promise(function (resolve) {
        var value = configs[name];
        resolve(value === null || value === undefined);
      });
    };
  }
};
