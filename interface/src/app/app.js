import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom'
import ready from 'document-ready-promise'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk'

import {I18nextProvider} from 'react-i18next'
import i18n from './i18n'

import { Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import Home from './components/home/Home'
//import SecondContainer from './components/second/SecondContainer'
import AppFactory from './factories/AppFactory.js'
import './components/styles.css'

import reducers from './store'

// Instantiate main factory
const factory = new AppFactory()

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

//Create Redux store with routes
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(thunkMiddleware, middleware)
)

//const history = syncHistoryWithStore(browserHistory, store)

factory.init()
    .then(ready)
    .then(() => {
        ReactDOM.render((
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <ConnectedRouter history={history}>
                        <div>
                        <Route path="/" component={(props) => <Home factory={factory} />}/>
                        <Route path="*" component={(e) => { console.log('unhandled route', e); return null }} />
                        </div>
                    </ConnectedRouter>
                </I18nextProvider>
            </Provider>
        ), document.getElementById('mount'))
    }).catch((e) => {
        setTimeout(()=> { throw e})
    })
