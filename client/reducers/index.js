// combining the reducers

import { combineReducers } from 'redux'
import downloadReducer from './downloadReducer'
import downloadStatusReducer from './downloadStatusReducer'

const reducers = combineReducers({
	download: downloadReducer,
	status: downloadStatusReducer
});

export default reducers