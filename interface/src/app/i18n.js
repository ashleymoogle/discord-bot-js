import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import config from '../../config/dev'

export default i18n
    .use(XHR)
    .init({
        lng: 'en',
        fallbackLng: 'en',

        // have a common namespace used around the full app
        ns: ['trad'],
        defaultNS: 'trad',

        backend: {
            loadPath: config.LOCALES_DIR + '/{{lng}}/{{ns}}.json'
        },

        interpolation: {
            escapeValue: false // not needed for react!!
        }
    })
