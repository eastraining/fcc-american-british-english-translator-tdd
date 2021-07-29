'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  const createErr = msg => {
    return { error: msg };
  }

  app.route('/api/translate')
    .post((req, res) => {
      const sendErr = msg => res.json(createErr(msg));

      if (!req.body.hasOwnProperty('text') || !req.body.hasOwnProperty('locale')) {
        sendErr('Required field(s) missing');
        return;
      } else if (!req.body.text) {
        sendErr('No text to translate');
        return;
      }

      let textObj = {
        text: req.body.text,
        locale: req.body.locale
      }
      res.json(translator.translate(textObj));
    });
};
