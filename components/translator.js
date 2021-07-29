const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');
const americanTimeCheck = /(?<=[0-2]?[0-9]):(?=[0-5]\d)/g;
const americanTimeMatch = /[0-2]?[0-9]:[0-5]\d/g;
const britishTimeCheck = /(?<=[0-2]?[0-9]).(?=[0-5]\d)/g;
const britishTimeMatch = /[0-2]?[0-9].[0-5]\d/g;

class Translator {
  constructor() {
    this.validLocales = ['american-to-british', 'british-to-american']
  }

  checkLocale(locale) {
    return this.validLocales.indexOf(locale);
  }

  validMatch(text, key, tledWords) {
    let start = text.indexOf(key) - 1;
    let end = start + key.length + 1;
    let existing = tledWords.filter(x => x[0].includes(key));
    return (start === -1 || text[start] === ' ' || text[start] === '.') && 
    (end === text.length || text[end] === ' ' || text[end] === '.') &&
    existing.length === 0;
  }

  checkDict(text, tledWords, dict, reverse = false) {
    let dictArr = Object.entries(dict);
    let dictLength = dictArr.length;
    if (reverse) {
      for (let [value, key] of dictArr) {
        if (text.includes(key)) {
          if (this.validMatch(text, key, tledWords)) {
            if (dictLength === 6) {
              value = value[0].toUpperCase() + value.slice(1);
            }
            tledWords.push([key, value]);
          }
        }
      }  
    } else {
      for (let [key, value] of dictArr) {
        if (text.includes(key)) {
          if (this.validMatch(text, key, tledWords)) {
            if (dictLength === 6) {
              value = value[0].toUpperCase() + value.slice(1);
            }
            tledWords.push([key, value]);
          }
        }
      }
    }
    return tledWords;
  }

  aToB(text) {
    let tledWords = [];
    let rawText = text.toLowerCase();
    tledWords = this.checkDict(rawText, tledWords, americanOnly);
    tledWords = this.checkDict(rawText, tledWords, americanToBritishSpelling);
    tledWords = this.checkDict(rawText, tledWords, americanToBritishTitles);
    tledWords.forEach(x => {text = text.replace(new RegExp(x[0], 'gi'), x[1])});
    if (americanTimeCheck.test(text)) {
      text = text.replace(americanTimeCheck, '.');
      tledWords.push(...text.match(britishTimeMatch));
    }
    if (tledWords.length === 0) {
      return false;
    }
    tledWords = tledWords.map(x => Array.isArray(x) ? x[1] : x);
    text = text[0].toUpperCase() + text.slice(1);
    if (Array.isArray(tledWords)) {
      return [text, ...tledWords];
    } else {
      return [text, tledWords];
    }
  }

  bToA(text) {
    let tledWords = [];
    let rawText = text.toLowerCase();
    tledWords = this.checkDict(rawText, tledWords, britishOnly);
    tledWords = this.checkDict(rawText, tledWords, americanToBritishSpelling, true);
    tledWords = this.checkDict(rawText, tledWords, americanToBritishTitles, true);
    tledWords.forEach(x => {text = text.replace(new RegExp(x[0], 'gi'), x[1])});
    if (britishTimeCheck.test(text)) {
      text = text.replace(britishTimeCheck, ':');
      tledWords.push(...text.match(americanTimeMatch));
    }
    if (tledWords.length === 0) {
      return false;
    }
    tledWords = tledWords.map(x => Array.isArray(x) ? x[1] : x);
    text = text[0].toUpperCase() + text.slice(1);
    if (Array.isArray(tledWords)) {
      return [text, ...tledWords];
    } else {
      return [text, tledWords];
    }
  }

  translate(textObj) {
    let locale = this.checkLocale(textObj.locale);
    let translated;
    if (locale === 0) {
      translated = this.aToB(textObj.text);
    } else if (locale === 1) {
      translated = this.bToA(textObj.text);
    } else {
      return {error: 'Invalid value for locale field'};
    }
    if (!translated) {
      return {
        text: textObj.text,
        translation: 'Everything looks good to me!'
      }
    }
    let text = translated.shift();
    translated.forEach(x => {
      text = text.replace(new RegExp(x, 'gi'),
      `<span class=\"highlight\">${x}</span>`)
    });
    return {
      text: textObj.text,
      translation: text
    }
    
  }

}

module.exports = Translator;