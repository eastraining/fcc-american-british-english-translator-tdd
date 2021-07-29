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
        ["No Mr Bond, I expect you to die.", "Mr"]
      );
    });
    // #9
    test("Dr. Grosh will see you now.", () => {
      assert.sameOrderedMembers(
        translator.aToB("Dr. Grosh will see you now."),
        ["Dr Grosh will see you now.", "Dr"]
      );
    });
    // #10
    test("Lunch is at 12:15 today.", () => {
      assert.sameOrderedMembers(
        translator.aToB("Lunch is at 12:15 today."),
        ["Lunch is at 12.15 today.", "12.15"]
      );
    });
  });
  
  suite("British to American English tests", () => {
    // #11
    test("We watched the footie match for a while.", () => {
      assert.sameOrderedMembers(
        translator.bToA("We watched the footie match for a while."),
        ["We watched the soccer match for a while.", "soccer"]
      );
    });
    // #12
    test("Paracetamol takes up to an hour to work.", () => {
      assert.sameOrderedMembers(
        translator.bToA("Paracetamol takes up to an hour to work."),
        ["Tylenol takes up to an hour to work.", "Tylenol"]
      );
    });
    // #13
    test("First, caramelise the onions.", () => {
      assert.sameOrderedMembers(
        translator.bToA("First, caramelise the onions."),
        ["First, caramelize the onions.", "caramelize"]
      );
    });
    // #14
    test("I spent the bank holiday at the funfair.", () => {
      assert.sameOrderedMembers(
        translator.bToA("I spent the bank holiday at the funfair."),
        ["I spent the public holiday at the carnival.", 
        "public holiday", "carnival"]
      );
    });
    // #15
    test("I had a bicky then went to the chippy.", () => {
      assert.sameOrderedMembers(
        translator.bToA("I had a bicky then went to the chippy."),
        ["I had a cookie then went to the fish-and-chip shop.", 
        "cookie", "fish-and-chip shop"]
      );
    });
    // #16
    test("I've just got bits and bobs in my bum bag.", () => {
      assert.sameOrderedMembers(
        translator.bToA("I've just got bits and bobs in my bum bag."),
        ["I've just got odds and ends in my fanny pack.", 
        "odds and ends", "fanny pack"]
      );
    });
    // #17
    test("The car boot sale at Boxted Airfield was called off.", () => {
      assert.sameOrderedMembers(
        translator.bToA("The car boot sale at Boxted Airfield was called off."),
        ["The swap meet at Boxted Airfield was called off.", "swap meet"]
      );
    });
    // #18
    test("Have you met Mrs Kalyani?", () => {
      assert.sameOrderedMembers(
        translator.bToA("Have you met Mrs Kalyani?"),
        ["Have you met Mrs. Kalyani?", "Mrs."]
      );
    });
    // #19
    test("Prof Joyner of King's College, London.", () => {
      assert.sameOrderedMembers(
        translator.bToA("Prof Joyner of King's College, London."),
        ["Prof. Joyner of King's College, London.", "Prof."]
      );
    });
    // #20
    test("Tea time is usually around 4 or 4.30.", () => {
      assert.sameOrderedMembers(
        translator.bToA("Tea time is usually around 4 or 4.30."),
        ["Tea time is usually around 4 or 4:30.", "4:30"]
      );
    });
  });

  suite("Highlight translation", () => {
    // #21
    test("Mangoes are my favorite fruit.", () => {
      assert.propertyVal(
        translator.translate({
          text: "Mangoes are my favorite fruit.", 
          locale: "american-to-british"
        }),
        'translation',
        "Mangoes are my <span class='highlight'>favourite</span> fruit."
      );
    });
    // #22
    test("I ate yogurt for breakfast.", () => {
      assert.propertyVal(
        translator.translate({
          text: "I ate yogurt for breakfast.",
          locale: "american-to-british"
        }),
        'translation',
        "I ate <span class='highlight'>yoghurt</span> for breakfast."
      );
    });
    // #23
    test("We watched the footie match for a while.", () => {
      assert.propertyVal(
        translator.translate({
          text: "We watched the footie match for a while.",
          locale: "british-to-american"
        }),
        'translation',
        "We watched the <span class='highlight'>soccer</span> match for a while."
      );
    });
    // #24
    test("Paracetamol takes up to an hour to work.", () => {
      assert.propertyVal(
        translator.translate({
          text: "Paracetamol takes up to an hour to work.",
          locale: "british-to-american"
        }),
        'translation',
        "<span class='highlight'>Tylenol</span> takes up to an hour to work."
      );
    });
  });
});
