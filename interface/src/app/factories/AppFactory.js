import i18n from '../i18n'
import toastr from 'toastr'

import axios from 'axios'

export default class AppFactory {
    init() {
        // Add a response interceptor
        return new Promise((resolve, reject) => {
            axios.interceptors.response.use(undefined, (error) => {
                toastr.error(i18n.t('trans.toast_error'))
                reject(error)
            })
            //this.start()
            resolve()
        })
    }
}
