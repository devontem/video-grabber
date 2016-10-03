// combining the reducers

import { combineReducers } from 'redux'
import downloadReducer from './downloadReducer'
import downloadStatusReducer from './downloadStatusReducer'
import loginReducer from './loginReducer'
import signupReducer from './signupReducer'

const reducers = combineReducers({
	download: downloadReducer,
	status: downloadStatusReducer,
	login: loginReducer,
	signup: signupReducer
});

export default reducers