const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('American to British English tests', () => {
    // #1
    test('Mangoes are my favorite fruit.', () => {
      assert.equal(translator.aToB('Mangoes are my favorite fruit'),
      'Mangoes are my favourite fruit.');
    });
  })
});
