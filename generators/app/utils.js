'use strict';

module.exports = {
  isEmpty: function (value) {
    return function () {
      return new Promise(function (resolve) {
        resolve(value === null || value === undefined);
      });
    };
  }
};
