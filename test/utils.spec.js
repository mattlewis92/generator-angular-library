var utils = require('../generators/app/utils');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();

describe('utils', function () {
    describe('isEmpty', function () {
        it('should return function that return a promise', function () {
            utils.isEmpty('').should.be.a('Function')
            utils.isEmpty('')().should.be.fulfilled
        })

        it('should validate null and undefined, or empty string to true', function () {
            var falseValues = [null, undefined]
            var assertions = []
            for (var i = 0; i < falseValues.length; i++) {
                assertions.push(utils.isEmpty(falseValues[i])().should.eventually.equal(true))
            }
            return Promise.all(assertions)
        })

        it('should validate all other values to false', function () {
            var falseValues = [{}, [], true, false,'', 'bla']
            var assertions = []
            for (var i = 0; i < falseValues.length; i++) {
                assertions.push(utils.isEmpty(falseValues[i])().should.eventually.equal(false))
            }
            return Promise.all(assertions)
        })
    });

})