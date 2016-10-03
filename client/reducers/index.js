// combining the reducers

import { combineReducers } from 'redux'
import downloadReducer from './downloadReducer'
import downloadStatusReducer from './downloadStatusReducer'
import loginReducer from './loginReducer'
import signupReducer from './signupReducer'
import authReducer from './authReducer'

const reducers = combineReducers({
	download: downloadReducer,
	status: downloadStatusReducer,
	login: loginReducer,
	signup: signupReducer,
	auth: authReducer
});

export default reducers