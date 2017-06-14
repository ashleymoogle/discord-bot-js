import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import ready from 'document-ready-promise'

import { createStore } from 'redux'
import { Provider } from 'react-redux';

import {I18nextProvider} from 'react-i18next'
import i18n from './i18n'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import FirstContainer from './components/first/FirstContainer'
//import SecondContainer from './components/second/SecondContainer'
import AppFactory from './factories/AppFactory.js'
import './components/styles.css'

import reducers from './store'

// Instantiate main factory
const factory = new AppFactory()

//Create Redux store with routes
const store = createStore(reducers)

const history = syncHistoryWithStore(browserHistory, store)

const routes = [
    //<Route path="/test" component={(props) => <SecondContainer factory={factory}/>}/>,
    <Route path="/" component={(props) => <FirstContainer factory={factory} />}/>,
    <Route path="*" component={(e) => { console.log('unhandled route', e.routeParams.splat); return null }} />
]

factory.init()
    .then(ready)
    .then(() => {
        ReactDOM.render((
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <Router
                        history={history}
                        routes={routes}/>
                </I18nextProvider>
            </Provider>
        ), document.getElementById('mount'))
    }).catch((e) => {
        setTimeout(()=> { throw e})
    })
