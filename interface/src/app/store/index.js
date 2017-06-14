import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import {counter} from './reducers/counter'
import {counter2} from './reducers/counter'

export default combineReducers({
    counter,
    counter2,
    routing:routerReducer
});