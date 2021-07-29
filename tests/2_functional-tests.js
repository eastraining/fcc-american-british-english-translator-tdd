const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  // #1
  test('Translation with text and locale fields', (done) => {
    chai.request(server)
    .post('/api/translate')
    .send({
      "text": "I had a little chinwag with my friends down at the pub.",
      "locale": "british-to-american"
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      expect(res).to.have.a.property('type').that.equals('application/json');
      expect(res).to.have.a.property('body').that.is.an('object');
      expect(res.body).to.have.a.property('text').that.is.a('string').that
      .equals("I had a little chinwag with my friends down at the pub.");
      expect(res.body).to.have.a.property('translation').that.is.a('string').that
      .equals("I had a little <span class=\"highlight\">chat</span> with my " 
      + "friends down at the <span class=\"highlight\">bar</span>.");
      done();
    });
  });
  // #2
  test('Translation with text and invalid locale field', (done) => {
    chai.request(server)
    .post('/api/translate')
    .send({
      "text": "I had a little chinwag with my friends down at the pub.",
      "locale": "english-to-german"
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      expect(res).to.have.a.property('type').that.equals('application/json');
      expect(res).to.have.a.property('body').that.is.an('object');
      expect(res.body).to.have.a.property('error').that.is.a('string').that
      .equals("Invalid value for locale field");
      done();
    });
  });
  // #3
  test('Translation with missing text field', (done) => {
    chai.request(server)
    .post('/api/translate')
    .send({
      "locale": "american-to-british"
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      expect(res).to.have.a.property('type').that.equals('application/json');
      expect(res).to.have.a.property('body').that.is.an('object');
      expect(res.body).to.have.a.property('error').that.is.a('string').that
      .equals("Required field(s) missing");
      done();
    });
  });
  // #4
  test('Translation with missing locale field', (done) => {
    chai.request(server)
    .post('/api/translate')
    .send({
      "text": "I'm sitting in the bleachers."
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      expect(res).to.have.a.property('type').that.equals('application/json');
      expect(res).to.have.a.property('body').that.is.an('object');
      expect(res.body).to.have.a.property('error').that.is.a('string').that
      .equals("Required field(s) missing");
      done();
    });
  });
  // #5
  test('Translation with empty text field', (done) => {
    chai.request(server)
    .post('/api/translate')
    .send({
      "text": "",
      "locale": "american-to-british"
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      expect(res).to.have.a.property('type').that.equals('application/json');
      expect(res).to.have.a.property('body').that.is.an('object');
      expect(res.body).to.have.a.property('error').that.is.a('string').that
      .equals("No text to translate");
      done();
    });
  });
  // #6
  test('Translation with text that needs no translation', (done) => {
    chai.request(server)
    .post('/api/translate')
    .send({
      "text": "I will find my pen.",
      "locale": "american-to-british"
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      expect(res).to.have.a.property('type').that.equals('application/json');
      expect(res).to.have.a.property('body').that.is.an('object');
      expect(res.body).to.have.a.property('text').that.is.a('string').that
      .equals("I will find my pen.");
      expect(res.body).to.have.a.property('translation').that.is.a('string').that
      .equals("Everything looks good to me!");
      done();
    });
  });
});
