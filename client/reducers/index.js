// combining the reducers

import { combineReducers } from 'redux'
import downloadReducer from './downloadReducer'
import downloadStatusReducer from './downloadStatusReducer'
import loginReducer from './loginReducer'
import signupReducer from './signupReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import searchFriendsReducer from './searchFriendsReducer'

const reducers = combineReducers({
	download: downloadReducer,
	status: downloadStatusReducer,
	login: loginReducer,
	signup: signupReducer,
	auth: authReducer,
	profile: profileReducer,
	searchFriends: searchFriendsReducer
});

export default reducers