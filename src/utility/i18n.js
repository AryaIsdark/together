/* eslint-disable */
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import sprintf from 'i18next-sprintf-postprocessor';
import { initReactI18next } from 'react-i18next';

/*

// given loaded resources
// translation: {
//   key1: 'The first 4 letters of the english alphabet are: %s, %s, %s and %s',
//   key2: 'Hello %(users[0].name)s, %(users[1].name)s and %(users[2].name)s',
//   key3: 'The last letter of the english alphabet is %s',
//   key3: 'Water freezes at %d degrees'
// }

i18next.t('interpolationTest1', 'a', 'b', 'c', 'd');
// --> 'The first 4 letters of the english alphabet are: a, b, c and d'

i18next.t('interpolationTest3', 'z');
// --> 'The last letter of the english alphabet is z'

i18next.t('interpolationTest4', 0);
// --> 'Water freezes at 0 degrees'

*/

const backendOptions = {
  // path where resources get loaded from, or a function
  // returning a path:
  // function(lngs, namespaces) { return customPath; }
  // the returned path will interpolate lng, ns if provided like giving a static path
  loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,

  // path to post missing resources
  // addPath: 'locales/add/{{lng}}/{{ns}}',

  // your backend server supports multiloading
  // /locales/resources.json?lng=de+en&ns=ns1+ns2
  allowMultiLoading: false,
  // set loadPath: '/locales/resources.json?lng={{lng}}&ns={{ns}}' to adapt to multiLoading

  // parse data after it has been fetched
  // in example use https://www.npmjs.com/package/json5
  // here it removes the letter a from the json (bad idea)
  // parse(data) { return data.replace(/a/g, ''); },

  // allow cross domain requests
  crossDomain: true,

  // allow credentials on cross domain requests
  withCredentials: true,
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(sprintf)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    // when supporting zn-tw zn-ch you will need to go back to all for load and use the whitelist option instead
    load: 'languageOnly',
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      wait: true,
    },
    backend: backendOptions,
  });

export default i18n;
