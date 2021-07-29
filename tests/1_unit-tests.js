const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  suite("American to British English tests", () => {
    // #1
    test("Mangoes are my favorite fruit.", () => {
      assert.sameOrderedMembers(
        translator.aToB("Mangoes are my favorite fruit."),
        ["Mangoes are my favourite fruit.", "favourite"]
      );
    });
    // #2
    test("I ate yogurt for breakfast.", () => {
      assert.sameOrderedMembers(
        translator.aToB("I ate yogurt for breakfast."),
        ["I ate yoghurt for breakfast.", "yoghurt"]
      );
    });
    // #3
    test("We had a party at my friend's condo.", () => {
      assert.sameOrderedMembers(
        translator.aToB("We had a party at my friend's condo."),
        ["We had a party at my friend's flat.", "flat"]
      );
    });
    // #4
    test("Can you toss this in the trashcan for me?", () => {
      assert.sameOrderedMembers(
        translator.aToB("Can you toss this in the trashcan for me?"),
        ["Can you toss this in the bin for me?", "bin"]
      );
    });
    // #5
    test("The parking lot was full.", () => {
      assert.sameOrderedMembers(
        translator.aToB("The parking lot was full."),
        ["The car park was full.", "car park"]
      );
    });
    // #6
    test("Like a high tech Rube Goldberg machine.", () => {
      assert.sameOrderedMembers(
        translator.aToB("Like a high tech Rube Goldberg machine."),
        ["Like a high tech Heath Robinson device.", "Heath Robinson device"]
      );
    });
    // #7
    test("To play hooky means to skip class or work.", () => {
      assert.sameOrderedMembers(
        translator.aToB("To play hooky means to skip class or work."),
        ["To bunk off means to skip class or work.", "bunk off"]
      );
    });
    // #8
    test("No Mr. Bond, I expect you to die.", () => {
      assert.sameOrderedMembers(
        translator.aToB("No Mr. Bond, I expect you to die."),
        ["No Mr. Bond, I expect you to die.", "Mr"]
      );
    });
    // #9
    test("Dr. Grosh will see you now.", () => {
      assert.sameOrderedMembers(
        translator.aToB("Dr. Grosh will see you now."),
        ["Dr Grosh will see you now.", "Dr"]
      );
    });
  })
});
