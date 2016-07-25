// combining the reducers

import { combineReducers } from 'redux'
import downloadReducer from './downloadReducer'

const reducers = combineReducers({
	download: downloadReducer
});

export default reducers