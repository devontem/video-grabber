// creating the auth reducer

const authReducer = function(state = {}, action){

	switch (action.type) {
		case 'GET_USER':
			return state
		case 'GET_USER_PENDING':
			return {...state, pending: true, loggedIn: false}
		case 'GET_USER_FULFILLED':
			return {...state, pending: false, loggedIn: true, user: action.payload.data}
		case 'GET_USER_REJECTED':
			return {...state, pending: false, loggedIn: false, ...action.payload.data}
		// set's the user's ID after successful login
		case "SIGNUP_FULFILLED":
			return {...state, loggedIn: true, ...action.payload.data}
		case "LOGIN_FULFILLED":
			return {...state, loggedIn: true, ...action.payload.data}
		case "LOGOUT":
			return {}
		default:
			return state
	}
}

export default authReducer;